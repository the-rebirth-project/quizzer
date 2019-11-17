import React, { useState } from 'react';
import { useNavigation } from 'react-navi';
import { useTransition, animated } from 'react-spring';
import {
  faLongArrowAltLeft,
  faLongArrowAltRight
} from '@fortawesome/free-solid-svg-icons';
import { MiniPresets } from './MiniPresets';
import { Layout } from '../Layout';
import { PlayerCardList } from './PlayerCardList';
import {
  LeftContainer,
  RightContainer,
  MainTitle,
  SectionHeading,
  SectionContainer,
  NavBtnsContainer,
  NavBtn,
  ButtonContainer
} from '../Layout/styles';

export const Config: React.FC = () => {
  const navigation = useNavigation();
  const [pageNum, setPageNum] = useState(1);
  const maxPageNum = 2;
  const minPageNum = 1;
  const sectionTransition = useTransition(pageNum, p => p, {
    from: { transform: 'translate3d(100%,0,0)' },
    enter: { transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-100%,0,0)' }
  });

  const goLeft = (): void => {
    pageNum - 1 >= minPageNum
      ? setPageNum(pageNum - 1)
      : navigation.navigate('/');
  };

  const goRight = (): void => {
    setPageNum(pageNum + 1);
  };

  return (
    <Layout pageUrl="/configure">
      <LeftContainer>
        <MainTitle>Config</MainTitle>
        <NavBtnsContainer>
          <ButtonContainer onClick={goLeft} left>
            <NavBtn icon={faLongArrowAltLeft} />
          </ButtonContainer>
          {pageNum !== maxPageNum && (
            <ButtonContainer onClick={goRight} right>
              <NavBtn icon={faLongArrowAltRight} />
            </ButtonContainer>
          )}
        </NavBtnsContainer>
      </LeftContainer>

      <RightContainer>
        {sectionTransition.map(({ key, props }) => (
          <animated.div
            key={key}
            style={{
              ...props,
              position: 'absolute',
              top: 0,
              width: '100%'
            }}
          >
            {pageNum === 1 && (
              <SectionContainer>
                <SectionHeading>Select Preset</SectionHeading>
                <MiniPresets />
              </SectionContainer>
            )}
            {pageNum === 2 && (
              <SectionContainer>
                <SectionHeading>Select Players</SectionHeading>
                <PlayerCardList />
              </SectionContainer>
            )}
          </animated.div>
        ))}
      </RightContainer>
    </Layout>
  );
};
