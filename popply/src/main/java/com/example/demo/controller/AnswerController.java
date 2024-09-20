package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.domain.Answer;
import com.example.demo.service.AnswerService;

@Controller
@RequestMapping("/answer")
public class AnswerController {
	
	@Autowired
	AnswerService as;

	@PostMapping("/usersupport/{no}")
	public ResponseEntity<Void> registerUserSupportAnswer(@RequestBody Answer a){
		return ResponseEntity.noContent().build();
	}
}
