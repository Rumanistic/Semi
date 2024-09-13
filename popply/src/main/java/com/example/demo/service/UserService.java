package com.example.demo.service;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.domain.Users;
import com.example.demo.repository.UserRepository;

import lombok.NonNull;

	@Service
	public class UserService {
	
	 @Autowired
	 private UserRepository userRepository;
	
	 @Autowired
	 private PasswordEncoder passwordEncoder;
	
	 public Users register(Users user) {
	     user.setUserPwd(passwordEncoder.encode((CharSequence) user.getUserPwd()));
	     return userRepository.save(user);
	 }
	
	 public Optional<Users> login(String userId) {
	     Optional<Users> userLog = userRepository.findById(userId);
	     return userLog;
	 }
	     
	 public Users registerUser(Users user) {
		 return userRepository.save(user);
	 }

	public Optional<Users> resetPassword(String email, String newPassword) {
		Optional<Users> user = userRepository.findByEmail(email);
		if(user.isPresent()) {
			Users foundUser = user.get();
			foundUser.setUserPwd(newPassword);
			return Optional.of(userRepository.save(foundUser));
		} else {
			return Optional.empty();
		}
	}


	public Optional<Users> login(String userId, @NonNull String email, Object password) {
		// TODO Auto-generated method stub
		return null;
	}

	public void deleterUser(String userId) {
		// TODO Auto-generated method stub
		
	}

	
	/* public Optional<Users> findById(Long id) { return
	 * userRepository.findById(id); }
	 * 
	 * public Optional<Users> findByPassword(String password) { return
	 * userRepository.findByPassword(password); }
	 */	
	
	
	

}





