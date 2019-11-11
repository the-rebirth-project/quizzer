import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { push } from 'connected-react-router';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '../../types';
import {
	Root,
	PlayerTurnText,
	PositionedButtonContainer,
	StyledNavBtn
} from './styles';

interface RouteParams {
	playerId: string;
	nextQuestionNum: string;
}

export const TurnOverlay: React.FC<
	RouteComponentProps<RouteParams>
> = props => {
	const dispatch = useDispatch();
	const { playerId, nextQuestionNum } = props.match.params;
	const questions = useSelector((state: RootState) => state.quiz.questions);
	const curPlayer = useSelector(
		(state: RootState) => state.scoreboard.players
	).filter(p => p.id === parseInt(playerId))[0];

	const goToNext = (): void => {
		if (parseInt(nextQuestionNum) >= questions.length) {
			dispatch(push('/log'));
		} else {
			dispatch(push(`/start/q/${nextQuestionNum}`));
		}
	};

	return (
		<Root>
			<PlayerTurnText>{curPlayer.pName}'s turn</PlayerTurnText>
			<PositionedButtonContainer onClick={goToNext} right>
				<StyledNavBtn icon={faLongArrowAltRight} />
			</PositionedButtonContainer>
		</Root>
	);
};
