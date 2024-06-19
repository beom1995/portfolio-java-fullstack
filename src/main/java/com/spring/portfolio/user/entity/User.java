package com.spring.portfolio.user.entity;

import java.util.ArrayList;
import java.util.List;

import com.spring.portfolio.project.entity.Project;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private int userId;
	
	@Column(name = "user_name")
	private String userName;
	
	@Column(name = "user_password")
	private String userPw;
	
	@OneToMany(mappedBy = "projectId")
	private List<Project> projects;
}
