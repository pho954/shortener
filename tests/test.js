const http = require('http');
const formidable = require('formidable');
const url = require('url');
const misc = require('../misc');

console.log("Let's Test");

async function test_shorten() {
    var empty_records = {};
    var records = await misc.functions.read_file('./tests/data/records.json');
    records = JSON.parse(records);

    var result1 = await misc.functions.shorten("http://test.com", empty_records)
    var result2 = await misc.functions.shorten("", empty_records)
    var result3 = await misc.functions.shorten("", records)
    var result4 = await misc.functions.shorten("https://google.com", records)

    var pass = 0;
    var fail = 0;
    var errors = "";

    if(result1 == 1)
    	pass++;
    else {
    	fail++;
    	errors = errors + "Error on valid entry and empty records, " + result1 + " == 1 \n";
    }

    if(result2 == "")
    	pass++;
    else {
    	fail++;
    	errors = errors + "Error on invalid entry and empty records, " + result2 + " == \"\" \n";
    }

    if(result3 == "")
    	pass++;
    else {
    	fail++;
    	errors = errors + "Error on invalid entry and existing records, " + result3 + " == \"\" \n";
    }

    if(result4 == 2)
    	pass++;
    else {
    	fail++;
    	errors = errors + "Error on valid entry and existing records, " + result2 + " == 2 \n";
    }

    console.log("-------------- Shorten Test: " + pass + " test(s) passed, " + fail + " tests failed--------------");
    console.log("Errors: " + errors)
}

async function test_read_file() {
    var records1 = await misc.functions.read_file('./tests/data/empty_records.json');
    var records2 = await misc.functions.read_file('./tests/data/none.json');
    var records3 = await misc.functions.read_file('./tests/data/records.json');

    var pass = 0;
    var fail = 0;
    var errors = "";

    if(records1 == "")
    	pass++;
    else {
    	fail++;
    	errors = errors + "Error on reading empty records, " + records1 + " == \"\" \n";
    }

    if(records2 == 0)
    	pass++;
    else {
    	fail++;
    	errors = errors + "Error on reading file that doesn't exist, " + records2 + " == 0 \n";
    }

    if(records3.length > 0)
    	pass++;
    else {
    	fail++;
    	errors = errors + "Error on reading valid records, " + records1 + " > 0 \n";
    }

    console.log("-------------- Read File Test: " + pass + " test(s) passed, " + fail + " tests failed--------------");
    console.log("Errors: " + errors)
}

async function test_write_file() {
    var result1 = await misc.functions.write_file('./tests/data/test_write.json');

    var pass = 0;
    var fail = 0;
    var errors = ""

    if(result1 == 1)
    	pass++;
    else {
    	fail++;
    	errors = errors + "Error on writing to existing file, " + result1 + " == 1 \n"
    }

    console.log("-------------- Write File Test: " + pass + " test(s) passed, " + fail + " tests failed--------------");
    console.log("Errors: " + errors)
}

async function test_find_url() {
	var records1 = await misc.functions.read_file('./tests/data/records.json', "{\"https://apple.com\":1}");
	records1 = JSON.parse(records1);
    var result1 = await misc.functions.find_url(4, records1);
    var result2 = await misc.functions.find_url(8, records1);

    var pass = 0;
    var fail = 0;
    var errors = ""

    if(result1 == "http://twitter.com")
    	pass++;
    else {
    	fail++;
    	errors = errors + "Error on finding existing url, " + result1 + " == http://twitter.com \n"
    }

    if(result2 == 0)
    	pass++;
    else {
    	fail++;
    	errors = errors + "Error on finding non-existing url, " + result2 + " == 1 \n"
    }

    console.log("-------------- Find URL Test: " + pass + " test(s) passed, " + fail + " tests failed--------------");
    console.log("Errors: " + errors)
}

test_shorten();
test_read_file();
test_write_file();
test_find_url();

