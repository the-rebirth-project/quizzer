import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface RootProps {
	selected: boolean;
}

export const Root = styled.div<RootProps>`
	width: 90%;
	height: 6rem;
	border-radius: 10px;
	background-color: ${props =>
		props.selected ? props.theme.colors.amethyst : props.theme.colors.grey};
	${props =>
		props.selected
			? css`
					box-shadow: 0rem 0.3rem 0.6rem rgba(var(--amethyst-rgb-color), 0.25);
			  `
			: css`
					box-shadow: 0rem 0.3rem 0.6rem rgba(var(--grey-rgb-color), 0.25);
			  `}
	margin: 2.7rem 0rem;
	padding: 2.6rem 1.4rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
	transition: all 0.2s ease-in-out;

	:hover {
		transform: translateY(-1px);
	}

	:active {
		transform: translateY(0.3px);
	}
`;

export const PresetName = styled.h2`
	color: ${props => props.theme.colors.secondary};
	text-transform: uppercase;
	font-size: 3rem;
	font-weight: 300;
`;

export const EditIcon = styled(FontAwesomeIcon)<{ selected: boolean }>`
	transition: all 0.1s ease-in;
	font-size: 3rem;
	color: ${props =>
		props.selected ? props.theme.colors.secondary : props.theme.colors.grey};

	:hover {
		color: ${props =>
			props.selected ? props.theme.colors.grey : props.theme.colors.amethyst};
	}
`;

export const IconContainer = styled.div`
	display: inline-block;
	width: 3rem;
	height: 3rem;
`;
