package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.Support;
import com.example.demo.repository.SupportRepository;

@Service
public class SupportService {

	@Autowired
	SupportRepository sr;

	public List<Support> getAllSupports() {
		return sr.findAll();
	}

	public void setSupport(Support s) {
		sr.save(s);		
	}

	public Support getSupport(Long no) {
		return sr.findById(no).get();
	}

	public void deleteSupport(Support s) {
		sr.save(s);		
	}
}
