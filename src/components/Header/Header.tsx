import Link from 'next/link';
import styles from './styles.module.scss';

export const Header = () => (
    <header className={styles.header}>
        <div className={styles.header_inner}>
            <Link data-testid="nav-link" className={styles.link} href="/">
                <h1 data-testid="nav-heading" className={styles.heading}>
                    Bible Ref
                </h1>
            </Link>
        </div>
    </header>
);
