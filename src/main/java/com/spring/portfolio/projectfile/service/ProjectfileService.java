package com.spring.portfolio.projectfile.service;

import java.io.File;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.spring.portfolio.projectfile.dto.ProjectfileDTO;
import com.spring.portfolio.projectfile.entity.Projectfile;
import com.spring.portfolio.projectfile.exception.FileNotFoundException;
import com.spring.portfolio.projectfile.repository.ProjectfileRepository;

@Service
public class ProjectfileService {
	private final ProjectfileRepository projectfileRepository;
	
	public ProjectfileService(ProjectfileRepository projectfileRepository) {
		this.projectfileRepository = projectfileRepository;
	}
	
	// 프로젝트에 파일 등록
	public void insertProjectfile(ProjectfileDTO projectfileDTO) {
		projectfileRepository.saveAndFlush(DtoToEntity(projectfileDTO));
	}
	
	// projectId에 해당하는 프로젝트의 모든 파일 가져오기
	public List<ProjectfileDTO> getProjectfileListByProjectId(Long projectId) {
		return projectfileRepository.findAllByProject_ProjectId(projectId)
				.stream()
				.map(entity -> entityToDto(entity))
				.collect(Collectors.toList());
	}
	
	// fileId에 해당하는 파일 가져오기
	public ProjectfileDTO getProjectfileByFileId(Long fileId) {
		return entityToDto(projectfileRepository.findById(fileId)
				.orElseThrow(() -> new NoSuchElementException("해당 파일이 없습니다.")));
	}
	
	// fildID를 이용해서 파일 삭제
	public void deleteProjectfileByFileId(Long fileId) {		
		ProjectfileDTO projectfile = getProjectfileByFileId(fileId);
		File file = new File(projectfile.getFilePath(), projectfile.getFileName());

		if (file.exists()) {
            if (file.delete()) {
                projectfileRepository.deleteById(fileId);
            } else {
                throw new RuntimeException("파일을 삭제할 수 없습니다.");
            }
        } else {
            throw new FileNotFoundException("파일을 찾을 수 없습니다.");
        }
	}
	
	// 파일 경로를 통해서 파일 찾아오기
	public ProjectfileDTO getProjectfileByFilePath(String fullPath) {
		List<String> fileInfo = extractPathAndName(fullPath);
		Projectfile entity = projectfileRepository.findByFilePathAndFileName(fileInfo.get(0), fileInfo.get(1));
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
		System.out.println(entity.toString());
=======

>>>>>>> Stashed changes
		return entityToDto(entity);
>>>>>>> Stashed changes
		
		return entityToDto(entity);
	}
	
	// 전체 파일경로에서 최종파일명이랑 폴더명까지로 분리해서 반환
	private List<String> extractPathAndName(String fullPath) {
	    int lastIndex = fullPath.lastIndexOf(File.separator);
	    return List.of(fullPath.substring(0, lastIndex), fullPath.substring(lastIndex + 1));
	}
	
	// Entity -> DTO
	public ProjectfileDTO entityToDto(Projectfile entity) {
		
		ProjectfileDTO dto = ProjectfileDTO.builder()
							.fileId(entity.getFileId())
							.filePath(entity.getFilePath())
							.fileName(entity.getFileName())
							.fileOriginalName(entity.getFileOriginalName())
							.fileSize(entity.getFileSize())
							.project(entity.getProject())
							.build();
		
		return dto;
	}
		
	// DTO -> Entity
	public Projectfile DtoToEntity(ProjectfileDTO dto) {
		
		Projectfile entity = Projectfile.builder()
							.fileId(dto.getFileId())
							.filePath(dto.getFilePath())
							.fileName(dto.getFileName())
							.fileOriginalName(dto.getFileOriginalName())
							.fileSize(dto.getFileSize())
							.project(dto.getProject())
							.build();
		
		return entity;
	}

}
