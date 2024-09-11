package com.example.demo.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import com.example.demo.domain.Users;
import com.example.demo.service.UserService;

import jakarta.servlet.http.HttpSession;

@Controller
@SessionAttributes({"UserLogin"})
public class UserController {

	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	HttpSession session;
	
	@Autowired 
	UserService userService;
	
	@RequestMapping("/")
	public String root() {
		return "index";
	}
		
	@GetMapping("/register")
	public String register() {
		return "users/register";
	}
	
		
	@GetMapping("/userPage")
	public String userPage() {
		return "users/userPage";
	}
	
	@GetMapping("/idConfirm")
	@ResponseBody
	public boolean idConfirm(@RequestParam("id") String id) {
		return userService.idConfirm(id);
	}

	@PostMapping("/login")
	public String login(@RequestParam String email, @RequestParam String password, Model model, HttpSession session) {
	    Optional<Users> loginUser = userService.login(email, password);
	    if (loginUser.isPresent()) {
	        Users u = loginUser.get();
	        if (passwordEncoder.matches(password, (String) u.getPassword())) {
	            model.addAttribute("UserLogin", u);
	        }
	    }
	   
	    String url = (String) session.getAttribute("boardDetailUrl");
	    if (url == null) {
	        url = "/";
	    }
	    
	    return "redirect:" + url;

	}
	
	@PostMapping("/userInsert")
	public String UserInsert(Users user) {
		String enteredPass = passwordEncoder.encode((CharSequence) user.getPassword());
		user.setPassword(enteredPass);
//		userService.userInsert(user);
		return "redirect:/";
	}
	
	@GetMapping("/logout")
	public String logout(SessionStatus status) {
		if(!status.isComplete())
			status.setComplete();
		return "redirect:/";
	}

	 @GetMapping("/profile")
	 public String showProfile(Model model, @RequestParam String email) {
	     Optional<Users> user = userService.findByEmail(email);
	     model.addAttribute("user", user.get());
	     return "profile";
	 }
	
	 @PostMapping("/profile")
	 public String updateProfile(@ModelAttribute Users user, Model model) {
//	     userService.updateUser(user);
	     return "main";
	 }
	
	 @GetMapping("/delete")
	 public String deleteAccount() {
	     return "delete_account";
	 }
	
	 @PostMapping("/delete")
	 public String deleteAccount(@RequestParam String userId) {
	     userService.deleteById(userId);
	     return "redirect:/user/logout";
	 }
	 
}
