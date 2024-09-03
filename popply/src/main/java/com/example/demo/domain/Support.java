package com.example.demo.domain;

import java.time.LocalDate;

import org.springframework.data.annotation.CreatedDate;

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
@Table(name="SUPPORT")
@NoArgsConstructor
@AllArgsConstructor
public class Support {
	@Id
	@SequenceGenerator(
				name="SEQ_SUPPORT_NO",
				sequenceName="SEQ_SUPPORT_NO",
				allocationSize=1
			)
	@GeneratedValue(generator="SEQ_SUPPORT_NO")
	private Long no;
	
	@NonNull
	@Column(name="ID", nullable=false)
	private String id;
	
	@NonNull
	@Column(name="TITLE")
	private String title;
	
	@NonNull
	@Column(name="CONTENT")
	private String content;
	
	@NonNull
	@Column(name="REPLY")
	private String reply;
	
	@Column(name="TYPE")
	private int type;
	
	@CreatedDate
	@Column(name="CREATED_DATE", insertable=false, updatable=false, columnDefinition="DATE DEFAULT SYSDATE")
	private LocalDate createdDate;
	
	@Column(name="IS_DELETED", insertable=false, columnDefinition="NUMBER(1) DEFAULT 0")
	private boolean isDeleted;
	
	@Column(name="DELETED_DATE")
	private LocalDate deletedDate;
}
