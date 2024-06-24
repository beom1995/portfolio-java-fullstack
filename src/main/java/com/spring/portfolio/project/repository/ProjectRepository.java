package com.spring.portfolio.project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.portfolio.project.entity.Project;
import com.spring.portfolio.tag.entity.Tag;
import com.spring.portfolio.user.entity.User;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
	
	List<Project> findAllByUser(User user);
 	
	Project findByUserAndProjectTitle (User user, String projectTitle);
	
	Optional<Project> findByProjectTitle (String projectTitle);
	
	Page<Project> findAllByUser(User user, Pageable pageable);

	boolean existsByProjectTitleAndUser(String projectTitle, User user);

	Page<Project> findByProjectTitleContainingIgnoreCase(String keyword, Pageable pageable);
	
	Page<Project> findAllByTag(Tag tag, Pageable pageable);
	
}
