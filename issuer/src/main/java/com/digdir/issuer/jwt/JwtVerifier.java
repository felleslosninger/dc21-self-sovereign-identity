package com.digdir.issuer.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.net.URISyntaxException;
import java.security.interfaces.RSAPublicKey;

/**
 * Class for Verifying and decoding Json Web Tokens
 */
public class JwtVerifier {


    /**
     * Method decodes JWT-String to DecodedJWT, ready for verifying.
     * @param jwtToken String-representation of a JWT
     * @return JWT as DecodedJWT
     */
    public DecodedJWT decodeJwt(String jwtToken) {
        DecodedJWT jwt = null;
        try {
            jwt = JWT.decode(jwtToken);
        } catch (JWTDecodeException exception){
            //Invalid token
            exception.printStackTrace();
        }
        return jwt;
    }


    /**
     * Method for verifing signature of a JWT with signer's public key
     *
     * @param token JWT as String
     * @param rsaPublicKey Public key of signer
     * @return true if verified, false if not verified.
     * @throws URISyntaxException If the URI is of wrong format.
     */
    public boolean verifyVC(String token, RSAPublicKey rsaPublicKey) throws URISyntaxException {
        try {
            DecodedJWT jwt = decodeJwt(token);

            Algorithm algorithm = Algorithm.RSA256(rsaPublicKey, null);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(jwt.getIssuer())
                    .build();
            verifier.verify(token);

            return true;
        }catch (JWTVerificationException exception){
            //Invalid signature/claims
            System.out.println("VC not verified");
            return false;
        }
    }
}