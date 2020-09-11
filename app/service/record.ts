
import { Service } from 'egg';
import { RecordModule } from '../module/record';
// import sequelize from 'sequelize';
// const Op = sequelize.Op;

export default class Crawl extends Service {
  async insert(query: RecordModule) {
    const { ctx } = this;
    const addResult = await ctx.Record.create(query);
    ctx.logger.info(addResult, 'add');
    return addResult;
  }
}
