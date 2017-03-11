var Koa = require('koa');
var Router = require('koa-router');
var gpio = require('rpi-gpio');
var sleep = require('sleep');

var app = new Koa();
var router = new Router();

gpio.setup(18, gpio.DIR_OUT);
gpio.setup(22, gpio.DIR_OUT);

app
    .use(router.routes())
    .use(router.allowedMethods());


router.get('/powerOn', async(ctx, next) => {    

    await powerOnLed(18);
    sleep.sleep(2);
    await powerOnLed(22);

    ctx.status = 200;

});

router.get('/powerOff', async(ctx, next) => {

    await powerOffLed(18);
    sleep.sleep(2);
    await powerOffLed(22);

    ctx.status = 200;

});



function powerOnLed(pin) {

    return new Promise((resolve, reject) => {

        gpio.write(pin, true, (err)=>{

            if (err) {
                reject(err);
                return;
                }

            resolve();

        })
        
    });


};

function powerOffLed(pin) {

    return new Promise((resolve, reject) => {

        gpio.write(pin, false, (err)=>{

            if (err) {
                reject(err);
                return;
                }

            resolve();

        })
        
    });


};


app.listen(3000);
