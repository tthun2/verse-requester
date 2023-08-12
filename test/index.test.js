import { expect, test } from 'vitest'
import { verseRequester} from "../src/verse-requester";
test('Should return the correct verse', () => {
    [
        {
            args: ['node', '', 'Genesis', '1:1'],
            expected: 'Genesis 1:1 - In the beginning God created the heavens and the earth.'
        },
        {
            args: ['node', '', 'Genesis', '1:2'],
            expected: 'Genesis 1:2 - And the earth was waste and void; and darkness was upon the face of the deep: and the Spirit of God moved upon the face of the waters.'
        },
        {
            args: ['node', '', 'Matt', '1:1'],
            expected: 'Matthew 1:1 - The book of the generation of Jesus Christ, the son of David, the son of Abraham.'
        },
        {
            args: ['node', '', '1 Cor', '1:1'],
            expected: '1 Corinthians 1:1 - Paul, called [to be] an apostle of Jesus Christ through the will of God, and Sosthenes our brother,'
        },
        {
            args: ['node', '', '3 john', '1:1'],
            expected: '3 John 1:1 - The elder unto Gaius the beloved, whom I love in truth.'
        },
        {
            args: ['node', '', 'song of songs', '1:1'],
            expected: `Song of Solomon 1:1 - The Song of songs, which is Solomon's.`
        }
    ].forEach(({ args, expected }) => {
        expect(verseRequester(args)).equal(expected)
    })
});


test('Wrong verse reference return warning', () => {
    [
        {
            args: ['node', '', 'Ge', '1:1'],
            expected: 'Ge 1:1 cannot be found. Please check the reference and try again.'
        },
        {
            args: ['node', '', 'Genesis', '12111:2'],
            expected: 'Genesis 12111:2 cannot be found. Please check the reference and try again.'
        },
        {
            args: ['node', '', 'Matt', '1:1444'],
            expected: 'Matt 1:1444 cannot be found. Please check the reference and try again.'
        },
        {
            args: ['node', '', 'Rev', '23:1'],
            expected: 'Rev 23:1 cannot be found. Please check the reference and try again.'
        },
        {
            args: ['node', '', 'Matt', '1:1', 'a'],
            expected: 'Matt 1:1 a cannot be found. Please check the reference and try again.'
        }
    ].forEach(({ args, expected }) => {
        expect(verseRequester(args)).equal(expected)
    })
});


test('Not enough arguments', () => {
    [
        {
            args: ['node', ''],
            expected: 'Please enter a book name, chapter and verse. E.g. Matthew 1:1'
        },
        {
            args: ['node', '', 'Genesis'],
            expected: 'Please enter a book name, chapter and verse. E.g. Matthew 1:1'
        },
        {
            args: ['node', '', '1', 'Kings'],
            expected: 'Please enter a book name, chapter and verse. E.g. Matthew 1:1'
        },
        {
            args: ['node', '', '1', 'Kings'],
            expected: 'Please enter a book name, chapter and verse. E.g. Matthew 1:1'
        }
    ].forEach(({ args, expected }) => {
        expect(verseRequester(args)).equal(expected)
    })
});