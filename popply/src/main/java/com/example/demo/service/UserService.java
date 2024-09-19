package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

    public Users saveUser(Users user) {
        return userRepository.save(user); // 회원 정보 저장
    }
}
