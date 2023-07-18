import {expect, test} from '@jest/globals';
import {parseSearchQuery} from './parseSearchQuery';

test('should parse the search query', () => {
    expect(parseSearchQuery('Matt 1')).toEqual({
        encodedQuery: 'Matthew%201',
        bibleId: 'de4e12af7f28f599-01',
    });

    expect(parseSearchQuery('Gen 1:4')).toEqual({
        encodedQuery: 'Genesis%201:4',
        bibleId: 'de4e12af7f28f599-01',
    });

    expect(parseSearchQuery('Judg. 4:7, ASV')).toEqual({
        encodedQuery: 'Judges%204:7',
        bibleId: '06125adad2d5898a-01',
    });

    expect(parseSearchQuery('John 3:16, LSV')).toEqual({
        encodedQuery: 'John%203:16',
        bibleId: '01b29f4b342acc35-01',
    });

    expect(parseSearchQuery('Ex. 12:1, KJV')).toEqual({
        encodedQuery: 'Exodus%2012:1',
        bibleId: 'de4e12af7f28f599-01',
    });

    expect(parseSearchQuery('1 Pet. 1:1-2:1-3')).toEqual({
        encodedQuery: '1%20Peter%201:1-2:1-3',
        bibleId: 'de4e12af7f28f599-01',
    });
});
