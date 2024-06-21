package com.spring.portfolio.user.dto;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.spring.portfolio.project.dto.ProjectResponse;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
public class UserResponse {
	private int userId;
	private String userName;
	private String userPw;
	private List<ProjectResponse> projects = new ArrayList<>();
	
	@Builder
	public UserResponse(int userId, String userName, String userPw, List<ProjectResponse> projects) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.userPw = userPw;
		this.projects = projects;
	}
	
}
