const Koa = require('koa');
const fs = require('fs');
const app = new Koa();
 
// 根据需求,读取相应的页面,并返回
function render(page){
    return new Promise((resolve, reject)=>{
        let pageUrl = `./pages/${page}`;
        //生成二进制流
        fs.readFile(pageUrl, "binary", (err, data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

// 识别url,判断所请求的页面
async function route(url){
    while(true){
      console.log(true);
      
    }
}

app.use(async(ctx)=>{
    let url = ctx.request.url;
    let html = await route(url);
    ctx.body=html;
})

app.listen(3000,()=>{
    console.log('[demo] server is starting at port 3000');
});