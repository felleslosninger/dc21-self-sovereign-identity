package com.digdir.issuer.credentials;

import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.digdir.issuer.storage.FileHandler;
import org.junit.jupiter.api.*;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class JwtTest {
    private Jwt jwt;
    private DecodedJWT djwt;
    private static Jwt jwt2;
    private static DecodedJWT djwt2;



    @BeforeEach
    public void setUp() {
        jwt = new Jwt("subject","issuer","vcType","claimTest","typeTest","nameTest");
        djwt = decodeJwt(jwt.getToken());
    }

    private DecodedJWT decodeJwt(String jwtToken) {
        DecodedJWT jwt = null;
        try {
            jwt = JWT.decode(jwtToken);
        } catch (JWTDecodeException exception){
            //Invalid token
            exception.printStackTrace();
        }
        return jwt;
    }
    @Test
    void assertSubjectIsEqualToInput() {
        DecodedJWT djwt = decodeJwt(jwt.getToken());
        assertEquals("subject", djwt.getSubject());
        assertNotEquals("allibaba", djwt.getSubject());
    }

    @Test
    void assertIssuerIsEqualToInput() {
        DecodedJWT djwt = decodeJwt(jwt.getToken());
        assertEquals("issuer", djwt.getIssuer().substring(0,6));
        assertNotEquals("tullefant", djwt.getIssuer().substring(0,6));

    }
    @Test
    void assertIssuedAtIsBeforeExiredAt() {
        DecodedJWT djwt = decodeJwt(jwt.getToken());
        assertTrue(djwt.getIssuedAt().getTime() < djwt.getExpiresAt().getTime());
        assertTrue(djwt.getIssuedAt().getTime() < new Date().getTime());
        assertTrue(new Date().getTime() < djwt.getExpiresAt().getTime());
    }

    @Test
    void assertJWTIdIsCorrect() {
        assertEquals("http://localhost:8083/credentials/1", djwt.getId());
    }

    @Test
    void testSecondConstructor() {
        long lo = 2629800000L;
        jwt2 = new Jwt("testSub", "testIss", "AgeCredential", "age", "over-18", "Over 18", lo);
        djwt2 = decodeJwt(jwt2.getToken());
        assertTrue(djwt2.getExpiresAt().getTime() >= lo);

    }

    @AfterAll
    static void teardownAll(){
        FileHandler fileHandler = new FileHandler();
        fileHandler.removeKeyByID(djwt2.getIssuer());
    }

    @AfterEach
    void teardown(){
        FileHandler fileHandler = new FileHandler();
        fileHandler.removeKeyByID(djwt.getIssuer());
    }
}