package com.example.demo.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.domain.Event;
import com.example.demo.service.EventService;

@Controller
@RequestMapping("/detail")
public class EventDetailController {
	
	@Autowired
	private EventService eventService;

    // 특정 이벤트 상세 정보를 반환하는 API
//    @GetMapping("/{no}")
//    public Event getEventById(@PathVariable(name="no") Long eventNo) {
//        // 이벤트 번호가 제대로 들어왔는지 확인하기 위해 로그 출력
//        System.out.println("Received eventNo: " + eventNo);
//        
//        // Optional을 통해 이벤트 번호로 데이터를 찾기
//        Optional<Event> event = eventService.findEventByNo(eventNo);
//        
//        // 해당 이벤트가 존재하면 200 OK 응답, 없으면 404 Not Found
//        System.out.println(event.get().toString());
//        return event.get();
//    }
	@GetMapping("/{no}")
    public ResponseEntity<Event> getEventByNo(@PathVariable(name="no") Long eventNo) {
        // 이벤트 번호가 제대로 들어왔는지 확인하기 위해 로그 출력
        System.out.println("Received eventNo: " + eventNo);
        
        // Optional을 통해 이벤트 번호로 데이터를 찾기
        Optional<Event> event = eventService.findEventByNo(eventNo);
        
        // 해당 이벤트가 존재하면 200 OK 응답, 없으면 404 Not Found
        System.out.println(event.get().toString());
        return ResponseEntity.ok().body(event.get());
    }
}
