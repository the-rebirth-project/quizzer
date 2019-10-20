import styled from 'styled-components';
import { animated } from 'react-spring';

interface StartedProps {
	started: boolean;
}

interface TimerProps {
	completed: boolean;
}

interface FeedbackContainerProps {
	choiceValid: number | undefined;
}

export const Root = styled(animated.div)`
	height: 100vh;
	width: 100vw;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
`;

export const QuestionWrapper = styled.div<StartedProps>`
	position: relative;
	color: ${props => props.theme.colors.secondary};
	height: 50vh;
	width: 100vw;
	padding: 0rem 2rem;
	font-size: 5rem;
	font-weight: 300;
	text-transform: uppercase;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const OptionsWrapper = styled.div<StartedProps>`
	position: relative;
	height: 50vh;
	width: 100vw;
	padding: 4rem 2rem;
	display: flex;
	justify-content: space-around;
	align-items: center;
`;

OptionsWrapper.displayName = 'OptionsWrapper';

export const Option = styled.button`
	position: relative;
	z-index: 5;
	padding: 2rem;
	border-radius: 10px;
	box-shadow: 3px 5px 6px rgba(46, 46, 46, 0.25);
	border: none;
	font-family: inherit;
	outline: none;
	cursor: pointer;
	text-decoration: none;
	font-size: 3rem;
	font-weight: 300;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	height: 95%;
	width: 20%;
	background-color: ${props => props.theme.colors.grey};
	color: ${props => props.theme.colors.secondary};
	transition: all 0.3s;

	:hover {
		transform: translateY(-3px);
		box-shadow: 3.5px 6px 6px rgba(46, 46, 46, 0.3);
	}

	:active {
		transform: translateY(-0.5px);
		box-shadow: 2.5px 4.5px 6px rgba(46, 46, 46, 0.2);
	}
`;

Option.displayName = 'Options';

export const FeedbackContainer = styled(animated.div)<FeedbackContainerProps>`
	/* Have the origin point be centered on the option container */
	position: relative;
	transform: translate(-50%, -50%);
	height: 100vh;
	width: 100vw;
	z-index: 25;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${props =>
		props.choiceValid ? props.theme.colors.primary : '#ff0000'};
	color: ${props => props.theme.colors.secondary};
	font-size: 30rem;
	transform-origin: center;
`;

export const CenterContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 20;
`;

export const Qnum = styled.span`
	display: inline-block;
	font-weight: 700;
`;

export const Timer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 20;
	border-radius: 50%;
	background-color: ${props => props.theme.colors.grey};
	color: ${props => props.theme.colors.secondary};
	padding: 0.8rem;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 6rem;
	height: 6rem;
	font-size: 1.7rem;
`;

Timer.displayName = 'Timer';

export const TimeoutOverlay = styled.div<TimerProps>`
	height: 100vh;
	width: 100vw;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 100;
	background-color: #ff0000;
	transform: ${props => (props.completed ? 'scale(1)' : 'scale(0)')};
	transition: transform 0.3s;
	font-size: 12rem;
	text-transform: uppercase;
	letter-spacing: 5px;
	color: ${props => props.theme.colors.secondary};
`;
