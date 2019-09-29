import styled, { createGlobalStyle } from 'styled-components';
import { Title } from '../Menu/styles';

export const GlobalStyle = createGlobalStyle`
	body {
		overflow-y: scroll;
	}

	::-webkit-scrollbar {
		width: 0 !important;
	}
`;

export const GreyBG = styled.div`
	height: 100vh;
	width: 100vw;
	background-color: #2ac46a;
`;

export const Root = styled.div`
	position: relative;
	height: 100vh;
	width: 100vw;
	display: flex;
`;

export const TitleContainer = styled.div`
	height: 100vh;
	position: fixed;
	left: 0;
	top: 0;
	background-color: ${props => props.theme.colors.primary};
	display: flex;
	align-items: center;
	justify-content: center;
	justify-self: flex-start;
`;

/* The parent flex container (Root) is behaving a bit weird here. had to resort to using margins*/
export const CreateTitle = styled(Title)`
	align-self: center;
	margin-bottom: 9rem;
	letter-spacing: 15px;
	margin-left: 1rem;
	padding: 1rem 0rem;
	font-size: 8rem;
	margin-right: auto;
`;

export const ConfigContainer = styled.div`
	font-size: 3rem;
	box-shadow: -5px 0px 6px rgba(46, 46, 46, 0.2);
	color: ${props => props.theme.colors.secondary};
	background-color: ${props => props.theme.colors.grey};
	height: 100vh;
	width: 69vw;
	position: absolute;
	top: 0;
	right: 0;
	display: flex;
	justify-content: center;
	overflow-y: scroll;
`;
