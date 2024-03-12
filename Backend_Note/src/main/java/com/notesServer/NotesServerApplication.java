package com.notesServer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class NotesServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(NotesServerApplication.class, args);
	}

}
