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
import java.awt.*;
import java.net.URISyntaxException;
import java.security.interfaces.RSAPublicKey;
import java.util.*;

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


    public boolean verifyToken(String token) {
        try {
            DecodedJWT jwt = decodeJwt(token);
            Requester r = new Requester("http://localhost:8083/api/key/");
            Algorithm algorithm = Algorithm.RSA256((RSAPublicKey) r.getKeyByID(jwt.getIssuer()), null);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(jwt.getIssuer())
                    .build();
            verifier.verify(token);

            return true;
        }catch (JWTVerificationException | URISyntaxException exception){
            //Invalid signature/claims
            System.out.println("Token not verified");
            return false;
        }
    }

    public boolean verifyVC(String token) {
        return verifyVCType(token) && verifyVCClaim(token) && verifyToken(token);
    }

    private boolean verifyVCType(String token) {
        DecodedJWT jwt = decodeJwt(token);
        ArrayList<String> typeList = (ArrayList<String>) jwt.getClaim("vc").as(HashMap.class).get("type");
        return typeList.contains("AgeCredential");
    }

    private boolean verifyVCClaim(String token) {
        DecodedJWT jwt = decodeJwt(token);
        LinkedHashMap<String, Object> lhm = (LinkedHashMap<String, Object>) jwt.getClaim("vc").asMap().get("credentialSubject");
        LinkedHashMap<String, String> linkedHashMap = (LinkedHashMap<String, String>) lhm.get("age");
        String type = linkedHashMap.get("type");
        return type.equals("over-18");
    }

    public boolean verifyVP(String token) throws URISyntaxException {
        try {
            DecodedJWT jwt = decodeJwt(token);

            //verifies the VP token
            verifyToken(token);

            //verifies the VC's in the VP
            String[] VCs = jwt.getClaim("verifiableCredentials").asArray(String.class);
            Arrays.stream(VCs).forEach(vc -> verifyVC(vc));
            return true;
        } catch (JWTVerificationException exception){
            //Invalid signature/claims
            System.out.println("VP not verified");
            return false;
        }


    }


    public static void main(String[] args) throws URISyntaxException {
    /*    String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ0ZXN0U3ViIiwiaXNzIjoidGVzdElzc2Q4NzAyNTAyLWJkMTctNGQ3Mi04NGNhLWY3MDY4YTE2YjdiNyIsImV4cCI6MTYyNjc3NTE1NywiaWF0IjoxNjI1NTY1NTU3LCJ2YyI6eyJjcmVkZW50aWFsU3ViamVjdCI6eyJhZ2UiOnsibmFtZSI6Ik92ZXIgMTgiLCJ0eXBlIjoib3Zlci0xOCJ9fSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCIsIkFnZUNyZWRlbnRpYWwiXSwiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXX0sImp0aSI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4My9jcmVkZW50aWFscy8xIn0.mSi6wBHK0Qhr5g_hEKl0mCUbbp0EswQQ5nJsLT45T1DPnYtmAHmtKjqLcyaEk4nzBnzkGo9hnf0PM8qr62D00IWVFyfXoEEJ_btbOOIkw8qjpBzjP3pHxn1Vc4c8Wq85PpkZ9EEFVE-mtWi20cRlWqFyAl9P0R6YibsIdB3H2uwl8K-LKQHIenLQjmDDkQ8pvgwdwBE7TzVnZhgKYRqzglb_Ry9notEa8GEvuqn60dsZJPnWdD8cuiZvCotIQoaEAKxOMXeLVJ97EoarrmXtmxCytCKUeEY6Al8CuJHPIoPAh9FgO6tbxJiGCNV7QqQGItRZPQBunfHBYAWLwESOFA";
        JwtVerifier v = new JwtVerifier();
         System.out.println(v.verify(token));

*/


/*        Jwt jwt = new Jwt("testSub", "testIss", "AgeCredential", "age", "over-18","Over 18");
        Jwt jwt2 = new Jwt("testSub2", "testIss2", "DegreeCredential", "degree", "er-sykepleier","Er sykepleier");
        JwtVP VP = new JwtVP("walletId", jwt.getToken(), jwt2.getToken());
        System.out.println(VP.getToken());

        JwtVerifier verifier = new JwtVerifier();
        DecodedJWT decoded = verifier.decodeJwt(VP.getToken());
        System.out.println(decoded.getClaim("verifiableCredentials").getClass());
        System.out.println(decoded.getClaim("verifiableCredentials"));

        System.out.println(verifier.verifyVP(VP.getToken()));*/

        String VPToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0U3ViIiwiYXVkIjoidmVyaWZpZXIiLCJleHAiOjE3MTg0NDU2MDAsImlhdCI6MTYyMzc1MTIwMCwianRpIjoxMDAwMDAwMDAsImNyZWQiOlsiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnpkV0lpT2lKMFpYTjBVM1ZpSWl3aWFYTnpJam9pVGxST1ZTSXNJbVY0Y0NJNk1UY3hPRFEwTlRZd01Dd2lhV0YwSWpveE5qSXpOelV4TWpBd0xDSjJZeUk2SW1WeUxYTjVhMlZ3YkdWcFpYSWlMQ0pxZEdraU9pSnlZVzVrYjIxSlJDMXplV3RsY0d4bGFXVnlJbjAuWWllZzRTQWpSMnJ6RmFRZjhJNzdmNnFPbFJuQ1R4Yk1DYTkzazV0MHRObyJdfQ.MFkCcDXQ6rZUJLCq5_tcGPgqkR0JlATlzlfRBUP7yPE";


        JwtVerifier verifier = new JwtVerifier();
        DecodedJWT decoded = verifier.decodeJwt(VPToken);

        System.out.println(decoded.getClaims());
        System.out.println(decoded.getClaim("cred").getClass());
        System.out.println(decoded.getClaim("cred"));

    }



}
