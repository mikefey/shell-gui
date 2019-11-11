const yaml = require('js-yaml');
const render = require('koa-ejs');
const path = require('path');
const Koa = require('koa');
const readFiles = require('./utils/read-files');

const app = new Koa();

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

app.use(require('koa-static')(path.join(__dirname, 'static')));

app.use(async ctx => {
  const configData = await getConfigData();

  await ctx.render('index', { configData });
});

app.listen(3000);
