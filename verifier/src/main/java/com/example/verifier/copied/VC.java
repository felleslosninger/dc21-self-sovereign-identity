package com.example.verifier.copied;

import java.util.HashMap;
import java.util.Map;

public class VC {
    private final String[] context;
    private final String[] type;
    private final Map<String, Object> credentialSubject;

    public VC(String type, Map<String, Object> credentialSubject){
        this.context = new String[]{"https://www.w3.org/2018/credentials/v1"};
        this.type = new String[]{"VerifiableCredential" , type};
        this.credentialSubject = credentialSubject;

    }


    public Map<String, Object> getVCMap(){
        Map<String,Object> vc = new HashMap<>();
        vc.put("@context", context);
        vc.put("type", type);
        vc.put("credentialSubject", this.credentialSubject);
        return vc;
    }


}
