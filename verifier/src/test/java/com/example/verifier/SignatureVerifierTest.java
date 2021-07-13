/*
package com.example.verifier;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.*;

import static org.junit.jupiter.api.Assertions.*;

class SignatureVerifierTest {

    static KeyGenerator kg;
    static Credential cred;
    static Signing signing;
    static SignatureVerifier sv;

    @BeforeAll
    static void setUp() throws NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, SignatureException, InvalidKeyException {
        kg = new KeyGenerator();
        cred = new Credential("Digdir", "over_18");
        signing = new Signing(kg.getPrivateKey(), cred);
        sv = new SignatureVerifier();
    }

    @Test
    public void testVerifySignature() throws Exception {
        assertTrue(sv.verifySignature(cred, signing.getSignature(), kg.getPublicKey()));
    }

    @Test
    public void testFalseVerifySignature() throws Exception {
        assertFalse(sv.verifySignature(cred, signing.getSignature(), new KeyGenerator().getPublicKey()));
    }
}*/
