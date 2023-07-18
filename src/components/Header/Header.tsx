import Link from 'next/link';
import styles from './styles.module.scss';

export const Header = () => (
    <header className={styles.header}>
        <div className={styles.header_inner}>
            <Link className={styles.brand} href="/">
                Bible Ref
            </Link>
        </div>
    </header>
);
