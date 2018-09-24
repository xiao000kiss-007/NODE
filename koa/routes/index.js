const router=require('koa-router')();

router.get('/',async (ctx)=>{
    await ctx.render('default/index');
})
router.get('/case',async (ctx)=>{
    await ctx.render('default/case');
})
router.get('/about',async (ctx)=>{
    await ctx.render('default/about');
})
module.exports=router.routes();/**暴露并启动路由 */
