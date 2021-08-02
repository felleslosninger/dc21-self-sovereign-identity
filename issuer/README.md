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


  "sub": "08089409382",
  "nbf": 1627889142,
  "iss": "GrunnID-portalen.no77eeb28f-b90d-4e51-825c-af5f61f63329",
  "exp": 1629098741,
  "iat": 1627889141,
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
  "nonce": "39bf9823-3d63-44b",
  "jti": "MgFTUClXTMpGUehl5pXy05QQT24GcE3W4+t4t04F45s="
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
  "nbf": 1627893505,
  "iss": "folkeregisteret4283afdc-9f54-45b7-a7e2-5ee965b18f9c",
  "exp": 1629103105,
  "iat": 1627893505,
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
  "nonce": "b433ab30-0977-450",
  "jti": "WMuTzBzx401m24pHWZUsna9Ov531FcArrGpO6o/ZN+Y="
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



 


