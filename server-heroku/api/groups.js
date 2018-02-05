const Router = require('koa-router');
const groupRouter = new Router({prefix: '/api/groups'});
const { getMidpoint, fetchGroupUsers, addMidPointToCTX} = require('../utils/groupPut');

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
  ctx.body.users = ctx.body.users.map(user => user.sanitize());
})

groupRouter.post('/:id/events', async (ctx, next) => {
  let newEvent = await ctx.db.models.event.create({groupId: ctx.params.id, hostId: ctx.request.body.hostId})
  ctx.body = newEvent;
})

/*
We are updating the User's latitude and longitude when they join an event.
Currently groups can only have one event, otherwise there will be two latitudes and longitudes
*/
groupRouter.put('/:id/events/:eventCode', async (ctx, next) => {
  let event = await ctx.db.models.event.findOne({
    where: {
      code: ctx.params.eventCode
    }
  });
  let { userId, latitude, longitude } = ctx.request.body;
  ctx.body = {users: [], midpoint: {}};
  //ensures the event has NOT started, and that the groupId matches the event's groupId
  if (event.startEvent || Number(event.groupId) !== Number(ctx.params.id)) {
    ctx.status = 200; //just send back the empty object
  } else {

    //1. Performs PUT request on the groupMembers join table.
    let group = await ctx.db.models.group.findById(ctx.params.id);
    let user = await ctx.db.models.user.findById(userId);
    await group.addUser(user, {through: { latitude, longitude }}) //updates the user's lat/long

    //2. Obtains the current status of the group & configures response body for front-end
    ctx.body.users = await fetchGroupUsers(group);

    //3. Obtains and attaches midpoint if ALL users have responded.
    if (ctx.body.users.every(user => user.coords.latitude !== null)) {
      await event.update({ startEvent: true });
      let midpoint = addMidPointToCTX(ctx.body.users);
      ctx.body.midpoint = midpoint;
    }
  }
})

module.exports = groupRouter;
