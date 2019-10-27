import React from 'react';
import { useDispatch } from 'react-redux';
import { setPresetId } from '../../actions';
import { QuizPreset } from '../../types';
import { Root, PresetName } from './presetItemStyles';

interface PresetItemProps extends QuizPreset {
	selected: boolean;
}

export const PresetItem: React.FC<PresetItemProps> = props => {
	const dispatch = useDispatch();

	const onPresetClick = (): void => {
		dispatch(setPresetId(props.id));
	};

	return (
		<Root onClick={onPresetClick} selected={props.selected}>
			<PresetName>{props.presetName}</PresetName>
		</Root>
	);
};
