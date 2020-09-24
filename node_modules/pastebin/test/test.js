var assert = require('assert');
var paste = require('../src/pastebin')('DEVKEY');

describe('Basic Test.', function(){
  it('create a new bin', function(done){
	  paste.new({title: 'test', content: 'Just a little Test.'}, function (err, ret) {
		assert.equal(err, null);
		done()
	});
  });
});
