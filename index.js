const render = require('koa-ejs');
const Router = require('@koa/router');
const path = require('path');
const Koa = require('koa');
const spawn = require('child_process').spawn;
const getConfigData = require('./utils/get-config-data');
const getActionById = require('./utils/get-action-by-id');

const app = new Koa();
const router = new Router();
const store = { };

render(app, {
  root: path.join(__dirname, 'templates'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: true
});

app
  .use(require('koa-static')(path.join(__dirname, 'static')))
  .use(router.routes());

router.get('/', async (ctx, next) => {
  const configData = await getConfigData();
  store.configData = configData;
  await ctx.render('index', { configData });
});

router.get('/api/commands/:id', async (ctx) => {
  if (store.configData) {
    const action = getActionById(ctx.params.id, store.configData);
    const actionArray = action.split(' ');
    const actionResponse = spawn(actionArray[0], actionArray.slice(1));

    ctx.body = actionResponse.stdout;
  }
});

app.listen(3000);
