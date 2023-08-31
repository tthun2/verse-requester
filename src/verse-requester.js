let bible = require("../data/asv.json");

let verseRequester = (args) => {
  let { error, book, chapter, verse } = parser(args);

  if (error) {
    console.log(
      "Please enter a book name, chapter and verse. E.g. Matthew 1:1",
    );
    return "Please enter a book name, chapter and verse. E.g. Matthew 1:1";
  } else {
    return getVerseText(book, chapter, verse);
  }
};

//Concat all args to become 1 string
//Then split the string into book, chapter and verse
function parser(args) {
  // point-free style
  const [bookChapter, verse] = args
    .slice(2) // remove first 2 elements
    .join(" ") // join all elements into 1 string
    .split(":") // split into 2 parts, the bookChapter and verse
    .map((text) => (text.includes(" ") ? text.split(" ") : text));

  if (!bookChapter || !verse) {
    return {
      error: true,
    };
  }

  // last element of the array is the chapter
  const chapter = bookChapter.pop()?.trim();
  const book = bookChapter.join(" ").trim();

  return {
    error: !book || !chapter || !verse,
    book,
    chapter,
    verse,
  };
}

function getVerseText(targetBook, targetChapter, targetVerse) {
  let verseObject = bible.verses.find(
    (item) =>
      validateBookName(item.book_name, targetBook) &&
      item.chapter.toString() === targetChapter &&
      item.verse.toString() === targetVerse,
  );

  if (verseObject) {
    console.log(
      `${verseObject.book_name} ${targetChapter}:${targetVerse} - ${verseObject.text}`,
    );
    return `${verseObject.book_name} ${targetChapter}:${targetVerse} - ${verseObject.text}`;
  } else {
    console.log(
      `${targetBook} ${targetChapter}:${targetVerse} cannot be found. Please check the reference and try again.`,
    );
    return `${targetBook} ${targetChapter}:${targetVerse} cannot be found. Please check the reference and try again.`;
  }
}

//Check if the name of the book is correctly entered
//It also accepts shorthand (minimum 3 characters)

const SONG_OF_SONGS = ["song of songs", "song of solomon"];
function validateBookName(sourceBook, targetBook) {
  if (sourceBook.toLowerCase() === targetBook.toLowerCase()) {
    return true;
  } else if (
    targetBook.length >= 3 &&
    sourceBook.toLowerCase().includes(targetBook.toLowerCase())
  ) {
    return true;
  } else if (SONG_OF_SONGS.includes(sourceBook.toLowerCase())) {
    // son
    if (
      (targetBook.length >= 3 &&
        "song of songs".includes(targetBook.toLowerCase())) ||
      (targetBook.length >= 3 &&
        "song of solomon".includes(targetBook.toLowerCase())) ||
      (targetBook.length >= 3 && "s.s.".includes(targetBook.toLowerCase()))
    ) {
      return true;
    }
  } else {
    return false;
  }
}

module.exports = { verseRequester };
