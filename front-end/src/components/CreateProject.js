import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';
import Header from "./Header";
import Footer from "./Footer";

const CreateProjectWrapper = styled.div`
  margin: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
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

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const TagItem = styled.label`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: ${props => props.checked ? '#19ce60' : '#f0f0f0'};
  color: ${props => props.checked ? '#fff' : '#333'};
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.checked ? '#12b886' : '#e0e0e0'};
  }

  input[type="radio"] {
    display: none;
  }
`;

const TagName = styled.span`
  margin-left: 8px;
`;

const ContentsArea = styled.div`
  height: 100vh;
`;

export default function CreateProject() {
  const { userName } = useParams();
  const [isCheck, setIsCheck] = useState(false);
  const [isBlank, setIsBlank] = useState(true);
  const [projectTitle, setProjectTitle] = useState('');
  const [isNotDuplicate, setIsNotDuplicate] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const navigate = useNavigate();
  const [tags, setTags] = useState([
    { id: 1, name: 'CSS' },
    { id: 2, name: 'HTML' },
    { id: 3, name: 'Java' },
    { id: 4, name: 'JavaScript' },
    { id: 5, name: 'Python' },
    { id: 6, name: 'React' },
    { id: 7, name: 'Node.js' },
    { id: 8, name: 'Ruby' },
    { id: 9, name: 'etc..' }
  ]);

  const handleTitleChange = (e) => {
    if (e.target.value.trim() !== '') {
      setIsBlank(false);
    }
    setIsCheck(false);
    setProjectTitle(e.target.value);
  };

  const handleCheckTitle = (e) => {
    e.preventDefault();

    if (!isCheck) {
      setIsCheck(true);
    }

    if (isBlank) {
      alert('프로젝트 이름을 입력하세요.');
      return;
    }

    axios.get(`/api/check?userName=${userName}&projectTitle=${projectTitle}`)
      .then(response => {
        setIsNotDuplicate(true);
        alert('사용 가능한 프로젝트 이름입니다.');
      })
      .catch(error => alert('사용 불가능한 프로젝트 이름입니다.'));
  };

  const handleTagClick = (tagId) => {
    setSelectedTag(tagId);
  };

  const handleProjectCreate = (e) => {
    e.preventDefault();

    if (isBlank) {
      alert('프로젝트 이름을 입력하세요.');
      return;
    }

    if (!isCheck) {
      alert('프로젝트 이름 중복 확인이 필요합니다.');
      return;
    }

    if (!selectedTag) {
      alert('태그를 선택하세요.');
      return;
    }

    if (!isNotDuplicate) {
      alert('프로젝트 이름이 중복입니다. 다시 입력해 주세요.');
      return;
    }

    axios.post(`/api/project`, {
      projectTitle: projectTitle,
      tagId: selectedTag,
      userName: userName
    })
      .then(response => {
        let title = response.data.projectTitle;
        navigate(`/project/${userName}/${title}`);
      })
      .catch(error => navigate(`/error`));
  };

  return (
    <CreateProjectWrapper>
      <Header />
      <ContentsArea>
      <Title>Create Project</Title>
      <Form>
        <InputWrapper>
          <Input
            type="text"
            placeholder="Project Title"
            onChange={handleTitleChange}
            required
          />
          <Button onClick={handleCheckTitle}>Check</Button>
        </InputWrapper>
        <TagWrapper>
          {tags.map((tag) => (
            <TagItem
              key={tag.id}
              checked={selectedTag === tag.id}
              onClick={() => handleTagClick(tag.id)}
            >
              <input
                type="radio"
                value={tag.id}
                id={tag.name}
                name="tag"
              />
              <TagName>{tag.name}</TagName>
            </TagItem>
          ))}
        </TagWrapper>
        <Button onClick={handleProjectCreate}>Create</Button>
      </Form>
      </ContentsArea>
      <Footer />
    </CreateProjectWrapper>
  );
}