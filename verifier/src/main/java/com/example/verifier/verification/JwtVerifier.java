package com.example.verifier.verification;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.verifier.copied.Jwt;
import com.example.verifier.copied.JwtVP;

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
            Requester r = new Requester("http://localhost:8083/vdr/key/");
            Algorithm algorithm = Algorithm.RSA256((RSAPublicKey) r.getKeyByID(jwt.getIssuer()), null);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(jwt.getIssuer())
                    .build();
            verifier.verify(token);

            return true;
        }catch (JWTVerificationException exception){
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
            String[] VCs = jwt.getClaim("cred").asArray(String.class);

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


    public static void main(String[] args) throws URISyntaxException {
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


        String VCtoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwODA4OTQwOTM4MiIsImlzcyI6IlV0c2VkZXJBdkJldmlzLm5vNzY2YjEwZTMtMzJmMi00MDdkLThjNGItMjRjMGQ2NDIxY2VlIiwiZXhwIjoxNjI3MzcwMTExLCJpYXQiOjE2MjYxNjA1MTEsInZjIjp7ImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImFnZSI6eyJuYW1lIjoiT3ZlciAxOCIsInR5cGUiOiJvdmVyLTE4In19LCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQWdlQ3JlZGVudGlhbCJdLCJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdfSwianRpIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgzL2NyZWRlbnRpYWxzLzEifQ.O9GhYrVxrGKlAvcpseL-RGmnPCAbcrepGyOBE8OERPqN7YMsWhPskEtdnWq5YGqfRU9GEm1gGpoLe4rIsgCts8PbBp_W0m-5ANINI_L2XpPAUHF95FJcqbICyOf3ZAJaE1h0QQsfJi7yvUI-M0mqXSNkTk62wM8uMxh7YHUqs0G3jf4fXs_CKETRiiDW9juKMO6sZZPZru36gTfmZ6j5mvDNTTzQI23SOcF7cn0IMUTZw-to1PoT3ry8OIBjaZZXvwxk-FFmDNGwi_M0VbIj8a1HHdcDaHhgVsCVG3SVOeTwhfwAX97glT0BmRXL-9NHB9_DSR-j1-A3cZwSSDjW9Q";
        JwtVerifier v = new JwtVerifier();
        System.out.println(v.verifyToken(VCtoken));

        System.out.println(v.verifyVC(VCtoken, "over-18"));


String VPtoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJjcmVkIjpbImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSlNVekkxTmlKOS5leUp6ZFdJaU9pSjBaWE4wVTNWaUlpd2lhWE56SWpvaWRHVnpkRWx6YzJaak5qWTFPV001TFRabU5qWXROR1JrTUMxaVpUWTNMVFF4WVRNeFptTTJZamc1WkNJc0ltVjRjQ0k2TVRZeU56TTNNVEV4TkN3aWFXRjBJam94TmpJMk1UWXhOVEUwTENKMll5STZleUpqY21Wa1pXNTBhV0ZzVTNWaWFtVmpkQ0k2ZXlKaFoyVWlPbnNpYm1GdFpTSTZJazkyWlhJZ01UZ2lMQ0owZVhCbElqb2liM1psY2kweE9DSjlmU3dpZEhsd1pTSTZXeUpXWlhKcFptbGhZbXhsUTNKbFpHVnVkR2xoYkNJc0lrRm5aVU55WldSbGJuUnBZV3dpWFN3aVFHTnZiblJsZUhRaU9sc2lhSFIwY0hNNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TVRndlkzSmxaR1Z1ZEdsaGJITXZkakVpWFgwc0ltcDBhU0k2SW1oMGRIQTZMeTlzYjJOaGJHaHZjM1E2T0RBNE15OWpjbVZrWlc1MGFXRnNjeTh4SW4wLlFtblhMMGtxX01iOUZ4RjdLM1VrVTZ6Wms2ZVNJQXd2UUE0VHA0YlBRX3JjWG5NdE9BNlpMdTc5UVlucmVTMllWZDFqS1B4dzlLSm13SkMzbFFDRVRqT0xjVzA4TDJvNHUtZkJ5U0kwVzFrUk94SkZucnJkMG5EQjJPRldWbE51VWY2MEFySXpYaWVfVGtxUVFSOEtOdDBOWEVjbFFyYk9nc2VlZ0J3b1VaZEtYZmo5VWFya3lQQ3hVaVFmYmxqWUdNWm9mU3ZJMDdoUUNpMTNOeTRmTWFreE5iSHpvYW14NEVFRmtLOV9TdUdUd2dXcGVnUHRyN2Z3LVhabFF4NEVZd2daYW1xWDBaYzU2aHhEbnFaRDRLNVJvTkt5bDFsWjRFWDZISTctdXdzaExVeS1BcEQxWV9WMURmM2hqTDJPRnBFZmVsVktuSTUtOGlvLTI2R3pNUSIsImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSlNVekkxTmlKOS5leUp6ZFdJaU9pSjBaWE4wVTNWaU1pSXNJbWx6Y3lJNkluUmxjM1JKYzNNeU1qSTBaRE00T1dNdE5HUmpZUzAwTkRWaUxXSXhPRGN0TkRFd1pqWXdaakF3TkRobUlpd2laWGh3SWpveE5qSTNNemN4TVRFMExDSnBZWFFpT2pFMk1qWXhOakUxTVRRc0luWmpJanA3SW1OeVpXUmxiblJwWVd4VGRXSnFaV04wSWpwN0ltUmxaM0psWlNJNmV5SnVZVzFsSWpvaVJYSWdjM2xyWlhCc1pXbGxjaUlzSW5SNWNHVWlPaUpsY2kxemVXdGxjR3hsYVdWeUluMTlMQ0owZVhCbElqcGJJbFpsY21sbWFXRmliR1ZEY21Wa1pXNTBhV0ZzSWl3aVJHVm5jbVZsUTNKbFpHVnVkR2xoYkNKZExDSkFZMjl1ZEdWNGRDSTZXeUpvZEhSd2N6b3ZMM2QzZHk1M015NXZjbWN2TWpBeE9DOWpjbVZrWlc1MGFXRnNjeTkyTVNKZGZTd2lhblJwSWpvaWFIUjBjRG92TDJ4dlkyRnNhRzl6ZERvNE1EZ3pMMk55WldSbGJuUnBZV3h6THpFaWZRLlBxZWFnSVVteUxzZmRET29PbkgtV1FGVzFCdDBaTEd5TlJ2WmJaVFdzVXBQN1BaeTE2UWlOdnN2WWkwZEFzdVRteDhid1k3TWVZN3cteThvWDZyZmRPQVcxZ3d3bTRLMGVMbWNReUF5cUw0SHRGNi1oTHVVdUY5elhsb0xldFlrbzJsS29XM2kzaC13NFVWNm1jWjM4YS1NcmxDbTRpYlhyek42OHJfbU1rNVdDOTI2UU1rai1yak95MENDOTZtVEpmbDd3OWVFVFhDNDdiMDVKSmVNZURaeHNOckFwR1JDckl2M3RYQmItLW1VMnU4WFJmMDZFZDYzcnhaeTd0UmJlTjFOOGY0aHZ0djk5R2thQmtfWXhoeUhDeTdTQlBQa01zVjVsZGsyeUVfQ3VIY1ZYUTlxSHIybFdTQW56bkViUDF6b002cGQ0bkZjZWF3QzZ2LVRkUSJdLCJpc3MiOiJ3YWxsZXRJZDY2YmMxNzg5LTg2NTMtNGJhYS1hM2NhLTk4OTQxMDNiYTViYSIsImV4cCI6MTYyNzM3MTExNSwidHlwZSI6IlZlcmlmaWFibGUgUHJlc2VudGF0aW9uIiwiaWF0IjoxNjI2MTYxNTE1fQ.tHRrL7QnqiLJedpA4xeerALn9SiR6pQiX3OcD2w0YD5gOkghdfF2bGuyLboq5fqVm9yC0F99rEEGUGqCBwocIwYpM4Ml6HXlgWF4qnJdxFM0U2Sex_JAPjA3syuchX-E0jCbrrUVNC4jLp9_GAYYOKShoLgrQuWP88LDq8LfTwkecJ1G6EciyQaDnR7oLAptgvbMAB4vzKh-lo1Xgxb3wcRatOGf4_yO8f3pX0YWUPHm0Dx7hJLKggSpWUSe40S_pNkFujHnqvAr3E-y0d63j8KybtlMBXKtUoWH-CA-lJa_bAjOOPxXQ9682b-arjNjJ6rZqxATu-gyyYkKRv71UA";    System.out.println(v.decodeJwt(VPtoken).getIssuer());
        System.out.println(v.verifyToken(VPtoken));
        System.out.println(v.decodeJwt(VPtoken).getClaims());
        System.out.println(v.verifyVP(VPtoken, "over-18", "er-sykepleier"));
    }



}
