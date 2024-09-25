package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.config.ImageManager;
import com.example.demo.domain.Event;
import com.example.demo.domain.ReviewPoint;
import com.example.demo.service.EventService;
import com.example.demo.service.ReviewService;

@Controller
@RequestMapping("/event")
public class EventController {

	@Autowired
	private EventService eventService;
	
	@Autowired
	private ReviewService reviewService;
	
	ImageManager im = new ImageManager();

	@GetMapping("/popup/lists")
	public ResponseEntity<HashMap<String, Object>> getAllList() {
		HashMap<String, Object> result = new HashMap<>();
		
		List<Event> eList = eventService.getAllList();

		// review group by event_no 쿼리
		HashMap<Long, Double> rPoint = new HashMap<>();
		List<ReviewPoint> rPoints = reviewService.getReviewPointAvg();
		
		for(ReviewPoint rp : rPoints) {
			rPoint.put(rp.getEventNo(), rp.getReviewPointAvg());
		}
		
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
	
	@PostMapping("/register/test")
	public ResponseEntity<Void> registerTestEvent(@RequestBody Event e){
		eventService.registerEvent(e);
		
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping("/submit")
	public ResponseEntity<Void> submitEvent(@RequestBody Event e) throws Exception{
//		eventService.registerEvent(e);
		System.out.println(e);
		String company = e.getCompany();
		String content = e.getContent();
		
		
		
		HashMap<String, String> resultSet = im.saveImage(content, company);
		e.setImages(resultSet.get("images"));
		e.setContent(resultSet.get("content"));
		
		eventService.registerEvent(e);
		
		return ResponseEntity.noContent().build();
	}
	
	
	
	@GetMapping("/popup/tags")
	public ResponseEntity<String> getAllTags(){
		return ResponseEntity.ok().body(eventService.getAllTags());
	}
	
	@GetMapping("/popup/lists/search/tags")
	public ResponseEntity<HashMap<String, Object>> getSearchListByTag(
				@RequestParam(name="tags") String tags
			){
		String[] tag = tags.split(",");
		System.out.println(tags);
		System.out.println(tag);
		
		HashMap<String, Object> result = new HashMap<>();
		
		List<Event> eList = eventService.getSearchListByTag(tag);
		
		System.out.println("Controller: " + eList.toString());
		// review group by event_no 쿼리
		HashMap<Long, Double> rPoint = new HashMap<>();
		rPoint.put(1l, 3.5d);
		
		
		result.put("eList", eList);
		result.put("rPoint", rPoint);
		
		System.out.println(result);
		return ResponseEntity.ok().body(result);
	}
	
	@PutMapping("/{no}")
	public ResponseEntity<HashMap<String, String>> editEvent(
			@PathVariable(name="no") Long eventNo,
			@RequestBody Event e
		) throws Exception{
		System.out.println(e);
		String curDir = e.getCompany() + e.getCreatedDate().toLocalDate().toString().replaceAll("-", "");
		
		HashMap<String, String> resultSet = im.editImage(e.getContent(), e.getCompany(), curDir);
		e.setImages(resultSet.get("images"));
		e.setContent(resultSet.get("content"));
		
		eventService.registerEvent(e);
		
		return ResponseEntity.noContent().build();
	}
	
	
	@DeleteMapping("/{no}")
	public ResponseEntity<HashMap<String, String>> deleteEvent(
				@PathVariable(name="no") Long eventNo
			){
		HashMap<String, String> result = new HashMap<>();
		Event e = eventService.findEventByNo(eventNo).get();
		if(e != null) {
			e.setDeleted(true);
			eventService.deleteEvent(e);
			result.put("result", "success");
			result.put("msg", "성공적으로 삭제되었습니다.");
			return ResponseEntity.ok().body(result);			
		}
		return ResponseEntity.notFound().build();
	}
}