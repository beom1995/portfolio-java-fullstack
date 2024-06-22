package com.spring.portfolio.user.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spring.portfolio.project.entity.Project;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor
@ToString
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private int userId;
	
	@Column(name = "user_name")
	private String userName;
	
	@Column(name = "user_password")
	private String userPw;
	
	@OneToMany(mappedBy = "user")
	@ToString.Exclude
	private List<Project> projects;
	
	@Builder
	public User(int userId, String userName, String userPw, List<Project> projects) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.userPw = userPw;
		this.projects = projects;
	}
	
}
