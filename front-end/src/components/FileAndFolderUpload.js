import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';

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

function FileAndFolderUpload() {
    const [files, setFiles] = useState([]);

    const { projectId } = useParams();

    const navigate = useNavigate();

    const onDrop = (acceptedItems) => {
        const validFiles = getFilesSmallerThanMaxSize(acceptedItems);
        setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        noClick: true,
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

            axios.post(`/api/project/${projectId}/files`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                navigate(`/project/${projectId}`);
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
            <form onSubmit={handleUploadSubmit}>
                <div {...getRootProps({ className: 'dropzone' })} style={{ border: '3px dashed #cccccc', padding: '20px' }}>
                    <input {...getInputProps()} />
                    {isDragActive ?
                        <h5>Drop the files here!</h5> : 
                        <h5>Drag & Drop some files here</h5>
                    }   
                </div>
                <div>
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
                </div>
                <div>
                    <h3>Waiting to be uploaded</h3>
                    <ul>
                        {files && files.map((file, index) => (
                            <li key={index} >
                                {file.path || file.webkitRelativePath || file.name}
                                <button onClick={() => removeFile(file.name)} style={{ marginLeft: '10px', color: 'red' }}>X</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default FileAndFolderUpload;
