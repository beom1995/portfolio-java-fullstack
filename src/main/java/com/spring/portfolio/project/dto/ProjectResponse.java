package com.spring.portfolio.project.dto;

import java.util.ArrayList;
import java.util.List;

import com.spring.portfolio.projectfile.dto.ProjectfileProjectResponse;
import com.spring.portfolio.tag.dto.TagProjectResponse;
import com.spring.portfolio.tag.entity.Tag;
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
	private List<ProjectfileProjectResponse> files = new ArrayList<>();
	
	@Builder
	public ProjectResponse(Long projectId, String projectTitle, UserProjectResponse user, TagProjectResponse tag,
			List<ProjectfileProjectResponse> files) {
		super();
		this.projectId = projectId;
		this.projectTitle = projectTitle;
		this.user = user;
		this.tag = tag;
		this.files = files;
	}
}
