package com.example.demo.controller;


import java.time.LocalDateTime;
import java.util.HashMap;
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

import com.example.demo.domain.Answer;
import com.example.demo.domain.UserSupport;
import com.example.demo.service.AnswerService;
import com.example.demo.service.UserSupportService;

/**
 * 고객지원 페이지용 Controller<br>
 * 고객지원(support) Domain -> Support.java<br>
 * 
 * @author rumanistic
 * @version 0.1
 */
@Controller
@RequestMapping("/supports/usersupport")
public class UserSupportController {
	
	@Autowired
	UserSupportService ss;
	
	@Autowired
	AnswerService as;
	
	/**
	 * 포스트맨 API 테스트용
	 * @return success
	 */
	@GetMapping("/test")
	public @ResponseBody String test() {
		return "success";
	}
	
	@GetMapping
	public ResponseEntity<List<UserSupport>> getAllUserSupports() {
		Boolean isDeleted = false;
		List<UserSupport> sList = ss.getAllSupports(isDeleted);
		if(sList != null) {
			return ResponseEntity.ok().body(sList);
		}
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
	
	@GetMapping("/{no}")
	public ResponseEntity<HashMap<String,Object>> getOneUserSupport(@PathVariable(name="no") Long no){
		UserSupport s = ss.getSupport(no);
		Answer a = as.getAnswer(no);

		HashMap<String, Object> result = new HashMap<>();
		result.put("support", s);
		if(a != null) {
			result.put("answer", a);
			return ResponseEntity.ok().body(result);			
		} else {
			result.put("answer", null);
			return ResponseEntity.ok().body(result);
		}
	}
	
	@PostMapping("/register")
	public ResponseEntity<Void> setUserSupport(@RequestBody UserSupport s) {
		ss.setSupport(s);
		
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	/**
	 * 고객지원 문의 글 수정
	 * 관리자의 답변이 달리지 않은 글만 수정 가능
	 * @param no 고객지원 등록 글 번호
	 * @param newSupport 고객지원 글 수정 내용 객체
	 * @return 200 ok 게시글 수정 가능
	 */
	@PutMapping("/{no}")
	public ResponseEntity<HashMap<String, Object>> editUserSupport(
				@PathVariable(name="no") Long no,
				@RequestBody UserSupport newSupport
			) {
		UserSupport s = ss.getSupport(no);
		if(s != null) {
			return ResponseEntity.noContent().build();
		}
		// 실패 시
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
	
	@DeleteMapping("/{no}")
	public ResponseEntity<Void> deleteFAQ(
				@PathVariable(name="no") Long no
			) {
		UserSupport s = ss.getSupport(no);
		if(s != null) {
			s.setDeleted(true);
			s.setDeletedDate(LocalDateTime.now());
			ss.deleteSupport(s);
			// 성공 시
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		// 실패 시
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
}
