package com.example.demo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

	@GetMapping("/{page}")
	public ResponseEntity<HashMap<String, Object>> getAllList(@PathVariable(name="page") String type) {
		HashMap<String, Object> result = new HashMap<>();
		double point = 0.0d;
		
		// event 모든 리스트 쿼리
		List<Event> eList = new ArrayList<>();
		Event e1 = new Event();
		e1.setEventNo(1l);
		e1.setTitle("이벤트1");
		e1.setStartDate("2024.09.01");
		e1.setEndDate("2024.09.14");
		eList.add(e1);
		
		// review group by event_no 쿼리
		HashMap<Long, Double> rPoint = new HashMap<>();
		rPoint.put(1l, 3.5d);
		
		/* 의사코드
		 * 인터페이스 domain/ReviewPoint.java
		 * 	(
		 * 	 Long getEventId(EVENT_ID), 
		 * 	 Double getReviewPointAverage(avg(RATE))
		 * 	)
		 * for(ReviewPoint rp : reviewService.getReviewPointAvg()){
		 * 	rPoint.put(rp.getEventId, rp.getReviewPointAverage);
		 * }
		 */
		
		result.put("eList", eList);
		result.put("rPoint", rPoint);
		
		return ResponseEntity.ok().body(result);
	}
	
	@GetMapping("/{eventNo}")
	public Event eventinfo(@PathVariable(name="eventNo") Long eventNo) {
		System.out.println("이벤트 번호 : " +  eventNo);
		return eventService.eventinfo(eventNo).get();
	}
	
	
	
}