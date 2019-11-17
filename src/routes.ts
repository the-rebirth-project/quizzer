import { mount, route } from 'navi';
import { MainMenu } from './components/MainMenu';
import { Question } from './components/Question';
import { CreateQuiz } from './components/CreateQuiz';
import { Config } from './components/Config';
import { Scoreboard } from './components/Scoreboard';
import { TurnOverlay } from './components/TurnOverlay';
import { WinOverlay } from './components/WinOverlay';
import { Log } from './components/Log';

export const routes = mount({
  '/': route({
    title: 'Main Menu',
    view: MainMenu
  }),
  '/create': route({
    title: 'Create a Quiz',
    view: CreateQuiz
  }),
  '/configure/:pageNum': route({
    title: 'Configure your designed quiz',
    view: Config
  }),
  '/start/q/:qPos': route(async req => {
    return {
      title: 'Quiz Session',
      data: {
        urlParams: {
          ...req.params
        }
      },
      view: Question
    };
  }),
  '/playerturn/:playerId/:nextQuestionPos': route(async req => {
    return {
      title: 'Player turn',
      data: {
        urlParams: {
          ...req.params
        }
      },
      view: TurnOverlay
    };
  }),
  '/scoreboard/:nextQuestionNum': route(async req => {
    return {
      title: 'Scoreboard',
      data: {
        urlParams: {
          ...req.params
        }
      },
      view: Scoreboard
    };
  }),
  '/finalresults': route({
    title: 'Final results of local multiplayer quiz session',
    view: WinOverlay
  }),
  '/log': route({
    title: 'Log of quiz session',
    view: Log
  })
});

export default routes;
