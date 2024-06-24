package com.spring.portfolio.common.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.spring.portfolio.projectfile.entity.Projectfile;
import com.spring.portfolio.projectfile.exception.ForbiddenException;
import com.spring.portfolio.user.entity.User;

@Aspect
@Component
public class ProjectOwnerAspect {

    @Around("@annotation(com.spring.portfolio.projectfile.service.ProjectOwnerOnly)")
    public Object checkProjectOwnership(ProceedingJoinPoint joinPoint) throws Throwable {
        Object[] args = joinPoint.getArgs();
        Projectfile projectfile = null;

        for (Object arg : args) {
            if (arg instanceof Projectfile) {
                projectfile = (Projectfile) arg;
                break;
            }
        }

        if (projectfile != null) {
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (projectfile.getProject().getUser().getUserId() != user.getUserId()) {
                throw new ForbiddenException("You do not have permission to perform this action.");
            }
        }

        return joinPoint.proceed();
    }
}