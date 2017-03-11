var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

app
    .use(router.routes())
    .use(router.allowedMethods());


router.get('/teste', async(ctx, next) => {

    ctx.body = await teste();

});


function teste() {

    return new Promise((resolve, reject) => {
        resolve('teste');
    });


};

app.listen(3000);