package com.example.verifier;

import java.security.PrivateKey;
import java.security.Signature;

public class Signing {



    public static final String SIGNING_ALGORITHM = "SHA256withRSA";


    public byte[] sign(byte[] input, PrivateKey privateKey) throws Exception {
        Signature signature = Signature.getInstance(SIGNING_ALGORITHM);
        signature.initSign(privateKey);
        signature.update(input);
        return signature.sign();
    }

    public String getSIGNING_ALGORITHM() {
        return SIGNING_ALGORITHM;
    }
}
