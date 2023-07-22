import {BOOKS, TRANSLATIONS} from '@/lib/utils/constants';

/**
 * Parse the search query.
 *
 * If no translation is passed, the default is set to KJV.
 */
export const parseSearchQuery = (query: string): {encodedQuery?: string; bibleId?: string; bibleName: string} => {
    const parts = query.toUpperCase().split(',');
    const matches = parts[0].match(/^([0-9])?\s*([a-zA-Z]+)\.?\s*([0-9]+:?[0-9]*-?[0-9]*:?[0-9]*-*[0-9]*)$/);
    let encodedQuery = undefined;

    if (matches && matches.length >= 3) {
        let book = `${matches[1] || ''}${matches[2]}`;
        book = BOOKS[book as keyof typeof BOOKS];
        encodedQuery = book ? encodeURI(`${book} ${matches[3]}`) : undefined;
    }

    const bibleName = parts[1] ? parts[1].trim() : 'KJV'; // Default to KJV

    return {
        encodedQuery,
        bibleName,
        bibleId: TRANSLATIONS[bibleName as keyof typeof TRANSLATIONS].id,
    };
};
