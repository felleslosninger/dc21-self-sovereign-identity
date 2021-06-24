package com.example.issuer;

import org.junit.jupiter.api.Test;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.nio.charset.StandardCharsets;
import java.security.*;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class SigningTest {
    public static final String SIGNING_ALGORITHM = "SHA256withRSA";

    @Test
    void testSignature() throws Exception {
        KeyGenerator keyGen = new KeyGenerator();
        Credential credential = new Credential("Digdir", "Over 18 år");
        Signing signing = new Signing(keyGen.getPrivateKey(), credential);
        System.out.println(signing.getProofAsJsonString(keyGen.getPrivateKey(), credential));


        byte[] signature = signing.getSignature();
        boolean res = verifySignature(credential, signature, keyGen.getPublicKey());

        assertTrue(res);
    }



    public boolean verifySignature(Credential message, byte[] signatureToVerify, PublicKey key) throws Exception {
        Signature signature = Signature.getInstance(Signing.SIGNING_ALGORITHM);
        signature.initVerify(key);
        signature.update(message.stringifier().getBytes(StandardCharsets.UTF_8));
        return signature.verify(signatureToVerify);
    }





    private boolean decryptSignature(byte[] signature, PublicKey publicKey, Credential message) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {

        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, publicKey);
        byte[] decryptedMessageHash = cipher.doFinal(signature);


        /*
        byte[] messageBytes = message.stringifier().getBytes();
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] messageHash = md.digest(messageBytes);
         */

        return Arrays.equals(decryptedMessageHash, message.stringifier().getBytes());
    }


}