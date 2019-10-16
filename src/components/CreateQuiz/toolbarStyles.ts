import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Root = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	background-color: ${props => props.theme.colors.lightGrey};
	width: 30.95vw;
	height: 8%;
	box-shadow: 0 0.5rem 0.6rem rgba(33, 33, 33, 0.1);

	display: flex;
	align-items: center;
	justify-content: space-around;
`;

const Tool = styled(FontAwesomeIcon)`
	font-size: 3rem;
`;

export const ToolContainer = styled.div`
	color: rgba(var(--grey-rgb-color), 0.6);
	height: 3rem;
	width: 3rem;
	cursor: pointer;
	transition: all 0.2s;

	:hover {
		color: rgba(var(--grey-rgb-color), 1);
		transform: translateY(-1px);
	}

	:active {
		transform: translateY(0.5px);
	}
`;

// for better semantics
export const EditTool = styled(Tool)``;
