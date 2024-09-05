package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.UserSupport;
import com.example.demo.repository.UserSupportRepository;

@Service
public class UserSupportService {

	@Autowired
	UserSupportRepository sr;

	public List<UserSupport> getAllSupports(Boolean b) {
		return sr.findByDeleted(b);
	}

	public void setSupport(UserSupport s) {
		sr.save(s);
	}

	public UserSupport getSupport(Long no) {
		return sr.findById(no).get();
	}

	public void deleteSupport(UserSupport s) {
		sr.save(s);		
	}
}