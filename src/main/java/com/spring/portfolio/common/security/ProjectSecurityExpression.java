package com.spring.portfolio.common.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.spring.portfolio.project.service.ProjectService;

@Component("projectSecurityExpression")
public class ProjectSecurityExpression {

    @Autowired
    private ProjectService projectService;

    public boolean isProjectOwner(Authentication authentication, Long projectId) {
        String username = authentication.getName();
        return projectService.isProjectOwner(username, projectId);
    }
}