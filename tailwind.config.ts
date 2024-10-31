import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: '#181818',
				headerBackground: '#f0f0f0',
				headerTextBlack: '#333333',
				navTextBlack: '#2B2B2B',
        navBorder: "#D6D9DC"
			},
		},
	},
	plugins: [],
};
export default config;
