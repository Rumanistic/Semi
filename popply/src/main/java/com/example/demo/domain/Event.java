package com.example.demo.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
@Entity(name="EVENT")
@EntityListeners(AuditingEntityListener.class)
public class Event {
	
	@Id
	@Column(name="EVENT_NO")
	private Long enventNo;

	@NonNull
	@Column(name="USER_ID")
	private String userId;
	
	@NonNull
	private String name;
	
	@NonNull
	private String title;
	
	@NonNull
	private String company;
	
	@CreatedDate
	@Column(name="CREATE_DATE")
	private LocalDateTime createDate;
	
	@NonNull
	@Column(name="OPEN_TIME")
	private String openTime;
	
	@NonNull
	@Column(name="CLOSE_TIME")
	private String closeTime;
	
	@NonNull
	private String type;
	
	@NonNull
	private String content;
	
	private String caution;
	
	@NonNull
	private String location;
	
	private String sns;
	
	
	
	
}
