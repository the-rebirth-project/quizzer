import React from 'react';
import { Root } from './styles';

interface OverlayProps {
  backgroundColor: string; // must be in hex format
}

export const Overlay: React.FC<OverlayProps> = ({
  backgroundColor,
  children
}) => {
  return <Root backgroundColor={backgroundColor}>{children}</Root>;
};
