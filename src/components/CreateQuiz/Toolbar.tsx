import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editMode, deleteMode } from '../../actions';
import { RootState } from '../../types';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Root, ToolContainer, EditTool, DeleteTool } from './toolbarStyles';

export const Toolbar: React.FC = () => {
	const dispatch = useDispatch();
	const toolbarSt = useSelector((state: RootState) => state.toolbar);
	const { editModeState, deleteModeState } = toolbarSt;
	const onEditClick = (): void => {
		// turn off edit mode if the user clicks on the edit tool again to disable it
		if (editModeState) {
			dispatch(editMode('OFF'));
		} else {
			dispatch(editMode('ON'));
		}
	};

	const onDeleteClick = (): void => {
		if (deleteModeState) {
			dispatch(deleteMode('OFF'));
		} else {
			dispatch(deleteMode('ON'));
		}
	};

	return (
		<Root>
			<ToolContainer onClick={onEditClick}>
				<EditTool modeOn={editModeState} icon={faEdit} />
			</ToolContainer>
			<ToolContainer onClick={onDeleteClick}>
				<DeleteTool modeOn={deleteModeState} icon={faTrashAlt}></DeleteTool>
			</ToolContainer>
		</Root>
	);
};
