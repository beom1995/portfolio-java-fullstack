import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchResults from './SearchResults';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search?keyword=${searchTerm}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // 검색 결과를 상태에 저장하는 대신 새 페이지로 이동
      navigate(`/search-results?keyword=${searchTerm}`, { state: { results: data } });
    } catch (error) {
      console.error('Error searching projects:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchTermChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <SearchResults results={searchResults} />
    </div>
  );
};

export default Search;