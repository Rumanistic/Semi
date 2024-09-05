package com.example.demo.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.domain.FAQ;
import com.example.demo.service.FAQService;

@Controller
@RequestMapping("/faqs")
public class FAQController {
	
	@Autowired
	FAQService fs;
	
	/**
	 * FAQ 전체 리스트 호출
	 * @return FAQ List
	 */
	@GetMapping("/test")
	public @ResponseBody String test() {
		return "success";
	}
	
	
	@GetMapping
	public ResponseEntity<List<FAQ>> getAllFAQs() {
		Boolean isDeleted = false;
		List<FAQ> fList = fs.getAllFAQs(isDeleted);
		// 성공 시
		if(fList != null) {
			return ResponseEntity.ok().body(fList);
		}
		// 실패 시
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
	
	/**
	 * FAQ 신규 등록
	 * @return 201
	 */
	@PostMapping("/new")
	public ResponseEntity<Void> setFAQ(@RequestBody FAQ f) {
		fs.setFAQ(f);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
	
	/**
	 * FAQ 수정
	 * @param no 수정할 FAQ 항목의 no
	 * @return {204 | 404}
	 */
	@PutMapping("/{no}")
	public ResponseEntity<Void> editFAQ(
				@PathVariable(name="no") Long no,
				@RequestBody FAQ newFAQ
			) {
		FAQ f = fs.getFAQ(no);
		if(f != null) {
			f.setQuestion(newFAQ.getQuestion());
			f.setAnswer(newFAQ.getAnswer());
			f.setModifiedDate(LocalDateTime.now());
			fs.editFAQ(f);
			// 성공 시
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		// 실패 시
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
	
	/**
	 * FAQ 삭제
	 * @param 
	 * @return {204 | 404}
	 * 
	 */
	@DeleteMapping("/{no}")
	public ResponseEntity<Void> deleteFAQ(
				@PathVariable(name="no") Long no
			) {
		FAQ f = fs.getFAQ(no);
		if(f != null) {
			f.setDeleted(true);
			f.setDeletedDate(LocalDateTime.now());
			fs.deleteFAQ(f);
			// 성공 시
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		// 실패 시
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
	
}
