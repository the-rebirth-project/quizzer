import styled, { css } from 'styled-components';
import { Title } from '../Menu/styles';

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
		#2ac46a 50%,
		#fcfcf3 50%
	);
`;

export const LeftContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50vw;
	height: 100vh;
`;

// RightContainer will contain the respective scores
export const RightContainer = styled.div`
	display: flex;
	width: 50vw;
	height: 100vh;
	justify-content: space-around;
	align-items: center;
	flex-direction: column;
	padding: 3rem 0rem;
`;

export const ScoreboardTitle = styled(Title)`
	font-size: 7rem;
`;

export const Score = styled.div<ScoreProps>`
	font-size: 8rem;
	text-transform: uppercase;
	${props => {
		if (props.first) {
			return css`
				color: #6e00fe;
			`;
		} else if (!props.first && !props.last) {
			return css`
				color: ${props => props.theme.colors.grey};
			`;
		} else {
			return css`
				color: #f10b4a;
			`;
		}
	}}
`;
