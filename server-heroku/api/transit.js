const Router = require('koa-router');
const transitRouter = new Router({prefix: '/api/transit'});
const {googleMapTransitId} = require('../secrets')
const axios = require('axios');

transitRouter.post('/', async (ctx, next) => {
    const {userLat, userLong, restLat, restLong} = ctx.request.body;
    console.log(ctx.request.body)
    const transitResult = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${userLat},${userLong}&destinations=${restLat},${restLong}&transit_mode=transit&key=${googleMapTransitId}`)

    const transitTime = await transitResult.data.rows[0].elements[0].duration.text
    
    ctx.body = transitTime;

    console.log('transittime', transitTime)
    console.log('ctxbody', ctx.body)

    //I DONT KNOW WHAT NEEDS TO GO HERE AAAAAGH IT DOESN'T CARE ABOUT CTX BODY
})


module.exports = transitRouter;