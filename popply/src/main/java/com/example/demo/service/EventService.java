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
		return eventRepository.findAll();
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

	public Optional<Event> eventinfo(Long eventNo) {
		return eventRepository.findById(eventNo);
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

	
}
