import {expect, test} from '@jest/globals';
import {api} from './api';
import response from './stubs/response.json';
import expected from './stubs/expected.json';

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () =>
            Promise.resolve({
                data: {
                    passages: response,
                },
            }),
    })
) as jest.Mock;

test('should get passages', async () => {
    const passages = await api.getPassages('Gen 1:1');
    expect(passages).toEqual(expected);
});
