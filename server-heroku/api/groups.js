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
       model: ctx.db.models.user,
       attributes: {
         exclude: ['password', 'salt', 'googleId', 'createdAt', 'updatedAt', 'zipcode']
      }
     }
    ]
  })
})

groupRouter.post('/:id/events', async (ctx, next) => {
  let newEvent = await ctx.db.models.event.create({groupId: ctx.params.id, hostId: ctx.request.body.hostId, name: ctx.request.body.name})
  ctx.body = newEvent;
})

// /* We are updating the User's attendance when s/he declines an invitation*/

// groupRouter.put('/:groupId/users/:userId', async (ctx, next) => {

//   let group = await ctx.db.models.group.findById(+ctx.params.groupId);
//   // CAN'T WE USE KOA PASSPORT SESSION???
//   let user = await ctx.db.models.user.findById(+ctx.params.userId);

//   //initiate & define ctx.body here
//   ctx.body = {users: []};
//   await group.addUser(user, {through: {isAttending: false}}) // updates the user's attendance

//   //2. Obtains the current status of the group & configures response body for front-end
//   ctx.body.users = await fetchGroupUsers(group);

//   //3. Obtains and attaches midpoint if ALL users have responded.
//   if (ctx.body.users.every(user => user.coords.latitude !== null)) {
//     await event.update({ startEvent: true });
//     let midpoint = addMidPointToCTX(ctx.body.users);
//     ctx.body.midpoint = midpoint;
//   }
// })

/*
We are updating the User's latitude and longitude when they join an event.
Currently groups can only have one event, otherwise there will be two latitudes and longitudes
*/

groupRouter.put('/:id/events/:eventCode', async (ctx, next) => {
  let { userId, isAttending, latitude, longitude } = ctx.request.body;

   //1. Performs PUT request on the groupMembers join table.
  let group = await ctx.db.models.group.findById(ctx.params.id);
  let user = await ctx.db.models.user.findById(userId);

  let event = await ctx.db.models.event.findOne({
    where: {
      code: ctx.params.eventCode
    }
  });

  //ensures the event has NOT started
  if (event.startEvent) {
    ctx.status = 410; //just send back the empty object and status is gone
  } else {
    /* We are updating the User's attendance when s/he declines an invitation*/
    if (!isAttending) {
      await group.addUser(user, {through: { latitude, longitude, isAttending}}) // updates the user's DECLINE attendance
    } else {
      await group.addUser(user, {through: { latitude, longitude, isAttending}}) //updates the user's lat/long and ACCEPTED attendance
    }
  }
  //2. Obtains the current status of the group & configures response body for front-end
  ctx.body = {users: [], midpoint: {}, event};
  ctx.body.users = await fetchGroupUsers(group);

  //3. Obtains and attaches midpoint if ALL users have responded.
  if (ctx.body.users.every(user => user.coords.latitude !== null)) {
    await event.update({ startEvent: true });
    let midpoint = addMidPointToCTX(ctx.body.users);
    ctx.body.midpoint = midpoint;
    }
})

module.exports = groupRouter;
