package com.example.issuer;

import com.google.gson.Gson;
import org.json.JSONException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.sql.rowset.serial.SerialStruct;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.security.*;

public class Signing {
    private byte[] signature;
    public static final String SIGNING_ALGORITHM = "SHA256withRSA";


    public Signing(PrivateKey privateKey, String message) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException, SignatureException, JSONException {
        Signature signature = Signature.getInstance(SIGNING_ALGORITHM);
        signature.initSign(privateKey);
        signature.update(message.getBytes(StandardCharsets.UTF_8));
        this.signature = signature.sign();
    }

    public Signing(PrivateKey privateKey, Credential message) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException, SignatureException {
        Signature signature = Signature.getInstance(SIGNING_ALGORITHM);
        signature.initSign(privateKey);
        signature.update(message.stringifier().getBytes(StandardCharsets.UTF_8));
        this.signature = signature.sign();
    }

    public byte[] getSignature(){
        return this.signature;
    }


    public String getSignatureAsString() {
        Gson gson = new Gson();
        String jsonString = gson.toJson(this.signature);
        return jsonString;
    }


}
