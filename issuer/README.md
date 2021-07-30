<img src="https://github.com/felleslosninger/digdir-camp-2021-VC/blob/main/images/digdirlogo_01.png" alt="drawing" width="125" align="right"/>

# Issuer and Verifiable Data Registry(VDR)
A SpringBoot serverapp that simulates an Issuer and a VDR in a SSI-ecosystem.


## Installation
This project requiers:
* [Maven v3.6.3](https://maven.apache.org/)
* [Java v16](https://www.java.com/)
* [Spring boot 2.5.1](https://spring.io/)


If maven isn't preinstalled in your IDE:

install maven [here](https://maven.apache.org/download.cgi):

or

```node
npm install maven
```

## Usage
To run this project:

```maven
mvn spring-boot:run
```


## Endpoints for issuer

**GET - /protectedpage**

Redirects the user to ID-porten. After the user has logged in, the server will retrieve an ID-porten-token.  
Then the server will generates a BaseID(GrunnID) based on the ID-porten-token.

NOTE! After login, ID-porten redirects user to a HTTPS-connection. While the server only supports HTTP, you have to change HTTPS to HTTP in the URL.

Example-baseID:

```json

{
  "sub": "08089409382",
  "iss": "GrunnID-portalen.noa0df24b7-40b5-498a-bdd3-f8e346cab718",
  "exp": 1628671445,
  "iat": 1627461845,
  "vc": {
    "credentialSubject": {
      "baseid": {
        "name": "BaseID",
        "type": "BaseID"
      }
    },
    "type": [
      "VerifiableCredential",
      "BaseCredential"
    ],
    "@context": [
      "https://www.w3.org/2018/credentials/v1"
    ]
  },
  "jti": "http://localhost:8083/credentials/1"
}

```


**GET - /api/getVC**

Parameters in URL: 
 * type = type of VC to request
 * baseVC = user's BaseID
 * issuer = issuer of the VC to request

If all parameters are valid, and user's BaseID is verified, the server creates a VC of the requested type and returns it.

Example-VC:

```json

{
  "sub": "08089409382",
  "iss": "folkeregisteret699296c6-c2b3-4b64-ba8e-3c394e8c00ea",
  "exp": 1628838216,
  "iat": 1627628616,
  "vc": {
    "credentialSubject": {
      "age": {
        "name": "Over 18",
        "type": "over-18"
      }
    },
    "type": [
      "VerifiableCredential",
      "AgeCredential"
    ],
    "@context": [
      "https://www.w3.org/2018/credentials/v1"
    ]
  },
  "jti": "http://localhost:8083/credentials/1"
}

```




## Endpoints for VDR

The VDR is currently just different json-files. 

**GET - /vdr/key/{id}**
Get's a public key from with id from VDR(PublicKeyFile.json)


**POST - /vdr/postKey**
Post's a RSA Public key, with an id, to the VDR(PublicKeyFile.json) 

**GET - /vdr/getTypes/{issuer}**
Get's all available types of VC a specific issuer can issue from VDR(IssuerTypes.json).

**GET - /vdr/getAllIssuers**
Retrieves all available issuers from VDR(IssuerTypes.json).



 


