package com.spring.portfolio.tag.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spring.portfolio.project.entity.Project;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
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
public class Tag {

	@Id
	@Column(name = "tag_id")
	private int tagId;
	
	@Column(name = "tag_name")
	private String tagName;
	
	@OneToMany(mappedBy = "tag")
	@ToString.Exclude
	private List<Project> projects;
	
	@Builder
	public Tag(int tagId, String tagName, List<Project> projects) {
		super();
		this.tagId = tagId;
		this.tagName = tagName;
		this.projects = projects;
	}
	
}
