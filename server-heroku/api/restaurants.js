const Router = require('koa-router');
const restRouter = new Router({ prefix: '/api/restaurants' });
const request = require('koa-http-request');
const app = new Router();
const axios = require('axios');
const yelpKey = process.env.yelpKey || require('../secrets').yelpKey;


restRouter.put('/', async(ctx, next) => {
  const url = `https://api.yelp.com/v3/businesses/search?latitude=${ctx.request.body.latitude}&longitude=${ctx.request.body.longitude}&radius=250&categories=restaurants`;
  ctx.body = await axios(
    {
      method: 'GET',
      url: url,
      headers: {
        Authorization:
        `BEARER ${yelpKey}`
      }
    }
  ).then((restaurants) => {return restaurants.data.businesses.slice(0, 5)})
  ctx.status = 200;
})

module.exports = restRouter;
