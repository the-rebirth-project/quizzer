import React from 'react';
import { Routes } from './Routes';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { useSelector } from 'react-redux';
import { RootState } from '../types';

const Background = styled(animated.div)`
	--primary-rgb-color: 38, 188, 99; /* rgb version of our primary green color */
	--secondary-rgb-color: 242, 243, 229;
	height: 100vh;
`;

export const App: React.FC = () => {
	// using both location.pathname and the started boolean in order to determine if we should flip the background. maybe there's a better solution?
	const { location } = useSelector((state: RootState) => state.router);
	const started = useSelector((state: RootState) => state.menu.started);

	// animates when the Question component renders
	const animProps = useSpring({
		from: {
			backgroundImage:
				'linear-gradient(120deg, #2ac46a 0%, #2ac46a 50%, #fafbed 50%)'
		},
		to: {
			backgroundImage:
				location.pathname.includes('/start/q/') && started
					? 'linear-gradient(180deg, #2ac46a 0%, #2ac46a 50%, #fafbed 50%)'
					: 'linear-gradient(120deg, #2ac46a 0%, #2ac46a 50%, #fafbed 50%)'
		}
	});

	return (
		<Background style={animProps}>
			<Routes />
		</Background>
	);
};
