import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1598436511457_8866';

  // add your egg config in here
  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'czy666666',
    database: 'stock-record',
  };

  // add your special config in here
  const customConfig = {
    stockApi: 'http://hq.sinajs.cn/list=', // 调用新浪股票接口
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...customConfig,
  };
};
