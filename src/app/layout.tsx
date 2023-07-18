import {combineClassNames as css} from '@/helpers/combineClassNames';
import {DM_Serif_Display, Red_Hat_Display} from 'next/font/google';
import './global.scss';

const fontHeading = DM_Serif_Display({
    variable: '--font-heading',
    weight: ['400'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
});

const fontMain = Red_Hat_Display({
    variable: '--font-main',
    weight: ['400', '700'],
    style: ['normal'],
    subsets: ['latin'],
});

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body className={css(fontHeading.variable, fontMain.variable)}>{children}</body>
        </html>
    );
}
