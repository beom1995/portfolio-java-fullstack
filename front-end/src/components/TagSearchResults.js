import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const TagSearchResults = () => {
    const { tagName } = useParams();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`/api/tag/${tagName}`);
                setProjects(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching projects:', err);
                setError('Failed to fetch projects. Please try again.');
                setLoading(false);
            }
        };

        fetchProjects();
    }, [tagName]);

    if (loading) return <div>Loading projects...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Projects with tag: {tagName}</h1>
            {projects.length === 0 ? (
                <p>No projects found with this tag.</p>
            ) : (
                <ul>
                    {projects.map((project) => (
                        <li key={project.projectId}>
                            <Link to={`/project/${project.projectTitle}`}>
                                {project.projectTitle}
                            </Link>
                            <p>by {project.user.userName}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TagSearchResults;