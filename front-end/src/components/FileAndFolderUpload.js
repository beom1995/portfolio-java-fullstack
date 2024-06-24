import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const InputUploadButton = styled.input.attrs({ type: 'file' })`
    display: none;
`;

const CustomUploadButton = styled.label`
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
    background-color: #4CAF50;
    color: white;
    border-radius: 5px;

    &:hover {
        background-color: #45a049;
    }
`;

const FileListWrapper = styled.div`
  margin-top: 20px;
`;

const FileListTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
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
`;

const FileName = styled.span`
  flex: 1;
  margin-right: 10px;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: #ff4500;
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #ff0000;
  }
`;

function FileAndFolderUpload() {
    const [files, setFiles] = useState([]);

    const { userName, projectTitle } = useParams();

    const navigate = useNavigate();
    const location = useLocation();
    const projectInfo = location.state || {};

    const onDrop = (acceptedItems) => {
        const validFiles = getFilesSmallerThanMaxSize(acceptedItems);
        setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        webkitRelativePath: true,
        webkitdirectory: true,
        directory: true,
    });

    const handleFileUploadChange = (event) => {
        const uploadedFiles = event.target.files;
        const Files = Array.from(uploadedFiles);
        // const validFiles = getFilesSmallerThanMaxSize(uploadedFiles);

        setFiles((prevFiles) => [...prevFiles, ...Files]);
    };

    const handleFolderUploadChange = (event) => {
        const uploadedFiles = event.target.files;
        const Files = Array.from(uploadedFiles);
        // const validFiles = getFilesSmallerThanMaxSize(uploadedFiles);

        setFiles((prevFiles) => [...prevFiles, ...Files]);
    };

    const getFilesSmallerThanMaxSize = (Files) => {
        const maxSize = 50 * 1024 * 1024; // 50MB in bytes
        const validFiles = Array.from(Files).filter(file => file.size <= maxSize);
        
        if (validFiles.length !== Files.length) {
            alert('파일 크기가 50MB를 초과하면 업로드할 수 없습니다.');
        }

        return validFiles;
    }

    const removeFile = (fileName) => {
        setFiles((prevFiles) => {
            return prevFiles.filter((file) => file.name !== fileName)
        });
    };

    const handleUploadSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();

        if(files.length > 0) {

            files.forEach(file => {
                formData.append('files', file);
                formData.append('paths', file.path);
            });

            axios.post(`/api/project/${projectInfo.projectInfo.projectId}/files`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                console.log('save');
                navigate(`/project/${projectInfo.projectInfo.user.userName}/${projectInfo.projectInfo.projectTitle}`);
            })
            .catch(error => {
                console.log('업로드 실패: ' + error);
            });

        } else {
            console.log('Add some files');
        }        
    }

    return (
        <div>
            <Header />
            <form onSubmit={handleUploadSubmit}>
                <div {...getRootProps({ className: 'dropzone' })} style={{ border: '3px dashed #cccccc', padding: '20px' }}>
                    <input {...getInputProps()} />
                    {isDragActive ?
                        <h5>Drop the files here!</h5> : 
                        <h5>Drag & Drop some files here, or click to upload files.</h5>
                    }   
                </div>
                {/* <div>
                    <CustomUploadButton htmlFor='file-upload-input'>
                        파일 업로드
                    </CustomUploadButton>
                    <InputUploadButton
                        id="file-upload-input"
                        name="files" 
                        multiple
                        onChange={handleFileUploadChange}
                    />
                    <CustomUploadButton htmlFor='folder-upload-input'>
                        폴더 업로드
                    </CustomUploadButton>
                    <InputUploadButton
                        id="folder-upload-input"
                        name="files"
                        webkitdirectory="true" 
                        directory="true" 
                        multiple
                        onChange={handleFolderUploadChange}
                    />
                </div> */}
                <FileListWrapper>
                    <FileListTitle>Waiting to be uploaded</FileListTitle>
                    <FileList>
                        {files && files.map((file, index) => (
                            <FileItem key={index}>
                                <FileName>{file.path || file.webkitRelativePath || file.name}</FileName>
                                <DeleteButton onClick={() => removeFile(file.name)}>&times;</DeleteButton>
                            </FileItem>
                        ))}
                    </FileList>
                </FileListWrapper>
                <button type="submit">Upload</button>
            </form>
            <Footer />
        </div>
    );
}

export default FileAndFolderUpload;