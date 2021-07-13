package com.digdir.issuer;

import com.digdir.issuer.credentials.old.Credential;
import com.digdir.issuer.old.Signing;
import com.digdir.issuer.util.KeyGenerator;
import org.junit.jupiter.api.Test;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.SignatureException;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class SigningTest {

    @Test
    void testSignature() throws NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException, SignatureException {
        KeyGenerator keyGen = new KeyGenerator();
        Credential credential = new Credential("Digdir", "Over 18 år");
        Signing signing = new Signing(keyGen.getPrivateKey(), credential);

        byte[] signature = signing.getSignature();
        boolean res = decryptSignature(signature, keyGen.getPublicKey(), credential);

        assertTrue(res);
    }

    public boolean decryptSignature(byte[] signature, PublicKey publicKey, Credential message) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {

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