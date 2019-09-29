import React from 'react';
import { useSpring } from 'react-spring';
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

	const animProps = useSpring({
		from: { opacity: 0, transform: 'scale(0)' },
		to: { opacity: 1, transform: 'scale(1)' },
		config: { tension: 80, friction: 10 }
	});

	return (
		<div>
			{open && (
				<Root open={open}>
					<Background onClick={onClickOutside} />
					<Content style={animProps}>{children}</Content>
				</Root>
			)}
		</div>
	);
};
