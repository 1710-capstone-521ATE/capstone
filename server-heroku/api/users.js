const Router = require('koa-router');
const userRouter = new Router({prefix: '/api/users'});

userRouter.get('/', async (ctx, next) => {
  let userModel = ctx.db.models.user

  await userModel.create({
    email: 'sarahzhao25@gmail.com',
    firstName: 'Sarah',
    lastName: 'Zhao'
  })

  let users = await userModel.findAll();
  ctx.body = users;
})

module.exports = userRouter;