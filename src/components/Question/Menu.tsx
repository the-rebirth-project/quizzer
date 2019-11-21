import React from 'react';
import { useDispatch } from 'react-redux';
import { useTransition } from 'react-spring';
import { push } from 'connected-react-router';
import { resetScore, clearLog } from '../../actions';
import { Root, MenuItem } from './menuStyles';

interface MenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Menu: React.FC<MenuProps> = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const shouldTransition = open ? 1 : 0;
  const transitions = useTransition(shouldTransition, p => p, {
    from: { transform: 'scale(0)' },
    enter: { transform: 'scale(1.3)' },
    leave: { transform: 'scale(0)' },
    config: (_, state: string) => {
      switch (state) {
        case 'leave':
          return { tension: 343, friction: 35 };
        default:
          return { mass: 1, tension: 170, friction: 26 };
      }
    }
  });

  const onQuitClick = (): void => {
    dispatch(resetScore()); // resets the entire scoreboard
    dispatch(clearLog());
    dispatch(push('/'));
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
              <MenuItem onClick={onQuitClick}>Quit</MenuItem>
            </Root>
          )
      )}
    </>
  );
};
