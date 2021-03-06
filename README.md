<img src="https://github.com/felleslosninger/digdir-camp-2021-VC/blob/main/images/digdirlogo_01.png" alt="drawing" width="125" align="right"/>

# SSI Ecosystem 
DigdirCamp 2021

## SSI
Self-Sovereign Identity (SSI) gives individuals control of their digital identities. SSI came as a counter-reaction to the information gathering performed by large platforms such as Facebook and Google. In SSI the user is in full control, and the user can decide by himself/herself which information is being shared with others and for how long. The SSI ecosystem consists of four actors; issuer, holder and its digital wallet, verifier and verifiable data registry (VDR). In this project we have implemented an alternative of these actors:
- [Issuer and Verifiable data registry](https://github.com/felleslosninger/digdir-camp-2021-VC/tree/main/issuer) 
- [Wallet](https://github.com/felleslosninger/digdir-camp-2021-VC/tree/main/wallet/wallet-app)
- [Verifier](https://github.com/felleslosninger/digdir-camp-2021-VC/tree/main/verifier)


![image](https://www.w3.org/TR/vc-data-model/diagrams/ecosystem.svg)

## Use case
The following sequence diagrams shows the series of events from initializing a wallet to retrieving a proof and sending it to a service for verification.

#### 1. Onboard user to the wallet
![onboarding](images/onboarding.PNG)


#### 2. Get a proof from issuer
*Requires onboarding (1).*

![issuer](images/issuer.PNG)

#### 3. Verify against service
*Requires a proof (2).*

![verifier](images/verifier.PNG)


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
```
```
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
```
```
mvn spring-boot:run
```

## Flow
1. Log in with ID-porten, using the localhost:8083/protectedpage url (issuer spring-boot).
2. Scan the QR code with the react native application (wallet react-native app).
3. Go to verifier frontend (verifier react app whith the verifier spring-boot running).
4. Scan the QR code there with the react native-app (wallet), then check if you are verified. You need to fetch the correct VC to be able to be verified.

#### Protected page problems
After going to protectedpage, you will be redirected to a https site, wich we don't have support for.
After landing at a "Site doesn't support secured connections", remove the 's' in 'https' to continue.


## Acknowledgements 
- Jon Ramvi and Robin Pedersen at Symfoni AS
- Snorre Lothar von Gohren Edwin at [DIN](https://www.din.foundation/) 
