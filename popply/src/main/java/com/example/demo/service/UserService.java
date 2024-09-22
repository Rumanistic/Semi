package com.example.demo.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.domain.Users;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    //아이디 중복체크
    public Optional<Users> findByUserId(String userId) {
        return userRepository.findById(userId);
    }
    
    public Optional<Users> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    public Users saveUser(Users user) {
        return userRepository.save(user); // 회원 정보 저장
    }
    
    public Map<String, Object> loginUser(String userIdOrEmail, String password) {
        Map<String, Object> result = new HashMap<>();
        Optional<Users> loginUser;

        // 이메일인지 아이디인지 구분
        if (userIdOrEmail.contains("@")) {
            loginUser = userRepository.findByEmail(userIdOrEmail);
        } else {
            loginUser = Optional.ofNullable(userRepository.findByUserId(userIdOrEmail));
        }

        if (loginUser.isPresent()) {
            Users foundUser = loginUser.get();
            if (passwordEncoder.matches(password, foundUser.getUserPwd())) {
                result.put("success", true);
                result.put("message", "로그인 성공");
                result.put("userId", foundUser.getUserId());
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
    // 이메일로 아이디 찾기
    public Optional<String> findUserIdByEmail(String email) {
        return userRepository.findByEmail(email).map(Users::getUserId);
    }
    
 // 아이디, 이메일, 전화번호로 사용자 검증
    public boolean verifyUserByIdEmailAndPhone(String userId, String email, String phone) {
        Users user = userRepository.findByUserIdAndEmailAndPhone(userId, email, phone);
        return user != null;
    }

    // 비밀번호 변경
    public boolean changePassword(String userId, String newPassword) {
        Users user = userRepository.findByUserId(userId);
        if (user != null) {
            user.setUserPwd(newPassword); // 새로운 비밀번호를 userPwd 필드에 저장
            userRepository.save(user);
            return true;
        }
        return false;
    }
    @Autowired
    private PasswordEncoder passwordEncoder;

    // 사용자가 입력한 정보가 모두 일치하면 회원 삭제
    public boolean deleteUser(String userId, String userPwd, String phone, String email) {
        Optional<Users> userOptional = Optional.of(userRepository.findByUserIdAndEmailAndPhone(userId, email, phone));
        if (userOptional.isPresent()) {
            Users user = userOptional.get();

            // 비밀번호 일치 확인
            if (passwordEncoder.matches(userPwd, user.getUserPwd())) {
                userRepository.delete(user);
                return true;
            }
        }
        
        return false;
    }
    
 // 회원 정보 수정
    public boolean updateUserInfo(Users updatedUser) {
        Optional<Users> userOptional = userRepository.findById(updatedUser.getUserId());

        if (userOptional.isPresent()) {
            Users existingUser = userOptional.get();

            // 수정할 정보를 업데이트합니다.
            existingUser.setName(updatedUser.getName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPhone(updatedUser.getPhone());

            // 변경된 정보를 저장합니다.
            userRepository.save(existingUser);
            return true;
        } else {
            return false; // 사용자를 찾을 수 없음
        }
    }
    
  
}
