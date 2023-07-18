import {expect, test} from '@jest/globals';
import {transformPassage} from './transformPassage';
import response from '@/lib/api/stubs/response.json';
import expected from '@/lib/api/stubs/expected.json';

test('should transform a passage', () => {
    expect(transformPassage(response[0].chapterIds, response[0].content)).toEqual(expected[0].content);
});
