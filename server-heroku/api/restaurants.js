const Router = require('koa-router');
const restRouter = new Router({ prefix: '/api/restaurants' });
const request = require('koa-http-request');
const app = new Router();
const axios = require('axios');

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
        'BEARER H4YNEOr_GbCiHQVMwYz2ZpkJWa2NNn4DEDsSANhRMgYrM5v8a11xq2b23Y8mky9n_wMWdycegxMqeej3xMqTaD6VqnAPuyZXU2c1quDSvYh018QVfloojF4NzixqWnYx'
      }
    }
  ).then((restaurants) => {return restaurants.data.businesses})
  ctx.status = 200;
})

module.exports = restRouter;
