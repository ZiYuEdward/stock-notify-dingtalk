
import { Service } from 'egg';
import axios from 'axios';
// import sequelize from 'sequelize';
// const Op = sequelize.Op;

export default class Crawl extends Service {
  static handleStockInfo(stockStr, enableStockList) {
    const stockArr = stockStr.split(';\n').filter(v => !!v);
    const r: any = [];
    stockArr.forEach((v, i) => {
      const originItem = enableStockList[i];
      console.log(originItem);
      let stockNum = v.match(/\".*\"/)[0];
      stockNum = stockNum.substr(1, (stockNum.length - 2));
      console.log(stockNum, 'nnnnn');
      r.push({
        ...originItem.dataValues,
        d: stockNum,
      });
    });
    return r;
  }

  async getStockInfoByCode() {
    const { ctx, config } = this;
    const enableStockList: any = await ctx.model.Record.findAll({
      where: {
        stockEnable: 1,
      },
    });
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

  async notify(res) {
    res.forEach(v => {
      console.log(v, 'noti');
    });
  }
}
