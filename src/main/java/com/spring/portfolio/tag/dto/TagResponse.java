package com.spring.portfolio.tag.dto;

import lombok.Getter;

@Getter
public class TagResponse {
    private int tagId;
    private String tagName;

    public TagResponse() {}

    public TagResponse(int tagId, String tagName) {
        this.tagId = tagId;
        this.tagName = tagName;
    }

}