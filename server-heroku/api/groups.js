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
})

/*
We are updating the User's latitude and longitude when they join an event.
Currently groups can only have one event, otherwise there will be two latitudes and longitudes

STILL WORKING ON THIS!!
*/
groupRouter.put('/:id/events/:eventId', async (ctx, next) => {
  let event = await ctx.db.models.event.findById(ctx.params.eventId);
  if (event.startEvent || Number(event.groupId) !== Number(ctx.params.id)) {
    ctx.status = 410;
  } else {
    let group = await ctx.db.models.group.findById(ctx.params.id);
    ctx.body = await group.addUser(ctx.request.body.userId, {through: {
      latitude: ctx.req.body.latitude,
      longitude: ctx.req.body.longitude
    }})
  }
})

module.exports = groupRouter;
