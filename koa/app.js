const Koa=require('koa')
const router=require('koa-router')()

const app=new Koa()

router.get('/', async ( ctx ) => {
    ctx.body = '首页';
  })
  router.get('/news',async (ctx) =>{
      ctx.body='这是一个新闻页面';
  })
app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods()); // 作用： 这是官方文档的推荐用法,
//我们可以看到router.allowedMethods()用在了路由匹配router.routes()之后,所以在当所有路由中间件最后调用.此时根据ctx.status设置response响应头
app.listen(3000)
console.log('服务器运行的端口： 3000')