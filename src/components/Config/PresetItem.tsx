import React, { useState, SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { PresetEditForm } from './PresetEditForm';
import { setPresetId } from '../../actions';
import { QuizPreset } from '../../types';
import { Root, PresetName, IconContainer, EditIcon } from './presetItemStyles';

interface PresetItemProps extends QuizPreset {
	selected: boolean;
}

export const PresetItem: React.FC<PresetItemProps> = props => {
	const dispatch = useDispatch();
	const [formOpen, setFormOpen] = useState(false);

	const onPresetClick = (): void => {
		dispatch(setPresetId(props.id));
	};

	const enableEditForm = (e: SyntheticEvent): void => {
		e.stopPropagation();
		setFormOpen(true);
	};

	return (
		<Root onClick={onPresetClick} selected={props.selected}>
			{formOpen && (
				<PresetEditForm
					presetId={props.id}
					setFormOpen={setFormOpen}
					initialPresetName={props.presetName}
				/>
			)}
			{!formOpen && (
				<>
					<PresetName>{props.presetName}</PresetName>
					<IconContainer onClick={enableEditForm}>
						<EditIcon icon={faEdit} selected={props.selected} />
					</IconContainer>
				</>
			)}
		</Root>
	);
};
