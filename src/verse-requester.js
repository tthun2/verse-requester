let bible = require('../data/asv.json');

let verseRequester = (args) => {
    let {
        error,
        targetBook,
        targetChapter,
        targetVerse
    } = splitInput(args);

    if (error) {
        console.log("Please enter a book name, chapter and verse. E.g. Matthew 1:1");
        return "Please enter a book name, chapter and verse. E.g. Matthew 1:1";
    } else {
        return getVerseText(targetBook, targetChapter, targetVerse);
    }
}

//Concat all args to become 1 string
//Then split the string into book, chapter and verse
function splitInput(args) {
    let inputString = "";
    let error = false;

    for (let i = 2; i < args.length; i++) {
        inputString += args[i] + " ";
    }

    const temp = inputString.split(":"); //Get verse first
    const temp2 = temp[0].split(" "); //Get book and chapter

    let verse = temp[1];
    let chapter = temp2[temp2.length - 1];
    let book = temp[0].substring(0, temp[0].length - chapter.length);

    if (!book || !chapter || !verse) {
        error = true;
    } else { //everything is defined, so trim any extra spaces
        book = book.trim();
        chapter = chapter.trim();
        verse = verse.trim();
    }

    //console.log(book + " " + chapter + " " + verse);

    return {
        error: error,
        targetBook: book,
        targetChapter: chapter,
        targetVerse: verse
    };
}

function getVerseText(targetBook, targetChapter, targetVerse) {

    let verseObject = bible.verses.find(item => validateBookName(item.book_name, targetBook) && item.chapter.toString() === targetChapter && item.verse.toString() === targetVerse);

    if (verseObject) {
        console.log(`${verseObject.book_name} ${targetChapter}:${targetVerse} - ${verseObject.text}`);
        return (`${verseObject.book_name} ${targetChapter}:${targetVerse} - ${verseObject.text}`);
    } else {
        console.log(`${targetBook} ${targetChapter}:${targetVerse} cannot be found. Please check the reference and try again.`)
        return (`${targetBook} ${targetChapter}:${targetVerse} cannot be found. Please check the reference and try again.`)
    }

}

//Check if the name of the book is correctly entered
//It also accepts shorthand (minimum 3 characters)
function validateBookName(sourceBook, targetBook) {
    if (sourceBook.toLowerCase() === targetBook.toLowerCase()) {
        return true;
    } else if (targetBook.length >= 3 && sourceBook.toLowerCase().includes(targetBook.toLowerCase())) {
        return true;
    } else if (sourceBook.toLowerCase() === "song of solomon" || sourceBook.toLowerCase() === "song of songs") {
        if (targetBook.length >= 3 && "song of songs".includes(targetBook.toLowerCase()) ||
            targetBook.length >= 3 && "song of solomon".includes(targetBook.toLowerCase()) ||
            targetBook.length >= 3 && "s.s.".includes(targetBook.toLowerCase())) {
            return true;
        }
    } else {
        return false;
    }
}

module.exports = { verseRequester };