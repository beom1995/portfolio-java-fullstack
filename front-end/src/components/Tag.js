import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
            <h1>Click Tag You want to Search</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {tags.map((tag) => (
                    <Link 
                        key={tag.id} 
                        to={`/tags/${encodeURIComponent(tag.name)}`}
                        style={{
                            padding: '5px 10px',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '5px',
                            textDecoration: 'none',
                            color: 'black'
                        }}
                    >
                        {tag.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Tag;