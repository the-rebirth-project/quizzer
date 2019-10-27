import React from 'react';
import { useSelector } from 'react-redux';
import { PresetItem } from './PresetItem';
import { RootState } from '../../types';
import { Root } from './miniPresetsStyles';

export const MiniPresets: React.FC = () => {
	const quizPresets = useSelector((state: RootState) => state.quiz.presets);
	const curPresetId = useSelector((state: RootState) => state.quiz.curPresetId);

	return (
		<Root>
			{quizPresets.map(p => (
				<PresetItem selected={p.id === curPresetId} {...p} />
			))}
		</Root>
	);
};
