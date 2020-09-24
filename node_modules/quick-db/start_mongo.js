#!/usr/bin/env node
var spawn = require('child_process').spawn;
var config = require('config').mongodb;
var fs = require('fs');
var Promise = require('bluebird');
var setup_users = require('./setup_mongo_users');
var mongoDir = config.mongoDir;
var dataDir = config.dataDir;
var version = config.version;
var port = config.port || 27017;

function makeSureDataDirExist() {
    return new Promise(function (resolve) {
        fs.exists(dataDir, function (exist) {
            if (!exist) {
                console.log('data not exist!Creating one...');
                fs.mkdirSync(dataDir);
            }

            resolve(dataDir);
        });
    });
}

console.log('running mongodb at version: ' + version);

makeSureDataDirExist().then(function (path) {
    var mongod = spawn(mongoDir + '/' + version + '/bin/mongod', ['--dbpath', path, '--port', port]);

    mongod.stdout.on('data', function (data) {

        process.stdout.write(data);
        if (/waiting for connections on port/.test(data)) {
            setup_users();
        }
    });

    mongod.stderr.on('data', function (data) {
        process.stderr.write(data);
    });

    mongod.on('exit', function (code) {
        process.stderr.write('mongo stopped!', code);
        process.exit(code);
    });

    mongod.on('error', function (err) {
        console.log(err);
    });

    process.on('uncaughtException', function (err) {
        console.error('Uncaught exception:', err);
        process.exit();
    });

    process.on('exit', function () {
        mongod.kill();
    });

    //catches ctrl+c event
    process.on('SIGINT', function () {
        mongod.kill();
        process.exit();
    });
});
