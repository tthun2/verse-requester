#!/usr/bin/env node

/*
Get arguments
Note: 
args[0] is the program name
args[1] is the script path
Hence, args[2] is the first value
*/
const args = process.argv;

//console.log("(Book chapter:verse) " + args[2] + " " + chap + ":" + vers);

const fs = require('fs');

let rawdata = fs.readFileSync('asv.json');
let asv = JSON.parse(rawdata);

var found = false;

asv.verses.every(element => {
    if (element.book_name == args[2] &&
        element.chapter == chap &&
        element.verse == vers) {
        console.log(args[2] + " " + chap + ":" + vers + " - " + element.text);
        found = true;
    }
});

if (!found) {
    console.log(args[2] + " " + chap + ":" + vers + ' cannot be found. Please check your spelling and try again.')
}



