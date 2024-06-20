package com.spring.portfolio.projectfile.entity;

import java.util.ArrayList;
import java.util.List;

import com.spring.portfolio.project.entity.Project;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Projectfile {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "file_id")
	private Long fileId;
	
	@Column(name = "file_path")
	private String filePath;
	
	@Column(name = "file_name")
	private String fileName;
	
	@Column(name = "file_original_name")
	private String fileOriginalName;
	
	@Column(name = "file_size")
	private Long fileSize;
	
	@ManyToOne
	@JoinColumn(name = "project_id")
	private Project project;
	
}
