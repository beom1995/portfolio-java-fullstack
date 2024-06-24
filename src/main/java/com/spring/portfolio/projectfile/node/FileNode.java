package com.spring.portfolio.projectfile.node;

import java.util.List;

import lombok.Data;

@Data
public class FileNode {
	private Long fileId;
    private String name;
    private String path;
    private String type;
    private List<FileNode> children;
}
