#!/usr/bin/env node

/*
Get arguments
Note: 
args[0] is the program name
args[1] is the script path
Hence, args[2] is the first value
*/
const args = process.argv;

var targetBook;
var chapter_and_verse;
var targetChapter;
var targetVerse;

//In case of books with 1, 2 or 3 in front of the book name. E.g. 1 Corinthians
if (args[2] == 1 || args[2] == 2 || args[2] == 3){
    targetBook = args[2] + ' ' + args[3];
    chapter_and_verse = args[4].split(":"); //split chapter and verse by the :
} else {
    targetBook = args[2];
    chapter_and_verse = args[3].split(":"); //split chapter and verse by the :
}

targetChapter = chapter_and_verse[0];
targetVerse = chapter_and_verse[1];

const fs = require('fs');

let rawdata = fs.readFileSync('asv.json');
let asv = JSON.parse(rawdata);

var found = false;

for (i = 0; i < asv.verses.length; i++){
    if (checkBookName(asv.verses[i].book_name, targetBook) &&
        asv.verses[i].chapter == targetChapter &&
        asv.verses[i].verse == targetVerse) {
        console.log(asv.verses[i].book_name + " " + targetChapter + ":" + targetVerse + " - " + asv.verses[i].text);
        found = true;
        break;
    }
}

if (!found) {
    console.log(targetBook + " " + targetChapter + ":" + targetVerse + ' cannot be found. Please check your spelling and try again.')
}

//Check if the name of the book is correctly entered
//It also accepts shorthand (minimum 3 characters)
function checkBookName(sourceBook, targetBook){
    if (sourceBook == targetBook){
        return true;
    } else if (targetBook.length >= 3 && sourceBook.includes(targetBook)) {
        return true;
    } else {
        return false;
    }
}

//console.log(asv.verses[0]); //This is Genesis 1:1
//console.log(asv.verses[23145]); //This is Matthew 1:1

