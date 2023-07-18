'use client';
import {useCallback, useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {combineClassNames as css} from '@/helpers/combineClassNames';
import styles from './styles.module.scss';

interface Props {
    className?: string;
}

export const Form = ({className}: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [value, setValue] = useState<string>('');

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }, []);

    const handleFormSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (!value) return;

            const prevQuery = searchParams.get('query');
            const query = encodeURI(value);

            if (!prevQuery || encodeURI(prevQuery) !== query) {
                setIsLoading(true);
                router.push(`?query=${query}`);
            }
        },
        [searchParams, router, value]
    );

    useEffect(() => {
        setIsLoading(false);
    }, [searchParams]);

    return (
        <form className={css(className, styles.form)} onSubmit={handleFormSubmit}>
            <input type="search" placeholder="Search the Bible" value={value} onChange={handleInputChange} />
            <input type="submit" value={isLoading ? 'Loading...' : 'Search'} disabled={isLoading} />
        </form>
    );
};
