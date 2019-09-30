import React from 'react';
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
	const onClickOutside = (): void => {
		setModalOpen(false);
	};

	const transitions = useTransition(open, null, {
		from: { opacity: 0, transform: 'scale(0)' },
		enter: { opacity: 1, transform: 'scale(1)' },
		leave: { opacity: 0, transform: 'scale(0)' },
		config: { tension: 80, friction: 10 }
	});

	return (
		<>
			{transitions.map(
				({ item, key, props }) =>
					item && (
						<Root>
							<Background onClick={onClickOutside} />
							<Content key={key} style={props}>
								{children}
							</Content>
						</Root>
					)
			)}
		</>
	);
};
