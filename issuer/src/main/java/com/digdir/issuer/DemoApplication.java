package com.digdir.issuer;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.digdir.issuer.credentials.old.Credential;
import com.digdir.issuer.jwt.Jwt;
import com.digdir.issuer.service.VcService;
import com.digdir.issuer.storage.JwtTypeHandler;
import com.digdir.issuer.jwt.JwtVerifier;
import com.digdir.issuer.old.Signing;
import com.digdir.issuer.storage.FileHandler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Cipher;
import java.net.URISyntaxException;
import java.security.PublicKey;
import java.security.interfaces.RSAPublicKey;
import java.util.Arrays;
import java.util.Collections;


@SpringBootApplication
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class DemoApplication {
    VcService vcService = new VcService();

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(DemoApplication.class);
        app.setDefaultProperties(Collections.singletonMap("server.port", 8083));
        //SpringApplication.run(DemoApplication.class, args);

        app.run(args);
    }

    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {

        return String.format("Hello %s!", name);

    }

    @GetMapping("/keys")
    public String keys() throws Exception {
        KeyGenerator keyGen = new KeyGenerator();
        Credential credential = new Credential("Digdir", "Over 18 år");
        Signing signing = new Signing(keyGen.getPrivateKey(), credential);

        byte[] signature = signing.getSignature();
        boolean res = false;
        try {
            res = decryptSignature(signature, keyGen.getPublicKey(), credential);
        } catch (Exception e) {
            System.out.println("Problems in the /keys endpoint. Located in issuer spring boot server.");
        }

        return String.format("Decryption result:    %s ",res);

    }
//
//    /**
//     * Route that handles issuance of certain VC, it requiers a valid baseVC to be input
//     *
//     * @param type Type of credential, that is checked in the "database" if the type exists
//     * @param baseVC The VC gotten from the baseId issuer by logging in through id-porten.
//     * @return A VC in the format of a JWT, this is signed with issuer public key and can be verified by verifier by gettting that key from the VDR
//     * @throws URISyntaxException If the URI is of wrong format.
//     */
//    @GetMapping("/api/getVC")
//    public String getVC(@RequestParam(value = "type", defaultValue = "defaultType") String type, @RequestParam(value = "baseVC", defaultValue = "defaultVC") String baseVC) throws URISyntaxException {
//        return vcService.getVC(type, baseVC);
//    }

    /**
     * Route to get a public key based on the issuer id.
     * This class should be in VDR
     *
     * @param id issuerId for a given signature to get the corresponding Public key.
     * @return Public RSA key in string format
     */
    @GetMapping("/api/key/{id}")
    public String getKey(@PathVariable String id) {
        FileHandler fileHandler = new FileHandler();
        try{
            System.out.println(fileHandler.getPublicKeyAsString(id));
            return fileHandler.getPublicKeyAsString(id);
        }catch (Exception e){
            System.out.println("No key found.");
            return "No key found with this id";
        }
    }

    /**
     * Old route that doesnt need a valid baseId to make VC
     * @param type type of VC wanted
     * @return VC based on the type of VC wanted in the jwt format.
     */
    @Deprecated
    @GetMapping("/api/getCredential/{type}")
    public String getCredential(@PathVariable String type) {
        // må finne løsning for å unngå hardkoding av subjectId og issuerId
        JwtTypeHandler jth = new JwtTypeHandler();

        try {
            Jwt jwt = new Jwt("testSub", "testIss", jth.getVcType(type), jth.getClaimType(type), type, jth.getName(type));
            return jwt.getToken();

        } catch(Exception e) {
            e.printStackTrace();
            return "Cannot make credential of this type. Available types: " + jth.getTypes();

        }
    }

//    /**
//     * Route that redirects to id-porten and after user login gets an id-porten token.
//     * Token is used to issue a baseId, that is signed to be used and verified by other issuers.
//     *
//     * @param principal id-token object
//     * @param model TODO What is model?
//     * @return baseId token in the format of a jwt-String
//     * @throws Exception If the input to JWT is wrong, a multitude of exceptions can be thrown :)
//     */
//    @GetMapping("/protectedpage")
//    public String getProtectedPage(@AuthenticationPrincipal OidcUser principal, Model model) throws Exception {
//        Jwt jwt = new Jwt(principal.getClaim("pid").toString(), "GrunnID-portalen.no", "BaseCredential", "baseid", "BaseID", "BaseID");
//        System.out.println("ID-PORTEN TOKEN:   " + principal.getIdToken().getTokenValue());
//        System.out.println(model.toString());
//        return jwt.getToken();
//    }

    /**
     * Old verification method, used to verifi signatures on JSON objects
     * @param signature The signature part of a sent JSON object
     * @param publicKey The corresponding public key of the privat key used to sign
     * @param message The message/payload of a JSON object. aka. the thing that was hashed and signed.
     * @return true if signature is valid. i.e. message is not tampered with.
     * @throws Exception if format is wrong, errors will be thrown
     */
    public boolean decryptSignature(byte[] signature, PublicKey publicKey, Credential message) throws Exception {

        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, publicKey);
        byte[] decryptedMessageHash = cipher.doFinal(signature);

        System.out.println(new String(message.stringifier().getBytes()));
        return Arrays.equals(decryptedMessageHash, message.stringifier().getBytes());
    }


}