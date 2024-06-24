package com.spring.portfolio.tag.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.spring.portfolio.project.entity.Project;
import com.spring.portfolio.tag.entity.Tag;

@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {
    Optional<Tag> findByTagNameIgnoreCase(String tagName);
    
//    @Query("SELECT p FROM Project p WHERE p.tag.tagName = :tagName")
//    Page<Project> findProjectsByTagNameIgnoreCase(@Param("tagName") String tagName, Pageable pageable);

}