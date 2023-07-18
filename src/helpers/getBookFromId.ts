import {Book} from '@/types';

const BOOKS = {
    JHN: 'John',
};

export const getBookFromId = (bookId: string): Book | null => {
    const matches = bookId.match(/([A-Z]*)\.?([0-9]*)?/);

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
