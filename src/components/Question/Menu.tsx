import React from 'react';
import { useTransition } from 'react-spring';
import { useNavigation } from 'react-navi';
import { Root, MenuItem } from './menuStyles';

interface MenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Menu: React.FC<MenuProps> = ({ open, setOpen }) => {
  const navigation = useNavigation();
  const shouldTransition = open ? 1 : 0;
  const transitions = useTransition(shouldTransition, p => p, {
    from: { transform: 'scale(0)' },
    enter: { transform: 'scale(1.3)' },
    leave: { transform: 'translate(-100%, 0%)' }
  });

  const goToMainMenu = (): void => {
    navigation.navigate('/');
  };
  const onContinueClick = (): void => {
    setOpen(false);
  };

  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <Root key={key} style={props}>
              <MenuItem onClick={onContinueClick}>Continue</MenuItem>
              <MenuItem onClick={goToMainMenu}>Quit</MenuItem>
            </Root>
          )
      )}
    </>
  );
};
