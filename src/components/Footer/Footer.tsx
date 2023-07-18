import styles from './styles.module.scss';

export const Footer = () => (
    <footer className={styles.footer}>
        <div className={styles.footer_inner}>
            <p className={styles.footer_text}>&copy; {new Date().getFullYear()} Bible Notes</p>
        </div>
    </footer>
);
