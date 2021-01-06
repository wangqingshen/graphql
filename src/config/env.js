// 环境变量配置

const curConfigKey = process.env.VUE_APP_ENV,
  isDev = process.env.NODE_ENV === 'development',
  isTest = process.env.NODE_ENV === 'development',
  baseData = {
    // 本地环境
    dev: {
      baseURL: 'http://localhost:4000'
    },
    // 开发环境
    stage: {
      baseURL: 'https://api-dev.scyuelai.com/saasuims'
    },
    // 测试环境
    alpha: {
      baseURL: 'https://api-qa.scyuelai.com/saasuims'
    },
    // 正式环境
    prod: {
      baseURL: 'https://api.scyuelai.com/saasuims'
    }
  };

const envConfig = {
  isDevelop: (isDev || isTest),
  routerBaseUrl: isDev ? '/' : './',
  sentryDsn: 'https://dd23225f36bd4fa4817366469a9c2e7e@o485004.ingest.sentry.io/5538982',
  ...baseData[curConfigKey],
};

export default envConfig;