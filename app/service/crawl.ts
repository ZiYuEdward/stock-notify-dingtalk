
import { Service } from 'egg';
import instance from '../http-request';

// const iconv = require('iconv-lite'); // eslint-disable-line
const dayjs = require('dayjs'); // eslint-disable-line

export default class Crawl extends Service {
  /**
   * 处理新浪返回股票数据
  */
  static handleStockInfo(stockStr, enableStockList) {
    const stockArr = stockStr.split(';\n').filter(v => !!v);
    const r: any = [];
    stockArr.forEach((v, i) => {
      const originItem = enableStockList[i];
      let stockNum = v.match(/\".*\"/)[0];
      stockNum = stockNum.substr(1, (stockNum.length - 2));
      r.push({
        ...originItem.dataValues,
        d: stockNum,
      });
    });
    return r;
  }
  /**
   * 通过新浪api获取股票数据
  */
  async getStockInfoByCode() {
    const { ctx, config } = this;
    const enableStockList: any = await ctx.model.Record.findAll({
      where: {
        stockEnable: 1,
      },
    });
    // 获取股票代码
    const codes = enableStockList.map(v => `${v.stockType}${v.stockCode}`).join(',');
    let stockStr = '';
    try {
      const stockData = await instance.get(`${config.stockApi}${codes}`);
      stockStr = stockData.data || '';
    } catch (e) {
      ctx.logger.error(`获取新浪股票api信息错误${e}`);
    }
    const result = Crawl.handleStockInfo(stockStr, enableStockList);
    return this.notify(result);
  }
  /**
   * 通知端上
  */
  async notify(stockData = []) {
    stockData.forEach(async (v: any) => {
      await this.handleStockItem(v);
    });
  }

  async handleStockItem(item) {
    const { ctx } = this;
    const recordTime = dayjs().format('YYYY-MM-DD');
    const stockNumArr = item.d.split(',');
    const { stockCode, stockType, risePercent, fallPercent, mobile } = item;

    const [
      name,
      todayStartPrice, // 开盘价
      yesterDayEndPrice,
      currentPrice, // 当前价格
      highestPrice, // 当天最高价
      lowestPrice, // 当天最低价
    ] = stockNumArr;

    // 当前价格涨跌幅
    const currentPricePercent = (((currentPrice - yesterDayEndPrice) / yesterDayEndPrice) * 100).toFixed(2);
    // 用户设置涨跌幅通知值
    let risePercentArr = [];
    let fallPercentArr = [];
    if (risePercent) {
      risePercentArr = risePercent.split(',').sort((a, b) => +a - +b);
    }
    if (fallPercent) {
      fallPercentArr = fallPercent.split(',').sort((a, b) => +a - +b);
    }
    let triggerPercentArr = [];
    let type = '';
    if (+currentPricePercent >= 0) {
      triggerPercentArr = risePercentArr;
      type = 'rise';
    } else {
      triggerPercentArr = fallPercentArr;
      type = 'fall';
    }
    for (let i = 0; i < triggerPercentArr.length; i++) {
      const v = triggerPercentArr[i];
      const triggerPercent = String(v);
      if (Math.abs(+currentPricePercent) < +triggerPercent) {
        continue;
      }
      const notifyRecord = await ctx.model.Notify.findOne({
        where: {
          triggerPercent,
          recordTime,
          stockCode,
        },
      });
      if (!notifyRecord || notifyRecord.repeat) {
        this.triggerDingTalk({
          triggerPercent,
          recordTime,
          todayStartPrice, // 开盘价
          currentPrice, // 当前价格
          currentPricePercent,
          highestPrice, // 当天最高价
          lowestPrice, // 当天最低价
          type,
          stockCode,
          stockType,
          mobile,
          name,
        });
        break;
      }
    }
  }

  async triggerDingTalk({
    triggerPercent,
    recordTime,
    todayStartPrice, // 开盘价
    currentPrice, // 当前价格
    currentPricePercent,
    highestPrice, // 当天最高价
    lowestPrice, // 当天最低价
    type,
    stockCode,
    stockType,
    mobile,
    name,
  }) {
    const { ctx, config } = this;
    let atList = '';
    if (mobile) {
      mobile.split(',').forEach(v => {
        atList += `@${v}`;
      });
    }
    const textBody = {
      msgtype: 'text',
      text: {
        content: `
        名称：${name} - ${stockCode}
        当前涨跌幅：${type === 'rise' ? '涨' : '跌'}:${currentPricePercent}%
        当前价格：${currentPrice},
        开盘价：${todayStartPrice},
        当日最高价: ${highestPrice}
        当日最低价: ${lowestPrice}

        ${atList}
        `,
      },
      at: {
        atMobiles: mobile ? mobile.split(',') : [],
        isAtAll: false,
      },
    };
    instance.post(config.dingtalkApi, textBody).then(() => {
      ctx.model.Notify.create({
        stockCode,
        stockType,
        triggerPercent,
        repeat: 0,
        recordTime,
      });
    });
  }
}
