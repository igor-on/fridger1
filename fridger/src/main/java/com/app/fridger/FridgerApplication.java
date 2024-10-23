package com.app.fridger;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FridgerApplication {

	public static void main(String[] args) {
		SpringApplication.run(FridgerApplication.class, args);
	}

}
