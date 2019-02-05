const fs = require('fs');

exports.functions = {
	shorten: (big_url, records) => {
		return new Promise((resolve, reject) => {
			if (big_url in records) {
				resolve(records[big_url]);
			}

			records[big_url] = Object.keys(records).length + 1;
			resolve(records[big_url]);
		});
	},
	read_file: () => {
		return new Promise((resolve, reject) => {
			fs.readFile('records.json', function(error, data) {
				resolve(data);
			});
		});
	},
	write_file: (data) => {
		return new Promise((resolve, reject) => {
			fs.writeFile('records.json', data, function(error) {
			    if(error) {
			        return console.log(error);
			    }
			    console.log("Records were saved!");
			    resolve(1);
			});
		});
	},
	find_url: (value, records) => {
		return new Promise((resolve, reject) => {
			for (key in records) {
				if (records[key] == value) {
					resolve(key);
				}
			}
			resolve(1);
		});
	}
}