package com.spring.portfolio.project.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.spring.portfolio.project.dto.ProjectResponse;
import com.spring.portfolio.project.entity.Project;
import com.spring.portfolio.project.repository.ProjectRepository;
import com.spring.portfolio.projectfile.dto.ProjectfileProjectResponse;
import com.spring.portfolio.tag.dto.TagProjectResponse;
import com.spring.portfolio.tag.entity.Tag;
import com.spring.portfolio.tag.repository.TagRepository;
import com.spring.portfolio.user.dto.UserProjectResponse;
import com.spring.portfolio.user.entity.User;
import com.spring.portfolio.user.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectService {
	
	private final ProjectRepository projectRepository;
	private final UserRepository userRepository;
	private final TagRepository tagRepository;
	
	// User 기준으로 모든 Project 찾기
	@Transactional
	public List<Project> getAllProjectsByUserName(String userName) {
		User user = userRepository.findByUserName(userName)
								  .orElseThrow(() -> new NoSuchElementException("유저 없음"));
		return projectRepository.findAllByUser(user);
	}

	// ProjectId로 Project 찾기
	@Transactional
	public Project getProjectByProjectId(Long projectId) {
		Project project = projectRepository.findById(3L)
				   .orElseThrow(() -> new NoSuchElementException("프로젝트 없음"));
		System.out.println(project);
		System.out.println("-------");
		String projectTitle = "Test03";
		Project test = projectRepository.findByProjectTitle(projectTitle)
										.orElseThrow(() -> new NoSuchElementException("프로젝트 없음"));
		System.out.println(test);
		System.out.println("-------");
		return projectRepository.findById(projectId)
								.orElseThrow(() -> new NoSuchElementException("프로젝트 없음"));
	}
	
	// UserName 및 ProjectTitle로 Project 찾기
	@Transactional
	public Project getProjectByUserAndProjectTitle(String userName, String projectTitle) {
		User user = userRepository.findByUserName(userName)
								  .orElseThrow(() -> new NoSuchElementException("유저 없음"));
		return projectRepository.findByUserAndProjectTitle(user, projectTitle)
								.orElseThrow(() -> new NoSuchElementException("프로젝트 없음"));
	}
	
	// Project 추가
	@Transactional
	public Project addProject(int userId, int tagId, String projectTitle) {
		User user = userRepository.findById(userId)
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
														 .files(project.getFiles().stream().map(file -> ProjectfileProjectResponse.builder()
																 																  .fileId(file.getFileId())
																 																  .fileName(file.getFileName())
																 																  .fileOriginalName(file.getFileOriginalName())
																 																  .filePath(file.getFilePath())
																 																  .fileSize(file.getFileSize())
																 																  .build())
																 .collect(Collectors.toList()))
														 .build();
		return projectResponse;
														 
	}

}
