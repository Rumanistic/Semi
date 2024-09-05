package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.Event;
import com.example.demo.service.EventService;

@RestController
@RequestMapping("/event")
public class EventController {
	@Autowired
	EventService eventService;
	
	@GetMapping("/detail/{eventNo}")
	public Event eventinfo(@PathVariable(name="eventNo") Long eventNo) {
		System.out.println("이벤트 번호 : " +  eventNo);
		return eventService.eventinfo(eventNo).get();
	}
	
	
	
}