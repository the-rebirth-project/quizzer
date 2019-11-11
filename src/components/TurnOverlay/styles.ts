import styled from 'styled-components';
import { NavBtn, ButtonContainer } from '../Layout/styles';

export const Root = styled.div`
	position: relative;
	background-color: ${props => props.theme.colors.amethyst};
	color: ${props => props.theme.colors.secondary};
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100vw;
	flex-direction: column;
	flex-wrap: wrap;
	text-transform: uppercase;
`;

export const PositionedButtonContainer = styled(ButtonContainer)`
	position: absolute;
	bottom: 1.5%;
	right: 3.5%;
	z-index: 10;
	height: auto;
`;

export const StyledNavBtn = styled(NavBtn)`
	font-size: 6rem;
`;

export const PlayerTurnText = styled.span`
	font-size: 10rem;
	font-weight: 300;
	letter-spacing: 3rem;
`;
