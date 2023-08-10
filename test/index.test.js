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
        }
    ].forEach(({ args, expected }) => {
        expect(verseRequester(args)).equal(expected)
    })
});