package com.example.verifier.verification;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.net.URISyntaxException;
import java.security.KeyFactory;
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

    //Method for checking Audience
    private boolean checkAud(String token){
        String audience = "verifier123";
        DecodedJWT jwt = decodeJwt(token);
        return jwt.getAudience().contains(audience);

    }


    /**
     * Method that verifies a token
     * @param token = the token to verify
     * @return a boolean, true if the token was verified, false if not
     */
    public boolean verifyToken(String token) {
        try {
            DecodedJWT jwt = decodeJwt(token);
            System.out.println(jwt.getIssuer());
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
    public boolean verifyVP(String token, String ... types){

        //Check if Aud is the correct Aud
        if(checkAud(token)==false){
            return false;
        }

        try {
            DecodedJWT jwt = decodeJwt(token);

            //verifies the VP token
            verifyToken(token);

            //verifies the VCs in the VP
            String[] VCs = jwt.getClaim("cred").asArray(String.class);

            boolean allTypesFound = true;
            for (String type : types) {
                if (Arrays.stream(VCs).noneMatch(vc -> verifyVC(vc, type))) {
                    allTypesFound = false;
                    System.out.println("Not all types present in VP");

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
        JwtVerifier v = new JwtVerifier();


/*
        String VCtoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwODA4OTQwOTM4MiIsImlzcyI6IlV0c2VkZXJBdkJldmlzLm5vNzY2YjEwZTMtMzJmMi00MDdkLThjNGItMjRjMGQ2NDIxY2VlIiwiZXhwIjoxNjI3MzcwMTExLCJpYXQiOjE2MjYxNjA1MTEsInZjIjp7ImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImFnZSI6eyJuYW1lIjoiT3ZlciAxOCIsInR5cGUiOiJvdmVyLTE4In19LCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQWdlQ3JlZGVudGlhbCJdLCJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdfSwianRpIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgzL2NyZWRlbnRpYWxzLzEifQ.O9GhYrVxrGKlAvcpseL-RGmnPCAbcrepGyOBE8OERPqN7YMsWhPskEtdnWq5YGqfRU9GEm1gGpoLe4rIsgCts8PbBp_W0m-5ANINI_L2XpPAUHF95FJcqbICyOf3ZAJaE1h0QQsfJi7yvUI-M0mqXSNkTk62wM8uMxh7YHUqs0G3jf4fXs_CKETRiiDW9juKMO6sZZPZru36gTfmZ6j5mvDNTTzQI23SOcF7cn0IMUTZw-to1PoT3ry8OIBjaZZXvwxk-FFmDNGwi_M0VbIj8a1HHdcDaHhgVsCVG3SVOeTwhfwAX97glT0BmRXL-9NHB9_DSR-j1-A3cZwSSDjW9Q";
        System.out.println("verify token: " + v.verifyToken(VCtoken));
        System.out.println("verify VC over-18: " + v.verifyVC(VCtoken, "over-18"));
        System.out.println("verify VC er-sykepleier: " + v.verifyVC(VCtoken, "er-sykepleier"));

*/


        String VPtoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJjcmVkIjpbImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSlNVekkxTmlKOS5leUp6ZFdJaU9pSjBaWE4wVTNWaUlpd2lhWE56SWpvaWRHVnpkRWx6Y3pJMU1EQXpZelF6TFRSbU4yVXROR1prWkMwNFpUVm1MVEl5TkRGbVlqQmxaV1UxTkNJc0ltVjRjQ0k2TVRZeU56WXlPVEExTXl3aWFXRjBJam94TmpJMk5ERTVORFV6TENKMll5STZleUpqY21Wa1pXNTBhV0ZzVTNWaWFtVmpkQ0k2ZXlKaFoyVWlPbnNpYm1GdFpTSTZJazkyWlhJZ01UZ2lMQ0owZVhCbElqb2liM1psY2kweE9DSjlmU3dpZEhsd1pTSTZXeUpXWlhKcFptbGhZbXhsUTNKbFpHVnVkR2xoYkNJc0lrRm5aVU55WldSbGJuUnBZV3dpWFN3aVFHTnZiblJsZUhRaU9sc2lhSFIwY0hNNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TVRndlkzSmxaR1Z1ZEdsaGJITXZkakVpWFgwc0ltcDBhU0k2SW1oMGRIQTZMeTlzYjJOaGJHaHZjM1E2T0RBNE15OWpjbVZrWlc1MGFXRnNjeTh4SW4wLk56MmxmY05nSGt0NzlOX2JZSExOSEpubHNRamNBYmZIQmpzX2ZfZGtsQ2FldW5xN2RZN1pGU0psX0lSc19qWEM4N3c5UzVJcmFTVERUWGR6VVlEUmVJZjJ3SkhOV3Q2clZjSTlzM2pMSzJVbkZKbW50OG1KdXZQeld6VVpwaThzRkVQeXBHdm5ydEthdHZFQXVkT2E3RkZLYzlUZmJYMjh3cGN0QlN0SEtLNHhWWmd6R2RBVmZoMExycW0xbkpWejVMak1EaVpULTU4UkpaRm90eEQtN2hhNGxxTjNBcGZYM3VwNXUwZDFWVG54clk0WS1MUDVJSzFKRTNYWVVHeXFZZDJhZHJjWjBmM0s4cWxUNFRFMy10aXhRekJqdng5RnZIdEtqUUtFV0UwRXIyeWVZMjVrTGFMYVFYdWtQYVFZNDRfb2dianBsN01wNi0yUUVhekRfQSIsImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSlNVekkxTmlKOS5leUp6ZFdJaU9pSjBaWE4wVTNWaU1pSXNJbWx6Y3lJNkluUmxjM1JKYzNNeVpqUTRaRFZsWkRrdFkyRTJOaTAwT1RJeExUaGxaR1V0TmpBMVpHRTRaRFV6TnpKaElpd2laWGh3SWpveE5qSTNOakk1TURVMExDSnBZWFFpT2pFMk1qWTBNVGswTlRRc0luWmpJanA3SW1OeVpXUmxiblJwWVd4VGRXSnFaV04wSWpwN0ltUmxaM0psWlNJNmV5SnVZVzFsSWpvaVJYSWdjM2xyWlhCc1pXbGxjaUlzSW5SNWNHVWlPaUpsY2kxemVXdGxjR3hsYVdWeUluMTlMQ0owZVhCbElqcGJJbFpsY21sbWFXRmliR1ZEY21Wa1pXNTBhV0ZzSWl3aVJHVm5jbVZsUTNKbFpHVnVkR2xoYkNKZExDSkFZMjl1ZEdWNGRDSTZXeUpvZEhSd2N6b3ZMM2QzZHk1M015NXZjbWN2TWpBeE9DOWpjbVZrWlc1MGFXRnNjeTkyTVNKZGZTd2lhblJwSWpvaWFIUjBjRG92TDJ4dlkyRnNhRzl6ZERvNE1EZ3pMMk55WldSbGJuUnBZV3h6THpFaWZRLklUNkNEUmxzR3k1VUl2bF9qdzZSQTgtbDdXSXlHTnRNc1hsLUxkUFpJZUVvV1VRN1NLT0RQT1gxRXNUbGxEWEl3U0VucVlFVE82eHNxZHpETndFenRWM2NrVEJERUd6bXN6TFpxaFJ4RmhFWGdyWkQwdkwwWXZaWkg2LVBfY2FmTnMyUjBjMGszQWE1a2p2U1pqcFI3dzBfUkhib1JNT2cxSEkzcnVlRXJ0TE1rWVZFMTE0ZVdhcDVYUDhLNFJqU1B3SmR1QVpzZmFPQW1LVDJoQ244MDVwOS15Q194VTBHRTJJOHVGczUzTVo0RXk2N25JZUNFR3BmdXhiMEFqWDBjMjJnMjdjWi1tUWJTd3NONHJULVVZbVRuUDRqZ2JMWDFNZzRCdHBfaW9XeW1wTGtoM2RYYlpxaEF4TEZrME4wQnR4NlRjbE14Qjd6cDhGZWFBc1pwUSJdLCJhdWQiOiJ2ZXJpZmllcjEyMyIsImlzcyI6IndhbGxldElkNTQzMWZjZDQtM2ZhNS00MTk0LTk3MzgtMjNhZTBiNGUwYTRkIiwiZXhwIjoxNjI3NjI5MDU0LCJ0eXBlIjoiVmVyaWZpYWJsZSBQcmVzZW50YXRpb24iLCJpYXQiOjE2MjY0MTk0NTR9.XExgh1C0v7sHGLPLKEkrqjQnrUUr_AS2rW7jESc0x4hDBN_Z_nv1LQb3jhAZlHKdHAjgnrdH4_hL3De9tpuQqnDJx48ZmxbpvtIFlc90Ymc9tcee75U2TQWKeOHuI069jZXhacWqDai_Mb5zNCQywZbrM3rkp5kRxLMo59FO-DkkgVbAx6CZFjSiGXVOFACPbovUlXiYHbYmZxe6odKOJrAOYHKei6gckFoQWmiQVz0ZTBtxts06s28F1Pk7UaD-L2JSNFuuCkmr11bNzDodhMoOoUqXXDszSQIgMl4B5xvXpmFjdawY6oSIx6p5SjtFCVVpn4pUPuM61Or4yAjLeQ";
        System.out.println("verify VP over-21: " + v.verifyVP(VPtoken, "over-18"));

    }



}
