const router=require('koa-router')();
const user=require('./admin/user.js');
const focus=require('./admin/focus.js');
const news=require('./admin/news.js');
const login=require('./admin/login.js');

//配置中间件 获取url的地址
router.use(async(ctx,next)=>{
    //模板引擎配置全局的变量
    // console.log(ctx.request.header.host)
    ctx.state.__HOST__='http://'+ctx.request.header.host;
    await next();
})
router.get('/',async (ctx)=>{
   await ctx.render('admin/index');
})
router.use('/user',user)
router.use('/focus',focus)
router.use('/news',news)
router.use('/login',login)


module.exports=router.routes();/**暴露并启动路由 */
