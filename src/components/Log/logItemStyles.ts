import styled from 'styled-components';
import { QuestionContainer } from '../CreateQuiz/questionItemStyles';

interface OptionContainerProps {
	userChoice?: boolean;
}

export const Root = styled.div`
	width: 90%;
	padding: 2rem;
	border-radius: 1.4rem;
	font-size: 1.8rem;
	text-transform: uppercase;
	color: ${props => props.theme.colors.secondary};
	display: flex;
	align-items: space-between;
	justify-content: center;
	flex-direction: column;
	flex-wrap: wrap;
`;

export const QContainer = styled(QuestionContainer)`
	cursor: default;
	user-select: none;
`;

export const OptionContainer = styled.div<OptionContainerProps>`
	border-radius: 2.3rem;
	width: 90%;
	padding: 1.2rem;
	color: ${props =>
		props.userChoice
			? props.theme.colors.amethyst
			: props.theme.colors.primary};
`;
