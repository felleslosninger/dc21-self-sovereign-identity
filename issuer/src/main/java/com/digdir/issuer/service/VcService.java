package com.digdir.issuer.service;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.digdir.issuer.jwt.Jwt;
import com.digdir.issuer.jwt.JwtVerifier;
import com.digdir.issuer.storage.FileHandler;
import com.digdir.issuer.storage.JwtTypeHandler;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import java.net.URISyntaxException;
import java.security.interfaces.RSAPublicKey;

/**
 * Class as a Service for maintaining logic for operations with creating VC's
 */
@Service
public class VcService {

    /**
     * Creates VC of a specific type if:
     *          - Type exists
     *          - BaseVC is correct and verified
     *
     *@param type Type of credential, that is checked in the "database" if the type exists
     *@param baseVC The VC gotten from the baseId issuer by logging in through id-porten.
     *@return A VC in the format of a JWT, this is signed with issuer public key and can be verified by verifier by gettting that key from the VDR
     */
    public String getVC(String type, String baseVC){

        if (type.equals("defaultType") || baseVC.equals("defaultVC")){
            return "Error - Missing URL-parameters";
        }
        JwtVerifier jwtVerifier = new JwtVerifier();
        DecodedJWT decodedJWT = jwtVerifier.decodeJwt(baseVC);
        //System.out.println("JWT:  " + decodedJWT.getToken());
        FileHandler fileHandler = new FileHandler();
        //System.out.println("Issuer PK:  " + fileHandler.getPublicKey(decodedJWT.getIssuer()));
        boolean verified = false;
        try {
            verified = jwtVerifier.verifyVC(decodedJWT.getToken(), (RSAPublicKey) fileHandler.getPublicKey(decodedJWT.getIssuer()));
        } catch (URISyntaxException e) {
            System.out.println("Problem in VcService, problems with verifying");
        }


        JwtTypeHandler jth = new JwtTypeHandler();

        if (verified){
            try {
                Jwt jwt = new Jwt(decodedJWT.getSubject(), "UtsederAvBevis.no", jth.getVcType(type), jth.getClaimType(type), type, jth.getName(type));
                return jwt.getToken();

            } catch(Exception e) {
                e.printStackTrace();
                return "Cannot make credential of this type. Available types: " + jth.getTypes();

            }
        }
        return "BaseID not valid.";
}

    /**
     * Method that generates a Base Verifiable Credential(BaseVC) as a JWT and returns it.
     *
     * @param principal = OidcUser, Authenticated user.
     * @return BaseVC as a JWT-token.
     */
    public String getBaseVC(OidcUser principal){
        Jwt jwt = new Jwt(principal.getClaim("pid").toString(), "GrunnID-portalen.no", "BaseCredential", "baseid", "BaseID", "BaseID");
        System.out.println("ID-PORTEN TOKEN:   " + principal.getIdToken().getTokenValue());
        System.out.println("JWT:   " + jwt.getToken());
        return jwt.getToken();
    }
}
