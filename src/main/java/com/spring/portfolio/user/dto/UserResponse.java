package com.spring.portfolio.user.dto;

import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.spring.portfolio.project.dto.ProjectResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
public class UserResponse {
    private int userId;
    private String userName;
    private String token;
    private List<ProjectResponse> projects = new ArrayList<>();

    @Builder
    public UserResponse(int userId, String userName, String token, List<ProjectResponse> projects) {
        this.userId = userId;
        this.userName = userName;
        this.token = token;
        this.projects = projects != null ? projects : new ArrayList<>();
    }
}