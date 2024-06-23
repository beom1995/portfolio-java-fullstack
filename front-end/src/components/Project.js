import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FileTree from "./FileTree";

export default function Project() {
    const { userName, projectTitle } = useParams();
    const [projectInfo, setProjectInfo] = useState([]);
    const [fileInfo, setFileInfo] = useState([]);
    const [tag, setTag] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        // axios 이용하여 projectName 이용하여 project 정보 가져오기
        console.log(projectTitle);
        axios.get(`/api/project/${userName}/${projectTitle}`)
             .then(response => {
                const result = response.data;
                setProjectInfo(result);
                setTag(result.tag.tagName);
                setFileInfo(result.files);
             })
             .catch(error => {
                console.log(error);
                navigate(`/error`)
            });
    }, [])

    const handleTagSelectSearch = () => {
        navigate(`/tags/${tag}`);
    }

    const handleUploadButtonClick = () => {
        navigate(`/project/${userName}/${projectTitle}/upload`, {
            state: {
                projectInfo
            }
        });
    };

    return (
        <div>
            <div>
                <h1>{ projectInfo.projectTitle }</h1>
                <h3 onClick={handleTagSelectSearch}>#{tag}</h3>
            </div>
            <div>
                <button onClick={handleUploadButtonClick}>upload</button>
                <FileTree
                    projectId={projectInfo.projectId} 
                    userName={userName} 
                    projectTitle={projectTitle}
                />
            </div>
        </div>
    );
}
