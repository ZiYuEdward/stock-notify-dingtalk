module.exports = {
  schedule: {
    cron: '*/10 * * * * ?', // 每隔10s调用新浪api
    type: 'all', // 指定所有的 worker 都需要执行
    immediate: true,
  },
  async task(ctx) {
    await ctx.service.crawl.getStockInfoByCode();
  },
};
