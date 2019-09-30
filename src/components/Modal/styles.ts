import styled from 'styled-components';
import { animated } from 'react-spring';

export const Root = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	z-index: 100;
	width: 100vw;
`;

export const Background = styled.div`
	background-color: rgba(0, 0, 0, 0.4);
	height: 100%;
	width: 100%;
	z-index: 101;
	position: absolute;
	top: 0;
	left: 0;
`;

export const Content = styled(animated.div)`
	position: relative;
	z-index: 200;
	background-color: ${props => props.theme.colors.secondary};
	min-width: 50%;
	height: 70%;
	padding: 2rem;
	border-radius: 20px;
`;
