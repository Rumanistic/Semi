package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.Event;
import com.example.demo.service.EventService;

@RestController
@RequestMapping("/api")
public class EventController {
	@Autowired
	EventService eventService;
	
	@GetMapping("/event")
	public List<Event> eventinfo() {
		return eventService.eventinfo();
	}
	
}
