import {Metadata} from 'next';
import {Content} from '@/components/Content';
import {Footer} from '@/components/Footer';
import {Form} from '@/components/Form';
import {Header} from '@/components/Header';
import {api} from '@/lib/api';
import {parseBookId} from '@/lib/utils/parseBookId';
import styles from './styles.module.scss';

interface Props {
    searchParams?: Record<'search', string>;
}

export default async function Page({searchParams}: Props) {
    const query = searchParams && searchParams.search;
    const passages = query ? await api.getPassages(query) : null;

    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.wrapper_inner}>
                <main className={styles.main}>
                    <Form className={styles.form} initialValue={query} />
                    {query && <Content passages={passages} />}
                </main>
            </div>
            <Footer />
        </div>
    );
}

export async function generateMetadata({searchParams}: Props): Promise<Metadata> {
    const query = searchParams && searchParams.search;
    const passages = query ? await api.getPassages(query) : null;
    const title = passages ? parseBookId(passages[0].bookId)!.title : null;

    return {
        title: `${title || 'Home'} | Bible Ref`,
        description: 'A quick Bible reference tool.',
    };
}
