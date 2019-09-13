import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

// PROPS INTERFACE DEFINITIONS
interface ButtonProps {
	primary?: boolean;
}

export const Root = styled(animated.div)`
	--primary-rgb-color: 38, 188, 99; /* rgb version of our primary green color */
	height: 100vh;
	padding-left: 6.9rem;
	padding-top: 18.2rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const Left = styled.div`
	display: flex;
	flex-direction: column;
	align-self: flex-start;
	justify-content: flex-start;
	align-items: center;
	text-transform: uppercase;
	color: ${props => props.theme.colors.secondary};
`;

Left.displayName = 'Left'; // For debugging purposes (shows name of component in react dev tools)

export const Title = styled.h1`
	font-size: 10rem;
	font-weight: 300;
	align-self: center;
`;

Title.displayName = 'Title';

export const SubText = styled.h2`
	font-size: 1.5rem;
	margin-top: 0.8rem;
	font-weight: 700;
`;

SubText.displayName = 'SubText';

export const Right = styled.div`
	display: flex;
	flex-direction: column;
	align-self: flex-start;
	align-items: center;
	justify-content: space-between;
	margin-right: 32.6rem;
	margin-top: 3rem;
	text-transform: uppercase;
	font-size: 2.5rem;
	height: 22.7rem;
`;

Right.displayName = 'Right';

export const Button = styled.button<ButtonProps>`
	outline: none;
	cursor: pointer;
	border: none;
	font-size: inherit;
	font-family: inherit;
	padding: 1.3rem 6.5rem;
	background-color: ${props =>
		props.primary ? props.theme.colors.primary : props.theme.colors.secondary};
	${props =>
		props.primary
			? css`
					border: none;
					color: ${props => props.theme.colors.secondary};
			  `
			: css`
					border: 2px solid ${props => props.theme.colors.primary};
					color: ${props => props.theme.colors.primary};
			  `}
	text-transform: uppercase;
	border-radius: 2.5rem;
	box-shadow: 3px 3px 6px rgba(var(--primary-rgb-color), 0.25);
	transition: all 0.3s;

	:hover {
		transform: translateY(-3px);
		box-shadow: 3px 5px 6px rgba(var(--primary-rgb-color), 0.3);
	}

	:active {
		transform: translateY(-1px);
		box-shadow: 3px 2px 6px rgba(var(--primary-rgb-color), 0.2);
	}
`;

Button.displayName = 'Button';
