const Router = require('koa-router');
const groupRouter = new Router({prefix: '/api/groups'});
const getMidpoint = require('../socket/utils/midpoint');

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
*/
groupRouter.put('/:id/events/:eventId', async (ctx, next) => {
  let event = await ctx.db.models.event.findById(ctx.params.eventId);
  //ensures the event has NOT started, and that the groupId matches the event's groupId
  if (event.startEvent || Number(event.groupId) !== Number(ctx.params.id)) {
    ctx.body = [];
  } else {
    let group = await ctx.db.models.group.findById(ctx.params.id);
    let user = await ctx.db.models.user.findById(ctx.request.body.userId);
    await group.addUser(user, {through: { //updates the user's lat/long
      latitude: ctx.request.body.latitude,
      longitude: ctx.request.body.longitude
    }})
    let usersArr = await group.getUsers(); //obtains the current status of all users

    //configuring response body for front-end
    ctx.body = usersArr.map(user => {
      let userObj =
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        coords: {
          latitude: user.groupMembers.latitude,
          longitude: user.groupMembers.longitude
        }
      }
      return userObj;
    });

    //this checks that if everyone has responded (updated their lat/long), then the event will start AND the midpoint is calculated.
    if (!usersArr.filter(user => !user.groupMembers.latitude).length) {
      await event.update({ startEvent: true });
      let midPoint = addMidPointToCTX(usersArr);
      ctx.body = ctx.body.concat(midPoint);
    }
  }
})

function addMidPointToCTX(usersArr) {
  const coordArr = usersArr.map(user => {
    let userCoords = {
      latitude: user.groupMembers.latitude,
      longitude: user.groupMembers.longitude
    }
    return userCoords;
  });
  let midpoint = getMidpoint(coordArr);
  let midpointObj = {
    id: 'midpoint', //separating midpoint from users
    firstName: 'Midpoint',
    coords: midpoint
  }
  return midpointObj;
}

module.exports = groupRouter;
