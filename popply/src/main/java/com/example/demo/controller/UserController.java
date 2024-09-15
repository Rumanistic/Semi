package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.Users;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public void signUp(@RequestBody Users user) {
        // 비밀번호 암호화
    	String enco=passwordEncoder.encode(user.getUserPwd());
        user.setUserPwd(enco);
        
        // 회원 정보 저장
       userService.saveUser(user);

       
    }

    @PostMapping("/check-username/{userId}")
    public boolean checkUsername(@PathVariable(name="userId") String userId) {
        return !userService.findByUserId(userId).isPresent();  // 존재하지 않으면 true 반환
    }
    
    // 로그인 처리 (기존 코드)
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Users user) {
        Map<String, Object> result = new HashMap<>();
        Optional<Users> loginUser = userService.findByUserId(user.getUserId());

        if (loginUser.isPresent()) {
            Users foundUser = loginUser.get();

            if (passwordEncoder.matches(user.getUserPwd(), foundUser.getUserPwd())) {
                result.put("success", true);
                result.put("message", "로그인 성공");
            } else {
                result.put("success", false);
                result.put("message", "비밀번호가 잘못되었습니다.");
            }
        } else {
            result.put("success", false);
            result.put("message", "아이디가 존재하지 않습니다.");
        }

        return result;
    }
}
