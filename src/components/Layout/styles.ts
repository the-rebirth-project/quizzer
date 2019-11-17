import styled from 'styled-components';
import { animated } from 'react-spring';
import { Title } from '../MainMenu/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ButtonContainerProps {
  left?: boolean;
  right?: boolean;
}

export const Root = styled(animated.div)`
  display: flex;
  position: relative;
  z-index: 1000;
  height: 100vh;
  width: 100vw;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30vw;
  height: 100vh;
  position: relative;
  z-index: 1000;
`;

// RightContainer will contain the respective scores
export const RightContainer = styled(animated.div)`
  ::-webkit-scrollbar {
    width: 0 !important;
  }

  display: flex;
  width: 70vw;
  height: 100vh;
  align-items: flex-start;
  flex-direction: column;
  overflow-y: scroll;
  position: relative;
  overflow-x: hidden;
`;

export const MainTitle = styled(Title)`
  letter-spacing: 0.9rem;
  font-size: 8rem;
`;

export const SectionHeading = styled.h2`
  text-transform: uppercase;
  color: ${props => props.theme.colors.grey};
  font-size: 7rem;
  font-weight: 300;
  margin-bottom: 2.3rem;
  padding-bottom: 0.5rem;
  letter-spacing: 2rem;
  text-align: center;
`;

export const SectionContainer = styled(animated.section)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 0rem;
  padding-left: 4rem;
  align-content: flex-start;
  display: inline-block;
  overflow: visible;
  height: 100vh;
`;

export const NavBtnsContainer = styled.nav`
  position: absolute;
  bottom: 2.5%;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0rem 3rem;
  align-items: center;
`;

export const ButtonContainer = styled.div<ButtonContainerProps>`
  height: 4rem;
  width: 4rem;
  cursor: pointer;
  color: ${props => props.theme.colors.secondary};
  transition: all 0.2s;

  :hover {
    color: ${props => props.theme.colors.grey};
    transform: ${props => (props.left ? 'translateX(-3px)' : '')};
    transform: ${props => (props.right ? 'translateX(3px)' : '')};
  }
`;

interface NavBtnProps {
  fontSize?: number;
}

export const NavBtn = styled(FontAwesomeIcon)<NavBtnProps>`
  font-size: ${props => (props.fontSize ? `${props.fontSize}rem` : '4rem')};
`;
