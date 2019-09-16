import styled, { css, keyframes } from 'styled-components';
import { animated } from 'react-spring';

// kind of a hacky way of doing it but nevertheless this workaround anim is to ensure that our div here gets "hidden" until the background flip animation is finished
// FIXME: FIND A CLEANER SOLUTION

interface StartedProps {
	started: boolean;
}

const delayAppearTop = keyframes`
  from {
    background-color: rgba(38, 188, 99, 0);
  }

  to {
    background-color: rgba(38, 188, 99, 0);
  }
`;

const delayAppearBottom = keyframes`
  from {
    background-color: rgba(242, 243, 229, 0);
  }

  to {
    background-color: rgba(242, 243, 229, 0);
  }
`;

export const Root = styled(animated.div)`
	height: 100vh;
	width: 100vw;
	position: absolute;
	top: 0;
	left: 0;
`;

export const QuestionWrapper = styled.div<StartedProps>`
	position: relative;
	z-index: 10;
	background-color: ${props => props.theme.colors.primary};
	color: ${props => props.theme.colors.secondary};
	height: 50vh;
	width: 100vw;
	/* Fix this mess */
	/* ${props =>
		!props.started
			? css`
					animation: ${delayAppearTop} 7s;
			  `
			: ''} */
	animation: ${delayAppearTop} 1s;
	padding: 0rem 2rem;
	font-size: 5rem;
	font-weight: 300;
	text-transform: uppercase;
	display: flex;
	align-items: center;
`;

export const OptionsWrapper = styled.div<StartedProps>`
	position: relative;
	background-color: ${props => props.theme.colors.secondary};
	height: 50vh;
	width: 100vw;
	/* Fix this mess */
	/* ${props =>
		!props.started
			? css`
					animation: ${delayAppearBottom} 7s;
			  `
			: ''} */
	animation: ${delayAppearBottom} 7s;
	padding: 4rem 2rem;
	display: flex;
	justify-content: space-around;
	align-items: center;
`;

OptionsWrapper.displayName = 'OptionsWrapper';

export const Option = styled.button`
	padding: 2rem;
	border-radius: 10px;
	box-shadow: 3px 5px 6px rgba(var(--primary-rgb-color), 0.25);
	border: none;
	font-family: inherit;
	outline: none;
	cursor: pointer;
	text-decoration: none;
	font-size: 3rem;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 95%;
	width: 20%;
	background-color: ${props => props.theme.colors.primary};
	color: ${props => props.theme.colors.secondary};
	transition: all 0.3s;

	:hover {
		transform: translateY(-3px);
		box-shadow: 3.5px 6px 6px rgba(var(--primary-rgb-color), 0.3);
	}

	:active {
		transform: translateY(-0.5px);
		box-shadow: 2.5px 4.5px 6px rgba(var(--primary-rgb-color), 0.2);
	}
`;

Option.displayName = 'Options';
