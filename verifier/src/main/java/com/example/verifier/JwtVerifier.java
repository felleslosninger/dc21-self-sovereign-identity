package com.example.verifier;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.net.URISyntaxException;
import java.security.interfaces.RSAPublicKey;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;




/**
 * A class that verifies Jwt-tokens
 */
public class JwtVerifier {


    /**
     * Decodes a jwt-token
     * @param jwtToken = the token to verify
     * @return the decoded jwt
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
     * Method that verifies a token
     * @param token = the token to verify
     * @return a boolean, true if the token was verified, false if not
     */
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

    /**
     * Method that verifies a VC, including the type of the VC
     * @param token = the VC token to verify
     * @param type = the required type for the VC
     * @return a boolean, true if the VC was verified, false if not
     */
    public boolean verifyVC(String token, String type) {
        return verifyVCType(token, type) && verifyVCClaim(token, type) && verifyToken(token);
    }


    /**
     * Helper method to verify a VC
     * Checks if the VC has the correct type
     * @param token = the token to verify type
     * @param type = the required type for the VC
     * @return a boolean, true if the type was correct, false if not
     */
    private boolean verifyVCType(String token, String type) {
        JwtTypeHandler jth = new JwtTypeHandler();
        DecodedJWT jwt = decodeJwt(token);
        ArrayList<String> typeList = (ArrayList<String>) jwt.getClaim("vc").as(HashMap.class).get("type");
        return typeList.contains(jth.getVcType(type));
    }


    /**
     * Helper method to verify a VC
     * Checks if the VC has the claim
     * @param token = the token to verify claim
     * @param type = the required type for the VC
     * @return a boolean, true if the claim was correct, false if not
     */
    private boolean verifyVCClaim(String token, String type) {
        JwtTypeHandler jth = new JwtTypeHandler();

        DecodedJWT jwt = decodeJwt(token);
        LinkedHashMap<String, Object> lhm = (LinkedHashMap<String, Object>) jwt.getClaim("vc").asMap().get("credentialSubject");
        LinkedHashMap<String, String> linkedHashMap = (LinkedHashMap<String, String>) lhm.get(jth.getClaimType(type));
        String typeType = linkedHashMap.get("type");
        return typeType.equals(type);
    }


    /**
     * Method that verifies a VP, and the VCs in the VP
     * @param token = the VP token to verify
     * @param types = the types required for the VP
     * @return a boolean, true if the VP was verified, false if not
     */
    public boolean verifyVP(String token, String ... types) throws URISyntaxException {
        try {
            DecodedJWT jwt = decodeJwt(token);

            //verifies the VP token
            verifyToken(token);

            //verifies the VCs in the VP
            String[] VCs = jwt.getClaim("verifiableCredentials").asArray(String.class);

            boolean allTypesFound = true;
            for (String type : Arrays.asList(types)) {
                if (Arrays.stream(VCs).noneMatch(vc -> verifyVC(vc, type) ==true)) {
                    allTypesFound = false;
                    System.out.println("Not all types present in VP");
                    System.out.println(type);

                    break;
                }

            }
            return allTypesFound;
        } catch (JWTVerificationException exception){
            //Invalid signature/claims
            System.out.println("VP not verified");
            return false;
        }


    }


//    public static void main(String[] args) throws URISyntaxException {
//    /*    String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ0ZXN0U3ViIiwiaXNzIjoidGVzdElzc2Q4NzAyNTAyLWJkMTctNGQ3Mi04NGNhLWY3MDY4YTE2YjdiNyIsImV4cCI6MTYyNjc3NTE1NywiaWF0IjoxNjI1NTY1NTU3LCJ2YyI6eyJjcmVkZW50aWFsU3ViamVjdCI6eyJhZ2UiOnsibmFtZSI6Ik92ZXIgMTgiLCJ0eXBlIjoib3Zlci0xOCJ9fSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCIsIkFnZUNyZWRlbnRpYWwiXSwiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXX0sImp0aSI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4My9jcmVkZW50aWFscy8xIn0.mSi6wBHK0Qhr5g_hEKl0mCUbbp0EswQQ5nJsLT45T1DPnYtmAHmtKjqLcyaEk4nzBnzkGo9hnf0PM8qr62D00IWVFyfXoEEJ_btbOOIkw8qjpBzjP3pHxn1Vc4c8Wq85PpkZ9EEFVE-mtWi20cRlWqFyAl9P0R6YibsIdB3H2uwl8K-LKQHIenLQjmDDkQ8pvgwdwBE7TzVnZhgKYRqzglb_Ry9notEa8GEvuqn60dsZJPnWdD8cuiZvCotIQoaEAKxOMXeLVJ97EoarrmXtmxCytCKUeEY6Al8CuJHPIoPAh9FgO6tbxJiGCNV7QqQGItRZPQBunfHBYAWLwESOFA";
//        JwtVerifier v = new JwtVerifier();
//         System.out.println(v.verify(token));
//
//*/
//
//
//        Jwt jwt = new Jwt("testSub", "testIss", "AgeCredential", "age", "over-18","Over 18");
//        Jwt jwt2 = new Jwt("testSub2", "testIss2", "DegreeCredential", "degree", "er-sykepleier","Er sykepleier");
//        JwtVP VP = new JwtVP("walletId", jwt.getToken(), jwt2.getToken());
//
//        JwtVerifier verifier = new JwtVerifier();
//        DecodedJWT decoded = verifier.decodeJwt(VP.getToken());
//        System.out.println(decoded.getClaim("verifiableCredentials"));
//
//        System.out.println(verifier.verifyVP(VP.getToken(), "over-18", "er-sykepleier"));
//
///*        String VPToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0U3ViIiwiYXVkIjoidmVyaWZpZXIiLCJleHAiOjE3MTg0NDU2MDAsImlhdCI6MTYyMzc1MTIwMCwianRpIjoxMDAwMDAwMDAsImNyZWQiOlsiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnpkV0lpT2lKMFpYTjBVM1ZpSWl3aWFYTnpJam9pVGxST1ZTSXNJbVY0Y0NJNk1UY3hPRFEwTlRZd01Dd2lhV0YwSWpveE5qSXpOelV4TWpBd0xDSjJZeUk2SW1WeUxYTjVhMlZ3YkdWcFpYSWlMQ0pxZEdraU9pSnlZVzVrYjIxSlJDMXplV3RsY0d4bGFXVnlJbjAuWWllZzRTQWpSMnJ6RmFRZjhJNzdmNnFPbFJuQ1R4Yk1DYTkzazV0MHRObyJdfQ.MFkCcDXQ6rZUJLCq5_tcGPgqkR0JlATlzlfRBUP7yPE";
//
//
//        JwtVerifier verifier = new JwtVerifier();
//        DecodedJWT decoded = verifier.decodeJwt(VPToken);
//
//        System.out.println(decoded.getClaims());
//        System.out.println(decoded.getClaim("cred").getClass());
//        System.out.println(decoded.getClaim("cred"));*/
//
//    }



}
