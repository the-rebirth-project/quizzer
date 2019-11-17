import React from 'react';
import { Root } from './styles';

interface LayoutProps {
  pageUrl: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, pageUrl }) => {
  return <Root>{children}</Root>;
};
