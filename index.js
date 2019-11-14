const yaml = require('js-yaml');
const render = require('koa-ejs');
const Router = require('@koa/router');
const path = require('path');
const Koa = require('koa');
const readFiles = require('./utils/read-files');
const getCommandById = require('./utils/get-command-by-id');

const app = new Koa();
const router = new Router();
const store = { };

const getConfigData = async () => {
  const configFileData = await readFiles('./configs/')
  let inc = 0;

  return new Promise((resolve) => {
    const sections = [];

    configFileData.forEach((configFile) => {
      sections.push(yaml.safeLoad(configFile.content));
      inc++;

      if (inc === sections.length) {
        resolve(sections);
      }
    });
  });
}

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
    const command = getCommandById(ctx.params.id, store.configData);
    console.log('command: ', command);
  }
});

app.listen(3000);
