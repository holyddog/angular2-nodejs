import * as mongodb from 'mongodb';
import * as util from 'util';

var MongoClient = mongodb.MongoClient;
var f = util.format;

var user = encodeURIComponent('admin');
var password = encodeURIComponent('whitedog');
var dbName = 'animals';
var authMechanism = 'DEFAULT';
var authSource = 'admin';

var url = f('mongodb://%s:%s@localhost:27017/%s?authMechanism=%s&authSource=%s',
  user, password, dbName, authMechanism, authSource);

var db = null;
MongoClient.connect(url, function (err, mongoDb) {
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
