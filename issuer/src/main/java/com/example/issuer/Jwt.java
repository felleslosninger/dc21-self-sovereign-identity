package com.example.issuer;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import java.util.Date;

public class Jwt {
    private String token;

    public Jwt(String subjectId, String issuerId){

        Date issuedAt = new Date();
        Date expiresAt = new Date(issuedAt.getTime() + +1209600000);
        Algorithm algorithm = Algorithm.HMAC256("secret");
        String token = JWT.create()
                .withIssuer(issuerId)
               // .withAudience(subjectId)
                .withIssuedAt(issuedAt)
                .withExpiresAt(expiresAt)
                .withJWTId("http://localhost:8083/credentials/1")
                .withSubject(subjectId)
                .withClaim("vc", "Over-18")
                .sign(algorithm);
        this.token = token;

    }

    public String getToken() {
        return token;
    }

    public static void main(String[] args) {
        Jwt jwt = new Jwt("testSub", "testIss");
        System.out.println(jwt.getToken());

    }
}
