package com.example.demo.service;


import com.example.demo.domain.Users;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
	
	 public Optional<Users> login(String email, String password) {
	     Optional<Users> userOpt = userRepository.findByEmail(email);
	     if (userOpt.isPresent()) {
	    	 Users user = userOpt.get();
	    	 if (passwordEncoder.matches(password, (String) user.getPassword())) {
	    		 return Optional.of(user);
	    	 }
	     }
	     return Optional.empty();
	 }
	 
	 public boolean idConfirm(String id) {
		 return userRepository.findById(id).isPresent();
	 }
	
	 public Optional<Users> findByEmail(String email) {
		 return userRepository.findByEmail(email);
	 }
	 
	 public Users editUser(Users user) {
	     return userRepository.save(user);
	 }
	
	 public void deleteById(String userPWD) {
	     userRepository.deleteById(userPWD);;
 	}

//	public void userInsert(Users user) {
//		
//	}
//
//	public void deleteUser(String userId) {
//		
//	}
//	public void updateUser(Users user) {
//	
//	}

}





