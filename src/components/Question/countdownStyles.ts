import styled from 'styled-components';

export const Root = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.grey};
  color: ${props => props.theme.colors.pinkRed};
  font-weight: 700;
  padding: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6rem;
  height: 6rem;
  font-size: 1.7rem;
`;
