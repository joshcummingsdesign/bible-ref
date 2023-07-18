import styles from './styles.module.scss';
import {Reference} from '@/types';
import {getBookFromId} from '@/helpers/getBookFromId';

interface Props {
    references: Reference[];
}

export const Content = ({references}: Props) => (
    <section className={styles.content}>
        {references.map((reference, i) => (
            <div key={reference.id}>
                <h2>{getBookFromId(reference.bookId)!.title}</h2>
                <div key={reference.id} dangerouslySetInnerHTML={{__html: reference.content}} />
            </div>
        ))}
    </section>
);
