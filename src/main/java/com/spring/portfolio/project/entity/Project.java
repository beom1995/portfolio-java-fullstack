package com.spring.portfolio.project.entity;

import java.util.List;

import com.spring.portfolio.common.entity.BaseEntity;
import com.spring.portfolio.projectfile.entity.Projectfile;
import com.spring.portfolio.tag.entity.Tag;
import com.spring.portfolio.user.entity.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
<<<<<<< Updated upstream
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
=======
import lombok.Getter;
>>>>>>> Stashed changes

@Getter
@Entity
@Getter
@NoArgsConstructor
@ToString
public class Project extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "project_id")
	private Long projectId;
	
	@Column(name = "project_title")
	private String projectTitle;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "tag_id")
	private Tag tag;
	
	@OneToMany(mappedBy = "project", cascade = CascadeType.REMOVE)
	private List<Projectfile> files;

	@Builder
	public Project(Long projectId, String projectTitle, User user, Tag tag, List<Projectfile> files) {
		super();
		this.projectId = projectId;
		this.projectTitle = projectTitle;
		this.user = user;
		this.tag = tag;
		this.files = files;
	}
	
}
