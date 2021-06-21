package com.example.verifier;

import javax.crypto.Cipher;
import javax.xml.bind.DatatypeConverter;
import java.security.KeyPair;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;

public class Cryptography {

    AsymmetricKeyGenerator generator;

    public Cryptography(String type) {
        generator = new AsymmetricKeyGenerator(type);
    }

    public byte[] encrypt(String plainText, PrivateKey privateKey) throws Exception {
        Cipher cipher = Cipher.getInstance(generator.getType());

        cipher.init(Cipher.ENCRYPT_MODE, privateKey);

        return cipher.doFinal(plainText.getBytes());
    }

    public String decrypt(byte[] cipherText, PublicKey publicKey) throws Exception {
        Cipher cipher = Cipher.getInstance(generator.getType());

        cipher.init(Cipher.DECRYPT_MODE, publicKey);
        byte[] result = cipher.doFinal(cipherText);

        return new String(result);
    }

    public static void main(String[] args) throws Exception {
        String plainText = "true";
        Cryptography crypt = new Cryptography("RSA");
        KeyPair pair = crypt.generator.generateKeyPair();

        byte[] cipherText = crypt.encrypt(plainText, pair.getPrivate());
        System.out.print("The encrypted text is: ");
        System.out.println(
                DatatypeConverter.printHexBinary(
                        cipherText));

        String decryptedText = crypt.decrypt(cipherText, pair.getPublic());
        System.out.println(
                "The decrypted text is: "
                        + decryptedText);
    }


}
