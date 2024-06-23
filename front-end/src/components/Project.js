<<<<<<< Updated upstream
import React from "react";
=======
import axios from "axios";
import React, { useEffect, useState } from "react";
>>>>>>> Stashed changes
import { useNavigate, useParams } from "react-router-dom";
import FileTree from "./FileTree";

export default function Project() {
<<<<<<< Updated upstream

    const navigate = useNavigate();

    const { projectId } = useParams();
=======
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
<<<<<<< Updated upstream

    const handleTagSelectSearch = () => {
        navigate(`/search?q=${tag}`);
    };
>>>>>>> Stashed changes
=======
  
    const handleTagSelectSearch = () => {
        navigate(`/tags/${tag}`);
    }
>>>>>>> Stashed changes

    const handleUploadButtonClick = () => {
        navigate(`/project/${userName}/${projectTitle}/upload`, {
            state: {
                projectInfo
            }
        });
    };

    return (
        <div>
            <h1>project</h1>
            <button onClick={handleUploadButtonClick}>upload</button>
            <FileTree projectId={projectId}/>
        </div>
    );
}