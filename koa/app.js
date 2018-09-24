const Koa=require('koa'),
      router=require('koa-router')(),
      render = require('koa-art-template'),
      path = require('path'),
      bodyParser = require('koa-bodyparser'),
      static = require('koa-static'),
      DB=require('./module/db.js')
/*引入子模块*/      
const admin=require('./routes/admin.js')
const api=require('./routes/api.js')
const index=require('./routes/index.js')

const app=new Koa()
/**引入配置bodyParser中间件 */
app.use(bodyParser());
/**引入配置静态资源加载中间件 */
app.use(static(
    path.join( __dirname,  'statics')
)) 
/**配置渲染模板引擎 */
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
  });
router.use('/admin',admin);
router.use('/api',api);   
router.use(index);

app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods()); // 作用： 这是官方文档的推荐用法,
//我们可以看到router.allowedMethods()用在了路由匹配router.routes()之后,所以在当所有路由中间件最后调用.此时根据ctx.status设置response响应头
app.listen(3000)
console.log('服务器运行的端口： 3000')