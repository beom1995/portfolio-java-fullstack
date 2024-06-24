import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { saveAs } from 'file-saver';

const FileTreeContainer = styled.div`
  width: 800px;
  align: center;
`;

const Folder = styled.span`
  cursor: pointer;
  margin-right: 5px;
  font-weight: 900;
`;

const File = styled.span`
  cursor: pointer;
`;

const StyledUL = styled.ul`
  list-style-type: none;
`;

const StyledLI = styled.li`
  text-align: left;
  margin-top: 5px;
  margin-bottom: 5px;
`;


const LineDeco = styled.span`
  &:hover {
    background-color: #f0f0f0;
  }
`;

const NodenameSpan = styled.span`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
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

    const renderNode = (node) => (
        <StyledLI key={node.path}>
        <LineDeco>
            {node.type === 'directory' ? (
                <>
                    <Folder onClick={() => toggleFolder(node.path)}>
                        {openFolders[node.path] ? '▼' : '▶'}
                    </Folder>
                    <NodenameSpan>{node.name}</NodenameSpan>
                    {openFolders[node.path] && (
                        <StyledUL>
                            {node.children.map(child => renderNode(child, child.path))}
                        </StyledUL>
                    )}
                </>
            ) : (
                <>
                    <File onClick={() => handleFileDownload(node.fileId)}><NodenameSpan>{node.name}</NodenameSpan></File>
                    <button onClick={() => removeFile(node.fileId)} style={{ marginLeft: '10px', color: 'red' }}>X</button>
                </>
            )}
        </LineDeco>
        </StyledLI>
    );

    return (
        <FileTreeContainer>
            <StyledUL>
                {files.map((node) => renderNode(node))}
            </StyledUL>
        </FileTreeContainer>
    );

};