package com.bobfriends.bf;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class BfApplication {
	public static void main(String[] args) {
		SpringApplication.run(BfApplication.class, args);
	}

}
