import {Passage} from '@/lib/types';
import {parseBookId} from '@/lib/utils/parseBookId';
import styles from './styles.module.scss';

interface Props {
    passages: Passage[] | null;
}

export const Content = ({passages}: Props) => (
    <section className={styles.content}>
        {passages === null ? (
            <p>No passages found.</p>
        ) : (
            <>
                {passages.map((passage, i) => (
                    <div key={passage.id}>
                        <h2>{parseBookId(passage.bookId)!.title}</h2>
                        <div dangerouslySetInnerHTML={{__html: passage.content}} />
                    </div>
                ))}
            </>
        )}
    </section>
);
