package com.example.demo.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.Event;
import com.example.demo.repository.EventRepository;

@Service
public class EventService {
	
	@Autowired
	EventRepository eventRepository;
	
	public List<Event> getAllList() {
		return eventRepository.findAllByDeleted(false);
	}
	
	public String getAllTags() {
		List<String> tagsList = eventRepository.findAllBy();
		Set<String> tags = new HashSet<String>();
		for(String s : tagsList) {
			String[] temp = s.split(",");
			tags.addAll(Arrays.asList(temp));
		}
		
		return String.join(",", tags);
	}
	
    // 모든 이벤트 가져오기
    public List<Event> findAllEvents() {
        return eventRepository.findAll();
    }

    // 특정 이벤트 가져오기
    public Optional<Event> findEventByNo(Long eventNo) {
        return eventRepository.findByEventNo(eventNo);
    }
    
	public void registerEvent(Event e) {
		eventRepository.save(e);
	}

	public List<Event> getSearchListByTag(String[] tag) {
		Set<Event> tagSet = new HashSet<>();
		for(String s : tag)
			tagSet.addAll(eventRepository.findAllBy(s));
		
		return new ArrayList<>(tagSet);
	}

	public void deleteEvent(Event e) {
		eventRepository.save(e);
	}
	
	// 삭제되지 않은 이벤트 중 최근 5개만 가져오기
	public List<Event> getRecentEvents() {
	    return eventRepository.findTop8ByDeletedOrderByCreatedDateDesc(false);
	}
}