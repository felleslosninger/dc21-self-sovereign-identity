
package com.example.verifier;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.util.List;

@SpringBootApplication
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class SpringbootApp {

	private Requester credentialReq = new Requester("http://localhost:8083/api/getCredential/");
	private Requester keyReq = new Requester("http://localhost:8083/api/key/");
	private SignatureVerifier sv = new SignatureVerifier();

	public SpringbootApp() throws URISyntaxException {
	}

	public static void main(String[] args) {
		SpringApplication.run(SpringbootApp.class, args);
	}

	@GetMapping("/api/hello")
	public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
		return String.format("Hello %s!", name);
	}


	@GetMapping("/api/verify")
	public boolean verify() throws Exception {

		List<Object> list = credentialReq.getCredentialInfo();
		PublicKey key = keyReq.getKeyByID((String) list.get(0));

		return sv.verifySignature((Credential) list.get(1), (byte[]) list.get(2), new AsymmetricKeyGenerator("RSA").generateKeyPair().getPublic());
	}


}
            