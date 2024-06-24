import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchPagination from './SearchPagination';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const ResultWrapper = styled.div`
  margin: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ProjectList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ProjectItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ProjectLink = styled(Link)`
  font-size: 20px;
  color: #19ce60;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ProjectAuthor = styled.span`
  font-size: 20px;
  color: #888;
`;

const NoResults = styled.p`
  font-size: 16px;
  color: #888;
`;

const SearchButton = styled.button`
  display: block;
  margin-top: 20px;
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

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const searchResults = location.state?.results || [];
  const [resultPage, setResultPage] = useState(searchResults || []);
  const keyword = searchParams.get('keyword');

  const fetchSearchResults = async (keyword, page) => {
    try {
      const response = await axios.get(`/api/search?keyword=${keyword}&page=${page}`);
      const result = await response.data;
      setResultPage(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <ResultWrapper>
        <Title>Search Results</Title>
        {resultPage?.resultList?.length === 0 ? (
          <NoResults>No results found.</NoResults>
        ) : (
          <div>
            <ProjectList>
              {resultPage?.resultList?.map((result) => (
                <ProjectItem key={result.projectId}>
                  <ProjectLink to={`/project/${result.user.userName}/${result.projectTitle}`}>
                    {result.projectTitle}
                  </ProjectLink>
                  <ProjectAuthor>by {result.user.userName}</ProjectAuthor>
                </ProjectItem>
              ))}
            </ProjectList>
            <SearchPagination
              pageInfo={resultPage}
              keyword={keyword}
              handlePageInfo={fetchSearchResults}
            />
          </div>
        )}
      </ResultWrapper>
      <Footer />
    </div>
  );
};

export default SearchResults;