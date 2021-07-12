package com.digdir.issuer.credentials;



import java.util.HashMap;
import java.util.Map;

public record CredentialSubject(String claimType, String type, String name) {


    /**
     * @param claimType =  type of credentialSubject i.e. age, degree
     * @param type      = type of claimType i.e. over-18, over-20
     * @param name      = human-readable name i.e. Over 18, Over 20
     */
    public CredentialSubject {
    }


    public Map<String, Object> getCredentialSubjectAsMap() {
        Map<String, Object> credentialSubject = new HashMap<>();
        Map<String, String> credentialSubjectType = new HashMap<>();
        credentialSubjectType.put("type", this.type);
        credentialSubjectType.put("name", this.name);

        credentialSubject.put(claimType, credentialSubjectType);

        return credentialSubject;
    }


}
