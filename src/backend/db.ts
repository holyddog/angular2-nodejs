import * as mongodb from 'mongodb';
import * as util from 'util';
import { Config } from './config';

var mongo = mongodb.MongoClient;
var config = Config.Mongo;

var url = util.format('mongodb://%s:%s@localhost:27017/%s?authMechanism=DEFAULT&authSource=%s', 
  config.User, config.Password, config.DBName, config.AuthSource);

var db = null;
mongo.connect(url, function (err, mongoDb) {
  if (err) {
    throw err;
  }
  console.log("db connected");
  db = mongoDb;
});

export const fakeDataBase = {
  get() {
    // return Promise.resolve(res);
    return db.collection('mammals').find({}).toArray();
  }
};
