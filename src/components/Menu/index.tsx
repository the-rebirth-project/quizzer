import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTransition } from 'react-spring';
import { Root, Title, SubText, Left, Right, Button } from './styles';
import { Link } from 'react-router-dom';
import { startQuiz } from '../../actions';
import { RootState } from '../../types';

export const Menu: React.FC = () => {
	const dispatch = useDispatch();
	const { location } = useSelector((state: RootState) => state.router);
	const shouldTransition = location.pathname.includes('create') ? 1 : 0;
	const transitions = useTransition(shouldTransition, p => p, {
		from: { opacity: 0, transform: 'translate(100%,0)' },
		enter: { opacity: 1, transform: 'translate(0%,0)' },
		leave: { opacity: 0, transform: 'translate(-50%,0)' }
		// config: { tension: 60, friction: 9 }
	});

	const onButtonClick = (): void => {
		dispatch(startQuiz());
	};

	return (
		<>
			{transitions.map(({ props, key }) => (
				<Root key={key} style={props}>
					<Left>
						<Title>Trivia Quiz</Title>
						<SubText>An app for designing and participating in quizzes</SubText>
					</Left>

					<Right>
						<Link to="/start/q/0">
							<Button primary onClick={onButtonClick}>
								Think
							</Button>
						</Link>
						<Link to="/create">
							<Button>Create</Button>
						</Link>
						<Button>Rules</Button>
						<Button>About </Button>
					</Right>
				</Root>
			))}
		</>
	);
};
