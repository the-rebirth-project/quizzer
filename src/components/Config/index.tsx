import React from 'react';
import { Link } from 'react-router-dom';
import { useTransition } from 'react-spring';
import { useSelector } from 'react-redux';
import { MiniPresets } from './MiniPresets';
import { RootState } from '../../types';
import {
	Root,
	LeftContainer,
	RightContainer,
	ConfigTitle,
	SectionHeading
} from './styles';

export const Config: React.FC = () => {
	const { location } = useSelector((state: RootState) => state.router);
	const shouldTransition = location.pathname.includes('configure') ? 1 : 0;
	const transitions = useTransition(shouldTransition, p => p, {
		from: { transform: 'translate(100%,0)' },
		enter: { transform: 'translate(0%,0)' },
		leave: { transform: 'translate(-50%,0)' }
	});

	return (
		<>
			{transitions.map(({ key, props }) => (
				<Root key={key} style={props}>
					<LeftContainer>
						<Link to="/">Home</Link>
						<ConfigTitle>Config</ConfigTitle>
					</LeftContainer>

					<RightContainer>
						<SectionHeading>Select Preset</SectionHeading>
						<MiniPresets />
					</RightContainer>
				</Root>
			))}
		</>
	);
};
