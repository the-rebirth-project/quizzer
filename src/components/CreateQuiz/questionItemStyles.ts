import styled from 'styled-components';

export const Root = styled.div`
	padding: 0.5rem;
	border-radius: 15px;
	background-color: ${props => props.theme.colors.secondary};
	color: ${props => props.theme.colors.grey};
	box-shadow: 2px 3.5px 6px rgba(var(--secondary-rgb-color), 0.15);
	position: relative;
	z-index: 1;
	margin: 2rem 0rem;
	font-size: 3rem;
	font-weight: 300;
`;
