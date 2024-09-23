package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, String> {
		 Users findByUserIdAndEmailAndPhone(String userId, String email, String phone); // 필드 이름 수정
	 Users findByUserId(String userId);
	Optional<Users> findByEmail(String email);


}
