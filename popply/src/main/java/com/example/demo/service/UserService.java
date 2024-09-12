package com.example.demo.service;


import com.example.demo.domain.Users;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

	@Service
	public class UserService {
	
	 @Autowired
	 private UserRepository userRepository;
	
	 @Autowired
	 private PasswordEncoder passwordEncoder;
	
	 public Users register(Users user) {
	     user.setPassword(passwordEncoder.encode((CharSequence) user.getPassword()));
	     return userRepository.save(user);
	 }
	
	 public Optional<Users> login(Long id, String email, String password) {
	     Optional<Users> userLog = userRepository.findByIdOrEmailAndPassword(id, email, email);
	     
	 public User registerUser(User user) {
		 return userRepository.save(user);
	 }

	public Optional<User> resetPassword(String email, String newPassword) {
		Optional<User> user = userRepository.findByEmail(email);
		if(user.isPresent()) {
			User foundUser = user.get();
			foundUser.setPassword(newPassword);
			return Optional.of(userRepository.save(foundUser));
		} else {
			return Optional.empty();
		}
	}
	
	public void deleteUser(Long id) {
		userRepository.deleteByPassword()
	}

	
	/* public Optional<Users> findById(Long id) { return
	 * userRepository.findById(id); }
	 * 
	 * public Optional<Users> findByPassword(String password) { return
	 * userRepository.findByPassword(password); }
	 */	
	
	
	

}





