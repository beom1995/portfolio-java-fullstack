package com.spring.portfolio.project.service;

import java.io.File;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.function.Function;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
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
import com.spring.portfolio.projectfile.entity.Projectfile;
import com.spring.portfolio.tag.dto.TagProjectResponse;
import com.spring.portfolio.tag.entity.Tag;
import com.spring.portfolio.tag.repository.TagRepository;
import com.spring.portfolio.user.dto.UserProjectResponse;
import com.spring.portfolio.user.entity.User;
import com.spring.portfolio.user.exception.UserNotFoundException;
import com.spring.portfolio.user.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectService {
	
	private final ProjectRepository projectRepository;
	private final UserRepository userRepository;
	private final TagRepository tagRepository;
	private static final Logger log = LoggerFactory.getLogger(ProjectService.class);
	
	@Value("${project.files.save.path}")
	String savePath;
	
	// User 기준으로 모든 Project 찾기
	@Transactional
	public List<Project> getAllProjectsByUserName(String userName) {
		User user = userRepository.findByUserName(userName)
								  .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));
		
		List<Project> projectList = projectRepository.findAllByUser(user);
		return projectRepository.findAllByUser(user);
	}

	// ProjectId로 Project 찾기
	@Transactional
	public Project getProjectByProjectId(Long projectId) {
		return projectRepository.findById(projectId)
								.orElseThrow(() -> new NoSuchElementException("존재하지 않는 프로젝트입니다."));
	}
	
	// UserName 및 ProjectTitle로 Project 찾기
	@Transactional
	public Project getProjectByUserAndProjectTitle(String userName, String projectTitle) {
		User user = userRepository.findByUserName(userName)
								  .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

		return projectRepository.findByUserAndProjectTitle(user, projectTitle);
	}
	
	// Project List Pagination
	@Transactional
	public PageResponseDTO<ProjectResponse, Project> getProjectPageList(PageRequestDTO pageRequest, String userName) {
		
		User user = userRepository.findByUserName(userName)
								  .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));
		Pageable pageable = PageRequest.of(pageRequest.getPage(), pageRequest.getSize());
		Page<Project> result = projectRepository.findAllByUser(user, pageable);

		Function<Project, ProjectResponse> fn = (entity -> convertToProjectResponse(entity));
		
		return new PageResponseDTO<>(result, fn);
	}
	
//	 Project 추가
	@Transactional
	public Project addProject(String userName, int tagId, String projectTitle) {
		User user = userRepository.findByUserName(userName)
								  .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));
		
		Tag tag = tagRepository.findById(tagId)
							   .orElseThrow(() -> new NoSuchElementException("존재하지 않는 태그입니다."));
		
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
	public void checkProjectTitle(String userName, String projectTitle) {
		User user = userRepository.findByUserName(userName)
								  .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));
		boolean result = projectRepository.existsByProjectTitleAndUser(projectTitle, user);
		
		if(result) {
			throw new DuplicateKeyException("이미 사용 중인 프로젝트 이름입니다.");
		}
	}
	
	// project - file 삭제
	@Transactional
	public void deleteProjectByProjectId(Long projectId) {
		Project project = projectRepository.findById(projectId)
										   .orElseThrow(() -> new NoSuchElementException("존재하지 않는 프로젝트입니다."));
		
		// 파일 존재 시 서버에 저장된 파일 + 디렉터리 삭제 + DBMS 레코드 삭제(cascade 파일 레코드 삭제)
		if(project.getFiles().size() != 0) {
			String projectDir = savePath + File.separator + projectId.toString();
			File directory = new File(projectDir);
			File[] files = directory.listFiles();
			
			for(File file : files) {
				file.delete();
			}
			
			directory.delete();
			projectRepository.delete(project);
			
		} else { // 파일 없을 시 DBMS 레코드 삭제
			projectRepository.delete(project);
		}
		
		log.info("Project deleted: {}", projectId);
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


	public boolean isProjectOwner(String username, Long projectId) {
        Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new NoSuchElementException("존재하지 않는 프로젝트입니다."));
        return project.getUser().getUserName().equals(username);
    }
}

