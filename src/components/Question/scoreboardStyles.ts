import styled from 'styled-components';

export const Root = styled.div`
	position: relative;
	z-index: 1000;
	height: 100vh;
	width: 100vw;
	background-color: ${props => props.theme.colors.grey};
	padding: 3rem 8rem;
`;
