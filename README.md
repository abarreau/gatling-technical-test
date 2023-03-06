# Gatling Corp React project

Hello, this is my entry for Gatling's hiring technical test.

This project is built upon https://github.com/gatling/react-interview-project template.

## Requirements

- [Nvm](https://github.com/nvm-sh/nvm) or NodeJS v16.14.0 (If you use NVM, simply type `nvm use` in your terminal in the root directory and nvm will download and set your current path to the correct version of NodeJS used in this project)
- yarn installed globally : `npm install -g yarn`

## Installation

- `yarn install` to download the dependencies
- `yarn run start` to start the app on http://localhost:3000

## How to contribute

When opening a new pull request, build consistency and non regression tests will automatically be launched by the GitHub CI.

In case you need to launch these steps on your dev env, please use the following commands :

- `yarn run build` to build the app in production mode
- `yarn run test` to run unit and integration tests
- `yarn run e2e` to run end-to-end tests, against a locally running app

## For the Gatling people reading this code

Here is a list of things worth mentioning :

- Added `strictNullCheck: true` in `tsconfig.json`
- Added GitHub pipeline to check app build consistency and launch automated tests for CI.
- Added FP-TS (usually for business code)
- Added a bit of responsive design (but it's not that simple when working with tables)
- Tried to use TS utility types when it felt right
- Delay when loading users is faked, to show the spinner
- To edit the name of user, click on it, change its value and data will be persisted when input loses focus.

## Context

Here is the original README :

```
The goal of this small project is to create a small webapp displaying users and their related posts (data are located
on [jsonplaceholder](https://jsonplaceholder.typicode.com)). 

Please **do NOT fork this repository**.
You should [use it as template (the green button)](https://github.com/gatling/react-interview-project/generate) ([GitHub documentation](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)).
Note: if you choose to make your repository private, add us as collaborators.

This project already configure yarn and implement a table of users.

The architecture of the project is up to you.

Please code as you would do in your everyday work.

#### Specifications

- Add the option to fetch each user posts on [jsonplaceholder](https://jsonplaceholder.typicode.com) and display them 
  with their user.
- The name of each user should be editable, and should send the update to the server (note that the update is faked on
  jsonplaceholder).
- Display the number of users living in an Appt, and in a Suite (field address.suite)

##### Bonus

- add a spinner while information is loading
- add css
- use redux
- split the application into different pages
- add tools typically used in a development environment (linters, code formatter, ...)
``` 
