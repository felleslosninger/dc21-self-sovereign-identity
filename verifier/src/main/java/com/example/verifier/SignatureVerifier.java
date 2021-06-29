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

/*    public boolean decryptSignature(byte[] signature, PublicKey publicKey, Credential message) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {

        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, publicKey);
        byte[] decryptedMessageHash = cipher.doFinal(signature);

        System.out.println(new String(message.stringifier().getBytes()));
        return Arrays.equals(decryptedMessageHash, message.stringifier().getBytes());
    }*/

    public boolean verifySignature(Credential message, byte[] signatureToVerify, PublicKey key) throws Exception {
        Signature signature = Signature.getInstance(Signing.SIGNING_ALGORITHM);
        signature.initVerify(key);
        signature.update(message.stringifier().getBytes(StandardCharsets.UTF_8));
        return signature.verify(signatureToVerify);
    }

    public static void main(String[] args) throws Exception {
        SignatureVerifier sv= new SignatureVerifier();
        KeyGenerator keyGen = new KeyGenerator();
        Credential cred = new Credential("Digdir","over_18");
        Signing s = new Signing(keyGen.getPrivateKey(), cred);

        System.out.println(sv.verifySignature(cred, s.getSignature(), keyGen.getPublicKey()));
        System.out.println(keyGen.getPublicKey().getEncoded());


    }





}
