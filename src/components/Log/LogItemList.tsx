import React from 'react';
import { useSelector } from 'react-redux';
import { LogItem } from './LogItem';
import { RootState } from '../../types';
import { Root, GlobalStyle } from './logItemListStyles';

export const LogItemList: React.FC = () => {
	const logs = useSelector((state: RootState) => state.log.sessionLog);
	return (
		<>
			<GlobalStyle />
			<Root>
				{logs.map(log => (
					<LogItem log={log} />
				))}
			</Root>
		</>
	);
};
