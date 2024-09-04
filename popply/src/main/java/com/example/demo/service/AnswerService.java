package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.Answer;
import com.example.demo.repository.AnswerRepository;

@Service
public class AnswerService {
	
	@Autowired
	AnswerRepository ar;

	public Answer getAnswer(Long no) {
		return ar.findById(no).get();
	}

}
