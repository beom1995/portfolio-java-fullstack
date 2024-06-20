import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    navigate(`/search?q=${searchTerm}`);
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
    </div>
  );
};

export default Search;