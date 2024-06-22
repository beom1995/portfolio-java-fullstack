package com.spring.portfolio.tag.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TagProjectResponse {

	private int tagId;
	private String tagName;
	
	@Builder
	public TagProjectResponse(int tagId, String tagName) {
		super();
		this.tagId = tagId;
		this.tagName = tagName;
	}
}
