export const Config = Object.freeze({
    Mongo: {
        User: encodeURIComponent('admin'),
        Password: encodeURIComponent('whitedog'),
        DBName: 'animals',
        AuthSource: 'admin'
    }
});



var user = encodeURIComponent('admin');
var password = encodeURIComponent('whitedog');
var dbName = 'animals';
var authMechanism = 'DEFAULT';
var authSource = 'admin';