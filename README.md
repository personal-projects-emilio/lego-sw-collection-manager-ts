[![build](https://github.com/personal-projects-emilio/lego-sw-collection-manager-ts/actions/workflows/build.yml/badge.svg)](https://github.com/personal-projects-emilio/lego-sw-collection-manager-ts/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/personal-projects-emilio/lego-sw-collection-manager-ts/branch/main/graph/badge.svg?token=RZ5YLKOXJP)](https://codecov.io/gh/personal-projects-emilio/lego-sw-collection-manager-ts)

# Lego Star Wars Collection Manager
  - [Environnement variable and secrets](#environnement-variable-and-secrets)
  - [Available Scripts](#available-scripts)
    - [`npm start`](#npm-start)
    - [`npm test`](#npm-test)
    - [`npm run test:coverage`](#npm-run-testcoverage)
    - [`npm run build`](#npm-run-build)
    - [`npm run analyze`](#npm-run-analyze)
  - [TODO](#todo)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It is using packages like [Redux](https://redux.js.org/), [Material-UI](https://mui.com/), etc. And it is written in Typescript. The app is build and deploy on a [github page](https://personal-projects-emilio.github.io/lego-sw-collection-manager-ts/minifigs) via [github actions](https://github.com/personal-projects-emilio/lego-sw-collection-manager-ts/blob/main/.github/workflows/deploy.yml).

## Environnement variable and secrets

If you want to use the project you will need two variable in the .env file as shown in the .env.example file.
```sh
REACT_APP_API_BASEURL =
REACT_APP_AUTH_BASEURL =
```
You will need the codecov token and github action deploy key as [github secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) if you want to use the github actions.
```sh
CODECOV_TOKEN
ACTIONS_DEPLOY_KEY
```
## Available Scripts

In the project directory, after running `npm install` you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.


### `npm run test:coverage`
Launches the test runner in the interactive watch mode and create the coverage report in the `coverage` folder.

### `npm run build`
Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.

### `npm run analyze`
Build the app and analyze it with [source-map-explorer](https://github.com/danvk/source-map-explorer)

## TODO
- [x] Minifigs with CRUD
- [x] Filtering and pagination for minifigs
- [ ] Add a category field to the minifigs
- [ ] Multiple edit for category/tags/characterName
- [ ] Duplicate minifig option
- [ ] Refactor with personal Express.js API
- [ ] Basic frames without edition
- [ ] Frames with CRUD
- [ ] Sets
- [ ] Storages boxes
