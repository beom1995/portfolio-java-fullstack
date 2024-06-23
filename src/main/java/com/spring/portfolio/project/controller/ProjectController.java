package com.spring.portfolio.project.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.portfolio.common.dto.PageRequestDTO;
import com.spring.portfolio.common.dto.PageResponseDTO;
import com.spring.portfolio.project.dto.CreateProjectRequest;
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
	
//	@GetMapping("/api/projects/{userName}")
//	public ResponseEntity<List<ProjectResponse>> getAllProjectByUser(@PathVariable("userName") String userName) {
//		List<ProjectResponse> data = new ArrayList<>();
//		
//		try {
//			List<Project> projectList = projectService.getAllProjectsByUserName(userName);
//			for(Project project : projectList) {
//				ProjectResponse projectResponse = projectService.convertToProjectResponse(project);
//				data.add(projectResponse);
//			}
//		} catch(NoSuchElementException e) {
//			return new ResponseEntity<List<ProjectResponse>>(data, HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//		
//		return new ResponseEntity<List<ProjectResponse>>(data, HttpStatus.OK);
//	}
	
	@GetMapping("/api/projects")
	public PageResponseDTO<ProjectResponse, Project> getProjectPage(PageRequestDTO pageRequest, @RequestParam String userName) {
		return projectService.getProjectPageList(pageRequest, userName);
	}
	
	// Project 생성 
	@PostMapping("/api/project")
	public ResponseEntity<ProjectResponse> addProject(@RequestBody CreateProjectRequest createProjectRequest) {
		System.out.println(createProjectRequest.toString());
		ProjectResponse data = null;
		
		try {
			int tagId = Integer.parseInt(createProjectRequest.getTagId());
			Project project = projectService.addProject(createProjectRequest.getUserName(), tagId, createProjectRequest.getProjectTitle());
			data = projectService.convertToProjectResponse(project);
			data.setProjectTitle(data.getProjectTitle().replace(" ", "+"));
		} catch (NoSuchElementException | NumberFormatException e) {
			return new ResponseEntity<ProjectResponse>(data, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ProjectResponse>(data, HttpStatus.OK);
	}
	
	// User의 단일 프로젝트 페이지 가져오기
	@GetMapping("/api/project/{userName}/{projectTitle}")
	public ResponseEntity<ProjectResponse> getProjectByUserNameAndProjectTitle(@PathVariable("userName") String userName, @PathVariable("projectTitle") String projectTitle) {
		ProjectResponse data = null;
		
		try {
			Project project = projectService.getProjectByUserAndProjectTitle(userName, projectTitle.replace("+", " "));
			data = projectService.convertToProjectResponse(project);
		} catch(NoSuchElementException e) {
			return new ResponseEntity<ProjectResponse>(data, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ProjectResponse>(data, HttpStatusCode.valueOf(200));
	}
	
	// ProjectTitle 중복 검증 및 검증 완료된 projectTitle 반환
	@GetMapping("/api/check")
	public ResponseEntity checkProjectTitle(@RequestParam String projectTitle, @RequestParam String userName) {
		String data = null;
		
		try {
			String checkTitle = projectService.checkProjectTitle(userName, projectTitle);
		} catch (DuplicateKeyException e) {
			return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity(HttpStatus.OK);
	}
	
	// Project 삭제(cascade File 삭제)
	@DeleteMapping("/api/project/{projectId}")
	public ResponseEntity<String> deleteProjectByProjectId(@PathVariable Long projectId) {

		try {
			projectService.deleteProjectByProjectId(projectId);
		} catch (NoSuchElementException e) {
			return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity(HttpStatus.OK);
	}


}
