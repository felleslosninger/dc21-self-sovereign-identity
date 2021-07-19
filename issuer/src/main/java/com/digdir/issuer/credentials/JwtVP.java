package com.digdir.issuer.credentials;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.digdir.issuer.storage.FileHandler;
import com.digdir.issuer.util.KeyGenerator;

import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.Arrays;
import java.util.Date;
import java.util.UUID;

/**
 * Class representing a jwt as a verifiable presentation
 * Mainly used for testing verification of VPs on verifier side
 */
public class JwtVP {

    private final String token;
    private final static String type = "Verifiable Presentation";
    private final String[] VCs;


    /**
     * Class constructor creating an instance of a jwt VP, for a given holder, containing given VCs
     * @param walletId = the id of the holder of this VP
     * @param VCs = the VCs that will be included in this VP
     */
    public JwtVP(String walletId, String ... VCs) {

        this.VCs=VCs;

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
                .withAudience("verifier123")
                .withClaim("type",type)
                .withClaim("cred", Arrays.asList(this.VCs))
                .sign(algorithm);

    }

    public String getToken() {
        return this.token;
    }

    public String[] getVCs() {
        return this.VCs;
    }


    public static void main(String[] args)  {
        Jwt jwt = new Jwt("testSub", "testIss", "AgeCredential", "age", "over-18","Over 18");
        Jwt jwt2 = new Jwt("testSub2", "testIss2", "DegreeCredential", "degree", "er-sykepleier","Er sykepleier");

        JwtVP VP = new JwtVP("walletId", jwt.getToken(), jwt2.getToken());
        System.out.println(VP.token);



    }
}
