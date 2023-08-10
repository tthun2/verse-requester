#!/usr/bin/env node

const {verseRequester} = require('../src/verse-requester.js');
/*
Get arguments
Note: 
args[0] is the program name
args[1] is the script path
Hence, args[2] is the first value
*/

const args = process.argv;

verseRequester(args);

//console.log(asv.verses[0]); //This is Genesis 1:1
//console.log(asv.verses[23145]); //This is Matthew 1:1
