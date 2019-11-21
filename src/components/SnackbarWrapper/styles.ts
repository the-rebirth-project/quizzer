import styled from 'styled-components';

export const Root = styled.div`
  background-color: ${props => props.theme.colors.grey};
  border-radius: 1rem;
  box-shadow: 3px 5px 6px rgba(var(--grey-rgb-color), 0.15);
  width: 8rem;
  height: 4rem;
`;
