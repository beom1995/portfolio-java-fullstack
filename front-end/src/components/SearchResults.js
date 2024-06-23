import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import SearchPagination from './SearchPagination';
import axios from 'axios';

const ResultWrapper = styled.div`
  margin: 20px;
`;

const ResultTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ResultList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ResultItem = styled.li`
  margin-bottom: 10px;
`;

const ProjectTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #19ce60;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const UserName = styled.span`
  font-size: 14px;
  color: #888;
  margin-left: 5px;
`;

const NoResults = styled.p`
  font-size: 16px;
  color: #888;
`;

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const searchResults = location.state?.results || [];
  const [resultPage, setResultPage] = useState(searchResults);
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
    <ResultWrapper>
      <ResultTitle>Search Results</ResultTitle>
      {searchResults.length === 0 ? (
        <NoResults>No results found.</NoResults>
      ) : (
        <div>
          <ResultList>
            {resultPage.resultList.map((result) => (
              <ResultItem key={result.projectId}>
                <ProjectTitle>{result.projectTitle}</ProjectTitle>
                <UserName>by {result.user.userName}</UserName>
              </ResultItem>
            ))}
          </ResultList>
          <SearchPagination
            pageInfo={resultPage}
            keyword={keyword}
            handlePageInfo={fetchSearchResults}
          />
        </div>
      )}
    </ResultWrapper>
  );
};

export default SearchResults;