import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTransition } from 'react-spring';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import { startQuiz } from '../../actions';
import { RootState } from '../../types';
import { Root, Title, SubText, Left, Right, Button } from './styles';

export const Menu: React.FC = () => {
	const dispatch = useDispatch();
	const { location } = useSelector((state: RootState) => state.router);
	const shouldTransition = location.pathname.includes('create') ? 1 : 0;
	const transitions = useTransition(shouldTransition, p => p, {
		from: { opacity: 0, transform: 'translate(100%,0)' },
		enter: { opacity: 1, transform: 'translate(0%,0)' },
		leave: { opacity: 0, transform: 'translate(-50%,0)' }
	});

	const onThinkBtnClick = (): void => {
		dispatch(startQuiz());
		dispatch(push('/start/q/0'));
	};

	return (
		<>
			{transitions.map(({ props, key }) => (
				<Root key={key} style={props}>
					<Left>
						<Title>Quizzer</Title>
						<SubText>An app for designing and participating in quizzes</SubText>
					</Left>

					<Right>
						<Button primary onClick={onThinkBtnClick}>
							Think
						</Button>
						<Link to="/create">
							<Button>Create</Button>
						</Link>
						<Link to="/configure">
							<Button>Configure</Button>
						</Link>
						<Button>Explore</Button>
					</Right>
				</Root>
			))}
		</>
	);
};
