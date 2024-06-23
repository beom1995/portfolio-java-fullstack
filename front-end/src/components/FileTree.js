import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

export default function FileTree({ projectId, userName, projectTitle }) {
    const [files, setFiles] = useState([]);

    const fetchFiles = async () => {
        await axios.get(`/api/project/${userName}/${projectTitle}/files`)
        .then(response => {
            setFiles(response.data);
        })
        .catch(error => {
            console.error('Failed to fetch files:', error);
        });
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleFileDownload = async (path) => {
        await axios.get(`/api/project/${userName}/${projectTitle}/download`, {
            params: { filePath: path },
            responseType: 'blob',
        })
        .then(response => {
            // 서버에서 Content-Disposition 헤더를 가져와 파일 이름 추출
            const contentDisposition = response.headers['content-disposition'];
            let fileName = 'downloadedFile';
            if (contentDisposition) {
                const matches = /filename\*?=['"]?([^'";]+)['"]?/.exec(contentDisposition);
                if (matches != null && matches[1]) { 
                    fileName = matches[1];
                    console.log(fileName);
                }
            }

            // FileSaver.js를 사용하여 파일 저장
            saveAs(new Blob([response.data]), fileName);

        })
        .catch(error => {
            console.error('Failed to download:', error);

        });
    };

    const removeFile = async (fileId) => {
        await axios.delete(`/api/project/${projectId}/${fileId}`)
        .then(response => {
            console.log('remove success');
            fetchFiles();
        })
        .catch(error => {
            console.error('Failed to remove:', error);

        });
    };

    const renderTree = (nodes) => (
        <ul>
            {nodes.map((node, idx) => (
                <li key={idx}>
                    {node.type === 'directory' ? (
                        <>
                            <span>{node.name}</span>
                            {renderTree(node.children)}
                        </>
                    ) : (
                        <>
                            <span onClick={() => handleFileDownload(node.path)}>{node.name}</span>
                            <button onClick={() => removeFile(node.fileId)} style={{ marginLeft: '10px', color: 'red' }}>X</button>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );

    return <div>{renderTree(files)}</div>;
};