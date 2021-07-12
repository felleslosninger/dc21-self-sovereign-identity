package com.digdir.issuer.old;

import com.digdir.issuer.KeyGenerator;
import com.digdir.issuer.credentials.old.Credential;

import java.security.Key;
import java.security.NoSuchAlgorithmException;

public class KeySaver {
    private Credential id;
    private Key pk;
    private KeyGenerator keyGenerator;

    public KeySaver(Credential id) {
        this.id = id;
        try {
            KeyGenerator keyGenerator = new KeyGenerator();
            this.keyGenerator = keyGenerator;
            this.pk = keyGenerator.getPublicKey();
        } catch (NoSuchAlgorithmException e) {
            System.out.println("There was a problem creating keys");
        }
    }

    public Credential getId() {
        return id;
    }

    public void setId(Credential id) {
        this.id = id;
    }

    public Key getPk() {
        return pk;
    }

    public void setPk(Key pk) {
        this.pk = pk;
    }

    public void setKeyGenerator(KeyGenerator keyGenerator) {
        this.keyGenerator = keyGenerator;
    }

    public KeyGenerator getKeyGenerator() {
        return keyGenerator;
    }
}
