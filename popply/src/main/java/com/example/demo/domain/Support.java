package com.example.demo.domain;

import java.time.LocalDateTime;

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
	@Column(name="SUPPORT_NO")
	private Long supportNo;
	
	@NonNull
	@Column(name="USER_ID", nullable=false)
	private String userId;
	
	@NonNull
	@Column(name="TITLE")
	private String title;
	
	@NonNull
	@Column(name="INQUIRY")
	private String inquiry;
	
	@NonNull
	@Column(name="REPLY")
	private String reply;
	
	@Column(name="TYPE")
	private int type;
	
	@CreatedDate
	@Column(name="CREATED_DATE", insertable=false, updatable=false, columnDefinition="DATE DEFAULT SYSDATE")
	private LocalDateTime createdDate;
	
	@Column(name="IS_DELETED", insertable=false, columnDefinition="NUMBER(1) DEFAULT 0")
	private boolean isDeleted;
	
	@Column(name="DELETED_DATE")
	private LocalDateTime deletedDate;
}
