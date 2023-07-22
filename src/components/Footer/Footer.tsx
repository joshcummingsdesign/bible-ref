import {Fragment} from 'react';
import styles from './styles.module.scss';

interface Props {
    copyright?: string | null;
}

export const Footer = ({copyright}: Props) => (
    <footer className={styles.footer}>
        <div className={styles.footer_inner}>
            <p className={styles.footer_text}>
                {copyright ? (
                    <Fragment>{copyright}</Fragment>
                ) : (
                    <Fragment>&copy; {new Date().getFullYear()} Bible Notes</Fragment>
                )}
            </p>
        </div>
    </footer>
);
