const dayjs = require('dayjs'); // eslint-disable-line
const isBetween = require('dayjs/plugin/isBetween'); // eslint-disable-line
dayjs.extend(isBetween);

module.exports = {
  schedule: {
    cron: '*/15 * * * * ?', // 每隔10s调用新浪api
    type: 'all', // 指定所有的 worker 都需要执行
    immediate: true,
  },
  async task(ctx) {
    const stockStartTime = '09:31';
    const stockEndTime = '15:00';
    // 开市时间段开始任务
    const day = dayjs().format('YYYY-MM-DD');
    const startTime = dayjs(`${day} ${stockStartTime}`);
    const endTime = dayjs(`${day} ${stockEndTime}`);
    const now = dayjs();
    if (!now.isBetween(startTime, endTime)) {
      return;
    }
    await ctx.service.crawl.getStockInfoByCode();
  },
};
