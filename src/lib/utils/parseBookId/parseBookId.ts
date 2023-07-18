import {Book} from '@/lib/types';
import {BOOKS} from '@/lib/utils/constants';

/**
 * Parse the book title and chapter from the book ID.
 */
export const parseBookId = (bookId: string): Book | null => {
    const matches = bookId.match(/([0-9A-Z]*)\.?([0-9]*)?/);
    const title = matches ? BOOKS[matches[1] as keyof typeof BOOKS] : undefined;

    // Bail if it's an invalid title
    if (!title) return null;

    const chapter = matches && matches[2] ? Number(matches[2]) : undefined;

    return {title, chapter};
};
