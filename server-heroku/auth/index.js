const Router = require('koa-router');
const authRouter = new Router({prefix: '/auth'});

authRouter.use('/google', require('./google').routes());

//after Google authenticates the user, koa-passport session middleware will serialize the user into a ctx.state._passport.session.user, which is an ID!, and then all requests after that will deserialize the user onto ctx.state.user;
authRouter.get('/me', (ctx, next) => {
  ctx.body = ctx.state.user;
})
//this is the resulting failure redirect - you cannot redirect to a URL.
authRouter.get('/login', (ctx, next) => {
  ctx.body = {};
})

authRouter.post('/login', async (ctx, next) => {
  let user = await ctx.db.models.user.findOne({
    where: {
      email: ctx.request.body.email
    }
  })
  if (!user) {
    ctx.status = 401;
    ctx.message = 'No email exists!'
  }
  else if (!user.correctPassword(ctx.request.body.password)) {
    ctx.status = 401;
    ctx.message = 'Wrong password. Try again.';
  }
  else {
    ctx.session.user = user.id;
    await ctx.login(user);
    ctx.status = 200;
    ctx.body = user;
  }
})

authRouter.post('/signup', async (ctx, next) => {
  let repeatedUser = await ctx.db.models.user.findOne({
    where: {
      email: ctx.request.body.email
    }
  });
  if (repeatedUser) {
    ctx.status = 401;
    ctx.message = 'User already exists!';
  }
  else {
    let user = await ctx.db.models.user.create(ctx.request.body);
    await ctx.login(user);
    ctx.status = 200;
    ctx.body = user;
  }
})

module.exports = authRouter;
