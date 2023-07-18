import {expect, test} from '@jest/globals';
import {parseBookId} from './parseBookId';

test('should parse book title and chapter from bookId', () => {
    expect(parseBookId('GEN.1')).toEqual({title: 'Genesis', chapter: 1});
    expect(parseBookId('EXO')).toEqual({title: 'Exodus'});
    expect(parseBookId('NUM.10')).toEqual({title: 'Numbers', chapter: 10});
    expect(parseBookId('FOO.1')).toEqual(null);
    expect(parseBookId('REV.3')).toEqual({title: 'Revelation', chapter: 3});
});
