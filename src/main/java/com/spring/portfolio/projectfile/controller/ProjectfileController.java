package com.spring.portfolio.projectfile.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.portfolio.project.entity.Project;
import com.spring.portfolio.project.service.ProjectService;
import com.spring.portfolio.projectfile.dto.ProjectfileDTO;
import com.spring.portfolio.projectfile.node.FileNode;
import com.spring.portfolio.projectfile.service.ProjectfileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ProjectfileController {
	
	@Value("${project.files.save.path}")
	String savePath;
	
	private final ProjectfileService projectfileService;
	private final ProjectService projectService;
	
	// 파일 목록 조회
	@GetMapping("api/project/{userName}/{projectTitle}/files")
	public List<FileNode> getFiles(@PathVariable String userName, @PathVariable String projectTitle) {
		Project targetProject = projectService.getProjectByUserAndProjectTitle(userName, projectTitle);
		String projectDir = savePath + File.separator + targetProject.getProjectId().toString();
		File directory = new File(projectDir);
		
		if (directory.exists()) {
			return buildFileTree(new File(projectDir));            
        } else {
        	return List.of();
        }
	}

	private List<FileNode> buildFileTree(File projectDir) {
	    List<FileNode> nodes = new ArrayList<>();
	    File[] files = projectDir.listFiles();
	    
	    if (files != null) {
	        for (File file: files) {
	            FileNode node = new FileNode();
	         
	            node.setPath(file.getPath().replace(savePath, ""));
	            
	            if (file.isDirectory()) {
	                node.setType("directory");
	                node.setName(file.getName());
	                node.setChildren(buildFileTree(file));
	            } else {
	            	ProjectfileDTO targetProjectfile = projectfileService.getProjectfileByFilePath(file.getPath());
	                node.setType("file");
	                node.setName(targetProjectfile.getFileOriginalName());
	                node.setFileId(targetProjectfile.getFileId());
	            }
	            
	            nodes.add(node);
	        }
	    }
	    
	    return nodes;
	}
	
	// 파일 업로드
	@PostMapping("/api/project/{projectId}/files")
	public void uploadFiles(@RequestParam("files") List<MultipartFile> files, 
							@RequestParam("paths") List<String> paths, 
							@PathVariable Long projectId) {
		
		// 업로드 대상 프로젝트
		Project targetProject = projectService.getProjectByProjectId(projectId);
		
		for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);
            String path = paths.get(i);
            
            String originalFilename = file.getOriginalFilename();
	        String uniqueFilename = UUID.randomUUID().toString() + "_" + originalFilename;
	        
			try {
				String projectDir = savePath + File.separator + projectId.toString();
				System.out.println("projectDir:" + projectDir);
				File directory = new File(projectDir);
				
				// 프로젝트 디렉토리가 생성되어 있지 않으면 디렉토리 생성
				if(!directory.exists()) {
					directory.mkdir();
				}
				
				String subDirectory = extractSubDirectory(path);
				System.out.println("subDirectory:" + subDirectory);
	            if (!subDirectory.isEmpty()) {
	                directory = new File(projectDir + File.separator + subDirectory);
	                directory.mkdirs();
	            }
				
				// 서버로 파일 업로드
	            File destFile = new File(directory, uniqueFilename);
	            file.transferTo(destFile);
	            
	            
				ProjectfileDTO projectfileDTO = ProjectfileDTO.builder()
												.filePath(destFile.getParent())
												.fileName(uniqueFilename)
												.fileOriginalName(originalFilename)
												.fileSize(file.getSize())
												.project(targetProject)
												.build();
				
				projectfileService.insertProjectfile(projectfileDTO);
				
			} catch (IllegalStateException | IOException e) {
				e.printStackTrace();
			}
		}
	}

	// 프로젝트 폴더와 최종 업로드 파일 사이 경로 추출
	private String extractSubDirectory(String fullPath) {
	    if (fullPath == null) return "";
	    int lastIndex = fullPath.lastIndexOf("/");
	    return lastIndex < 0 ? "" : fullPath.substring(1, lastIndex);
	}
		
	// 파일 다운로드
	@GetMapping("/api/project/{userName}/{projectTitle}/{fileId}")
	public ResponseEntity<Resource> downloadFile(@PathVariable Long fileId) {
		/*
		 * -- logic --
		 * 1) 물리적인 파일 선택(경로)
		 * 2) 리소스화(inputStream)
		 * 3) return(header)
		 */
		
		Resource resource = null;
		ProjectfileDTO targetProjectfile = projectfileService.getProjectfileByFileId(fileId);
		String fullPath = targetProjectfile.getFilePath() + File.separator + targetProjectfile.getFileName();
		Path path = Paths.get(fullPath);
		
		try {
			resource = new InputStreamResource(Files.newInputStream(path));
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		// Content-Disposition: 전송되는 리소스의 처리 방법 지정(다운로드 파일 설정)
		headers.setContentDisposition(ContentDisposition
										.builder("attachment")
										.filename(targetProjectfile.getFileOriginalName())
										.build());
		
		return new ResponseEntity<Resource>(resource, headers, HttpStatus.OK);
	}
	
	// 파일 삭제
	@DeleteMapping("/api/project/{projectId}/{fileId}")
	public void deleteFile(@PathVariable Long projectId, @PathVariable Long fileId) {
		projectfileService.deleteProjectfileByFileId(fileId);
	}
}
