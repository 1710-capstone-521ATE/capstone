const Router = require('koa-router');
const restRouter = new Router({ prefix: '/api/restaurants' });
const request = require('koa-request');

restRouter.param('coords', async(coords, ctx, next) => {
  ctx.state.coords = coords;
  await next();
})

restRouter.get('/:coords', async(ctx, next) => {
  let lat = ctx.state.coords.lat;
  let long = ctx.state.coords.long;
  let options = {
    url: `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${long}&categories=restaurants`,
    headers: {'Authorization': 'BEARER H4YNEOr_GbCiHQVMwYz2ZpkJWa2NNn4DEDsSANhRMgYrM5v8a11xq2b23Y8mky9n_wMWdycegxMqeej3xMqTaD6VqnAPuyZXU2c1quDSvYh018QVfloojF4NzixqWnYx'}
  }
  ctx.body.restaurants = await request(options)
  ctx.status = 200;
})

module.exports = restRouter;
