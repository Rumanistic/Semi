package com.example.demo.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.web.bind.annotation.RestController;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;

@Data
@Entity
@RestController
@EntityListeners(AuditingEntityListener.class)
public class Review {
   
   @Id
   @Column(name = "REVIEW_NO")
   private Long reviewNo;                //리뷰갯수번호
   
   
	@Column(name="EVENT_ID")
	private Long eventId;                //테마번호
   
   @Column(name = "REVIEW_CONTENT")
   private String reviewContent;          //후기내용
   
   private String userId;                //유저아이디
   
   @Column(name = "RATING")
   private double rating;            //평점
   
   @CreatedDate
	@Column(name="CREATE_DATE")
	private LocalDateTime createDate;  //등록일
}
