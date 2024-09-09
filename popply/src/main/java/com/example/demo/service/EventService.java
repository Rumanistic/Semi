package com.example.demo.service;

import com.example.demo.domain.Event;
import com.example.demo.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    // 모든 이벤트 가져오기
    public List<Event> findAllEvents() {
        return eventRepository.findAll();
    }

    // 특정 이벤트 가져오기
    public Optional<Event> findEventById(Long eventNo) {
        return eventRepository.findById(eventNo);
    }
}
