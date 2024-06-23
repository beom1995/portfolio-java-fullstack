package com.spring.portfolio.tag.controller;

import com.spring.portfolio.project.dto.ProjectResponse;
import com.spring.portfolio.project.entity.Project;
import com.spring.portfolio.project.service.ProjectService;
import com.spring.portfolio.tag.dto.TagResponse;
import com.spring.portfolio.tag.entity.Tag;
import com.spring.portfolio.tag.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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
    public ResponseEntity<List<ProjectResponse>> getProjectsByTag(@PathVariable String tagName) {
        List<ProjectResponse> projects = tagService.findProjectsByTagName(tagName);
        return ResponseEntity.ok(projects);
    }

    private TagResponse convertToResponse(Tag tag) {
        return new TagResponse(tag.getTagId(), tag.getTagName());
    }
}