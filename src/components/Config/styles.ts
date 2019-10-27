import styled from 'styled-components';
import { Title } from '../Menu/styles';

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
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 30vw;
	height: 100vh;
`;

// RightContainer will contain the respective scores
export const RightContainer = styled.div`
	::-webkit-scrollbar {
		width: 0 !important;
	}

	display: flex;
	width: 70vw;
	height: 100vh;
	align-items: flex-start;
	flex-direction: column;
	padding: 3rem 0rem;
	padding-left: 4rem;
	overflow-y: scroll;
`;

export const ConfigTitle = styled(Title)`
	letter-spacing: 0.9rem;
	font-size: 8rem;
`;

export const SectionHeading = styled.h2`
	text-transform: uppercase;
	color: ${props => props.theme.colors.grey};
	font-size: 7rem;
	font-weight: 300;
	margin-bottom: 2.3rem;
	padding-bottom: 0.5rem;
	border-bottom: 0.5rem solid ${props => props.theme.colors.primary};
`;

export const SectionContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;
