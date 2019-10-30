/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'egg',
    username: 'root',
    password: 'root',
    timezone: '+08:00',
  };

  // 跨域
  config.cors = {
    origin: '*',
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // session
  config.session = {
    key: 'EGG_SESS',
    maxAge: 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1571810898704_2069';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
