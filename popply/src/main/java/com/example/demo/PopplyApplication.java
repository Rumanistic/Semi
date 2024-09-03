package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
@Controller
public class PopplyApplication {

	public static void main(String[] args) {
		SpringApplication.run(PopplyApplication.class, args);
	}
}
