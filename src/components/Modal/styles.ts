import styled from 'styled-components';

interface RootProps {
	open: boolean;
}

export const Root = styled.div<RootProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	background-color: rgba(0, 0, 0, 0.6);
	visibility: ${props => (props.open ? 'visible' : 'hidden')};
	opacity: ${props => (props.open ? 1 : 0)};
`;

export const Content = styled.div`
	position: relative;
	z-index: 100;
	background-color: ${props => props.theme.colors.secondary};
	min-width: 50%;
	height: 70%;
	padding: 2rem;
	border-radius: 20px;
`;
