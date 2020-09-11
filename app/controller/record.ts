import { Controller } from 'egg';

export default class RecordController extends Controller {
  public async addRecord() {
    const { ctx } = this;
    const query = ctx.request.query || {};
    const result = await ctx.service.record.insert(query);
    ctx.body = {
      success: true,
      data: result,
    };
  }
}
