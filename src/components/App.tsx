import React from 'react';
import { Routes } from './Routes';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { useSelector } from 'react-redux';
import { RootState } from '../types';

const Background = styled(animated.div)`
	height: 100vh;
`;

export const App: React.FC = () => {
	const { location } = useSelector((state: RootState) => state.router);
	// animates when the quiz starts
	const animProps = useSpring({
		from: {
			backgroundImage:
				'linear-gradient(120deg, #2ac46a 0%, #2ac46a 50%, #fafbed 50%)'
		},
		to: {
			backgroundImage: location.pathname.includes('/start/q/')
				? 'linear-gradient(180deg, #2ac46a 0%, #2ac46a 50%, #fafbed 50%)'
				: 'linear-gradient(120deg, #2ac46a 0%, #2ac46a 50%, #fafbed 50%)',
		}
	});

	return (
		<Background style={animProps}>
			<Routes />
		</Background>
	);
};
