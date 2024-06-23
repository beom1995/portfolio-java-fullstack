package com.spring.portfolio.common.dto;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import lombok.Data;

@Data
public class PageResponseDTO<DTO, Entity> {
	private List<DTO> resultList;
	
	private int totalPage;
	
	private int page;
	
	private int size;
	
	private int start, end;
	
	private boolean prev, next;
	
	private List<Integer> pageList;
	
	public PageResponseDTO (Page<Entity> result, Function<Entity, DTO> fn) {
		
		this.totalPage = result.getTotalPages();
		
		this.resultList = result.getContent()
								.stream()
								.map(fn)
								.collect(Collectors.toList());
		
		Pageable pageable = result.getPageable();
		
		getPageInfo(pageable);
								
	}
	
	private void getPageInfo(Pageable pageable) {
		this.page = pageable.getPageNumber() + 1;
		this.size = pageable.getPageSize();
		
		int tempEnd = (int)(Math.ceil(page / 10.0)) * 10;
		
		this.start = tempEnd - 9;
		
		this.prev = start > 1;
		
		this.next = totalPage > tempEnd; 
		
		this.end = totalPage > tempEnd? tempEnd : totalPage;
		
		this.pageList = IntStream.rangeClosed(start, end)
								 .boxed()
								 .collect(Collectors.toList());
	}
}
