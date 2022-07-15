# About
ReactJS web application with NodeJS Express and mySQL.

# Try the deployed application
[https://url-shortening-service-jiawen.herokuapp.com](https://url-shortening-service-jiawen.herokuapp.com)

The backend has also been deployed at: 
[https://url-shortening-service-backend.herokuapp.com](https://url-shortening-service-backend.herokuapp.com)

# Running locally

## Before Starting up the Application
Please have the backend ready:
[https://url-shortening-service-backend.herokuapp.com](https://url-shortening-service-backend.herokuapp.com)

Install the dependencies for the backend and frontend
```
npm i
```

## Starting Up
### Backend
```
npm run devStart
```

### Web Application
```
npm start
```

## Database
The application uses mySQL database and the database has been deployed using Heroku.
To set up the database in mySQL Work bench, the credentials can be found in the backend project, in `index.js`

## Unit Tests
There are 2 unit tests in the backend project in `test/test.js`.
To run the unit tests:
### Install Mocha
```
npm install -g mocha
```
### Run Mocha in backend directory
```
mocha
```
