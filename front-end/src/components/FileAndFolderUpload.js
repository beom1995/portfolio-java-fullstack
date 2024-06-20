import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from "react-router-dom";
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

    const navigate = useNavigate();

    const onDrop = (acceptedFiles) => {
        console.log(acceptedFiles);
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        noClick: true,
        webkitdirectory: true,
        directory: true,
    });

    const handleUploadChange = (event) => {
        const uploadedFiles = event.target.files;
        console.log(uploadedFiles);
        const filesArray = Array.from(uploadedFiles);
        setFiles((prevFiles) => [...prevFiles, ...filesArray]);
    };

    const removeFile = (fileName) => {
        setFiles((prevFiles) => {
            return prevFiles.filter((file) => file.name !== fileName)
        });
    };

    const handleUploadSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        
        if(files != []) {
            formData.append('files', files);

            // files.map((file) => {
            //     formData.append('files', file);
            // })
        }

        console.log(Array.from(formData));
        let projectId = 1;

        axios.post(`/api/project/{projectId}/files`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            navigate(`/project/{projectId}`);
        })
        .catch(error => {
            console.log('저장실패' + error);
        });
    }

    return (
        <div>
            <form onSubmit={handleUploadSubmit}>
                <div {...getRootProps({ className: 'dropzone' })} style={{ border: '3px dashed #cccccc', padding: '20px' }}>
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
                        onChange={handleUploadChange}
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
                        onChange={handleUploadChange}
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
