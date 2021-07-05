
package com.example.verifier;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.apache.catalina.connector.Connector;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatConnectorCustomizer;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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
	private String key = null;
	private Credential credential = null;

	public SpringbootApp() throws URISyntaxException {
	}

	public static void main(String[] args) {
		SpringApplication.run(SpringbootApp.class, args);
	}


	@GetMapping("/api/hello")
	public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
		return String.format("Hello %s!", name);
	}


	@PostMapping("/api/sendCredential")
	public ResponseEntity sendCredential(@RequestBody String credential) throws Exception {
		System.out.println("Cred string" + credential);
		Gson gson = new Gson();
		Credential cred = gson.fromJson(credential, Credential.class);
		this.credential = cred;
		System.out.println(cred.stringifier());
		return new ResponseEntity<>("credential:" + this.credential.stringifier(),
				HttpStatus.OK);
	}



	@PostMapping("/api/postKey")
	public ResponseEntity postKey(@RequestBody String key) {

		this.key = key;
		System.out.println(key);
		return new ResponseEntity(HttpStatus.OK);
	}

	@GetMapping("/api/checkVerified")
	public boolean checkVerify() {
		return this.verified;
	}




}
            