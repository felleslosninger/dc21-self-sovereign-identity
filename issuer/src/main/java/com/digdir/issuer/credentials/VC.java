package com.digdir.issuer.credentials;

import java.util.HashMap;
import java.util.Map;

/**
 * Class for creating a VC
 */
public class VC {
    private final String[] context;
    private final String[] type;
    private final Map<String, Object> credentialSubject;

    /**
     * Construct VC-object with specific type and credentialSubject
     * @param type Type of credential. i.e. AgeCredential, DriverLicenseCredential
     * @param credentialSubject Subject of the VC
     */
    public VC(String type, Map<String, Object> credentialSubject){
        this.context = new String[]{"https://www.w3.org/2018/credentials/v1"};
        this.type = new String[]{"VerifiableCredential" , type};
        this.credentialSubject = credentialSubject;

    }

    /**
     * Construct VC-object with already known type.
     * @param credentialSubject Subject of the VC
     */
    public VC(Map<String, Object> credentialSubject){
        this.context = new String[]{"https://www.w3.org/2018/credentials/v1"};
        this.type = new String[]{"VerifiableCredential"};
        this.credentialSubject = credentialSubject;

    }

    /**
     * Method creates VC as Map and put's context, type and credentialsubject into VC-Map.
     * @return VC as Map
     */
    public Map<String, Object> getVCMap(){
        Map<String,Object> vc = new HashMap<>();
        vc.put("@context", this.context);
        vc.put("type", this.type);
        vc.put("credentialSubject", this.credentialSubject);
        return vc;
    }


}
