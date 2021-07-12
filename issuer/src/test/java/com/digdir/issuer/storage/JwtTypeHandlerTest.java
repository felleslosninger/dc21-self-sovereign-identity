package com.digdir.issuer.storage;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class JwtTypeHandlerTest {
    private static JwtTypeHandler jth;

    @BeforeAll
    static void setup(){
        jth = new JwtTypeHandler();
    }

    @Test
    void testJwtTypeHandler() {
        assertEquals(jth.getVcType("over-18"), "AgeCredential");
        assertEquals(jth.getClaimType("over-18"), "age");
        assertEquals(jth.getName("over-18"), "Over 18");

    }
}