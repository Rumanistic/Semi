package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.Users;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    PasswordEncoder passwordEncoder;
    
    @GetMapping("/test")
    public @ResponseBody String testfunction() {
    	return "success";
    }

    @PostMapping("/signup")
    public void signUp(@RequestBody Users user) {
        // 비밀번호 암호화
        String encryptedPassword = passwordEncoder.encode(user.getUserPwd());
        user.setUserPwd(encryptedPassword);

        // 계정 타입(type) 설정: 0: 관리자, 1: 기획자, 2: 사업자, 3: 일반 사용자
        int accountType = user.getType(); // 클라이언트에서 전달된 타입 값 사용
        user.setType(accountType); // 타입 값을 DB에 저장

        // 회원 정보 저장
        userService.saveUser(user);
    }
    
    @PostMapping("/check-username/{userId}")
    public boolean checkUsername(@PathVariable(name="userId") String userId) {
        return !userService.findByUserId(userId).isPresent();  // 존재하지 않으면 true 반환
    }
    

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> loginData) {
        Map<String, Object> result = new HashMap<>();
        String userIdOrEmail = loginData.get("userIdOrEmail"); // 아이디 또는 이메일
        String password = loginData.get("userPwd"); // 입력된 비밀번호
        Optional<Users> loginUser;

        // 이메일인지 아이디인지 구분
        if (userIdOrEmail.contains("@")) {
            // 이메일로 검색
            loginUser = userRepository.findByEmail(userIdOrEmail);
        } else {
            // 아이디로 검색 (이미 있는 메서드 사용)
            loginUser = Optional.ofNullable(userRepository.findByUserId(userIdOrEmail));
        }

        // 사용자 존재 여부 확인
        if (loginUser.isPresent()) {
            Users foundUser = loginUser.get();

            // 비밀번호 검증
            if (passwordEncoder.matches(password, foundUser.getUserPwd())) {
                result.put("success", true);
                result.put("message", "로그인 성공");
                result.put("userId", foundUser.getUserId()); // 성공 시 사용자 ID 반환
                result.put("name", foundUser.getName());
                result.put("type", foundUser.getType());
            } else {
                result.put("success", false);
                result.put("message", "비밀번호가 잘못되었습니다.");
            }
        } else {
            result.put("success", false);
            result.put("message", "아이디 또는 이메일이 존재하지 않습니다.");
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
    
    // 회원 탈퇴
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
    
    @PostMapping("/verify-password")
    public ResponseEntity<Map<String, Object>> verifyPassword(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        String userPwd = request.get("userPwd");

        Map<String, Object> response = new HashMap<>();
        Optional<Users> userOpt = userService.findByUserId(userId);

        if (userOpt.isPresent() && passwordEncoder.matches(userPwd, userOpt.get().getUserPwd())) {
            Users user = userOpt.get();
            response.put("success", true);
            response.put("userInfo", Map.of(
                    "userId", user.getUserId(),
                    "name", user.getName(),
                    "email", user.getEmail(),
                    "phone", user.getPhone()
            ));
        } else {
            response.put("success", false);
        }

        return ResponseEntity.ok(response);

}
    
    // 회원 정보 수정
    @PostMapping("/update-user-info")
    public Map<String, Object> updateUserInfo(@RequestBody Users userInfo) {
        Map<String, Object> response = new HashMap<>();

        boolean isUpdated = userService.updateUserInfo(userInfo);

        if (isUpdated) {
            response.put("success", true);
            response.put("message", "회원 정보가 수정되었습니다.");
        } else {
            response.put("success", false);
            response.put("message", "회원 정보 수정에 실패했습니다.");
        }

        return response;
    }
    
   

}
