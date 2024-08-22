import { Lato } from 'next/font/google';

export const lato_init = Lato({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-lato',
    weight: ['100', '300', '400', '700', '900']
});

export const lato = lato_init.variable;