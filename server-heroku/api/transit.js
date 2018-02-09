const Router = require('koa-router');
const transitRouter = new Router({prefix: '/api/transit'});
const googleMapTransitId = process.env.googleMapTransitId || require('../secrets').googleMapTransitId;
const axios = require('axios');

transitRouter.post('/', async (ctx, next) => {
    const {userLat, userLong, restLat, restLong} = ctx.request.body;
    const transitResult = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${userLat},${userLong}&destinations=${restLat},${restLong}&transit_mode=transit&key=${googleMapTransitId}`)

    const transitTime = await transitResult.data.rows[0].elements[0].duration.text;

    const resultElements = transitResult.data.rows[0].elements[0];
    ctx.body = resultElements;
})


module.exports = transitRouter;
