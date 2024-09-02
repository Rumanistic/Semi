package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.domain.FAQ;
import com.example.demo.domain.Support;
import com.example.demo.service.SupportService;
/**
 * 고객지원 페이지용 Controller<br>
 * 고객지원(support) Domain -> Support.java<br>
 * 
 * @author rumanistic
 * @version 0.1
 */
@Controller
@RequestMapping("/support")
public class SupportController {
	
	@Autowired
	SupportService ss;
	
	@GetMapping("/test")
	public @ResponseBody String test() {
		return "success";
	}
	
	@GetMapping
	public ResponseEntity<List<Support>> getAllSupports() {
		List<Support> sList = ss.getAllSupports();
		if(sList != null) {
			return ResponseEntity.ok().body(sList);
		}
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
	
	@PostMapping("/new")
	public ResponseEntity<Void> setFAQ(@RequestBody Support s) {
		ss.setSupport(s);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@PutMapping("/{no}")
	public ResponseEntity<Void> editFAQ(
				@PathVariable(name="no") Long no,
				@RequestBody Support newSupport
			) {
		Support s = ss.getSupport(no);
		if(s != null) {
			if(s.getReply() != null) {
				String msg = "";
			}
			// 성공 시
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		// 실패 시
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
}
