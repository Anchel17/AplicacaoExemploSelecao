package com.esig.quarkrh;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
public class QuarkrhApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuarkrhApplication.class, args);
	}

}
