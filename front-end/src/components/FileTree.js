import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { saveAs } from 'file-saver';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';  // URL을 파싱하기 위해 추가

const StyledUL = styled.ul`
  list-style-type: none;
  padding-left: 20px;
`;

const StyledLI = styled.li`
  margin-bottom: 10px;
`;

const LineDeco = styled.div`
  display: flex;
  align-items: center;
`;

const Folder = styled.span`
  cursor: pointer;
  margin-right: 10px;
  font-size: 20px;
  color: #888;
`;

const File = styled.span`
  cursor: pointer;
  margin-right: 5px;
  font-size: 20px;
  color: #333;
`;

const NodenameSpan = styled.span`
  font-size: 17px;
  font-family: Arial, sans-serif;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: #ff4500;
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px;
  transition: color 0.3s;

  &:hover {
    color: #ff0000;
  }
`;

export default function FileTree({ projectId, projectTitle }) {
    const [files, setFiles] = useState([]);
    const [openFolders, setOpenFolders] = useState({});
    const [cookies] = useCookies(['userName']);
    const location = useLocation();

    // URL에서 userName 추출
    const urlUserName = location.pathname.split('/')[2];

    const fetchFiles = async () => {
        await axios.get(`/api/project/${urlUserName}/${projectTitle}/files`)
        .then(response => {
            setFiles(response.data);
        })
        .catch(error => {
            console.error('Failed to fetch files:', error);
        });
    };

    useEffect(() => {
        fetchFiles();
    }, [urlUserName, projectTitle]);

    const handleFileDownload = async (fileId) => {
        await axios.get(`/api/project/${urlUserName}/${projectTitle}/${fileId}`, {
            responseType: 'blob',
        })
        .then(response => {
            const contentDisposition = response.headers['content-disposition'];
            let fileName = 'downloadedFile';
            if (contentDisposition) {
                const matches = /filename\*?=['"]?([^'";]+)['"]?/.exec(contentDisposition);
                if (matches != null && matches[1]) { 
                    fileName = matches[1];
                    console.log(fileName);
                }
            }

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

    const toggleFolder = (id) => {
        setOpenFolders(prevOpenFolders => ({
          ...prevOpenFolders,
          [id]: !prevOpenFolders[id]
        }));
    };

    const renderNode = (node, idx) => {
        const isOwner = cookies.userName === urlUserName;  // 쿠키의 사용자 이름과 URL의 사용자 이름 비교

        return (
            <StyledLI key={idx}>
            {node.type === 'directory' ? (
                <>
                <LineDeco>
                <Folder onClick={() => toggleFolder(idx)}>
                    {openFolders[idx] ? '▼' : '▶'}
                </Folder>
                <NodenameSpan>{node.name}</NodenameSpan>
                </LineDeco>
                {openFolders[idx] && (
                    <StyledUL>
                        {node.children.map((child, childIdx) => renderNode(child, `${idx}-${childIdx}`))}
                    </StyledUL>
                )}
                </>
            ) : (
                <>
                <LineDeco>
                    <File onClick={() => handleFileDownload(node.fileId)}>
                        <NodenameSpan>{node.name}</NodenameSpan>
                    </File>
                    {isOwner && (  // 프로젝트 소유자인 경우에만 삭제 버튼을 렌더링
                        <DeleteButton onClick={() => removeFile(node.fileId)}>&times;</DeleteButton>
                    )}
                </LineDeco>
                </>
            )}
            </StyledLI>
        );
    };

    return (
        <StyledUL>
            {files.map((node, idx) => renderNode(node, idx))}
        </StyledUL>
    );
};
