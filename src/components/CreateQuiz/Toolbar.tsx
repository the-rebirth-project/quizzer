import React from 'react';
import { useDispatch } from 'react-redux';
import { editMode } from '../../actions';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Root, ToolContainer, EditTool } from './toolbarStyles';

export const Toolbar: React.FC = () => {
	const dispatch = useDispatch();
	const onEditClick = (): void => {
		dispatch(editMode('ON'));
	};

	return (
		<Root>
			<ToolContainer onClick={onEditClick}>
				<EditTool icon={faEdit} />
			</ToolContainer>
		</Root>
	);
};
