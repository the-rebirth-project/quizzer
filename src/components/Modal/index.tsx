import React from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from '../../actions';
import { useTransition } from 'react-spring';
import { Root, Background, Content } from './styles';

interface ModalProps {
	open: boolean;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Modal: React.FC<ModalProps> = ({
	children,
	open,
	setModalOpen
}) => {
	const dispatch = useDispatch();
	const onClickOutside = (): void => {
		setModalOpen(false);
		dispatch(showModal());
		// turn edit mode off if edit mode is turned on in the first place
		// this is probably a bad way of doing things because as the number of tools increase, we would have to turn off each mode separately. maybe we could do a check of all the modes that are set to true and turn off that specific mode to false
	};

	const transitions = useTransition(open, null, {
		from: { opacity: 0, transform: 'scale(0)' },
		enter: { opacity: 1, transform: 'scale(1)' },
		leave: { opacity: 0, transform: 'scale(0)' },
		config: { tension: 300, friction: 26 }
	});

	return (
		<>
			{transitions.map(
				({ item, key, props }) =>
					item && (
						<Root>
							<Background open={open} onClick={onClickOutside} />
							<Content key={key} style={props}>
								{children}
							</Content>
						</Root>
					)
			)}
		</>
	);
};
