package com.spring.portfolio.tag.repository;

import com.spring.portfolio.project.entity.Project;
import com.spring.portfolio.tag.entity.Tag;
import com.spring.portfolio.user.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {
    Optional<Tag> findByTagNameIgnoreCase(String tagName);
    
    @Query("SELECT p FROM Project p WHERE p.tag.tagName = :tagName")
    List<Project> findProjectsByTagNameIgnoreCase(@Param("tagName") String tagName);

}