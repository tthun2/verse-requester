#!/usr/bin/env node

/*
Get arguments
Note: 
args[0] is the program name
args[1] is the script path
Hence, args[2] is the first value
*/
const args = process.argv;
const chapterAndVerse = args[3].split(":"); //split chapter and verse by the :
const chap = chapterAndVerse[0];
const vers = chapterAndVerse[1];

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

console.log(asv.verses[23145]); //This is Matthew 1:1
/*
console.log(asv.verses[
    {
        book_name: 'Genesis',
        book: 1,
        chapter: 4,
        verse: 20,
        text: 'And Adah bare Jabal: he was the father of such as dwell in tents and [have] cattle.'
    }
    ].text);


verses: [
    {
        book_name: 'Genesis',
        book: 1,
        chapter: 3,
        verse: 24,
        text: 'So he drove out the man;...
    }
]

*/