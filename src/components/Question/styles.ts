import styled, { keyframes } from 'styled-components';
import { animated } from 'react-spring';

// kind of a hacky way of doing it but nevertheless this workaround anim is to ensure that our div here gets "hidden" until the background flip animation is finished
// FIXME: FIND A CLEANER SOLUTION

const delayAppearTop = keyframes`
  from {
    background-color: rgba(38, 188, 99, 0);
    box-shadow: 0.4rem 0.5rem 0.6rem rgba(38, 188, 99, 0);
    border-bottom: 2px solid #202020;
  }

  to {
    background-color: rgba(38, 188, 99, 1);
    border-bottom: 2px solid #202020;
  }
`;

const delayAppearBottom = keyframes`
  from {
    background-color: rgba(242, 243, 229, 0);
  }

  to {
    background-color: rgba(242, 243, 229, 1);
  }
`;

export const Root = styled(animated.div)`
	height: 100vh;
	width: 100vw;
	position: absolute;
	top: 0;
	left: 0;
`;

export const QuestionWrapper = styled.div`
	position: relative;
	z-index: 10;
	background-color: ${props => props.theme.colors.primary};
	color: ${props => props.theme.colors.secondary};
	height: 50vh;
	width: 100vw;
	animation: ${delayAppearTop} 7s;
	box-shadow: 0rem 0.4rem 0.6rem rgba(38, 188, 99, 0.3);
	padding: 0rem 2rem;
	font-size: 5rem;
	font-weight: 300;
	text-transform: uppercase;
	display: flex;
	align-items: center;
	border-bottom: 2px solid #202020;
`;

export const OptionsWrapper = styled.div`
	position: relative;
	background-color: ${props => props.theme.colors.secondary};
	height: 50vh;
	width: 100vw;
	animation: ${delayAppearBottom} 7s;
`;
