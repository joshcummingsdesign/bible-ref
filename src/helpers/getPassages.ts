import {Passage} from '@/types';
import {TRANSLATIONS} from '@/helpers/translations';
import {parseBookId} from '@/helpers/parseBookId';
import {BOOKS} from '@/helpers/books';

/**
 * Get passage search query results from the API.
 *
 * Translation defaults to KJV.
 *
 * Query example: `John 1:1, ASV`
 */
export const getPassages = async (query: string): Promise<Passage[] | null> => {
    const {encodedQuery, bibleId} = parseQuery(query);

    // Fail silently
    if (!encodedQuery || !bibleId) return null;

    const res = await fetch(`https://api.scripture.api.bible/v1/bibles/${bibleId}/search?query=${encodedQuery}`, {
        headers: {
            'api-key': process.env.API_DOT_BIBLE_KEY!,
        },
    });

    // Fail silently
    if (!res.ok) return null;

    const json = await res.json();

    // Fail silently
    if (!json.data.passages) return null;

    return json.data.passages.map((passage: Passage) => {
        return {
            ...passage,
            content: transformPassage(passage.chapterIds, passage.content),
        };
    });
};

/**
 * Parse the search query.
 *
 * If no translation is passed, the `bibleId` is set to KJV.
 */
const parseQuery = (query: string): {encodedQuery?: string; bibleId?: string} => {
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

/**
 * Add chapter headings and filter out unwanted characters.
 */
const transformPassage = (chapterIds: string[], content: string): string => {
    let index = 0;
    let last = parseBookId(chapterIds[0])!.chapter;
    const sep = '<p class="p"><span data-number="';

    const transformedContent = content
        .split(sep)
        .slice(1)
        .reduce((acc, val, i) => {
            const matches = val.match(/data-sid="[0-9]?[A-Z]*\s([0-9]*)/);
            const num = matches && matches.length > 1 ? Number(matches[1]) : last;

            if (i === 0) {
                const book = parseBookId(chapterIds[index])!;
                const text = `<h3>${book.title} ${book.chapter}</h3>${sep}${val}`;
                index++;
                return text;
            }

            if (num !== last) {
                const book = parseBookId(chapterIds[index])!;
                const text = `${acc}<h3>${book.title} ${book.chapter}</h3>${sep}${val}`;
                index++;
                last = num;
                return text;
            }

            return `${acc}${sep}${val}`;
        }, '');

    return transformedContent
        .replaceAll(/<span data-number="1"[^>]*>1<\/span>/g, '')
        .replaceAll('¶', '')
        .replaceAll(/(?<=[0-9]+)<\/span>\s/g, '</span>');
};
