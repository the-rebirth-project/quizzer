import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			primary: string;
			primaryMedium?: string;
			primaryDark?: string;
			secondary: string;
			secondaryMedium?: string;
			secondaryDark?: string;
			tertiary: string;
			tertiaryMedium?: string;
			tertiaryDark?: string;
			grey: string;
			lightGrey: string;
			mediumGrey: string;
			amethyst: string;
			pinkRed: string;
		};
	}
}
