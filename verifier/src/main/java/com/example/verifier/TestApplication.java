package com.example.verifier;

import org.springframework.util.Assert;

import java.nio.charset.StandardCharsets;
import java.security.KeyPair;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.util.Arrays;

public class TestApplication {

    public static void main(String[] args) throws Exception {

        String input = "testing input";
        Cryptography c = new Cryptography("RSA");
        KeyPair cryptKeys = c.getGenerator().generateKeyPair();

        byte[] ciphertext = c.encrypt(input, cryptKeys.getPrivate());

        FileHandler fh = new FileHandler();
        fh.clearFile();
        fh.addToFile("issuer1_pk1", cryptKeys.getPublic());

   /*     PublicKey publicKeyFromFile = fh.getKeyByID("issuer1_pk1");
        String decryptedMessage = c.decrypt(ciphertext, publicKeyFromFile);
        System.out.println("Decrypted message: " + decryptedMessage);
        System.out.println(Arrays.equals(decryptedMessage.getBytes(StandardCharsets.UTF_8), input.getBytes(StandardCharsets.UTF_8)));
        System.out.println(input.equals(decryptedMessage));*/

        KeyPair issuerKeys = c.getGenerator().generateKeyPair();
        Signing signing = new Signing();
        byte[] signature = signing.sign(ciphertext, issuerKeys.getPrivate());
        fh.addToFile("issuer1_pk2", issuerKeys.getPublic());

        KeyPair walletKeys = c.getGenerator().generateKeyPair();
        byte[] signature2 = signing.sign(ciphertext, walletKeys.getPrivate());
        fh.addToFile("wallet_pk", walletKeys.getPublic());


        SignatureVerifier sv = new SignatureVerifier();
        System.out.println(
                sv.verifySignature(ciphertext, signature, fh.getKeyByID("issuer1_pk2"))
        );
        System.out.println(
                sv.verifySignature(ciphertext, signature2, fh.getKeyByID("wallet_pk"))
        );

        String decryptedMessage = c.decrypt(ciphertext, fh.getKeyByID("issuer1_pk1"));
        System.out.println("Decrypted message: " + decryptedMessage);

    }

}
