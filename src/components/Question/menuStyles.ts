import styled from 'styled-components';
import { animated } from 'react-spring';

export const Root = styled(animated.div)`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2000;
  background-color: ${props => props.theme.colors.grey};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MenuItem = styled.h1`
  cursor: pointer;
  font-size: 4rem;
  letter-spacing: 1.5rem;
  text-transform: uppercase;
  background-image: ${props =>
    `linear-gradient(120deg, transparent 0%, transparent 50%, ${props.theme.colors.secondary} 50%)`};
  background-size: 250%;
  color: ${props => props.theme.colors.secondary};
  transition: all 0.4s;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  margin: 6rem;
  font-weight: 300;

  :hover {
    transform: translateX(1rem);
    background-position: 100%;
    color: ${props => props.theme.colors.grey};
  }
`;
