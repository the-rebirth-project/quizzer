import styled, { css } from 'styled-components';
import { MainTitle, SectionContainer } from '../Layout/styles';

// export const Root = styled.div`
//   display: flex;
//   position: relative;
//   z-index: 1000;
//   height: 100vh;
//   width: 100vw;
// `;

export const ScoreboardTitle = styled(MainTitle)`
  letter-spacing: 1rem;
  font-size: 3.4rem;
`;

interface ScoreProps {
  first?: boolean;
  last?: boolean;
}

export const Score = styled.div<ScoreProps>`
  letter-spacing: 0.5rem;
  font-weight: 300;
  font-size: 8rem;
  margin: 4rem 0rem;
  text-transform: uppercase;
  ${props => {
    if (props.first) {
      return css`
        color: ${props => props.theme.colors.amethyst};
      `;
    } else if (!props.first && !props.last) {
      return css`
        color: ${props => props.theme.colors.grey};
      `;
    } else {
      return css`
        color: ${props => props.theme.colors.pinkRed};
      `;
    }
  }}
`;

export const Points = styled.span`
  font-weight: 700;
`;

export const ScoreboardContentContainer = styled(SectionContainer)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100vh;
  width: 100%;
  align-content: space-between;
  justify-content: center;
`;
