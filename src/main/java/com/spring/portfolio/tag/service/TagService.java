package com.spring.portfolio.tag.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.spring.portfolio.common.dto.PageRequestDTO;
import com.spring.portfolio.common.dto.PageResponseDTO;
import com.spring.portfolio.project.dto.ProjectResponse;
import com.spring.portfolio.project.entity.Project;
import com.spring.portfolio.project.repository.ProjectRepository;
import com.spring.portfolio.tag.dto.TagProjectResponse;
import com.spring.portfolio.tag.entity.Tag;
import com.spring.portfolio.tag.repository.TagRepository;
import com.spring.portfolio.user.dto.UserProjectResponse;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;
    private final ProjectRepository projectRepository;

    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    public Optional<Tag> getTagByName(String tagName) {
        return tagRepository.findByTagNameIgnoreCase(tagName);
    }
    
    @Transactional
    public PageResponseDTO<ProjectResponse, Project> getProjectsByTagName(PageRequestDTO pageRequest, String tagName) {
    	Tag tag = tagRepository.findByTagNameIgnoreCase(tagName)
    						   .orElseThrow(() -> new NoSuchElementException("태그가 존재하지 않습니다."));
		Pageable pageable = PageRequest.of(pageRequest.getPage(), pageRequest.getSize());
		Page<Project> result = projectRepository.findAllByTag(tag, pageable);

		Function<Project, ProjectResponse> fn = (entity -> convertToProjectResponse(entity));
		
		return new PageResponseDTO<>(result, fn);
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