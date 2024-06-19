package com.spring.portfolio.project.entity;

import java.util.List;

import com.spring.portfolio.common.entity.BaseEntity;
import com.spring.portfolio.file.entity.File;
import com.spring.portfolio.tag.entity.Tag;
import com.spring.portfolio.user.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Project extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "project_id")
	private Long projectId;
	
	@Column(name = "project_title")
	private String projectTitle;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "tag_id")
	private Tag tag;
	
	@OneToMany(mappedBy = "fileId")
	private List<File> files;
}
