package com.example.verifier;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.Arrays;
import java.util.Date;
import java.util.UUID;

public class JwtVP {

    private final String token;
    private final static String type = "Verifiable Presentation";
    private String[] VC;

    public JwtVP(String walletId, String ... VC) {

        this.VC=VC;

        // makes current time issuance date and sets expiration date to two weeks.
        Date issuedAt = new Date();
        Date expiresAt = new Date(issuedAt.getTime() + 1209600000);

        // Generates keypair - Private & Public
        KeyGenerator keyGen = null;
        try {
            keyGen = new KeyGenerator();
        } catch (NoSuchAlgorithmException e) {
            System.out.printf("%s ... There was an error in Jwt, NoSuchAlgorithm exception thrown%n", e.getMessage());
        }

        if (keyGen == null) {
            throw new NullPointerException("Keypair not created");
        }
        RSAPublicKey rsaPublicKey = (RSAPublicKey) keyGen.getPublicKey();
        RSAPrivateKey rsaPrivateKey = (RSAPrivateKey) keyGen.getPrivateKey();

        // Saves Public key to the VDR
        walletId = walletId + UUID.randomUUID();
        FileHandler fileHandler = new FileHandler();
        fileHandler.addPublicKey(walletId, rsaPublicKey);

        // Creates JWT based on public & private keypair. Standard naming is used when possible.
        Algorithm algorithm = Algorithm.RSA256(rsaPublicKey, rsaPrivateKey);


        this.token = JWT.create()
                .withIssuer(walletId)
                .withIssuedAt(issuedAt)
                .withExpiresAt(expiresAt)
                .withClaim("verifiableCredentials", Arrays.asList(VC))
                .sign(algorithm);

    }

    public String getToken() {
        return this.token;
    }


    public static void main(String[] args)  {
      /*  Jwt jwt = new Jwt("testSub", "testIss", "AgeCredential", "age", "over-18","Over 18");
        Jwt jwt2 = new Jwt("testSub2", "testIss2", "DegreeCredential", "degree", "er-sykepleier","Er sykepleier");

        JwtVP VP = new JwtVP("walletId", jwt.getToken(), jwt2.getToken());
        System.out.println(VP.token);*/



    }
}
