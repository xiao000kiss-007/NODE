const router=require('koa-router')();

router.get('/',async (ctx)=>{
    ctx.body={"title":"这是一个api接口"}
})
router.get('/newslist',async (ctx)=>{
    ctx.body={"title":"这是一个新闻接口"}
})

router.get('/focus',async (ctx)=>{
    ctx.body={"title":"这是一个轮播图接口"}
})
module.exports=router.routes();/**暴露并启动路由 */
