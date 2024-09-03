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

@Data
@Entity
@Table(name="ANSWER")
@NoArgsConstructor
@AllArgsConstructor
public class Answer {
	@Id
	@SequenceGenerator(
				name="SEQ_ANSWER_NO",
				sequenceName="SEQ_ANSWER_NO",
				allocationSize=1
			)
	@GeneratedValue(generator="SEQ_ANSWER_NO")
	@Column(name="ANSWER_ID")
	private Long answerId;
	
}
