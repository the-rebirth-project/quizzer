import styled from 'styled-components';

export const Root = styled.div``;

export const QuestionContainer = styled.div`
	padding: 0.5rem 1rem;
	border-radius: 15px;
	background-color: ${props => props.theme.colors.secondary};
	color: ${props => props.theme.colors.grey};
	box-shadow: 2px 3.5px 6px rgba(var(--secondary-rgb-color), 0.15);
	position: relative;
	margin: 1rem 0rem;
	font-size: 3rem;
	font-weight: 300;
	text-transform: uppercase;
	cursor: pointer;
`;

export const QuestionNum = styled.span`
	font-size: 3rem;
	font-weight: 700;
	color: ${props => props.theme.colors.primary};
`;
