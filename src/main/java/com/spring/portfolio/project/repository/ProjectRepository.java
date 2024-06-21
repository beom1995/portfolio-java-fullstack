package com.spring.portfolio.project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.spring.portfolio.project.entity.Project;
import com.spring.portfolio.user.entity.User;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
	
	List<Project> findAllByUser(User user);
 	
	Project findByUserAndProjectTitle (User user, String projectTitle);
	
	Optional<Project> findByProjectTitle (String projectTitle);

}
