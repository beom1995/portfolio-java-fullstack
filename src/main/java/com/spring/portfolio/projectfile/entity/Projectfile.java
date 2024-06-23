package com.spring.portfolio.projectfile.entity;

<<<<<<< Updated upstream
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;
=======
>>>>>>> Stashed changes
import com.spring.portfolio.project.entity.Project;
import com.spring.portfolio.tag.entity.Tag;
import com.spring.portfolio.user.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Getter
@ToString
@Entity
@Getter
@NoArgsConstructor
@ToString
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
	@ToString.Exclude
	private Project project;

	@Builder
	public Projectfile(Long fileId, String filePath, String fileName, String fileOriginalName, Long fileSize, Project project) {
		this.fileId = fileId;
		this.filePath = filePath;
		this.fileName = fileName;
		this.fileOriginalName = fileOriginalName;
		this.fileSize = fileSize;
		this.project = project;
	}
	
	@Builder
	public Projectfile(Long fileId, String filePath, String fileName, String fileOriginalName, Long fileSize,
			Project project) {
		super();
		this.fileId = fileId;
		this.filePath = filePath;
		this.fileName = fileName;
		this.fileOriginalName = fileOriginalName;
		this.fileSize = fileSize;
		this.project = project;
	}
	
}
