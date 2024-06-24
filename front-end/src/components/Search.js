import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchResults from './SearchResults';
import Header from './Header';
import Footer from './Footer';

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const SearchInput = styled.input`
  width: 400px;
  height: 40px;
  padding: 0 10px;
  border: 2px solid #19ce60;
  border-radius: 20px;
  font-size: 16px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #19ce60;
  }
`;

const SearchButton = styled.button`
  width: 50px;
  height: 40px;
  margin-left: 10px;
  background-color: #19ce60;
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #12b886;
  }
`;

const ContentsArea = styled.div`
  height: 100vh;
`;

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
      const response = await fetch(`/api/search?keyword=${searchTerm}&page=0`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
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
      <Header />
      <ContentsArea>
      <SearchWrapper>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchTermChange}
          onKeyPress={handleKeyPress}
        />
        <SearchButton onClick={handleSearch}>
          <span role="img" aria-label="search">🔍</span>
        </SearchButton>
      </SearchWrapper>
      </ContentsArea>
      <Footer />
    </div>
  );
};

export default Search;