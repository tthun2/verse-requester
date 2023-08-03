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
var goodToGo = true;

if (args[2] == undefined || args[3] == undefined) { //Book name or chapter:verse arguments are not entered
    goodToGo = inputNotComplete();
} else if (args[2] == 1 || args[2] == 2 || args[2] == 3) { //In case of books with 1, 2 or 3 in front of the book name. E.g. 1 Corinthians
    if (args[3] == undefined || args[4] == undefined) {
        goodToGo = inputNotComplete();
    } else {
        targetBook = args[2] + ' ' + args[3];
        chapter_and_verse = args[4].split(":"); //Split chapter and verse by the :
    }
} else if (
    args[2].toLowerCase() == 'song' && args[3].toLowerCase() == 'of' && args[4].toLowerCase() == 'songs' ||
    args[2].toLowerCase() == 'song' && args[3].toLowerCase() == 'of' && args[4].toLowerCase() == 'solomon' || //Song of Songs is also known as Song of Solomon
    args[4] != undefined && 'Song of Solomon'.toLowerCase().includes(args[2].toLowerCase() + ' ' + args[3].toLowerCase() + ' ' + args[4].toLowerCase()) || //Check shorthand like Song of Sol
    args[4] != undefined && 'Song of Songs'.toLowerCase().includes(args[2].toLowerCase() + ' ' + args[3].toLowerCase() + ' ' + args[4].toLowerCase())) {  //Check shorthand like Song of S

    targetBook = 'Song of Solomon';
    chapter_and_verse = args[5].split(":"); //Split chapter and verse by the :

} else if (args[2].toLowerCase() == 's.s.') {
    targetBook = 'Song of Solomon';
    chapter_and_verse = args[3].split(":"); //Split chapter and verse by the :
} else {
    targetBook = args[2];
    chapter_and_verse = args[3].split(":"); //Split chapter and verse by the :
}

if (goodToGo && chapter_and_verse[1] == undefined || //This is to check if a verse is entered. Maybe only the chapter is entered.
    goodToGo && chapter_and_verse[1] == '') {
    goodToGo = inputNotComplete();
}

if (goodToGo) {
    targetChapter = chapter_and_verse[0];
    targetVerse = chapter_and_verse[1];

    const fs = require('fs');

    let rawdata = fs.readFileSync('bin\\asv.json');
    let asv = JSON.parse(rawdata);

    var found = false;

    for (i = 0; i < asv.verses.length; i++) {
        if (checkBookName(asv.verses[i].book_name, targetBook) &&
            asv.verses[i].chapter == targetChapter &&
            asv.verses[i].verse == targetVerse) {
            console.log(asv.verses[i].book_name + " " + targetChapter + ":" + targetVerse + " - " + asv.verses[i].text);
            found = true;
            break;
        }
    }

    if (!found) {
        console.log(targetBook + " " + targetChapter + ":" + targetVerse + ' cannot be found. Please check the reference and try again.')
    }
}

//Check if the name of the book is correctly entered
//It also accepts shorthand (minimum 3 characters)
function checkBookName(sourceBook, targetBook) {
    if (sourceBook.toLowerCase() == targetBook.toLowerCase()) {
        return true;
    } else if (targetBook.length >= 3 && sourceBook.toLowerCase().includes(targetBook.toLowerCase())) {
        return true;
    } else {
        return false;
    }
}

function inputNotComplete() {
    console.log('Please enter a book name, chapter and verse. E.g. Matthew 1:1');
    return false;
}

    //console.log(asv.verses[0]); //This is Genesis 1:1
    //console.log(asv.verses[23145]); //This is Matthew 1:1
