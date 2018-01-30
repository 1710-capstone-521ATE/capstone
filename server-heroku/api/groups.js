const Router = require('koa-router');
const groupRouter = new Router({prefix: '/api/groups'});

groupRouter.post('/', async (ctx, next) => {
  let newGroup = await ctx.db.models.group.create();
  await newGroup.addUsers(ctx.request.body.userIds);
  ctx.body = await ctx.db.models.group.findOne({
    where: {
      id: newGroup.id
    },
    include: [
     {
       model: ctx.db.models.user
     }
    ]
  })
})

groupRouter.post('/:id/events', async (ctx, next) => {
  let newEvent = await ctx.db.models.event.create({groupId: ctx.params.id, hostId: ctx.request.body.hostId})
  ctx.body = newEvent;
  //have to add to the event schema - a hash code.
})

module.exports = groupRouter;
