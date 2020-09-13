import { Controller } from 'egg';

export default class RecordController extends Controller {
  public async addRecord() {
    const { ctx } = this;
    const { stockCode, stockType, risePercent, fallPercent, mobile } = ctx.request.query || {};
    const result = await ctx.service.record.insert({
      stockCode,
      stockType,
      risePercent,
      fallPercent,
      mobile,
    });

    ctx.body = {
      success: true,
      data: result,
    };
  }
}
