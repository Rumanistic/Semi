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
		// TODO Auto-generated method stub
		return null;
	}

	public void setSupport(Support s) {
		// TODO Auto-generated method stub
		
	}

	public Support getSupport(Long no) {
		// TODO Auto-generated method stub
		return null;
	}
}
