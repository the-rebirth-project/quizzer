import React from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'react-final-form';
import { changePlayerName } from '../../actions';
import { EditField } from './editFormStyles';

interface PlayerEditFormProps {
	setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
	playerId: number;
	initialPlayerName: string;
}

export const PlayerCardEditForm: React.FC<PlayerEditFormProps> = ({
	setFormOpen,
	initialPlayerName,
	playerId
}) => {
	interface FormValues {
		playerName: string;
	}

	const dispatch = useDispatch();
	const initialValues: FormValues = {
		playerName: initialPlayerName
	};

	const onFormSubmit = (values: FormValues): void => {
		dispatch(
			changePlayerName({
				id: playerId,
				newName: values.playerName
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
						name="playerName"
						component="input"
						type="text"
						autoFocus
						maxLength={15}
						required
					/>
				</form>
			)}
		/>
	);
};
