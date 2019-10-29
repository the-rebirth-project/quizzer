import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { animated } from 'react-spring';
import { push } from 'connected-react-router';
import { useTransition } from 'react-spring';
import { useSelector, useDispatch } from 'react-redux';
import { MiniPresets } from './MiniPresets';
import { RootState } from '../../types';
import {
	Root,
	LeftContainer,
	RightContainer,
	ConfigTitle,
	SectionHeading,
	SectionContainer,
	NavBtnContainer
} from './styles';

interface RouteParams {
	pageNum: string;
}

export const Config: React.FC<RouteComponentProps<RouteParams>> = props => {
	const dispatch = useDispatch();
	const { location } = useSelector((state: RootState) => state.router);
	const pageNum = parseInt(props.match.params.pageNum);
	const maxPageNum = 2;
	const minPageNum = 1;
	const shouldTransition = location.pathname.includes('configure') ? 1 : 0;
	const transitions = useTransition(shouldTransition, p => p, {
		from: { transform: 'translate(100%,0)' },
		enter: { transform: 'translate(0%,0)' },
		leave: { transform: 'translate(-50%,0)' }
	});
	const sectionTransition = useTransition(pageNum, p => p, {
		initial: { opacity: 0 },
		from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
		enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
		leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' }
	});

	const goLeft = (): void => {
		pageNum - 1 >= minPageNum
			? dispatch(push(`/configure/${pageNum - 1}`))
			: dispatch(push('/'));
	};

	const goRight = (): void => {
		dispatch(push(`/configure/${pageNum + 1}`));
	};

	return (
		<>
			{transitions.map(({ key, props }) => (
				<Root key={key} style={props}>
					<LeftContainer>
						<ConfigTitle>Config</ConfigTitle>
						<NavBtnContainer>
							<button onClick={goLeft}>Left</button>
							{pageNum !== maxPageNum && (
								<button onClick={goRight}>Right</button>
							)}
						</NavBtnContainer>
					</LeftContainer>

					<RightContainer>
						{pageNum === 1 && (
							<SectionContainer>
								<SectionHeading>Select Preset</SectionHeading>
								<MiniPresets />
							</SectionContainer>
						)}
						{pageNum === 2 && (
							<SectionContainer>
								<SectionHeading>Select Players</SectionHeading>
								{/* A component called PlayerCards */}
							</SectionContainer>
						)}
					</RightContainer>
				</Root>
			))}
		</>
	);
};
