import React from 'react';
import { useSelector } from 'react-redux';
import { useTransition } from 'react-spring';
import { RootState } from '../../types';
import { Root } from './styles';

interface LayoutProps {
	pageUrl: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, pageUrl }) => {
	const { location } = useSelector((state: RootState) => state.router);
	const shouldTransition = location.pathname.includes(pageUrl) ? 1 : 0;
	const transitions = useTransition(shouldTransition, p => p, {
		from: { transform: 'translate(100%,0)' },
		enter: { transform: 'translate(0%,0)' },
		leave: { transform: 'translate(-50%,0)' }
	});
	return (
		<>
			{transitions.map(({ key, props }) => (
				<Root key={key} style={props}>
					{children}
				</Root>
			))}
		</>
	);
};
