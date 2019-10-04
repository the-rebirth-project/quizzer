import styled from 'styled-components';
import { Button } from '../Menu/styles';

export const Root = styled.div`
	width: 90%;
	height: fit-content;
	color: ${props => props.theme.colors.grey};
	padding: 2rem;
	z-index: 100;
	display: flex;
	flex-direction: column;
`;

export const CreateButton = styled(Button)`
	font-size: 1.5rem;
	font-family: inherit;
	text-transform: uppercase;
	padding: 1rem 0.5rem;
`;

export const ButtonContainer = styled.div`
	width: 44rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 3rem;
`;
