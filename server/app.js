const Koa = require('koa');
const KoaStatic = require('koa-static');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoConf = require('./config/mongo');
const cors = require('koa2-cors');
const {
  ApolloServer
} = require('apollo-server-koa');
require('./mongodb');
const routerMap = require('./router');
const {
  typeDefs,
  resolvers
} = require('./graphql/schema');
const app = new Koa();
const router = new Router();
const apollo = new ApolloServer({
  typeDefs,
  resolvers
});
const $config = require('../config');

//跨域处理
app.use(cors());

app.use(bodyParser());
app.use(KoaStatic(__dirname + '/static'), {
  gzip: true,
  setHeaders: function (res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  }
});
// 路由配置
router.use(routerMap.routes());

// 链接数据库
mongoConf.connect();

// 使用路由
app.use(router.routes());
app.use(router.allowedMethods());
// 使用apollo
app.use(apollo.getMiddleware());

app.listen($config.port);