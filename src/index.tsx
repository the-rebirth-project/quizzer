import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Routes } from './Routes';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from './store';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    padding: 0;
    margin: 0;
    box-sizing: inherit;
  }

  body, html {
    font-size: 62.5% /* 1rem = 10px */
  }

  body {
    box-sizing: border-box;
		font-family: "Montserrat", sans-serif, serif;
	}
`;

ReactDOM.render(
	<Provider store={store}>
		<GlobalStyle />
		<Routes />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
