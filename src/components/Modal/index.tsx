import React from 'react';
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

	const onClickOutside = (): void => {
		setModalOpen(false);
	};

	return (
		<div>
			{open && (
				<Root open={open}>
					<Background onClick={onClickOutside} />
					<Content>{children}</Content>
				</Root>
			)}
		</div>
	);
};
