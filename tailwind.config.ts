import type { Config } from 'tailwindcss';

const config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        colors: {
            current: 'currentColor',
            transparent: 'transparent',
            white: '#f0f2f8',
            primary: '#2B3140',
            // 'primary-content': '#3B92E9',
            'primary-content': '#1998ff',
            secondary: '#314152',
            'secondary-content': '#293745',
            'text-light': '#B2C2CC',
            'text-dark': '#293745',
            accent: '#1FB2A5',
            'accent-content': '#FFFFFF',
            neutral: '#2a323c',
            'base-25': '#778698',
            'base-50': '#2a323c',
            'base-75': '#20272e',
            'base-100': '#1d232a',
            'base-200': '#191e24',
            'base-300': '#15191e',
            'base-content': '#A6ADBB',
            info: '#3abff8',
            success: '#36d399',
            warning: '#fbbd23',
            error: '#f87272',
            'gradient-first': '#34eaa0',
            'gradient-second': '#0fa2e9',
            'white-translucent': 'hsla(0, 0%, 100%, 0.1)'
        },
        extend: {}
    },
    plugins: []
} satisfies Config;

export default config;
