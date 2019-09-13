import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			primary: string;
			primaryDark: string;
			secondary: string;
			tertiary: string;
			tertiaryDark: string;
			grey: string;
			lightGrey: string;
			mediumGrey: string;
		};
	}
}
