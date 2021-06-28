
package com.example.verifier;
import org.apache.catalina.connector.Connector;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatConnectorCustomizer;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
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
	private boolean verified =false;

	public SpringbootApp() throws URISyntaxException {
	}

	public static void main(String[] args) {
		SpringApplication.run(SpringbootApp.class, args);
	}


	@GetMapping("/api/hello")
	public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
		return String.format("Hello %s!", name);
	}


	@GetMapping("/api/verify/{credential}")
	public String verifyCredential(@PathVariable String credential) throws Exception {
		System.out.println("Received");
		/*
		List<Object> list = credentialReq.stringToCredentialInfo(credential);
		PublicKey key = keyReq.getKeyByID((String) list.get(0));

		boolean verified = sv.verifySignature((Credential) list.get(1), (byte[]) list.get(2), key);
		System.out.println(verified);
		*/
		// NOT ACTUALLY VERIFIED
		System.out.println(credential.getClass());
		this.verified = true;
		return "received from wallet";
	}

	@GetMapping("/api/checkVerified")
	public boolean checkVerify() {
		return this.verified;
	}




}
            