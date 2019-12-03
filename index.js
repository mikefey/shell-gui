const render = require('koa-ejs');
const Router = require('@koa/router');
const path = require('path');
const Koa = require('koa');
const exec = require('child_process').exec;
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

router.get('/api/commands/:id', async (ctx, next) => {
  if (store.configData) {
    const action = getActionById(ctx.params.id, store.configData);
    const actionResponse = exec(action);

    actionResponse.stdout.on('data', (data) => {
      ctx.response.set('content-type', 'txt/html');
      ctx.body = data;
    });
  }
});

app.listen(3000);
