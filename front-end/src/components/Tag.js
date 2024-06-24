import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const TagWrapper = styled.div`
  margin: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const TagLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #19ce60;
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #12b886;
  }
`;

const ContentsArea = styled.div`
  height: 100vh;
`;

const Tag = () => {
  const [tags] = useState([
    { id: 1, name: 'CSS' },
    { id: 2, name: 'HTML' },
    { id: 3, name: 'Java' },
    { id: 4, name: 'JavaScript' },
    { id: 5, name: 'Python' },
    { id: 6, name: 'React' },
    { id: 7, name: 'Node.js' },
    { id: 8, name: 'Ruby' },
    { id: 9, name: 'etc..' },
  ]);

  return (
    <div>
      <Header />
      <ContentsArea>
        <TagWrapper>
          <Title>Click Tag You want to Search</Title>
          <TagList>
            {tags.map((tag) => (
              <TagLink
                key={tag.id}
                to={`/tags/${encodeURIComponent(tag.name)}`}
              >
                {tag.name}
              </TagLink>
            ))}
          </TagList>
        </TagWrapper>
      </ContentsArea>
      <Footer />
    </div>
  );
};

export default Tag;