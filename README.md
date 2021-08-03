<img src="https://github.com/felleslosninger/digdir-camp-2021-VC/blob/main/images/digdirlogo_01.png" alt="drawing" width="125" align="right"/>

# SSI Ecosystem 
DigdirCamp 2021

## SSI
Self-Sovereign Identity (SSI) gives individuals control of their digital identities. SSI came as a counter-reaction to the information gathering performed by large platforms such as Facebook and Google. In SSI the user is in full control, and the user can decide by himself/herself which information is being shared with others and for how long. The SSI ecosystem consists of four actors; issuer, holder and its digital wallet, verifier and verifiable data registry (VDR). In this project we have implemented an alternative of these actors:
- [Issuer](https://github.com/felleslosninger/digdir-camp-2021-VC/tree/main/issuer)
- [Wallet](https://github.com/felleslosninger/digdir-camp-2021-VC/tree/main/wallet/wallet-app)
- [Verifier](https://github.com/felleslosninger/digdir-camp-2021-VC/tree/main/verifier)
- [VDR](https://github.com/felleslosninger/digdir-camp-2021-VC/blob/wallet-readme/issuer/src/main/resources/PublicKeyFile.json)

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
mvn spring-boot:run
```
 
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
mvn spring-boot:run
```

## Acknowledgements 
- Jon Ramvi and Robin Pedersen at Symfoni AS
- Snorre Lothar von Gohren Edwin at [DIN](https://www.din.foundation/) 
