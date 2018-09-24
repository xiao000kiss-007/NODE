const router=require('koa-router')();

router.get('/',async (ctx)=>{
    await ctx.render('admin/news/index');
})
router.get('/add',async (ctx)=>{
    await ctx.render('admin/news/add');
})
router.get('/edit',async (ctx)=>{
    await ctx.render('admin/news/edit');
})
router.get('/delete',async (ctx)=>{
    ctx.body='新闻删除'
})
module.exports=router.routes();/**暴露并启动路由 */
