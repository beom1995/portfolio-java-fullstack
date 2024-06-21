import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FileTree({ projectId }) {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchFiles();
    // }, [projectId]);
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await axios.get(`/api/project/${projectId}/files`);
            setFiles(response.data);
        } catch (error) {
            console.error('Failed to fetch files:', error);
        }
    };

    const handleFileDownload = async (fileId) => {
        try {
            const response = await axios.get(`/api/project/${projectId}/${fileId}`, {
                responseType: 'blob'
            });
        } catch (error) {
            console.error('Failed to download:', error);
        }
    };

    const renderTree = (nodes) => (
        <ul>
        {nodes.map((node) => (
            <li key={node.path}>
            {node.type === 'directory' ? (
                <>
                <span>{node.name}</span>
                {renderTree(node.children)}
                </>
            ) : (
                <span onClick={() => handleFileDownload(1)}>{node.name}</span>
            )}
            </li>
        ))}
        </ul>
    );

    return <div>{renderTree(files)}</div>;
};