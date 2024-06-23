import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import SearchPagination from './SearchPagination';

const ResultWrapper = styled.div`
  margin: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ProjectList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ProjectItem = styled.li`
  margin-bottom: 20px;
`;

const ProjectLink = styled(Link)`
  font-size: 18px;
  color: #19ce60;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ProjectAuthor = styled.p`
  font-size: 14px;
  color: #888;
`;

const LoadingMessage = styled.div`
  font-size: 16px;
  color: #888;
`;

const ErrorMessage = styled.div`
  font-size: 16px;
  color: red;
`;

const TagSearchResults = () => {
  const { tagName } = useParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async (tagName, page) => {
    try {
      const response = await axios.get(`/api/tag/${tagName}?page=${page}`);
      setProjects(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to fetch projects. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(tagName, 0);
  }, [tagName]);

  if (loading) return <LoadingMessage>Loading projects...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <ResultWrapper>
      <Title>Projects with tag: {tagName}</Title>
      {projects.length === 0 ? (
        <p>No projects found with this tag.</p>
      ) : (
        <div>
          <ProjectList>
            {projects.resultList.map((project) => (
              <ProjectItem key={project.projectId}>
                <ProjectLink to={`/project/${project.user.userName}/${project.projectTitle}`}>
                  {project.projectTitle}
                </ProjectLink>
                <ProjectAuthor>by {project.user.userName}</ProjectAuthor>
              </ProjectItem>
            ))}
          </ProjectList>
          <SearchPagination
            keyword={tagName}
            pageInfo={projects}
            handlePageInfo={fetchProjects}
          />
        </div>
      )}
    </ResultWrapper>
  );
};

export default TagSearchResults;