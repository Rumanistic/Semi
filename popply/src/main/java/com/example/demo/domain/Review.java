package com.example.demo.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Review {

    @Id
    private Long id; // 리뷰 ID

    private String content; // 리뷰 내용
    private int rating; // 별점
    private Long eventNo; // 이벤트 번호

}
