import styled, { createGlobalStyle } from 'styled-components';
import { Title } from '../MainMenu/styles';

interface BlurBGProps {
  modalShown: boolean;
}

export const GlobalStyle = createGlobalStyle`
	body {
		overflow-y: scroll;
	}

	::-webkit-scrollbar {
		width: 0 !important;
	}
`;

export const GreyBG = styled.div`
  height: 100vh;
  width: 100vw;
`;

export const Root = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
`;

export const Sidebar = styled.div`
  height: 100vh;
  width: 30vw;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

/* The parent flex container (Root) is behaving a bit weird here. had to resort to using margins*/
export const CreateTitle = styled(Title)`
  letter-spacing: 1.5rem;
  font-size: 7rem;
  width: 30vw;
  margin-left: 1rem;
  text-align: center;
`;

export const MiniQuestionsContainer = styled.div`
  font-size: 3rem;
  box-shadow: -5px 0px 6px rgba(46, 46, 46, 0.08);
  color: ${props => props.theme.colors.secondary};
  background-color: ${props => props.theme.colors.grey};
  height: 100vh;
  width: 70.2vw;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
`;

export const BlurBackground = styled.div<BlurBGProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(transparent 0%, transparent 100%);
  filter: ${props => (props.modalShown ? 'blur(10px)' : '')};
  z-index: ${props => (props.modalShown ? 200 : 0)};
`;
