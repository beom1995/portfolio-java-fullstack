import axios from "axios";
import react, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
        navigate(`/search?q=${tag}`);
    }

    const handleFileChange = (e) => {
        
    }

    const handleFileUpload = () => {
        // FIleUpload --> 파일 컴포넌트...
    }

    const handleFileDownload = () => {
        // FileDownload --> 파일 컴포넌트...
    }

    const handleDeleteFile = () => {
        // axios DELETE 메소드 사용
        // FileDelete --> 파일 컴포넌트...

    }

    return (
        <div>
            <div>
                <h1>{ projectInfo.projectTitle }</h1>
                <h3 onClick={handleTagSelectSearch}>#{tag}</h3>
            </div>
            <form onSubmit={handleFileUpload}>
                <input type="file" onChange={handleFileChange}/>
                <button type="submit">add</button>
            </form>
            <div>
                {fileInfo && fileInfo.map((file) => (
                    <li onClick={handleFileDownload}>{file.fileName}
                    <button onClick={handleDeleteFile}>delete</button></li>
                ))}
            </div>
        </div>
    );
}