package com.digdir.issuer.old;

import com.digdir.issuer.KeyGenerator;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;

public class KeyStoreHandler {
    private KeyStore keyStore;
    private final KeyGenerator kg;

    public KeyStoreHandler() throws CertificateException, IOException, NoSuchAlgorithmException, KeyStoreException {
        KeyStore keyStore = KeyStore.getInstance(KeyStore.getDefaultType());
        keyStore.load(null, null);
        try (FileOutputStream fos = new FileOutputStream("newKeyStoreFileName.jks")) {
            keyStore.store(fos, null);
        }
        this.keyStore = KeyStore.getInstance("JKS");
        this.kg = new KeyGenerator();
        keyStore.load(new FileInputStream("newKeyStoreFileName.jks"), null);
    }

    public void storePublicKey(KeySaver keySaver) throws KeyStoreException {
        keyStore.setKeyEntry(keySaver.getId().stringifier(), keySaver.getKeyGenerator().getPublicKey().getEncoded(), null);
        store();
    }


    public void createStorage() throws KeyStoreException, CertificateException, IOException, NoSuchAlgorithmException {
        keyStore = KeyStore.getInstance(KeyStore.getDefaultType());
        char[] keyStorePassword = "passord".toCharArray();
        keyStore.load(null, null);
        try(FileOutputStream fos = new FileOutputStream("newKeyStore.jks")) {
            keyStore.store(fos, keyStorePassword);
        }
    }

    private void store(){
        char[] keyStorePassword = "123abc".toCharArray();
        try (FileOutputStream keyStoreOutputStream = new FileOutputStream("data/keystore.ks")) {
            keyStore.store(keyStoreOutputStream, keyStorePassword);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
