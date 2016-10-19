import 'angular2-universal-polyfills';

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import * as mongodb from 'mongodb';
import * as util from 'util';
import { Config } from './config';

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

import { MammalApi } from './backend/api';

var mongo = mongodb.MongoClient;
var config = Config.Mongo;

var url = util.format('mongodb://%s:%s@localhost:27017/%s?authMechanism=DEFAULT&authSource=%s', 
  config.User, config.Password, config.DBName, config.AuthSource);

mongo.connect(url, function (err, db) {
  if (err) {
    throw err;
  }
  console.log("db connected");

  var attachDB = function(req, res, next) {
      req.db = db;
      next();
  };
  app.get('/api/mammals', attachDB, function(req, res) {
      MammalApi.list(req, res);
  });
  app.get('/api/mammal/:id', attachDB, function(req, res) {
      MammalApi.get(req, res);
  });

  app.get('*', (req, res) => {
    res.render('index', {
      req,
      res,
      ngModule: MainModule,
      baseUrl: '/'
    });
  });
  
  let server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on: http://localhost:${server.address().port}`);
  });
});

// app.get('/api/mammals', (req, res) => {
//   req['db'] = db;
// });
