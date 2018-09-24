const router=require('koa-router')();
router.get('/',async (ctx)=>{
    await ctx.render('admin/login');
})

module.exports=router.routes();/**暴露并启动路由 */