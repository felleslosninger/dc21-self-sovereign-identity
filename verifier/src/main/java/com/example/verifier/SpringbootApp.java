
package com.example.verifier;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.security.PublicKey;

@SpringBootApplication
@RestController
public class SpringbootApp {

	private String mockCipherText = "14B327BD174D4C906F862EE3BD16DA3811A9CC0F5560A944934B88A5F436375CCC93259B8D21C7778F9C936510B53E7DE6CC996FB3AC6D3CA8544FE26CBFD284100BB2151888F6E61857ACEA691859B6B9C915BEFEC48E265E32DBA62685C867069D4C71C5CD08DED36E819B4FB89B6BA8DF10E8843C88CA5857D1111A492C614224CB4669EB2CE2F00C2E686959B8AE9C2516C3D655B1A1681F731B79F2C8D80BEABD3945C5DD8BFFDB04E6981F1EDE7800175B9BC720433AD63A4D7C87AB19C252BEE22D0AC21C3F6DBAEFBDCAB80D6EA04BC18C82C3854BF4429AFE1FAA0DF0CC833926FA7B2B349780436C81CE85A9ABCFAC7AE75D21D12DA86504CB5547";
	private FileHandler fh = new FileHandler();

	public static void main(String[] args) {
		SpringApplication.run(SpringbootApp.class, args);
	}

	@GetMapping("/api/hello")
	public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
		return String.format("Hello %s!", name);
	}


	@GetMapping("/api/verify")
	public boolean verify() throws Exception {


		SignatureVerifier sv = new SignatureVerifier();
		boolean signatureOk = sv.mockVerify();

		Cryptography crypt = new Cryptography("RSA");
		String content = crypt.decrypt(sv.mockCipherText, sv.mockPublicKeyIssuer);

		boolean contentOk = true;
		if (!content.equals("true")) {
			contentOk = false;
		}

		return signatureOk && contentOk;
	}

	@GetMapping("/{id}")
	public String getKeyByID(@PathVariable("id") String id) {
		return fh.getPublicKeyAsString(id);
	}

}
            