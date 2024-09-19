package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
        String enco = passwordEncoder.encode(user.getUserPwd());
        user.setUserPwd(enco);
        
        // 회원 정보 저장
        userService.saveUser(user);
    }

    @PostMapping("/check-username/{userId}")
    public boolean checkUsername(@PathVariable(name="userId") String userId) {
        return !userService.findByUserId(userId).isPresent();  // 존재하지 않으면 true 반환
    }
    
    // 로그인 처리
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
    
    //아이디 찾기
    @PostMapping("/find-id")
    public Map<String, Object> findIdByEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        // 이메일로 아이디 찾기 로직
        String userId = userService.findUserIdByEmail(email).orElse(null);
        
        Map<String, Object> response = new HashMap<>();
        if (userId != null) {
            response.put("success", true);
            response.put("userId", userId);
        } else {
            response.put("success", false);
            response.put("message", "아이디를 찾을 수 없습니다.");
        }
        
        return response;
    }
    
    // 비밀번호 찾기 및 검증
    @PostMapping("/find-password")
    public Map<String, Object> findPassword(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        String email = request.get("email");
        String phone = request.get("phone"); // 전화번호 필드 이름 수정

        Map<String, Object> response = new HashMap<>();

        // 사용자 검증
        boolean isUserValid = userService.verifyUserByIdEmailAndPhone(userId, email, phone);

        if (isUserValid) {
            response.put("success", true);
            response.put("message", "정보가 확인되었습니다. 새로운 비밀번호를 입력하세요.");
        } else {
            response.put("success", false);
            response.put("message", "아이디, 이메일 또는 전화번호가 일치하지 않습니다.");
        }

        return response;
    }

    // 비밀번호 변경
    @PostMapping("/change-password")
    public Map<String, Object> changePassword(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        String newPassword = request.get("newPassword");

        Map<String, Object> response = new HashMap<>();

        // 새로운 비밀번호 암호화
        String encryptedPassword = passwordEncoder.encode(newPassword);

        // 비밀번호 변경 로직 호출: UserService에서 새 비밀번호를 userPwd에 암호화하여 저장합니다.
        boolean isPasswordChanged = userService.changePassword(userId, encryptedPassword);

        if (isPasswordChanged) {
            response.put("success", true);
            response.put("message", "비밀번호가 성공적으로 변경되었습니다.");
        } else {
            response.put("success", false);
            response.put("message", "비밀번호 변경에 실패했습니다.");
        }

        return response;
    }
    
    @PostMapping("/withdraw")
    public Map<String, String> withdraw(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        String userPwd = request.get("userPwd");
        String phone = request.get("phone");
        String email = request.get("email");

        Map<String, String> response = new HashMap<>();

        // 사용자 검증 및 회원 탈퇴 로직 구현
        boolean isDeleted = userService.deleteUser(userId, userPwd, phone, email);
        
        if (isDeleted) {
            response.put("success", "true");
            response.put("message", "회원 탈퇴가 완료되었습니다.");
        } else {
            response.put("success", "false");
            response.put("message", "회원 탈퇴에 실패했습니다. 입력한 정보를 확인해주세요.");
        }

        return response;
    }

}
