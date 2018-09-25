const   router=require('koa-router')(),
        tools=require('../../module/tools.js'),
        DB=require('../../module/db.js');
//验证码模块
let  svgCaptcha = require('svg-captcha');
      
router.get('/',async (ctx)=>{
    await ctx.render('admin/login');
})
router.post('/doLogin',async (ctx)=>{
    let username=ctx.request.body.username;
    let password=tools.md5(ctx.request.body.password);
    let code=ctx.request.body.code;
    // console.log(`${username} ${password} ${code}`);
    if(code.toLocaleLowerCase()==ctx.session.code.toLocaleLowerCase()){
        let result=await DB.find('admin',{"username":username,"password":password});
        if(result.length>0){
            // console.log(result);
            ctx.session.userinfo=result[0];
            ctx.redirect(ctx.state.__HOST__+'/admin');
        }else{
            ctx.render('admin/error',{
                message:'用户名或者密码错误',
                redirect: ctx.state.__HOST__+'/admin/login'
            })
        }

    }
})
router.get('/code',(ctx)=>{
    var captcha = svgCaptcha.create({
        size:4,
        fontSize: 50,
        width: 120,
        height:34,
        background:"#cc9966"
    });
    //保存生成的验证码
    ctx.session.code=captcha.text;
    //设置响应头
    ctx.response.type = 'image/svg+xml';
    ctx.body=captcha.data;
})
module.exports=router.routes();/**暴露并启动路由 */