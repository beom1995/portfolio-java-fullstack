package com.spring.portfolio.project.dto;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.querydsl.core.annotations.QueryProjection;
import com.spring.portfolio.projectfile.dto.ProjectfileResponse;
import com.spring.portfolio.tag.entity.Tag;
import com.spring.portfolio.user.dto.UserResponse;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ProjectResponse {

	private Long projectId;
	private String projectTitle;
	private UserResponse user;
	private Tag tag;
	private List<ProjectfileResponse> files = new ArrayList<>();

	@QueryProjection
	@Builder
	public ProjectResponse(Long projectId, String projectTitle, UserResponse user, Tag tag,List<ProjectfileResponse> files) {
		super();
		this.projectId = projectId;
		this.projectTitle = projectTitle;
		this.user = user;
		this.tag = tag;
		this.files = files;
	}
	
}
