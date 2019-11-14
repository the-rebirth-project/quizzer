import styled from 'styled-components';
import { CenterText } from '../Overlay/styles';

export const FinalPoints = styled.span`
  font-weight: 700;
  color: ${props => props.theme.colors.grey};
`;

export const WonText = styled(CenterText)`
  font-size: 12rem;
  letter-spacing: 3rem;
`;
