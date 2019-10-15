import React from 'react';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Root, EditTool } from './toolbarStyles';

export const Toolbar: React.FC = () => {
	return (
		<Root>
			<EditTool icon={faEdit} />
		</Root>
	);
};
