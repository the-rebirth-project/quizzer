import React from 'react';
import { Link } from 'react-router-dom';
import { MiniPresets } from './MiniPresets';
import {
	Root,
	LeftContainer,
	RightContainer,
	ConfigTitle,
	SectionHeading
} from './styles';

export const Config: React.FC = () => {
	return (
		<Root>
			<LeftContainer>
				<Link to="/">Home</Link>
				<ConfigTitle>Config</ConfigTitle>
			</LeftContainer>

			<RightContainer>
				<SectionHeading>Select Preset</SectionHeading>
				<MiniPresets />
			</RightContainer>
		</Root>
	);
};
