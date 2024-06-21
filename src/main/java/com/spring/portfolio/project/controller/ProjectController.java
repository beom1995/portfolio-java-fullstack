package com.spring.portfolio.project.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.portfolio.project.dto.ProjectResponse;
import com.spring.portfolio.project.entity.Project;
import com.spring.portfolio.project.repository.ProjectRepository;
import com.spring.portfolio.project.service.ProjectService;
import com.spring.portfolio.tag.entity.Tag;
import com.spring.portfolio.tag.repository.TagRepository;
import com.spring.portfolio.user.entity.User;
import com.spring.portfolio.user.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ProjectController {
	
	private final ProjectService projectService;
	private final UserRepository userRepository;
	private final ProjectRepository projectRepository;
	private final TagRepository tagRepository;
	
	@GetMapping("/api/projects/{userName}")
	public ResponseEntity<List<ProjectResponse>> getAllProjectByUser(@PathVariable("userName") String userName) {
		List<ProjectResponse> data = new ArrayList<>();
		
		try {
			List<Project> projectList = projectService.getAllProjectsByUserName(userName);
			for(Project project : projectList) {
				data.add(projectService.convertToProjectResponse(project));
			}
		} catch(NoSuchElementException e) {
			return new ResponseEntity<List<ProjectResponse>>(data, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<List<ProjectResponse>>(data, HttpStatus.OK);
	}
	
	@GetMapping("/api/project-search/1")
	public String getProjectByProjectId() {
		projectService.getProjectByProjectId(1L);
		return "Search Success";
	}
	
//	public ResponseEntity<List<Project>> getAllProjectsByUser(@PathVariable String userName) {
//		User user = userRepository.findByUserName(userName)
//									  .orElseThrow(() -> new NoSuchElementException("유저 없음"));
//		List<Project> data = projectService.getAllProjectsByUser(user);
//		
//		return new ResponseEntity<>(data, HttpStatus.OK);
//	}
	
	@Transactional
	@PostMapping("/api/project-create")
	public String addProjectDummy() {
		User user = userRepository.findById(1).orElseThrow(() -> new NoSuchElementException("유저 없음"));
		Tag tag = tagRepository.findById(1).orElseThrow(() -> new NoSuchElementException("태그 없음"));
		
		Project project = Project.builder()
								 .projectTitle("My Project")
								 .user(user)
								 .tag(tag)
								 .build();
		
		projectRepository.save(project);
		
//		for(int i = 0; i < 8 ; i++) {
//			for(int j = 1; j <= 8; j ++) {
//				Tag tag = tagRepository.findById(j).orElseThrow(() -> new NoSuchElementException("태그 없음"));
//				Project project = Project.builder()
//										 .projectTitle("Test" + i + j)
//										 .user(user)
//										 .tag(tag)
//										 .build();
//				projectRepository.save(project);
//				}
//			}
		
		return "project add success";
	}
	
	
	@PostMapping("/api/project")
	public ResponseEntity<Project> addProject(@RequestBody int userId, @RequestBody int tagId, @RequestBody String projectTitle) {
		System.out.println(userId);
		Project data = null;
		
		try {
			data = projectService.addProject(userId, tagId, projectTitle);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<Project>(data, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<Project>(data, HttpStatus.OK);
	}
	
	// User의 단일 프로젝트 페이지 가져오기
	@GetMapping("/api/project/{userName}/{projectTitle}")
	public ResponseEntity<ProjectResponse> getProjectByUserNameAndProjectTitle(@PathVariable("userName") String userName, @PathVariable("projectTitle") String projectTitle) {
		
		ProjectResponse data = null;
		
		try {
//			Project project = projectService.getProjectByprojectId(projectId);
			Project project = projectService.getProjectByUserAndProjectTitle(userName, projectTitle);
			System.out.println(project);
			data = projectService.convertToProjectResponse(project);
		} catch(NoSuchElementException e) {
			return new ResponseEntity<ProjectResponse>(data, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ProjectResponse>(data, HttpStatus.OK);
	}


}
