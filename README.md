<img src="https://github.com/felleslosninger/digdir-camp-2021-VC/blob/main/images/digdirlogo_01.png" alt="drawing" width="125" align="right"/>

# SSI Ecosystem 
DigdirCamp 2021

## SSI
Self-Sovereign Identity (SSI) gives individuals control of their digital identities. SSI came as a counter-reaction to the information gathering performed by large platforms such as Facebook and Google. In SSI the user is in full control, and the user can decide by himself/herself which information is being shared with others and for how long. The SSI ecosystem consists of four actors; issuer, holder and its digital wallet, verifier and verifiable data registry (VDR). In this project we have implemented an alternative of these actors:
- [Issuer and Verifiable data registry](https://github.com/felleslosninger/digdir-camp-2021-VC/tree/main/issuer) 
- [Wallet](https://github.com/felleslosninger/digdir-camp-2021-VC/tree/main/wallet/wallet-app)
- [Verifier](https://github.com/felleslosninger/digdir-camp-2021-VC/tree/main/verifier)


![image](https://www.w3.org/TR/vc-data-model/diagrams/ecosystem.svg)

## Installation 
This project requires
- [Node.js](https://nodejs.org/en/download/)
- [Maven v3.6.3](https://maven.apache.org/)
- [Java v16](https://www.java.com/)
- [Spring boot 2.5.1](https://spring.io/)


### How to run the applications
Start with cloning the project: 
```
git clone https://github.com/felleslosninger/digdir-camp-2021-VC.git
```

#### Issuer

```
cd issuer
mvn spring-boot:run
```
If there are problems with saving to file, change the PATH in the java classes in storage package.

#### Wallet
```
cd wallet/wallet-app
```
```
npm install
```
```
npm start
```
 
#### Verifier
##### Frontend

```
cd verifier/verifier-app
```
```
npm install
```
```
npm start
```

##### Backend

```
cd verifier
mvn spring-boot:run
```

#### Running and Issues
After going to protectedpage, you will be redirected to a https site, wich we don't have support for.
After landing at a "Site doen't support secured connections", remove the 's' in 'https' to continue.

## Flow
1. Log in with id-porten, using the localhost:8083/protectedpage url.
2. Scan the qr code with the react native application.
3. Go to verifier frontend(whith the verifier spring-boot running).
4. Scan the qr code there with the react native application, then check if you are verified if you had the correct VC.

## Acknowledgements 
- Jon Ramvi and Robin Pedersen at Symfoni AS
- Snorre Lothar von Gohren Edwin at [DIN](https://www.din.foundation/) 
