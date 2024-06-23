package com.spring.portfolio.projectfile.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.spring.portfolio.project.entity.Project;
import com.spring.portfolio.projectfile.dto.ProjectfileDTO;
import com.spring.portfolio.projectfile.entity.Projectfile;
import com.spring.portfolio.projectfile.repository.ProjectfileRepository;

@Service
public class ProjectfileService {
	private final ProjectfileRepository projectfileRepository;
	
	public ProjectfileService(ProjectfileRepository projectfileRepository) {
		this.projectfileRepository = projectfileRepository;
	}
	
	public void insertProjectfile(ProjectfileDTO projectfileDTO) {
		projectfileRepository.saveAndFlush(DtoToEntity(projectfileDTO));
	}
	
	public List<ProjectfileDTO> getProjectfileListByProjectId(Long projectId) {
		return projectfileRepository.findByProject_ProjectId(projectId)
				.stream()
				.map(entity -> entityToDto(entity))
				.collect(Collectors.toList());
	}
	
	public ProjectfileDTO getProjectfileByFileId(Long fileId) {
		return entityToDto(projectfileRepository.findById(fileId)
				.orElseThrow(() -> new NoSuchElementException()));
	}
	
	public void deleteProjectfileByFileId(Long fileId) {		
		ProjectfileDTO projectfile = getProjectfileByFileId(fileId);
		File file = new File(projectfile.getFilePath(), projectfile.getFileName());

		if (file.exists()) {
            if (file.delete()) {
                projectfileRepository.deleteById(fileId);
            } else {
//                throw new RuntimeException("Failed to delete the file.");
            }
        } else {
//            throw new FileNotFoundException("File not found at path: " + projectfile.getFilePath());
        }
	}
	
	public ProjectfileDTO getProjectfileByFilePath(String filePath) {
		List<String> fileInfo = extractPathAndName(filePath);
		Projectfile entity = projectfileRepository.findByFilePathAndFileName(fileInfo.get(0), fileInfo.get(1));
		System.out.println(entity.toString());
		return entityToDto(entity);
		
	}
	
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
