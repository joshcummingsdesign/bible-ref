import {BOOKS, TRANSLATIONS} from '@/lib/utils/constants';

/**
 * Parse the search query.
 *
 * If no translation is passed, the `bibleId` is set to KJV.
 */
export const parseSearchQuery = (query: string): {encodedQuery?: string; bibleId?: string} => {
    const parts = query.split(',');
    const matches = parts[0].match(/^([0-9])?\s*([a-zA-Z]+)\.?\s*([0-9]+:?[0-9]*-?[0-9]*:?[0-9]*-*[0-9]*)$/);
    let encodedQuery = undefined;

    if (matches && matches.length >= 3) {
        let book = `${matches[1] || ''}${matches[2]}`.toUpperCase();
        book = BOOKS[book as keyof typeof BOOKS];
        encodedQuery = book ? encodeURI(`${book} ${matches[3]}`) : undefined;
    }

    return {
        encodedQuery,
        bibleId: parts[1] ? TRANSLATIONS[parts[1].trim() as keyof typeof TRANSLATIONS] : TRANSLATIONS.KJV,
    };
};
