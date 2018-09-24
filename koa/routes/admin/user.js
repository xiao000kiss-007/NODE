const router=require('koa-router')();

router.get('/',async (ctx)=>{
    await ctx.render('admin/user/list');
})
router.get('/add',async (ctx)=>{
    await ctx.render('admin/user/add');
})
router.get('/edit',async (ctx)=>{
    await ctx.render('admin/user/edit');
})
router.get('/delete',async (ctx)=>{
    ctx.body='用户删除'
})
module.exports=router.routes();/**暴露并启动路由 */
