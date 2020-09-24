process.env.NODE_ENV = 'prod';
var path = require('path');
var dbVersion = require('config').mongodb.version;
var argv = require('yargs').argv;
var workingDir = process.cwd();
var fs = require('fs-extra');
var archiver = require('archiver')('zip', {});
console.log('>>>>>>>>', argv);

var version = argv.version + '';
if (!version) {
    throw Error('please specify version using --version flag.');
}
var output = path.join(workingDir, 'release/' + version);
var zipOutput = path.join(workingDir, version + '.zip');
var outputStream = fs.createWriteStream(zipOutput);

archiver.on('error', function (err) {
    throw err;
});

outputStream.on('close', function () {
    console.log(archiver.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
});
archiver.pipe(outputStream);
archiver.file(path.join(__dirname, 'package.json'), {name: 'package.json'});

archiver.file(path.join(__dirname, 'start_mongo.js'), {name: 'start_mongo.js'});
archiver.file(path.join(__dirname, 'setup_mongo_users.js'), {name: 'setup_mongo_users.js'});

archiver.directory(path.join(workingDir, 'node_modules'), 'node_modules');
archiver.directory(path.join(workingDir, 'config'), 'config');
archiver.directory(path.join(workingDir, 'mongo/' + dbVersion), 'mongo/' + dbVersion);

archiver.finalize();