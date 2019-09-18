import styled from 'styled-components';
import { Title } from '../Menu/styles';

export const Root = styled.div`
	position: relative;
	height: 100vh;
	width: 100vw;
	display: flex;
`;

/* The parent flex container (Root) is behaving a bit weird here. had to resort to using margins*/
export const CreateTitle = styled(Title)`
	justify-self: flex-start;
	align-self: center;
	margin-bottom: 9rem;
	letter-spacing: 15px;
	margin-left: 1rem;
	padding: 1rem 0rem;
	font-size: 8rem;
	margin-right: auto;
	/* Give a bg color of a shade of red*/
`;

export const ConfigContainer = styled.div`
	justify-self: flex-end;
	font-size: 3rem;
	box-shadow: -5px 0px 6px rgba(46, 46, 46, 0.2);
	padding: 2rem;
	color: ${props => props.theme.colors.secondary};
	align-self: center;
	background-color: ${props => props.theme.colors.grey};
	overflow-y: scroll;
	height: 100vh;
	width: 75vw;
`;
