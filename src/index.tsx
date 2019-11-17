import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { MainMenu } from './components/MainMenu';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-navi';
import { routes } from './routes';
import { Provider } from 'react-redux';
import { store } from './store';
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from './themes';

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    padding: 0;
    margin: 0;
    box-sizing: inherit;
  }

  body, html {
    height: 100%;
    font-size: 62.5%; /* 1rem = 10px */
  }

  body {
    box-sizing: border-box;
		font-family: "Montserrat", sans-serif, serif;
    overflow: hidden;
	}
`;

ReactDOM.render(
  <Router routes={routes}>
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider theme={mainTheme}>
        <Suspense fallback={MainMenu}>
          <App />
        </Suspense>
      </ThemeProvider>
    </Provider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
