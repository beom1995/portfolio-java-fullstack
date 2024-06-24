package com.spring.portfolio.tag.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.portfolio.common.dto.PageRequestDTO;
import com.spring.portfolio.common.dto.PageResponseDTO;
import com.spring.portfolio.project.dto.ProjectResponse;
import com.spring.portfolio.project.entity.Project;
import com.spring.portfolio.tag.dto.TagResponse;
import com.spring.portfolio.tag.entity.Tag;
import com.spring.portfolio.tag.repository.TagRepository;
import com.spring.portfolio.tag.service.TagService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tag")
public class TagController {

    private final TagService tagService;

    @Autowired
    public TagController(TagService tagService) {
    	this.tagService = tagService;
    }

    @GetMapping
    public ResponseEntity<List<TagResponse>> getAllTags() {
        List<Tag> tags = tagService.getAllTags();
        List<TagResponse> tagResponses = tags.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(tagResponses);
    }
    
    @GetMapping("/{tagName}")
    public PageResponseDTO<ProjectResponse, Project> getProjectByTag(PageRequestDTO pageRequest, @PathVariable String tagName) {
		return tagService.getProjectsByTagName(pageRequest, tagName);
	}

    private TagResponse convertToResponse(Tag tag) {
        return new TagResponse(tag.getTagId(), tag.getTagName());
    }
}