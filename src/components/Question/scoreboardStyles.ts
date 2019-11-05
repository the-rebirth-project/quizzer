import styled, { css } from 'styled-components';
import { Title } from '../MainMenu/styles';

interface ScoreProps {
	first?: boolean;
	last?: boolean;
}

export const Root = styled.div`
	display: flex;
	position: relative;
	z-index: 1000;
	height: 100vh;
	width: 100vw;
	background-image: linear-gradient(
		90deg,
		#2ac46a 0%,
		#2ac46a 30%,
		#fcfcf3 30%
	);
`;

export const LeftContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 30vw;
	height: 100vh;
`;

// RightContainer will contain the respective scores
export const RightContainer = styled.div`
	display: flex;
	width: 70vw;
	height: 100vh;
	justify-content: space-around;
	align-items: flex-start;
	flex-direction: column;
	padding: 3rem 0rem;
	padding-left: 4rem;
`;

export const ScoreboardTitle = styled(Title)`
	letter-spacing: 1rem;
	font-size: 3.4rem;
`;

export const Score = styled.div<ScoreProps>`
	letter-spacing: 0.5rem;
	font-weight: 300;
	font-size: 12rem;
	text-transform: uppercase;
	${props => {
		if (props.first) {
			return css`
				color: ${props => props.theme.colors.amethyst};
			`;
		} else if (!props.first && !props.last) {
			return css`
				color: ${props => props.theme.colors.grey};
			`;
		} else {
			return css`
				color: ${props => props.theme.colors.pinkRed};
			`;
		}
	}}
`;

export const Points = styled.span`
	font-weight: 700;
`;
