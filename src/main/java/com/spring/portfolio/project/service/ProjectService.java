package com.spring.portfolio.project.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.function.Function;

import org.springframework.dao.DuplicateKeyException;
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
import com.spring.portfolio.user.entity.User;
import com.spring.portfolio.user.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProjectService {
	
	private final ProjectRepository projectRepository;
	private final UserRepository userRepository;
	private final TagRepository tagRepository;
	
	// User 기준으로 모든 Project 찾기
	@Transactional
	public List<Project> getAllProjectsByUserName(String userName) {
		User user = userRepository.findByUserName(userName)
								  .orElseThrow(() -> new NoSuchElementException("유저 없음"));
		
		List<Project> projectList = projectRepository.findAllByUser(user);
		return projectRepository.findAllByUser(user);
	}

	// ProjectId로 Project 찾기
	@Transactional
	public Project getProjectByProjectId(Long projectId) {
		return projectRepository.findById(projectId)
								.orElseThrow(() -> new NoSuchElementException("프로젝트 없음"));
	}
	
	// UserName 및 ProjectTitle로 Project 찾기
	@Transactional
	public Project getProjectByUserAndProjectTitle(String userName, String projectTitle) {
		User user = userRepository.findByUserName(userName)
								  .orElseThrow(() -> new NoSuchElementException("유저 없음"));

		return projectRepository.findByUserAndProjectTitle(user, projectTitle);
	}
	
	// Project List Pagination
	@Transactional
	public PageResponseDTO<ProjectResponse, Project> getProjectPageList(PageRequestDTO pageRequest, String UserName) {
		
		User user = userRepository.findByUserName(UserName)
								  .orElseThrow(() -> new NoSuchElementException("유저 없음"));
		Pageable pageable = PageRequest.of(pageRequest.getPage(), pageRequest.getSize());
		Page<Project> result = projectRepository.findAllByUser(user, pageable);

		Function<Project, ProjectResponse> fn = (entity -> convertToProjectResponse(entity));
		
		return new PageResponseDTO<>(result, fn);
	}
	
//	 Project 추가
	@Transactional
	public Project addProject(String userName, int tagId, String projectTitle) {
		User user = userRepository.findByUserName(userName)
								  .orElseThrow(() -> new NoSuchElementException("유저 없음"));
		
		Tag tag = tagRepository.findById(tagId)
							   .orElseThrow(() -> new NoSuchElementException("태그 없음"));
		
		Project project = Project.builder()
								 .user(user)
								 .projectTitle(projectTitle)
								 .tag(tag)
								 .build();
		
		projectRepository.save(project);
		
		return project;
		
	}
	
	// ProjectTitle 중복 확인
	@Transactional
	public String checkProjectTitle(String userName, String projectTitle) {
		User user = userRepository.findByUserName(userName)
								  .orElseThrow(() -> new NoSuchElementException("유저 없음"));
		boolean result = projectRepository.existsByProjectTitleAndUser(projectTitle, user);
		
		if(result) {
			throw new DuplicateKeyException("프로젝트 이름 중복");
		}
		
		return projectTitle;
	}
	
	@Transactional
	public void deleteProjectByProjectId(Long projectId) {
		Project project = projectRepository.findById(projectId)
										   .orElseThrow(() -> new NoSuchElementException("유저 없음"));
		projectRepository.delete(project);
	}
	
	public ProjectResponse convertToProjectResponse(Project project) {
		
		ProjectResponse projectResponse = ProjectResponse.builder()
														 .projectId(project.getProjectId())
														 .projectTitle(project.getProjectTitle())
														 .user(UserProjectResponse.builder()
																 				  .userId(project.getUser().getUserId())
																 				  .userName(project.getUser().getUserName())
																 				  .build())
														 .tag(TagProjectResponse.builder()
																 				.tagId(project.getTag().getTagId())
																 				.tagName(project.getTag().getTagName())
																 				.build())
														 .build();
		return projectResponse;
														 
	}

	// project search pagination
	public PageResponseDTO<ProjectResponse, Project> searchProjectsByKeyword(String keyword, PageRequestDTO pageRequest){
		Pageable pageable = PageRequest.of(pageRequest.getPage(), pageRequest.getSize());
		
		Page<Project> projects = projectRepository.findByProjectTitleContainingIgnoreCase(keyword, pageable);
		
		Function<Project, ProjectResponse> fn = (entity -> convertToProjectResponse(entity));
		
		return new PageResponseDTO<>(projects, fn);
	}
}
	
