package com.example.verifier;

import java.security.PrivateKey;
import java.security.Signature;

public class Signing {



    private  final String SIGNING_ALGORITHM;


    public Signing(String algorithm) {
        this.SIGNING_ALGORITHM = algorithm;
    }

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
