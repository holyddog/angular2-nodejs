import 'angular2-universal-polyfills';

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import { enableProdMode } from '@angular/core';
import { createEngine } from 'angular2-express-engine';

import { MainModule } from './main.node';

enableProdMode();

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));

app.engine('.html', createEngine({}));
app.set('views', __dirname);
app.set('view engine', 'html');

app.use(cookieParser('Angular 2 Node.js'));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(ROOT, 'dist/client')));

import { serverApi } from './backend/api';
app.get('/data.json', serverApi);

function ngApp(req, res) {
  res.render('index', {
    req,
    res,
    ngModule: MainModule,
    baseUrl: '/'
  });
}

app.get('/', ngApp);
app.get('/[a-zA-Z0-9\-]+', ngApp);

app.get('*', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var pojo = { status: 404, message: 'No Content' };
  var json = JSON.stringify(pojo, null, 2);
  res.status(404).send(json);
});

let server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on: http://localhost:${server.address().port}`);
});
