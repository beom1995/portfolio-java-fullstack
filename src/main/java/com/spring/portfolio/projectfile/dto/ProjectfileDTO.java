package com.spring.portfolio.projectfile.dto;

import com.spring.portfolio.project.entity.Project;

import lombok.Builder;
import lombok.Data;

@Data
public class ProjectfileDTO {

	private Long fileId;
	
	private String filePath;
	
	private String fileName;
	
	private String fileOriginalName;
	
	private Long fileSize;
	
	private Project project;

	@Builder
	public ProjectfileDTO(Long fileId, String filePath, String fileName, String fileOriginalName, Long fileSize, Project project) {
		super();
		this.fileId = fileId;
		this.filePath = filePath;
		this.fileName = fileName;
		this.fileOriginalName = fileOriginalName;
		this.fileSize = fileSize;
		this.project = project;
	}

}

