import styled from 'styled-components';
import { QuestionContainer } from '../CreateQuiz/questionItemStyles';

interface OptionContainerProps {
	userChoice?: boolean;
}

interface ScoreResultProps {
	correctChoice?: boolean;
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
	background-color: ${props => props.theme.colors.grey};
	margin-left: 1rem;
	&:not(:first-child) {
		margin: 4rem 0rem;
		margin-left: 1rem;
	}
`;

export const QContainer = styled(QuestionContainer)`
	cursor: default;
	user-select: none;
	background-color: ${props => props.theme.colors.secondary};
	margin-bottom: 3rem;
`;

export const OptionContainer = styled.div<OptionContainerProps>`
	border-radius: 2.3rem;
	width: 100%;
	padding: 1.2rem;
	background-color: ${props =>
		props.userChoice
			? props.theme.colors.amethyst
			: props.theme.colors.primary};
	color: ${props => props.theme.colors.secondary};
	font-size: 2rem;
	margin: 1rem 0rem;
`;

export const OptionContainerSpan = styled.span`
	font-weight: 700;
`;

export const ScoreResult = styled.span<ScoreResultProps>`
	font-size: 4rem;
	letter-spacing: 1rem;
	font-weight: 300;
	margin-top: 2rem;
	color: ${props =>
		props.correctChoice
			? props.theme.colors.primary
			: props.theme.colors.pinkRed};
`;
