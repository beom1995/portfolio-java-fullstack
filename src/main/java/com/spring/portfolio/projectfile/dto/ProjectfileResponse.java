package com.spring.portfolio.projectfile.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.spring.portfolio.project.dto.ProjectResponse;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ProjectfileResponse {
	
//	@JsonProperty(value = "file_id")
	private Long fileId;
	private String filePath;
	private String fileName;
	private String fileOriginalName;
	private Long fileSize;
	private ProjectResponse project;
	
	@Builder
	public ProjectfileResponse (Long fileId, String filePath, String fileName, String fileOriginalName, Long fileSize,
			ProjectResponse project) {
		super();
		this.fileId = fileId;
		this.filePath = filePath;
		this.fileName = fileName;
		this.fileOriginalName = fileOriginalName;
		this.fileSize = fileSize;
		this.project = project;
	}

}
