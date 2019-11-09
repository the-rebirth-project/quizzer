import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	body {
		overflow-y: scroll;
	}

	::-webkit-scrollbar {
		width: 0 !important;
	}
`;

export const Root = styled.div`
	padding: 4rem 2rem;
	width: 100%;
	overflow-y: scroll;
`;
