const Router = require('koa-router');
const restRouter = new Router({ prefix: '/api/restaurants' });
const request = require('koa-http-request');
const app = new Router();


// restRouter.param('coords', async(coords, ctx, next) => {
//   ctx.state.coords = coords;
//   console.log("our coords", typeof coords);
//   await next();
// })

// restRouter.use(request({
//   json: true,
//   timeout: 3000,
//   host: 'https://api.yelp.com'
// }))


restRouter.get('/:lat/:long', async(ctx, next) => {
  console.log(ctx.params)
  let lat = ctx.params.lat;
  console.log("lat: ", lat);
  let long = ctx.params.long;
  console.log('Long: ', long);
  let options = {
    url: `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${long}&categories=restaurants`,
    headers: {'Authorization': 'BEARER H4YNEOr_GbCiHQVMwYz2ZpkJWa2NNn4DEDsSANhRMgYrM5v8a11xq2b23Y8mky9n_wMWdycegxMqeej3xMqTaD6VqnAPuyZXU2c1quDSvYh018QVfloojF4NzixqWnYx'}
  }
  request.header = options.headers;
  console.log('request header, ', request.header)
  ctx.body = await (app.get(options.url));
  // console.log('@!@!@', options.url)
  // const response = await request(options)
  // console.log('response: ', response);
  // const restaurants = response.body
  // ctx.body.restaurants = restaurants
  console.log('body,', ctx.body);
  ctx.status = 200;
})

module.exports = restRouter;
