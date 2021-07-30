<img src="https://github.com/felleslosninger/digdir-camp-2021-VC/blob/issuer-readme/issuer/digdirlogo_01.png" alt="drawing" width="200" align="right"/>

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

**api/checkVerified - GET**
* This route is called when the sent jwt token is verified. If the jwt token is not verified, return false.

**api/sendVP - POST**
* Recieves a jwt token from the user and verifies the credential. 


### Stor
## Større
# Størst

1. Test i **bold**, test i *kursiv*, test ~~som er feil~~
* [Her](nrk.no) er en link

2. Her er litt kode
```python
npm install 
```
3.
```javascript
def hello() {
return true;
}
```
