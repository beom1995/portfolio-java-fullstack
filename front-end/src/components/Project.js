import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';
import FileTree from "./FileTree";

const ProjectWrapper = styled.div`
  margin: 20px;
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProjectTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-right: 10px;
`;

const ProjectTag = styled.h3`
  font-size: 18px;
  color: #19ce60;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
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

export default function Project() {
  const { userName, projectTitle } = useParams();
  const [projectInfo, setProjectInfo] = useState([]);
  const [fileInfo, setFileInfo] = useState([]);
  const [tag, setTag] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/project/${userName}/${projectTitle}`)
      .then(response => {
        const result = response.data;
        setProjectInfo(result);
        setTag(result.tag.tagName);
        setFileInfo(result.files);
      })
      .catch(error => {
        console.log(error);
        navigate(`/error`);
      });
  }, []);

  const handleTagSelectSearch = () => {
    navigate(`/tags/${tag}`);
  };

  const handleUploadButtonClick = () => {
    navigate(`/project/${userName}/${projectTitle}/upload`, {
      state: {
        projectInfo
      }
    });
  };

  return (
    <ProjectWrapper>
      <ProjectHeader>
        <ProjectTitle>{projectInfo.projectTitle}</ProjectTitle>
        <ProjectTag onClick={handleTagSelectSearch}>#{tag}</ProjectTag>
      </ProjectHeader>
      <ButtonWrapper>
        <Button onClick={handleUploadButtonClick}>Upload</Button>
      </ButtonWrapper>
      <FileTree
        projectId={projectInfo.projectId}
        userName={userName}
        projectTitle={projectTitle}
      />
    </ProjectWrapper>
  );
}