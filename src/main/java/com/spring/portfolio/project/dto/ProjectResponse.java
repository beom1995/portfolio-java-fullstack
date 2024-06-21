package com.spring.portfolio.project.dto;

import com.spring.portfolio.tag.dto.TagProjectResponse;
import com.spring.portfolio.user.dto.UserProjectResponse;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProjectResponse {

	private Long projectId;
	private String projectTitle;
	private UserProjectResponse user;
	private TagProjectResponse tag;
	
	@Builder
	public ProjectResponse(Long projectId, String projectTitle, UserProjectResponse user, TagProjectResponse tag) {
		super();
		this.projectId = projectId;
		this.projectTitle = projectTitle;
		this.user = user;
		this.tag = tag;
	}
}
