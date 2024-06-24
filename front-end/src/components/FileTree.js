import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { saveAs } from 'file-saver';

const FileTreeContainer = styled.div`
  width: 800px;
  align: center;
`;

const Folder = styled.span`
  margin-right: 10px;
  font-size: 20px;
  color: #888;
`;

const File = styled.span`
  margin-right: 5px;
  font-size: 20px;
  color: #333;
`;

const LineDeco = styled.span`
  &:hover {
    background-color: #f0f0f0;
  }
`;

const FileList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const FileItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #eee;
  font-size: 17px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const FileName = styled.span`
  flex: 1;
  margin-right: 10px;
  cursor: pointer;
  font-size: 17px;
  font-family: Arial, sans-serif;
  &:hover {
    text-decoration: underline;
  }
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: #ff4500;
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;
`;

export default function FileTree({ projectId, userName, projectTitle }) {
    const [files, setFiles] = useState([]);
    const [openFolders, setOpenFolders] = useState({});

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

    const handleFileDownload = async (fileId) => {
        await axios.get(`/api/project/${userName}/${projectTitle}/${fileId}`, {
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

    const isEmpty = function(obj) {
        if(obj == null) {
            return true;
        }
        return Object.keys(obj).length === 0;
    }

    const toggleFolder = (id) => {
        setOpenFolders(prevOpenFolders => ({
          ...prevOpenFolders,
          [id]: !prevOpenFolders[id]
        }));
    };


    const renderNode = (node, path, depth = 0) => (
        <FileItem key={path} style={{ paddingLeft: depth * 50 }}>
        <LineDeco>
            {node.type === 'directory' ? (
                <>
                    <Folder onClick={() => toggleFolder(path)}>
                        {openFolders[path] ? '▼' : '▶'}
                        <FileName> {node.name}</FileName>
                    </Folder>
                    
                    {openFolders[path] && (
                        <FileList>
                            {node.children
                                .filter(child => child.type === 'directory')
                                .map(child => renderNode(child, depth + 1))}
                            {node.children
                                .filter(child => child.type === 'file')
                                .map(child => renderNode(child, depth + 1))}
                        </FileList>
                    )}
                </>
            ) : (
                <>
                    <File onClick={() => handleFileDownload(node.fileId)}><FileName>{node.name}</FileName></File>
                    <DeleteButton onClick={() => removeFile(node.fileId)}>&times;</DeleteButton>
                </>
            )}
        </LineDeco>
        </FileItem>
    );

    return (
        <FileTreeContainer>
            <FileList>
                {files.map((node) => renderNode(node, node.path))}
            </FileList>
        </FileTreeContainer>
    );

};