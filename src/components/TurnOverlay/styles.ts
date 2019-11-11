import styled from 'styled-components';

export const Root = styled.div`
	background-color: ${props => props.theme.colors.amethyst};
	color: ${props => props.theme.colors.secondary};
	font-size: 10rem;
	font-weight: 300;
	letter-spacing: 3rem;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100vh;
`;

export const PlayerTurnText = styled.span`
	font-weight: 700;
	font-size: 7rem;
`;
