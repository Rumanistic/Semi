package com.example.demo.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.domain.Event;
import com.example.demo.service.EventService;
import com.google.code.geocoder.Geocoder;
import com.google.code.geocoder.GeocoderRequestBuilder;
import com.google.code.geocoder.model.GeocodeResponse;
import com.google.code.geocoder.model.GeocoderRequest;
import com.google.code.geocoder.model.GeocoderResult;
import com.google.code.geocoder.model.GeocoderStatus;
import com.google.code.geocoder.model.LatLng;

@Controller
@RequestMapping("/event")
public class EventController {

	@Autowired
	private EventService eventService;

	@GetMapping("/{page}/lists")
	public ResponseEntity<HashMap<String, Object>> getAllList(@PathVariable(name="page") String type) {
		HashMap<String, Object> result = new HashMap<>();
		
		List<Event> eList = eventService.getAllList();

		// review group by event_no 쿼리
		double point = 0.0d;
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
	
	@PostMapping("/register/test")
	public ResponseEntity<Void> registerEvent(@RequestBody Event e){
		eventService.registerEvent(e);
		
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/geocode/test")
	public @ResponseBody String geocodeTest(@RequestParam(name="location") String location) {
		System.out.println(location);
		 GeocoderRequest geocoderRequest = new GeocoderRequestBuilder().setAddress(location).setLanguage("ko").getGeocoderRequest();
		 Double[] coords = new Double[2];
		 
		 try {
		        Geocoder geocoder = new Geocoder();
		        GeocodeResponse geocoderResponse = geocoder.geocode(geocoderRequest);

		        System.out.println(geocoderResponse);
		        if (geocoderResponse.getStatus() == GeocoderStatus.OK & !geocoderResponse.getResults().isEmpty()) {
		            GeocoderResult geocoderResult=geocoderResponse.getResults().iterator().next();
		            LatLng latitudeLongitude = geocoderResult.getGeometry().getLocation();
		            
		            coords[0] = latitudeLongitude.getLat().doubleValue();
		            coords[1] = latitudeLongitude.getLng().doubleValue();
		        }
		    } catch (IOException ex) {
		        ex.printStackTrace();
		    }
		 
		return (coords[0].toString().concat(",").concat(coords[1].toString()));
	}
	
	@GetMapping("/{page}/tags")
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
}