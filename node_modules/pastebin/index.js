var pastebin = require('./src/pastebin')('DEVKEY');

pastebin.new({title: 'test', content: 'kikou42'}, function (err, ret) {
	if (err)
	    console.log(err);
	else
	    console.log(ret);
    });
