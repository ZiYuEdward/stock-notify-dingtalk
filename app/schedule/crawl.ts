module.exports = {
  schedule: {
    cron: '*/10 * * * * ?', // 每日0点执行
    type: 'all', // 指定所有的 worker 都需要执行
    immediate: true,
  },
  async task(ctx) {
    console.log('tick');
    await ctx.service.crawl.getStockInfoByCode();
  },
};
