import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface RootProps {
  active: boolean;
}

export const Root = styled.div<RootProps>`
  position: relative;
  cursor: pointer;
  width: 20.6rem;
  height: 26.3rem;
  background-image: linear-gradient(
    120deg,
    ${props => props.theme.colors.teal},
    ${props => props.theme.colors.amethyst}
  );
  ${props =>
    props.active
      ? css`
          background-size: 400%;
          background-color: transparent;
          box-shadow: 0rem 0.3rem 0.6rem rgba(26, 130, 330, 0.25);
        `
      : css`
          background-size: 5000%;
          background-color: ${props => props.theme.colors.grey};
          box-shadow: 0rem 0.3rem 0.6rem rgba(var(--teal-rgb-color), 0.25);
        `}
  border-radius: 1rem;
  transition-property: background-size, background-color, box-shadow, transform;
  transition-duration: 0.7s, 0.7s, 0.7s, 0.3s;
  transition-timing-function: ease-in-out;

  :hover {
    transform: translateY(-3px);
  }

  :active {
    transform: translateY(0px);
  }

  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.secondary};
`;

export const PlayerName = styled.span`
  font-size: 3rem;
  letter-spacing: 0.3rem;
  font-weight: 300;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  text-align: center;
`;

export const IconContainer = styled.div`
  height: 3rem;
  width: 3rem;

  position: absolute;
  top: 2%;
  right: 6%;
`;

export const FaIcon = styled(FontAwesomeIcon)`
  font-size: 3rem;
  color: ${props => props.theme.colors.secondary};
  transform: scale(0.9);
  transition: all 0.2s ease-in-out;

  :hover {
    transform: scale(1);
  }
`;
