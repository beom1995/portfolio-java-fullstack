package com.spring.portfolio.tag.controller;

import com.spring.portfolio.tag.dto.TagResponse;
import com.spring.portfolio.tag.entity.Tag;
import com.spring.portfolio.tag.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tags")
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
    public ResponseEntity<TagResponse> getTagByName(@PathVariable String tagName) {
        return tagService.getTagByName(tagName)
                .map(tag -> ResponseEntity.ok(convertToResponse(tag)))
                .orElse(ResponseEntity.notFound().build());
    }

    private TagResponse convertToResponse(Tag tag) {
        return new TagResponse(tag.getTagId(), tag.getTagName());
    }
}