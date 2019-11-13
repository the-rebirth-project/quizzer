import styled from 'styled-components';
import { ButtonContainer } from '../Layout/styles';

interface RootProps {
  backgroundColor: string;
}

export const Root = styled.div<RootProps>`
  position: relative;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  flex-wrap: wrap;
  text-transform: uppercase;
`;

export const CenterText = styled.h1`
  font-size: 10rem;
  text-align: center;
  font-weight: 300;
  width: 90%;
`;

export const PositionedButtonContainer = styled(ButtonContainer)`
  position: absolute;
  bottom: 1.5%;
  right: 3.5%;
  z-index: 10;
  height: auto;
`;
