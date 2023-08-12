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