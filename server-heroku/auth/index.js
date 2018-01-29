const Router = require('koa-router');
const authRouter = new Router({prefix: '/auth'});

authRouter.post('/login', async (ctx, next) => {
  console.log(ctx.request.body.email)
  console.log(ctx.request.body.password)
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
    ctx.user = user;
    ctx.status = 200;
  }
})

module.exports = authRouter;
