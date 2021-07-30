
## Verifier
This is a Spring Boot and React application that simultates a verifier in the SSI-Ecosystem. The main purpose is to request a statement from the users who want to access it's service. The first page ask the user to verify that they are over 18, if the application receives a valid credential, they are redirected to another page. If not the user gets a message that they are not verified. The Springboot application validates the credensial recived by the user and return true or false. 

### Build with
* [React](https://reactjs.org/)
* [Spring Boot](https://spring.io/projects/spring-boot)


## Getting started
* Make sure you have Node installed or download [here](https://nodejs.org/en/download/)
* Clone the repo 
* Open the project folder in your prefered IDE

### Frontend
```
cd verifier/verifier-app
```
```
npm install
```
```
npm start
```
### Backend

1. Choose Springboot:run

## Endpoints for Backend

**api/checkVerified**
