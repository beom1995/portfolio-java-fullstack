import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';
import Pagination from "./Pagination";
import Header from "./Header";
import Footer from "./Footer";

const HomeWrapper = styled.div`
  margin: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #19ce60;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #12b886;
  }
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

const ProjectTitle = styled.span`
  font-size: 18px;
  color: #19ce60;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: #ff4500;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #e63900;
  }
`;

export default function Home() {
  const [projectInfo, setProjectInfo] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const { userName } = useParams();
  const navigate = useNavigate();

  const fetchProjectInfo = async (page) => {
    try {
      const response = await axios.get(`/api/projects?userName=${userName}&page=${page}`);
      const result = await response.data;
      setProjectInfo(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjectInfo(0);
  }, []);

  useEffect(() => {
    if (isDelete) {
      setIsDelete(false);
    }

    if (!projectInfo.page) {
      fetchProjectInfo(0);
    } else {
      fetchProjectInfo(projectInfo.page - 1);
    }
  }, [isDelete]);

  const handleProjectSearch = () => {
    navigate('/search');
  };

  const handleTagSearch = () => {
    navigate(`/tags`);
  };

  const handleAddProject = () => {
    navigate(`/project/${userName}/create`);
  };

  const handleDeleteProject = (e) => {
    if (
      window.confirm(
        `프로젝트를 삭제하시겠습니까?(프로젝트 삭제 시 프로젝트에 속한 파일도 모두 삭제됩니다.)`
      )
    ) {
      axios
        .delete(`/api/project/${e.target.id}`)
        .then((response) => setIsDelete(true))
        .catch((error) => navigate(`/error`));
    } else {
      return;
    }
  };

  const handleSelectProject = (e) => {
    navigate(`/project/${userName}/${e.target.id}`);
  };

  return (
    <HomeWrapper>
      <Header />
      <ButtonWrapper>
        <Button onClick={handleProjectSearch}>Search</Button>
        <Button onClick={handleTagSearch}>Tag</Button>
      </ButtonWrapper>
      <Title>My Projects</Title>
      <Button onClick={handleAddProject}>+ New Project</Button>
      <ProjectList>
        {projectInfo.resultList &&
          projectInfo.resultList.map((project) => (
            <ProjectItem key={project.projectId}>
              <ProjectTitle
                id={project.projectTitle}
                onClick={handleSelectProject}
              >
                {project.projectTitle}
              </ProjectTitle>
              <DeleteButton
                id={project.projectId}
                onClick={handleDeleteProject}
              >
                Delete
              </DeleteButton>
            </ProjectItem>
          ))}
      </ProjectList>
      <Pagination pageInfo={projectInfo} handlePageInfo={fetchProjectInfo} />
      <Footer />
    </HomeWrapper>
  );
}