package com.spring.portfolio.projectfile.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.portfolio.projectfile.entity.Projectfile;

@Repository
public interface ProjectfileRepository extends JpaRepository<Projectfile, Long> {

	List<Projectfile> findByProject_ProjectId(Long projectId);

	Projectfile findByFilePathAndFileName(String filePath, String fileName);
}
