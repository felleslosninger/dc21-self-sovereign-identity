package com.example.verifier;

import com.google.gson.Gson;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.nio.charset.StandardCharsets;
import java.security.*;

public class Signing {
    public static final String SIGNING_ALGORITHM = "SHA256withRSA";

    private byte[] signature;


    public Signing(PrivateKey privateKey, Credential message) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException, SignatureException {


        Signature signature = Signature.getInstance(SIGNING_ALGORITHM);
        signature.initSign(privateKey);
        signature.update(message.stringifier().getBytes(StandardCharsets.UTF_8));
        this.signature = signature.sign();
    }


    public byte[] getSignature() {
        return signature;
    }

    public String getSignatureAsString() {
        Gson gson = new Gson();
        String jsonString = gson.toJson(this.signature);
        return jsonString;
    }


}
