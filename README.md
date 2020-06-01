# Quizzer 📚
Desktop app for designing and participating in quizzes.

## Technologies
This app was primarily built with [Electron](https://electronjs.org), [ReactJS](https://reactjs.org) and [Redux](https://redux.js.org) for state management. Other libraries such as React Spring were also used.

## Features
This was something that I built very early on when I was still learning the basics. The code may be a bit messy. It should also be noted that the app doesn't support full blown data persistence. It supports local persistence only — although I did integrate Firebase but that was for local testing.

Users can make their own fully customized quizzes. Each created quiz can then be saved as "presets" and can be reused whenever. Additionally, multiple people can partake in the quizzes via local multiplayer. The app currently only supports 4 players. Of course, your preset must have sufficient questions in order for multiplayer quiz sessions to be fair, otherwise the app throws an error.

When creating a preset, questions can be added individually and can be categorized to easy, medium and hard difficulties. They can be reordered as well. Additionally, if local multiplayer is turned on, the app indicates which question will go to which player which can be helpful if you wish to administer harder questions for a specific player and vice versa.

You can add up to 4 viable answers and the correct answer must be marked. Each question must have at least 2 options. This of course makes it flexible enough to allow for True / False questions. If you want to be particularly evil, you can also have questions with the same option text — although looking back, I should've probably "fixed" that.

## Testing
As I alluded to before, I only knew the *very basics* when I first wrote this codebase and hence there are literally no tests.
