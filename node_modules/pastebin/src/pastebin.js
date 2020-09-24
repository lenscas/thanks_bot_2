var http = require('http');
var qs = require('qs');

var paste = function (key) {
	var self = this;
	var apikey = key;
	
	this.new = function (params, cb) {
		var query = qs.stringify({
		  api_option: 'paste',
		  api_dev_key: apikey,
		  api_paste_code: params.content,
		  api_paste_name: params.title,
		  //public = 0, unlisted = 1, private = 2
		  api_paste_private: params.privacy != null ? params.privacy : 0,
		  api_paste_expire_date: params.expire != null ? params.expire: 'N'
		});

		var req = http.request({
		  host: 'pastebin.com',
		  port: 80,
		  path: '/api/api_post.php',
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': query.length
		  }
		}, function(res) {
		  var data = '';
		  res.on('data', function(chunk) {
			data += chunk;
		  });
		  res.on('end', function() {
		  if (cb != null) {
			if (data.indexOf('http://pastebin.com/', -1))
				cb(data, null);
			else
				cb(null, data);
		  }})
		});

		req.write(query);
		req.end();
	};
};

module.exports = function (apikey) { return new paste(apikey) };

