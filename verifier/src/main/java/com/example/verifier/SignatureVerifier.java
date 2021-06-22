package com.example.verifier;

import javax.xml.bind.DatatypeConverter;
import java.nio.charset.StandardCharsets;
import java.security.*;

public class SignatureVerifier {


    public PublicKey mockPublicKeyIssuer;
    public byte[] mockCipherText;


    public boolean verifySignature(byte[] input, byte[] signatureToVerify, PublicKey key) throws Exception {
        Signature signature = Signature.getInstance(Signing.SIGNING_ALGORITHM);
        signature.initVerify(key);
        signature.update(input);
        return signature.verify(signatureToVerify);
    }

    public boolean mockVerify() throws Exception {
         String content = "true";

         //issuer
        AsymmetricKeyGenerator akg = new AsymmetricKeyGenerator("RSA");
        KeyPair pair = akg.generateKeyPair();
        mockPublicKeyIssuer = pair.getPublic();
        Cryptography crypt = new Cryptography("RSA");
        byte[] cipherText = crypt.encrypt(content,pair.getPrivate());
        mockCipherText = cipherText;

        Signing signing = new Signing();
        byte[] signature= signing.sign(cipherText, pair.getPrivate());

        //wallet
        AsymmetricKeyGenerator akg2 = new AsymmetricKeyGenerator("RSA");
        KeyPair pair2 = akg.generateKeyPair();
        Signing signing2 = new Signing();
        byte[] signature2 = signing2.sign(signature, pair2.getPrivate());

        //verify wallet
        SignatureVerifier sv2 = new SignatureVerifier();
        boolean verifyWallet = sv2.verifySignature(signature, signature2,pair2.getPublic());

        //verify issuer
        SignatureVerifier sv = new SignatureVerifier();
        boolean verifyIssuer = sv.verifySignature(cipherText, signature, pair.getPublic());



        return verifyIssuer && verifyWallet;
    }


    public static void main(String[] args) throws Exception {
        String input = "input testing";
        Cryptography crypt = new Cryptography("RSA");
        KeyPair cryptPair =crypt.getGenerator().generateKeyPair();

        byte[] cipher = crypt.encrypt(input, cryptPair.getPrivate());

        KeyPair pair = new AsymmetricKeyGenerator("RSA").generateKeyPair();
        Signing signing = new Signing();
        byte[] signature = signing
                .sign(cipher, pair.getPrivate());

        System.out.println(
                "Signature Value:\n "
                        + DatatypeConverter
                        .printHexBinary(signature));

        SignatureVerifier sv = new SignatureVerifier();
        System.out.println(
                "Verification: "
                        + sv.verifySignature(
                        cipher,
                        signature, pair.getPublic()));

        String decrypted = crypt.decrypt(cipher, cryptPair.getPublic());
        System.out.println(decrypted);
    }

}
