import {Reference} from '@/types';
import {getBookFromId} from '@/helpers/getBookFromId';

const TRANSLATIONS = {
    KJV: 'de4e12af7f28f599-01',
};

/**
 * Get search query results from the API.
 */
export const getReferences = async (query: string, translation: string = TRANSLATIONS.KJV): Promise<Reference[]> => {
    const res = await fetch(
        `https://api.scripture.api.bible/v1/bibles/${translation}/search?query=${encodeURI(query)}`,
        {
            headers: {
                'api-key': '',
            },
        }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const json = await res.json();

    return json.data.passages.map((reference: Reference) => {
        return {
            ...reference,
            content: transformReferenceContent(reference.chapterIds, reference.content),
        };
    });
};

/**
 * Add chapter headings and remove paragraph symbols from reference content.
 */
const transformReferenceContent = (chapterIds: string[], content: string): string => {
    let index = 0;
    let last = getBookFromId(chapterIds[0])!.chapter;
    const sep = '<p class="p"><span data-number="';

    const transformedContent = content
        .split(sep)
        .slice(1)
        .reduce((acc, val, i) => {
            const matches = val.match(/data-sid="[A-Z]*\s([0-9]*)/);
            const num = matches && matches.length > 1 ? Number(matches[1]) : last;

            if (i === 0) {
                const book = getBookFromId(chapterIds[index])!;
                const text = `<h3>${book.title} ${book.chapter}</h3>${sep}${val}`;
                index++;
                return text;
            }

            if (num !== last) {
                const book = getBookFromId(chapterIds[index])!;
                const text = `${acc}<h3>${book.title} ${book.chapter}</h3>${sep}${val}`;
                index++;
                last = num;
                return text;
            }

            return `${acc}${sep}${val}`;
        }, '');

    return transformedContent.replaceAll('¶', '');
};
