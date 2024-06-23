package com.spring.portfolio.tag.service;

import com.spring.portfolio.project.dto.ProjectResponse;
import com.spring.portfolio.project.entity.Project;
import com.spring.portfolio.tag.dto.TagProjectResponse;
import com.spring.portfolio.tag.entity.Tag;
import com.spring.portfolio.tag.repository.TagRepository;
import com.spring.portfolio.user.dto.UserProjectResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TagService {

    private final TagRepository tagRepository;

    @Autowired
    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    public Optional<Tag> getTagByName(String tagName) {
        return tagRepository.findByTagNameIgnoreCase(tagName);
    }

    public List<ProjectResponse> findProjectsByTagName(String tagName) {
        List<Project> projects = tagRepository.findProjectsByTagNameIgnoreCase(tagName);
        return projects.stream()
                .map(this::convertToProjectResponse)
                .collect(Collectors.toList());
    }

    private ProjectResponse convertToProjectResponse(Project project) {
        return ProjectResponse.builder()
                .projectId(project.getProjectId())
                .projectTitle(project.getProjectTitle())
                .user(new UserProjectResponse(project.getUser().getUserId(), project.getUser().getUserName()))
                .tag(new TagProjectResponse(project.getTag().getTagId(), project.getTag().getTagName()))
                .build();
    }
}