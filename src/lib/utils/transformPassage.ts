import {parseBookId} from '@/lib/utils/parseBookId';

/**
 * Add chapter headings and filter out unwanted characters.
 */
export const transformPassage = (chapterIds: string[], content: string): string => {
    let index = 0;
    let prevNum = parseBookId(chapterIds[0])!.chapter;
    const sep = '<p class="p"><span data-number="';

    const transformedContent = content
        .split(sep)
        .slice(1)
        .reduce((acc, val, i) => {
            const matches = val.match(/data-sid="[0-9]?[A-Z]*\s([0-9]*)/);
            const num = matches && matches.length > 1 ? Number(matches[1]) : prevNum;

            if (i === 0) {
                const book = parseBookId(chapterIds[index])!;
                const text = `<h3>${book.title} ${book.chapter}</h3>${sep}${val}`;
                index++;
                return text;
            }

            if (num !== prevNum) {
                const book = parseBookId(chapterIds[index])!;
                const text = `${acc}<h3>${book.title} ${book.chapter}</h3>${sep}${val}`;
                index++;
                prevNum = num;
                return text;
            }

            return `${acc}${sep}${val}`;
        }, '');

    return transformedContent
        .replaceAll(/<span data-number="1"[^>]*>1<\/span>/g, '')
        .replaceAll('¶', '')
        .replaceAll(/(?<=[0-9]+)<\/span>\s/g, '</span>');
};
