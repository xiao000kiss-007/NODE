const router=require('koa-router')();

router.get('/',async (ctx)=>{
    await ctx.render('admin/focus/index');
})
router.get('/add',async (ctx)=>{
    await ctx.render('admin/focus/add');
})
router.get('/edit',async (ctx)=>{
    await ctx.render('admin/focus/edit');
})
router.get('/delete',async (ctx)=>{
    ctx.body='轮播图删除'
})
module.exports=router.routes();/**暴露并启动路由 */
