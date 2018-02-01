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

userRouter.get('/:id/groups/events', async (ctx, next) => {
  let userModel = ctx.db.models.user;
  let eventModel = ctx.db.models.event;

  let groupModel = ctx.db.models.groups;
  const testGroups = await ctx.state.user.getGroups();
  const testEvents = await Promise.all(testGroups.map((group) => {
    return eventModel.findAll({where: {groupId : group.id}})
  }))
  const eventArray = [].concat(...testEvents)
  ctx.body = eventArray
  console.log(ctx.body)

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
