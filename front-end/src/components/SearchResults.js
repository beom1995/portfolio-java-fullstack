import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const searchResults = location.state?.results || [];

  return (
    <div>
      <h2>Search Results</h2>
      {searchResults.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {searchResults.map((result) => (
            <li key={result.projectId}>
              {result.projectTitle} - by {result.user.userName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;