package com.example.issuer;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Jwt {
    private String token;

    public Jwt(String subjectId, String issuerId, VC vc) throws JSONException {

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
                .withClaim("vc",  vc.getVcAsString())
                .sign(algorithm);
        this.token = token;

    }

    public String getToken() {
        return token;
    }

    public static void main(String[] args) throws JSONException {
        ArrayList<String> context = new ArrayList<>();
        context.add("w3c.org");

        ArrayList<String> type = new ArrayList<>();
        type.add("VerifableCredential");
        type.add("AgeCredential");


        CredentialSubject credentialSubject = new CredentialSubject("age", "over-18", "Over 18");
        VC vc = new VC(context, type, credentialSubject);

        Jwt jwt = new Jwt("testSub", "testIss", vc);
        System.out.println(jwt.getToken());

    }
}
