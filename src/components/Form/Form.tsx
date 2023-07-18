'use client';
import {useCallback, useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {Spinner} from '@/components/Spinner';
import {combineClassNames as css} from '@/lib/utils/combineClassNames';
import styles from './styles.module.scss';

interface Props {
    className?: string;
    initialValue?: string;
}

export const Form = ({className, initialValue}: Props) => {
    const router = useRouter();

    const searchParams = useSearchParams();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [changed, setChanged] = useState<boolean>(false);

    const [value, setValue] = useState<string>('');

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setChanged(true);
        setValue(e.target.value);
    }, []);

    const handleFormSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (!value) return;

            // Only submit if the query has changed
            const prevQuery = searchParams.get('search');
            const query = encodeURI(value);

            if (!prevQuery || encodeURI(prevQuery) !== query) {
                setIsLoading(true);
                router.push(`?search=${query}`);
            }
        },
        [searchParams, router, value]
    );

    // Stop loading state, set value from query params
    useEffect(() => {
        setIsLoading(false);

        const query = searchParams.get('search');

        if (query) {
            setValue(query);
        }

        setChanged(true);
    }, [searchParams]);

    return (
        <form className={css(className, styles.form, isLoading && styles.is_loading)} onSubmit={handleFormSubmit}>
            <input
                type="search"
                placeholder="Search the Bible"
                value={!changed && initialValue ? initialValue : value}
                onChange={handleInputChange}
            />
            <div className={styles.submit_wrap}>
                <input type="submit" value="Search" disabled={isLoading} />
                <Spinner className={styles.spinner} />
            </div>
        </form>
    );
};
