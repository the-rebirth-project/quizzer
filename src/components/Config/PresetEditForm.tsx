import React from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'react-final-form';
import { changePresetName } from '../../actions';
import { EditField } from './editFormStyles';

interface PresetEditFormProps {
	setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
	initialPresetName: string;
	presetId: string;
}

export const PresetEditForm: React.FC<PresetEditFormProps> = ({
	initialPresetName,
	setFormOpen,
	presetId
}) => {
	interface FormValues {
		presetName: string;
	}

	const dispatch = useDispatch();
	const initialValues: FormValues = {
		presetName: initialPresetName
	};

	const onFormSubmit = (values: FormValues): void => {
		dispatch(
			changePresetName({
				id: presetId,
				newName: values.presetName
			})
		);
		setFormOpen(false);
	};

	return (
		<Form
			initialValues={initialValues}
			onSubmit={onFormSubmit}
			render={({ handleSubmit, form, submitting, values }) => (
				<form onSubmit={handleSubmit} style={{ width: '90%' }}>
					<EditField
						name="presetName"
						component="input"
						type="text"
						autoFocus
						maxLength={25}
						required
					/>
				</form>
			)}
		/>
	);
};
