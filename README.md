# Reddit Clone

## Description

[App] Creating a near identical clone of the famous social media website, Reddit

> See it live on [optimistictrousers.github.io/reddit-clone](https://optimistictrousers.github.io/reddit-clone/)
> Or clone repo, cd into repo, then run "npm run start"

## Purpose

Creating a full-stack webapp with React.js and Firebase, with multiple routes. Using Typescript and Redux.

Beyond that, other learning outcomes were:

- Design reusable components
- Creating and deleting data inside of a Firebase Firestore database
- Grabbing user coordinates using the cursor
- Using Styled Components to style UI


## Features

1. Allows users to click on an image and select characters from a dropdown menu for their answer
2. Mobile-friendly
3. Leaderboard to allow users to see the top scores
4. Night mode
5. Responsive
6. Sanitizing user input to prevent users from entering profanity into their names

## Instructions

1. Hover over the area you want to select, then click to show a dropdown menu of all of the possible characters. Click on a different part of the image to select another area. For mobile users, simply tap the areas you want to select, then click on the target box to open the menu
2. Try to find the characters as fast as possible to show up in the top leaderboards!
3. Click the hamburger menu in the top-left to play the 6 different levels!
4. After you finish, write your name and you will appear in the leaderboards!

## Development

### Javascript Framework

- [React](https://github.com/facebook/create-react-app)

### Technologies used

- [Firebase](https://firebase.google.com/) - Cloud services (database, authentication)
- [ESLint](https://eslint.org/) - A linter tool to standardize code
- [Github Pages](https://pages.github.com/) - Hosting
- [Prettier](https://prettier.io/) - Code formatter
- [React Router](https://reactrouter.com/web/guides/quick-start) - Router tool for React applications
- [Jest](https://github.com/facebook/jest) - Assertion and test running library
- [Testing Library](https://github.com/testing-library/dom-testing-library) - Testing library for queries
- [Styled Components](https://github.com/styled-components/styled-components) - CSS-in-JS library for styling
- [React](https://github.com/facebook/react/) - Javascript library

<p align="left"> 
<a href="https://www.w3.org/html/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> 
<a href="https://www.w3schools.com/css/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>
<a href="https://jestjs.io" target="_blank"> <img src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" alt="jest" width="40" height="40"/> </a>
<a href="https://webpack.js.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/d00d0969292a6569d45b06d3f350f463a0107b0d/icons/webpack/webpack-original-wordmark.svg" alt="webpack" width="40" height="40"/> </a> 
<a href="https://styled-components.com/"> <img src="https://lxspandora.gallerycdn.vsassets.io/extensions/lxspandora/vscode-styled-components-snippets/1.0.2/1506443337800/Microsoft.VisualStudio.Services.Icons.Default" width="40" height="40"/> </a> 
<a href="https://reactjs.org/"> <img src="https://logos-download.com/wp-content/uploads/2016/09/React_logo_logotype_emblem.png" width="40" height="40"/> 
<a href="https://testing-library.com/"> <img src="https://testing-library.com/img/octopus-64x64.png" width="40" height="40"/> </a> 
</p>

## Areas for Improvement

1. Making the mouse hover on the image to be more smooth. Currently, the target box will only move if you hover outside of the target box.
2. Adding more comprehensive testing
3. Adding more levels
4. Give the user back their time in seconds with demicals instead of seconds

## Known Bugs

1. Target box does not move when the cursor is inside the target box
