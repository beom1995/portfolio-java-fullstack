package com.spring.portfolio.tag.entity;

import java.util.ArrayList;
import java.util.List;

import com.spring.portfolio.project.entity.Project;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Tag {

	@Id
	@Column(name = "tag_id")
	private int tagId;
	
	@Column(name = "tag_name")
	private String tagName;
	
	@OneToMany(mappedBy = "projectId")
	private List<Project> projects;
	
}
