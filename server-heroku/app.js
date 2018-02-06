const Koa = require('koa');
const app = new Koa();
const PORT = process.env.PORT || 5218;
const socketio = require('socket.io');
const { db } = require('./db/models');
const bodyParser = require('koa-bodyparser');
const path = require('path');
// const api = require('./api');
const session = require('koa-session');
const passport = require('koa-passport');
const logger = require('koa-logger');

const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: false,
  rolling: false,
  renew: false
}

if (process.env.NODE_ENV !== 'production') require('./secrets');

passport.serializeUser((user, done) => { done(null, user.id); });

passport.deserializeUser(async (id, done) => {
  let user = await db.models.user.findById(id);
  done(null, user);
});

const startListening = async () => {
  await createApp();
  const server = app.listen(PORT, () => {
    console.log(`Eating away on PORT ${PORT}`);
  });
  const io = socketio(server);
  require('./socket')(io);
}

const syncDb = () => db.sync();

const createApp = () => {
  app.use(async (ctx, next) => {
    ctx.db = db;
    await next();
  });
  app.use(logger());
  app.use(bodyParser());
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.throw(err.status || 500, err.message || 'Internal Server Error');
    }
  });
  app.use(session(CONFIG, app));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(require('./auth').routes());

  app.use(require('./api'));
};

async function decision () {
  if (require.main === module) {
    await syncDb();
    startListening();
  }
  else {
    await createApp();
  }
};

decision();

module.exports = app;
