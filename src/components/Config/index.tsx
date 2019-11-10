import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import {
	faLongArrowAltLeft,
	faLongArrowAltRight
} from '@fortawesome/free-solid-svg-icons';
import { MiniPresets } from './MiniPresets';
import { Layout } from '../Layout';
import { PlayerCardList } from './PlayerCardList';
import {
	LeftContainer,
	RightContainer,
	MainTitle,
	SectionHeading,
	SectionContainer,
	NavBtnsContainer,
	NavBtn,
	ButtonContainer
} from '../Layout/styles';

interface RouteParams {
	pageNum: string;
}

export const Config: React.FC<RouteComponentProps<RouteParams>> = props => {
	const dispatch = useDispatch();
	const pageNum = parseInt(props.match.params.pageNum);
	const maxPageNum = 2;
	const minPageNum = 1;
	// const sectionTransition = useTransition(pageNum, p => p, {
	// 	initial: { opacity: 0 },
	// 	from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
	// 	enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
	// 	leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' }
	// });

	const goLeft = (): void => {
		pageNum - 1 >= minPageNum
			? dispatch(push(`/configure/${pageNum - 1}`))
			: dispatch(push('/'));
	};

	const goRight = (): void => {
		dispatch(push(`/configure/${pageNum + 1}`));
	};

	return (
		<Layout pageUrl="/configure">
			<LeftContainer>
				<MainTitle>Config</MainTitle>
				<NavBtnsContainer>
					<ButtonContainer onClick={goLeft} left>
						<NavBtn icon={faLongArrowAltLeft} />
					</ButtonContainer>
					{pageNum !== maxPageNum && (
						<ButtonContainer onClick={goRight} right>
							<NavBtn icon={faLongArrowAltRight} />
						</ButtonContainer>
					)}
				</NavBtnsContainer>
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
						<PlayerCardList />
					</SectionContainer>
				)}
			</RightContainer>
		</Layout>
	);
};
