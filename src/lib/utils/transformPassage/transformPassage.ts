import {JSDOM} from 'jsdom';
import {parseBookId} from '@/lib/utils/parseBookId';

/**
 * Add chapter headings and filter out unwanted characters.
 */
export const transformPassage = (chapterIds: string[], content: string): string => {
    // Strip content
    const strippedContent = content
        // Remove b tags
        .replaceAll(/<p [^>]*class="b">[^>]*<\/p>/g, '')
        // Remove r tags
        .replaceAll(/<p [^>]*class="r">.*?<\/p>/g, '')
        // Remove paragraph symbols
        .replaceAll('¶', '')
        // Remove space after line numbers
        .replaceAll(/(?<=[0-9]+)<\/span>\s/g, '</span>')
        // Remove space before punctuation
        .replaceAll(/\s(?=[;,?.!])/g, '');

    // Get DOM nodes
    const nodes = new JSDOM(`<!DOCTYPE html>${strippedContent}`).window.document.body.childNodes;
    const paragraphs = Array.from(nodes) as HTMLElement[];

    let index = 0;
    let chapterIndex = 0;
    let quoteIndex = 0;
    let prevChapter: string | null = null;

    return paragraphs
        .reduce((acc: string[], p) => {
            const doc = new JSDOM('<!DOCTYPE html>').window.document;
            const body = doc.body;
            const sid = p.innerHTML && p.innerHTML.match(/data-sid="[0-9]?[A-Z]+\s([0-9]+):[0-9]+"/);
            const chapter = sid && sid.length >= 2 ? sid[1] : prevChapter;

            // Replace q tag numbers with 0 and 1 alternating for poetry indents
            if (p.className.match(/q[0-9]/)) {
                p.className = p.className.replace(/q[0-9]/, `q${quoteIndex % 2}`);
                quoteIndex++;
            } else {
                quoteIndex = 0;
            }

            // Add h3 headings
            if (chapter !== prevChapter) {
                let i = index;
                const book = parseBookId(chapterIds[chapterIndex], true)!;

                if (acc.length >= 2 && acc[index - 2].match(/class="(s[0-9]|d)"/)) {
                    i = index - 2;
                } else if (acc.length >= 1 && acc[index - 1].match(/class="(s[0-9]|d)"/)) {
                    i = index - 1;
                }

                acc.splice(i, 0, `<h3>${book.title} ${book.chapter}</h3>`);
                index++;
                chapterIndex++;
                prevChapter = chapter;
            }

            body.appendChild(p);
            acc.push(body.innerHTML);
            index++;
            return acc;
        }, [])
        .join('');
};
