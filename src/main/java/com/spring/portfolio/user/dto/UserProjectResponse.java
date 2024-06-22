package com.spring.portfolio.user.dto;

import java.util.ArrayList;
import java.util.List;

import com.spring.portfolio.project.dto.ProjectResponse;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserProjectResponse {

	private int userId;
	private String userName;
	
	@Builder
	public UserProjectResponse(int userId, String userName) {
		super();
		this.userId = userId;
		this.userName = userName;
	}
}
