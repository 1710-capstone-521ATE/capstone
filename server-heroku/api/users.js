const Router = require('koa-router');
const userRouter = new Router({prefix: '/api/users'});

userRouter.param('id', async(id, ctx, next) => {
  let userModel = ctx.db.models.user;
  ctx.state.user = await userModel.findById(id);
  await next();
})

userRouter.delete('/:id', async(ctx, next) => {
  await ctx.state.user.destroy();
  ctx.status = 204;
})

userRouter.put('/:id', async(ctx, next) => {
  ctx.body = await ctx.state.user.update(ctx.request.body);
  ctx.status = 418;
})

userRouter.get('/:id', async (ctx, next) => {
  let userModel = ctx.db.models.user;
  ctx.state.user = await userModel.findOne({
    where: {
      id: +ctx.params.id
    },
    include: {all: true}
  });
  ctx.body = ctx.state.user;
  await next();
})

userRouter.get('/', async (ctx, next) => {
  let userModel = ctx.db.models.user;
  ctx.body = await userModel.findAll();
});


userRouter.post('/', async (ctx, next) => {
  let userModel = ctx.db.models.user;
  ctx.body = await userModel.create(
    ctx.request.body
  );
  ctx.session.user = ctx.body.id;
});


module.exports = userRouter;
