import styled from 'styled-components';
import { Button } from '../Menu/styles';

export const Root = styled.div`
	height: 100vh;
	width: 100vw;
	background-color: ${props => props.theme.colors.grey};
`;

export const SubmitBtn = styled(Button)`
	font-size: 2.2rem;
	margin-bottom: 3rem;
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);

	:hover {
		transform: translate(-50%, -3px);
	}

	:active {
		transform: translate(-50%, -1px);
	}
`;
