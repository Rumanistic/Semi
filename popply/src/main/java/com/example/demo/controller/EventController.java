package com.example.demo.controller;

import com.example.demo.domain.Event;
import com.example.demo.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/event")
public class EventController {

    @Autowired
    private EventService eventService;

    // 이벤트 목록을 반환하는 API
    @GetMapping("/list")
    public ResponseEntity<?> getAllEvents() {
        return ResponseEntity.ok(eventService.findAllEvents());
    }

    // 특정 이벤트 상세 정보를 반환하는 API
    @GetMapping("/{eventNo}")
    public Event getEventById(@PathVariable(name="eventNo") Long eventNo) {
        // 이벤트 번호가 제대로 들어왔는지 확인하기 위해 로그 출력
        System.out.println("Received eventNo: " + eventNo);
        
        // Optional을 통해 이벤트 번호로 데이터를 찾기
        Optional<Event> event = eventService.findEventById(eventNo);
        
        // 해당 이벤트가 존재하면 200 OK 응답, 없으면 404 Not Found
        return event.get();
    }
}
