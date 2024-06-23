import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import SearchPagination from './SearchPagination';
import axios from 'axios';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const searchResults = location.state?.results || [];
  const [resultPage, setResultPage] = useState(searchResults);
  const keyword = searchParams.get('keyword');

  const fetchSearchResults = async (keyword, page) => {
    try{
      const response = await axios.get(`/api/search?keyword=${keyword}&page=${page}`);
      const result = await response.data;
      setResultPage(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>Search Results</h2>
      {searchResults.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div>
          <ul>
            {resultPage.resultList.map((result) => (
              <li key={result.projectId}>
                {result.projectTitle} - by {result.user.userName}
              </li>
            ))}
          </ul>
          <SearchPagination
            pageInfo={resultPage}
            keyword={keyword}
            handlePageInfo={fetchSearchResults} />
        </div>
      )}
    </div>
  );
};

export default SearchResults;