import {Book} from '@/lib/types';
import {BOOKS} from '@/lib/utils/constants';

/**
 * Parse the book title and chapter from the book ID.
 */
export const parseBookId = (bookId: string): Book | null => {
    const matches = bookId.match(/([0-9A-Z]*)\.?([0-9]*)?/);

    if (matches && matches.length > 2) {
        return {
            title: BOOKS[matches[1] as keyof typeof BOOKS],
            chapter: Number(matches[2]),
        };
    }

    if (matches && matches.length > 1) {
        return {
            title: BOOKS[matches[1] as keyof typeof BOOKS],
            chapter: null,
        };
    }

    return null;
};
