<img src="https://github.com/felleslosninger/digdir-camp-2021-VC/blob/main/images/digdirlogo_01.png" alt="drawing" width="125" align="right"/>

## Verifier

This is a Spring Boot and React application that simultates a verifier in the SSI-Ecosystem. The main purpose is to request a statement from the users who want to access it's service. The page asks the user to verify that they are over 18, if the application receives a valid credential, they text is updated to "Du er verifisert". If not the user gets a message that they are not verified. The Springboot application validates the credential recived by the user and return true or false. 

### Build with
* [Node.js](https://nodejs.org/en/download/)
* [Maven v3.6.3](https://maven.apache.org/)
* [React](https://reactjs.org/)
* [Spring Boot](https://spring.io/projects/spring-boot)


## Getting started
* Make sure you have Node installed or download [here](https://nodejs.org/en/download/)
* Make sure you have Maven installed or install maven [here](https://maven.apache.org/download.cgi)
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

```maven
mvn spring-boot:run
```

## Endpoints for Backend

**api/checkVerified - GET**
* This route is called when the sent jwt token is verified. If the jwt token is not verified, return false.

**api/sendVP - POST**
* Recieves a jwt token from the user and verifies the credential. 

