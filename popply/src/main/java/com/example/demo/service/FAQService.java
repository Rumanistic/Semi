package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.FAQ;
import com.example.demo.repository.FAQRepository;

@Service
public class FAQService {
	
	@Autowired
	FAQRepository fr;

	public List<FAQ> getAllFAQs(Boolean b) {
		return fr.findByDeleted(b);
	}
	
	public FAQ getFAQ(Long no) {
		return fr.findById(no).get();
	}
	
	public void setFAQ(FAQ f) {
		fr.save(f);
	}
	
	public void editFAQ(FAQ f) {
		fr.save(f);
	}

	public void deleteFAQ(FAQ f) {
		fr.save(f);
	}

}
