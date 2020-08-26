import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    const allProjectInfo = await ctx.model.Init.findAll({
      attributes: [ 'entry', 'module_name' ],
    });
    ctx.logger.info(allProjectInfo, 'aaa');
    ctx.body = await ctx.service.test.sayHi('egg');
  }
}
