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
    },
    include: {all: true}
  })
  if (!user) {
    let err = new Error('No such email exists! Please enter valid email address.');
    err.status = 404;
    throw(err);
  }
  else if (!user.correctPassword(ctx.request.body.password)) {
    let err = new Error('Wrong password. Try again.');
    err.status = 401;
    throw(err);
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
    },
    include: {all: true}
  });
  if (repeatedUser) {
    let err = new Error('User already exists! Need unique email.');
    err.status = 401;
    throw(err);
  }
  else {
    let user = await ctx.db.models.user.create(ctx.request.body);
    await ctx.login(user);
    ctx.status = 200;
    ctx.body = user;
  }
})

authRouter.post('/logout', async (ctx, next) => {
  ctx.logout();
  ctx.session = null;
  ctx.body = {};
})

module.exports = authRouter;
