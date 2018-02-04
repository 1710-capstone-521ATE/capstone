const Router = require('koa-router');
const userRouter = new Router({prefix: '/api/users'});

userRouter.param('id', async(id, ctx, next) => {
  let userModel = ctx.db.models.user;
  ctx.state.user = await userModel.findById(id);
  await next();
})

userRouter.get('/', async (ctx, next) => {
  let userModel = ctx.db.models.user;
  ctx.body = await userModel.findAll();
  ctx.body = ctx.body.map(user => user.sanitize());
});

userRouter.post('/', async (ctx, next) => {
  let userModel = ctx.db.models.user;
  delete ctx.request.body.salt;
  ctx.body = await userModel.create(
    ctx.request.body
  );
  ctx.session.user = ctx.body.id;
  ctx.body = ctx.body.sanitize();
});

userRouter.get('/:id', async (ctx, next) => {
  let userModel = ctx.db.models.user;
  ctx.state.user = await userModel.findOne({
    where: {
      id: +ctx.params.id
    },
    include: {all: true}
  });
  ctx.body = ctx.state.user.sanitize();
  await next();
})

userRouter.put('/:id', async(ctx, next) => {
  delete ctx.request.body.salt;
  ctx.body = await ctx.state.user.update(ctx.request.body);
  ctx.body = ctx.body.sanitize();
})

userRouter.delete('/:id', async(ctx, next) => {
  await ctx.state.user.destroy();
  ctx.status = 204;
})

userRouter.get('/:id/groups/events', async (ctx, next) => {
  let userModel = ctx.db.models.user;
  let eventModel = ctx.db.models.event;

  let groupModel = ctx.db.models.groups;
  const groups = await ctx.state.user.getGroups();
  const events = await Promise.all(groups.map((group) => {
    return eventModel.findAll({where: {
      groupId : group.id,
      startEvent: false
      }})
  }))
  const eventsArray = [].concat(...events)
  ctx.body = eventsArray;
})

module.exports = userRouter;
