import {expect, test} from '@jest/globals';
import {parseSearchQuery} from './parseSearchQuery';

test('should parse the search query', () => {
    expect(parseSearchQuery('Matt 1')).toEqual({
        encodedQuery: 'Matthew%201',
        bibleId: 'de4e12af7f28f599-01',
        bibleName: 'KJV',
    });

    expect(parseSearchQuery('Gen 1:4')).toEqual({
        encodedQuery: 'Genesis%201:4',
        bibleId: 'de4e12af7f28f599-01',
        bibleName: 'KJV',
    });

    expect(parseSearchQuery('Judg. 4:7, ASV')).toEqual({
        encodedQuery: 'Judges%204:7',
        bibleId: '06125adad2d5898a-01',
        bibleName: 'ASV',
    });

    expect(parseSearchQuery('John 3:16, LSV')).toEqual({
        encodedQuery: 'John%203:16',
        bibleId: '01b29f4b342acc35-01',
        bibleName: 'LSV',
    });

    expect(parseSearchQuery('Ex. 12:1, KJV')).toEqual({
        encodedQuery: 'Exodus%2012:1',
        bibleId: 'de4e12af7f28f599-01',
        bibleName: 'KJV',
    });

    expect(parseSearchQuery('1 Pet. 1:1-2:1-3')).toEqual({
        encodedQuery: '1%20Peter%201:1-2:1-3',
        bibleId: 'de4e12af7f28f599-01',
        bibleName: 'KJV',
    });

    expect(parseSearchQuery('ps 3, bsb')).toEqual({
        encodedQuery: 'Psalms%203',
        bibleId: 'bba9f40183526463-01',
        bibleName: 'BSB',
    });

    expect(parseSearchQuery('acts 3, bssb')).toEqual({
        encodedQuery: 'Acts%203',
    });
});
