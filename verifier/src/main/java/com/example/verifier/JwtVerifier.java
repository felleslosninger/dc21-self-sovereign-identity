package com.example.verifier;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.SignatureGenerationException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import javax.xml.crypto.AlgorithmMethod;
import java.net.URISyntaxException;
import java.security.interfaces.RSAPublicKey;

public class JwtVerifier {

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


    public boolean verifyVC(String token) throws URISyntaxException {
        try {
            DecodedJWT jwt = decodeJwt(token);
            Requester r = new Requester("http://localhost:8083/api/key/");
            Algorithm algorithm = Algorithm.RSA256((RSAPublicKey) r.getKeyByID(jwt.getIssuer()), null);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(jwt.getIssuer())
                    .build();
            DecodedJWT decodedJWT = verifier.verify(token);
            algorithm.verify(JWT.decode(token));
            return true;
        }catch (JWTVerificationException exception){
            //Invalid signature/claims
            System.out.println("VC not verified");
            return false;
        }
    }

    public static void main(String[] args) throws URISyntaxException {
         JwtVerifier v = new JwtVerifier();
         System.out.println(v.verifyVC("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ0ZXN0U3ViIiwiaXNzIjoidGVzdElzc2Q4NzAyNTAyLWJkMTctNGQ3Mi04NGNhLWY3MDY4YTE2YjdiNyIsImV4cCI6MTYyNjc3NTE1NywiaWF0IjoxNjI1NTY1NTU3LCJ2YyI6eyJjcmVkZW50aWFsU3ViamVjdCI6eyJhZ2UiOnsibmFtZSI6Ik92ZXIgMTgiLCJ0eXBlIjoib3Zlci0xOCJ9fSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCIsIkFnZUNyZWRlbnRpYWwiXSwiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXX0sImp0aSI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4My9jcmVkZW50aWFscy8xIn0.mSi6wBHK0Qhr5g_hEKl0mCUbbp0EswQQ5nJsLT45T1DPnYtmAHmtKjqLcyaEk4nzBnzkGo9hnf0PM8qr62D00IWVFyfXoEEJ_btbOOIkw8qjpBzjP3pHxn1Vc4c8Wq85PpkZ9EEFVE-mtWi20cRlWqFyAl9P0R6YibsIdB3H2uwl8K-LKQHIenLQjmDDkQ8pvgwdwBE7TzVnZhgKYRqzglb_Ry9notEa8GEvuqn60dsZJPnWdD8cuiZvCotIQoaEAKxOMXeLVJ97EoarrmXtmxCytCKUeEY6Al8CuJHPIoPAh9FgO6tbxJiGCNV7QqQGItRZPQBunfHBYAWLwESOFA"));
    }



}
