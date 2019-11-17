import styled from 'styled-components';

export const Root = styled.div``;

export const QuestionContainer = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 15px;
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.grey};
  box-shadow: 2px 3.5px 6px rgba(var(--secondary-rgb-color), 0.15);
  position: relative;
  margin: 1rem 0rem;
  font-size: 3rem;
  font-weight: 300;
  text-transform: uppercase;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: space-between;
  justify-content: baseline;
`;

export const QuestionNum = styled.span`
  font-size: 3rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-right: 0.1rem;
  height: 100%;
`;

export const QuestionTextContainer = styled.div`
  width: 100%;
  height: 100%;
  align-self: center;
`;

export const MetadataContainer = styled.div`
  display: inline-block;
  width: 100%;
  font-size: 1.6rem;
  text-transform: uppercase;

  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

export const Metadata = styled.div`
  background-color: ${props => props.theme.colors.amethyst};
  border-radius: 1.3rem;
  width: 43%;
  padding: 1.2rem;
  margin: 1rem 0rem;
  color: ${props => props.theme.colors.secondary};
  box-shadow: 3px 3px 6px rgba(var(--amethyst-rgb-color), 0.2);

  :last-of-type {
    margin-left: 2rem;
  }
`;
