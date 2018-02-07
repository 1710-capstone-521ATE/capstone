
module.exports = async function(ctx, next){
  // routing is right now ['api', '...?'] depending on the path
  // for example, if we do localhost:5218/api/users, routing will be ['api' , 'users']
  let routing = ctx.path.slice(1).split('/');

  if(routing.length < 2) return;

  // these routes are either 'users' or 'cuisines'
  ctx.state.routes = routing[1];
  await require(`./${ctx.state.routes}`).routes()(ctx, next);
}
