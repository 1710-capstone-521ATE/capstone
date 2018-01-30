const Router = require('koa-router');
const restRouter = new Router({ prefix: '/api/restaurants' });
const request = require('koa-http-request');
const app = new Router();
const axios = require('axios');
const { yelpClientId } = require('../secrets')


restRouter.get('/:lat/:long', async(ctx, next) => {
  let lat = ctx.params.lat;
  let long = ctx.params.long;
  const url = `https://api.yelp.com/v3/businesses/search?latitude=${lat}2&longitude=${long}&categories=restaurants`
  ctx.body = await axios(
    {
      method: 'GET',
      url: url,
      headers: {
        Authorization:
        `BEARER ${yelpClientId}`
      }
    }
  ).then((restaurants) => {return restaurants.data.businesses})
  ctx.status = 200;
})

module.exports = restRouter;
