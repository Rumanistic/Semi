package com.example.demo.repository;

import com.example.demo.domain.Users;

import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, String> {
    Optional<Users> findByEmail(String email);

	Optional<Users> findById(String id);

	Optional<Users> findByUserPwd(String userPwd);

	User save(User user);
}
