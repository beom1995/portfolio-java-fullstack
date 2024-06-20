import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Tag = () => {
    const [tags, setTags] = useState([
        { id: 1, name: 'CSS' },
        { id: 2, name: 'HTML' },
        { id: 3, name: 'Java' },
        { id: 4, name: 'JavaScript' },
        { id: 5, name: 'Python' },
        { id: 6, name: 'React' },
        { id: 7, name: 'Node.js' },
        { id: 8, name: 'Ruby' },
      ]);
  const navigate = useNavigate();

  const handleTagClick = (tagName) => {
    navigate(`/search?q=${tagName}`);
  };

  return (
    <div>
      <h1>Browse Tags</h1>
      <div>
        {tags.map((tag) => (
          <div key={tag.id} onClick={() => handleTagClick(tag.name)}>
            <h3>{tag.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tag;