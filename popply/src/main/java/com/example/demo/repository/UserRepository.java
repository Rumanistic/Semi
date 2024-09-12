package com.example.demo.repository;

import com.example.demo.domain.Users;

import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, String> {
    Optional<Users> findByEmail(String email);

	Optional<Users> findById(Long id);

	Optional<Users> findByPassword(String password);

	User save(User user);

	

}
