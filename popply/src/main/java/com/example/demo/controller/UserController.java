package com.example.demo.controller;

import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


import com.example.demo.domain.Users;
import com.example.demo.service.UserService;

@Controller
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserService userService;
	
	// 회원가입
	@PostMapping("/signup")
	public ResponseEntity<User> signup (@RequestBody Users user) {
		Users newUser = userService.register(user);
		return ResponseEntity.created(URI.create("/user/" + newUser.getUserId())).build();
	}
	
	// 로그인
	@PostMapping("/login")
    public ResponseEntity<Log> login(@RequestBody Users user) {
        Optional<Users> loggedInUser = userService.login(user.getId(), user.getEmail(), user.getPassword());

        if (loggedInUser.isPresent()) {
            return ResponseEntity.ok(loggedInUser.get()); 
        } else {
            return ResponseEntity.status(401).body("아이디/이메일 또는 비밀번호가 일치하지 않습니다"); 
        }
    }

	// 회원정보수정
    @PutMapping("/resetPassword")
    public ResponseEntity<User> resetPasswrod(@RequestParam String email, @RequestParam String newPassword) {
    	Optional<User> updatedUser = userService.resetPassword(email, newPassword);
    	
    	if(updatedUser.isPresent()) {
    		return ResponseEntity.ok(updatedUser.get());
    	} else {
    		return ResponseEntity.notFound().build();
    	}
    } 
    
	// 회원탈퇴
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable(name = "id") Long id) {
    	userService.deleterUser(id);
    	return ResponseEntity.noContent().build();
    }
}
	
	
	
/*
 * @GetMapping("/{id}") public ResponseEntity<Users>
 * getUserById(@PathVariable(name = "id") Long id) { Optional<Users> user =
 * userService.findById(id); if(user.isPresent()) { return
 * ResponseEntity.ok(user.get()); } else { return
 * ResponseEntity.notFound().build(); }
 * 
 * }
 * 
 * @GetMapping public ResponseEntity<Users> getUserByEmail(@PathVariable(name =
 * "email") String email) { Optional<Users> user =
 * userService.findByEmail(email); if(user.isPresent()) { return
 * ResponseEntity.ok(user.get()); } else { return
 * ResponseEntity.notFound().build(); } }
 */
	