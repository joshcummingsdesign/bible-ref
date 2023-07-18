import {Metadata} from 'next';
import {Content} from '@/components/Content';
import {Footer} from '@/components/Footer';
import {Form} from '@/components/Form';
import {Header} from '@/components/Header';
import {getReferences} from '@/helpers/getReferences';
import styles from './styles.module.scss';

interface Props {
    searchParams?: Record<'query', string>;
}

export const metadata: Metadata = {
    title: 'Home | Bible Ref',
    description: 'A quick Bible reference tool.',
};

export default async function Page({searchParams}: Props) {
    // TODO: Add API key via .env
    // TODO: Handle errors
    // TODO: Fix line number styles
    // TODO: Add loading spinner instead of changing the button text
    // TODO: Support more than just the Book of John
    // TODO: Allow query to choose translation
    const references = searchParams && searchParams.query ? await getReferences(searchParams.query) : null;

    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.wrapper_inner}>
                <main className={styles.main}>
                    <Form className={styles.form} />
                    {references && <Content references={references} />}
                </main>
            </div>
            <Footer />
        </div>
    );
}
