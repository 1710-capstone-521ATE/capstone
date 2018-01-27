const Koa = require('koa');
const app = new Koa();
const PORT = process.env.PORT || 5218;
const socketio = require('socket.io');
const { db } = require('./db/models');
const path = require('path');
// const api = require('./api');

const startListening = async () => {
  await createApp();
  const server = app.listen(PORT, () => {
    console.log(`Eating away on PORT ${PORT}`);
  });
  const io = socketio(server);
  require('./socket')(io);
}

const syncDb = () => db.sync({force: true});

const createApp =  () => {
  app.use(async (ctx, next) => {
    ctx.db = db;
    await next();
  });

  app.use(require('./api'));

}

async function decision () {
  if (require.main === module) {
    await syncDb();
    startListening();
  }
  else {
    await createApp();
  }
}

decision();
