import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { Layout } from '../Layout';
import { clearLog } from '../../actions';
import { LogItemList } from './LogItemList';
import {
	MainTitle,
	LeftContainer,
	RightContainer,
	NavBtnsContainer,
	NavBtn,
	ButtonContainer
} from '../Layout/styles';

/**
 * How the Log component should work:
 * - Should have its own set of reducers and actions for logging the user's choices during the quiz
 * - For each question, detail what the user chose, show the correct answer if the user chose incorrectly, 			 and show the points that the user was awarded with or the points that were negated for an incorrect 				 answer.
 * - For Multiplayer mode, detail which question each player attempted, and do the same thing as above.
 */

export const Log: React.FC = () => {
	const dispatch = useDispatch();

	const goToMenu = (): void => {
		dispatch(push('/'));
		dispatch(clearLog());
	};

	return (
		<Layout pageUrl="/log">
			<LeftContainer>
				<MainTitle>Log</MainTitle>
				<NavBtnsContainer>
					<ButtonContainer onClick={goToMenu} left>
						<NavBtn icon={faLongArrowAltLeft} />
					</ButtonContainer>
				</NavBtnsContainer>
			</LeftContainer>

			<RightContainer>
				<LogItemList />
			</RightContainer>
		</Layout>
	);
};
