package com.example.verifier;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.net.URISyntaxException;
import java.security.interfaces.RSAPublicKey;
import java.util.*;


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
    public boolean verifyVP(String token, String ... types) {
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
    /*    String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ0ZXN0U3ViIiwiaXNzIjoidGVzdElzc2Q4NzAyNTAyLWJkMTctNGQ3Mi04NGNhLWY3MDY4YTE2YjdiNyIsImV4cCI6MTYyNjc3NTE1NywiaWF0IjoxNjI1NTY1NTU3LCJ2YyI6eyJjcmVkZW50aWFsU3ViamVjdCI6eyJhZ2UiOnsibmFtZSI6Ik92ZXIgMTgiLCJ0eXBlIjoib3Zlci0xOCJ9fSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCIsIkFnZUNyZWRlbnRpYWwiXSwiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXX0sImp0aSI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4My9jcmVkZW50aWFscy8xIn0.mSi6wBHK0Qhr5g_hEKl0mCUbbp0EswQQ5nJsLT45T1DPnYtmAHmtKjqLcyaEk4nzBnzkGo9hnf0PM8qr62D00IWVFyfXoEEJ_btbOOIkw8qjpBzjP3pHxn1Vc4c8Wq85PpkZ9EEFVE-mtWi20cRlWqFyAl9P0R6YibsIdB3H2uwl8K-LKQHIenLQjmDDkQ8pvgwdwBE7TzVnZhgKYRqzglb_Ry9notEa8GEvuqn60dsZJPnWdD8cuiZvCotIQoaEAKxOMXeLVJ97EoarrmXtmxCytCKUeEY6Al8CuJHPIoPAh9FgO6tbxJiGCNV7QqQGItRZPQBunfHBYAWLwESOFA";
        JwtVerifier v = new JwtVerifier();
         System.out.println(v.verify(token));

*/


        Jwt jwt = new Jwt("testSub", "testIss", "AgeCredential", "age", "over-18","Over 18");
        Jwt jwt2 = new Jwt("testSub2", "testIss2", "DegreeCredential", "degree", "er-sykepleier","Er sykepleier");
        JwtVP VP = new JwtVP("walletId", jwt.getToken(), jwt2.getToken());

        JwtVerifier verifier = new JwtVerifier();
        DecodedJWT decoded = verifier.decodeJwt(VP.getToken());
        System.out.println(decoded.getClaim("cred"));

        System.out.println(verifier.verifyVP(VP.getToken(), "over-18", "er-sykepleier"));

/*        String VPToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJjcmVkIjpbImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSlNVekkxTmlKOS5leUp6ZFdJaU9pSjBaWE4wVTNWaUlpd2lhWE56SWpvaWRHVnpkRWx6Y3pCa09ESTVNMlUzTFRFeU16UXRORFV4TUMxaFpEWXlMV0UyWlRCa016Z3paakU0TXlJc0ltVjRjQ0k2TVRZeU56STRNamcxTnl3aWFXRjBJam94TmpJMk1EY3pNalUzTENKMll5STZleUpqY21Wa1pXNTBhV0ZzVTNWaWFtVmpkQ0k2ZXlKaFoyVWlPbnNpYm1GdFpTSTZJazkyWlhJZ01UZ2lMQ0owZVhCbElqb2liM1psY2kweE9DSjlmU3dpZEhsd1pTSTZXeUpXWlhKcFptbGhZbXhsUTNKbFpHVnVkR2xoYkNJc0lrRm5aVU55WldSbGJuUnBZV3dpWFN3aVFHTnZiblJsZUhRaU9sc2lhSFIwY0hNNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TVRndlkzSmxaR1Z1ZEdsaGJITXZkakVpWFgwc0ltcDBhU0k2SW1oMGRIQTZMeTlzYjJOaGJHaHZjM1E2T0RBNE15OWpjbVZrWlc1MGFXRnNjeTh4SW4wLm9VU1o5UnpZT0RMLVp0SEdvdHVpeTZzZ09jOTc2dE90ZGh4U25Sd3hFN3Vla1JYcXlYR3Vib28xWjFwRGxodkc0c180TEJpclJYYnhMa0ZfWl9HZlJPYTdyaWpMS2lseDJRU3lDSEpMakVNSjM4OS0zZy1yUEJzdllzYVY2aWdFa2xmdk45dGpPSkZBWUNRRjFZc3dnOFE1NXBoeHdld2d3dEZyM3RnZTk3bkQtdXRNZWJDRkttR0txZGRVajVQckhlVkYxY2hYdWtpc010N216WEE5RndfZy1sX0ZwUFlxWENuTG5FbmxoU2h5S2ZacUYza3B0VzZDd2x5WHpPeXp0YXZ0NEdCVkprSDdpMDFSNnFuQ0t2N3FOU3kyM1F6ckFmcnRhUkY1REZqMl9oV21wS24yMXRBelVEUklOdDlMSEd1UVdHNVZXaFdpeVEyU1g0U3V5USIsImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSlNVekkxTmlKOS5leUp6ZFdJaU9pSjBaWE4wVTNWaU1pSXNJbWx6Y3lJNkluUmxjM1JKYzNNeVpHVXlOREF4TmpFdE5HUmhZeTAwWkRnekxXRTRZek10TjJNM09HVmtOamt5WXpJeklpd2laWGh3SWpveE5qSTNNamd5T0RVM0xDSnBZWFFpT2pFMk1qWXdOek15TlRjc0luWmpJanA3SW1OeVpXUmxiblJwWVd4VGRXSnFaV04wSWpwN0ltUmxaM0psWlNJNmV5SnVZVzFsSWpvaVJYSWdjM2xyWlhCc1pXbGxjaUlzSW5SNWNHVWlPaUpsY2kxemVXdGxjR3hsYVdWeUluMTlMQ0owZVhCbElqcGJJbFpsY21sbWFXRmliR1ZEY21Wa1pXNTBhV0ZzSWl3aVJHVm5jbVZsUTNKbFpHVnVkR2xoYkNKZExDSkFZMjl1ZEdWNGRDSTZXeUpvZEhSd2N6b3ZMM2QzZHk1M015NXZjbWN2TWpBeE9DOWpjbVZrWlc1MGFXRnNjeTkyTVNKZGZTd2lhblJwSWpvaWFIUjBjRG92TDJ4dlkyRnNhRzl6ZERvNE1EZ3pMMk55WldSbGJuUnBZV3h6THpFaWZRLkxHX0JwS1NENW5IN1FnVlhVa1duN2w0NzM2Tld2LXNRY3FpeHBnS0hBdVhjRE1uMHZkNXZLMHlMNDJNWlV4ZmFKZlc5MVRLblprRHo1enZ6RGxPRE5Ta2diZlZnT09TVzVRT1dpbzRfS1daclRwUmdiYWhaa01JdzN0bndEb2g5ZzNhV2duam94S0pLbkxNOFRFTThFZnd0STIwYkRHTHQ4RFB3aFVxc1VUMEVlcW9CNmNFLXE0NG5VNzF2UHI1M0tzV0EzUWVVdmFTbXduOU4wcWJ4cEdzV2VyQTRDUWJPSGNWcVhyOGFVenpzclp1MHZZX0ZUemdrWGtmV3BHcU5tbW9JVmRtWDREdVVZQkpnOVF4UW40QnpPT2JMaDNRZkhPTUMyN3h0LS03UFJaX0x5UmdpRVhwREVKdERQN19WRkVxcDhGbnRHMWJLRm1MQTIwXzQ1USJdLCJpc3MiOiJ3YWxsZXRJZGZhOTkzZDlhLTQxODAtNDIzNC1iNTBmLTMwNDhmN2VjZWUwOSIsImV4cCI6MTYyNzI4Mjg1OCwidHlwZSI6IlZlcmlmaWFibGUgUHJlc2VudGF0aW9uIiwiaWF0IjoxNjI2MDczMjU4fQ.sO1ByF7fqurqcqgy5Cbs8005O1Bm5sdAYV2FYjVIYpTfHY1PwiB81lANjY_ETyZGq8Ak3n5evESPQqnz7aLS3UDy47fpesphwqRhpr1rEphUCZ47KiMWc3MLIPSa9P3QHZXvPZ4d8-rbiAFN_MFBfKpm1BI6-yDGxBLSvf2lD7IIPZv1rZuHCfef7iyyod09SFA_8e-xgBvWE0COmWpqr21uCLPsDPTrmpx7s33hamedm1sf822GuzToGGOKdgHFtNpORRh9M_YKxnaQdiUut7s_1u8D8EgitVH12bbYWVZ6Ha1ADyqnvexLZUU4oA4t6mT0EX2zT0wH3zGQySSL6w";


        JwtVerifier verifier = new JwtVerifier();
        DecodedJWT decoded = verifier.decodeJwt(VPToken);

        System.out.println(decoded.getClaims());
        System.out.println(decoded.getClaim("cred").getClass());
        System.out.println(decoded.getClaim("cred"));*/

    }



}
