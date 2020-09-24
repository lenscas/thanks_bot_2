var config = require('config').mongodb;
var port = config.port;
var db = config.db;
var users = config.users;

var mongodb = require('mongodb');
var Db = mongodb.Db;
var Server = mongodb.Server;


module.exports = function () {
    var database = new Db(db, new Server('localhost', port));

// Establish connection to db
    database.open(function (err, conn) {
        if (err) {
            return console.log(err);
        }

        console.log("Opened database");

        users.map(function (user) {
            conn.addUser(user.username, user.password, {
                roles: user.roles
            }, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log('Added '+ user.username);
            });
        })

    });
};