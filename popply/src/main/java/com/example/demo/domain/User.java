package com.example.demo.domain;

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
@Table(name="User")
@NoArgsConstructor
@AllArgsConstructor
public class User {
	@Column(name="USER_ID")
	private String userId;
	
	@Id
	@SequenceGenerator(
				name="SEQ_USER_NO",
				sequenceName="SEQ_USER_NO",
				allocationSize=1
			)
	@GeneratedValue(generator="SEQ_USER_NO")
	@Column(name="USER_NO")
	private Long userNo;
	
	@NonNull
	@Column(name="USER_PWD")
	private String userPwd;
	
}
