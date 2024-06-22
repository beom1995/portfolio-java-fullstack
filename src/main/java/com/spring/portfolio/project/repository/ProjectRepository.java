package com.spring.portfolio.project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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
	
	Page<Project> findAllByUser(User user, Pageable pageable);
	
//	@Query("SELECT EXISTS (SELECT p.projectTitle FROM Project p WHERE p.projectTitle =:projectTitle AND p.user =:user")
//	public boolean existsProjectTitleByUser(@Param("projectTitle") String projectTitle, @Param("user") User user);
	
//	@Modifying
//	@Query("select exists (select p.projectTitle from Project p where p.projectTitle =:projectTitle and p.user =:user")
	boolean existsByProjectTitleAndUser(String projectTitle, User user);

}
