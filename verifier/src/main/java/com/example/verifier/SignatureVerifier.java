package com.example.verifier;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.xml.bind.DatatypeConverter;
import java.nio.charset.StandardCharsets;
import java.security.*;
import java.util.Arrays;

public class SignatureVerifier {

    public boolean decryptSignature(byte[] signature, PublicKey publicKey, Credential message) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {

        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, publicKey);
        byte[] decryptedMessageHash = cipher.doFinal(signature);

        /*
        byte[] messageBytes = message.stringifier().getBytes();
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] messageHash = md.digest(messageBytes);
         */

        System.out.println(new String(message.stringifier().getBytes()));
        return Arrays.equals(decryptedMessageHash, message.stringifier().getBytes());
    }

    public static void main(String[] args) throws NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, InvalidKeyException {
        SignatureVerifier sv= new SignatureVerifier();
        KeyGenerator keyGen = new KeyGenerator();
        Credential cred = new Credential("Digdir","over_18");
        Signing s = null;
        try {
            s = new Signing(keyGen.getPrivateKey(), cred);
            System.out.println(sv.decryptSignature(s.getSignature(), new KeyGenerator().getPublicKey(), cred));
        } catch (BadPaddingException e) {
            System.out.println("FAILED");
        }

    }





}
