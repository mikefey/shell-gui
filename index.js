const render = require('koa-ejs');
const Router = require('@koa/router');
const path = require('path');
const Koa = require('koa');
const { spawn } = require('child_process');
const getConfigData = require('./utils/get-config-data');
const getActionById = require('./utils/get-action-by-id');
const getCwdById = require('./utils/get-cwd-by-id');

const app = new Koa();
const router = new Router();
const store = { };

render(app, {
  root: path.join(__dirname, 'templates'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: true,
});

app
  .use(require('koa-static')(path.join(__dirname, 'static')))
  .use(router.routes());

router.get('/', async (ctx) => {
  const configData = await getConfigData('./configs/');
  store.configData = configData;
  await ctx.render('index', { configData });
});

router.get('/api/commands/:id', async (ctx) => {
  if (store.configData) {
    const action = getActionById(ctx.params.id, store.configData);
    const cwd = getCwdById(ctx.params.id, store.configData);
    const actionArray = action.split(' ');

    const envVars = actionArray
      .filter((item) => item.indexOf('=') > -1 && item.indexOf('--') === -1)
      .reduce((acc, item) => {
        const [key, val] = item.split('=');

        const updated = {
          ...acc,
          [key]: val,
        };

        return updated;
      }, {});

    const actionsWithoutEnvVars = actionArray.filter((item) => item.indexOf('=') === -1 || item.indexOf('--') > -1);
    const actionConfig = {
      cwd: `${__dirname}/${cwd}`,
      env: Object.entries(envVars).length > 0 ? envVars : undefined,
    };

    const actionResponse = spawn(
      actionsWithoutEnvVars[0],
      actionsWithoutEnvVars.slice(1),
      actionConfig,
    );

    actionResponse.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    ctx.body = actionResponse.stdout;
  }
});

app.listen(3000);
