package com.spring.portfolio.project.dto;

import lombok.Data;
import lombok.Getter;

@Data
public class CreateProjectRequest {
	private String userName;
	private String tagId;
	private String projectTitle;
}
