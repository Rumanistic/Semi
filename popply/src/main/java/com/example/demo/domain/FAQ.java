package com.example.demo.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Entity
@Table(name="FAQ")
@NoArgsConstructor
@AllArgsConstructor
public class FAQ {
	@Id
	@SequenceGenerator(
				name="SEQ_FAQ_NO",
				sequenceName="SEQ_FAQ_NO",
				allocationSize=1
			)
	@GeneratedValue(generator="SEQ_FAQ_NO")
	private Long no;
	
	// USER 테이블 ID 외래키 사용
	@NonNull
	@Column(name="ID", nullable=false)
	private String id;
	
	@NonNull
	@Column(name="QUESTION")
	private String question;
	
	@NonNull
	@Column(name="ANSWER")
	private String answer;

	@CreatedDate
	@Column(name="CREATED_DATE", insertable=false, updatable=false, columnDefinition="DATE DEFAULT SYSDATE")
	private LocalDateTime createdDate;

	@LastModifiedDate
	@Column(name="MODIFIED_DATE")
	private LocalDateTime modifiedDate;
	
	// 오라클에선 Boolean 타입 JPA 매핑 시, 자동으로 NUMBER(1)로 지정한다고 함
	@Column(name="IS_DELETED", insertable=false, columnDefinition="NUMBER(1) DEFAULT 0")
	private boolean isDeleted;
	
	@Column(name="DELETED_DATE")
	private LocalDateTime deletedDate;
}
