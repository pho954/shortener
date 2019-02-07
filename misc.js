const fs = require('fs');

//Miscellaneous functions to process urls and read/write from/to the datasource
exports.functions = {
	//Checks if the URL exists.  If it does, it'll return the assigned value.  If not, it'll create a new one and return it.
	shorten: (big_url, records) => {
		return new Promise((resolve, reject) => {
			if (big_url == "")
				resolve("");
			if (big_url in records)
				resolve(records[big_url]);
			else {
				records[big_url] = Object.keys(records).length + 1;
				resolve(records[big_url]);
			}
		});
	},
	//Reads the records.json data as a string
	read_file: (path) => {
		return new Promise((resolve, reject) => {
			fs.readFile(path, function(error, data) {
				if(error) {
			        //console.log(error);
			        resolve(0);
			    }
				resolve(data);
			});
		});
	},
	//Inserts a new record into records.json
	write_file: (path, data) => {
		return new Promise((resolve, reject) => {
			fs.writeFile(path, data, function(error) {
			    if(error) {
			        //console.log(error);
			        resolve(0);
			    }
			    resolve(1);
			});
		});
	},
	//Searches for the URL based on the value to find the shorten URL to redirect to
	find_url: (value, records) => {
		return new Promise((resolve, reject) => {
			for (key in records) {
				if (records[key] == value) {
					resolve(key);
				}
			}
			resolve(0);
		});
	}
}