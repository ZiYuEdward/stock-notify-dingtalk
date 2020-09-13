
import { Service } from 'egg';
import axios from 'axios';


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
      const stockData = await axios.get(`${config.stockApi}${codes}`);
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
    stockData.forEach(v => {
      console.log(v, 'noti');
    });
  }
}
