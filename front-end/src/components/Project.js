import react, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FileTree from "./FileTree";

export default function Project() {
    const [projectInfo, setProjectInfo] = useState([]);
    const [fileInfo, setFileInfo] = useState([]);
    const navigate = useNavigate();
    

    useEffect(() => {
        // axios 이용하여 projectName 이용하여 project 정보 가져오기

    }, [])

    const handleTagSelectSearch = () => {
        let tag = "css";
        navigate(`/search?q=${tag}`);
    }

    const handleFileChange = (e) => {
        
    }

    const handleFileUpload = () => {

    }

    const handleFileDownload = () => {
        console.log('download');
    }

    const handleDeleteFile = () => {
        // axios DELETE 메소드 사용

    }

    const navigate = useNavigate();

    const { projectId } = useParams();

    const handleUploadButtonClick = () => {
        navigate(`/project/${projectId}/upload`);
    }

    return (
        <div>
            <h1>project</h1>
            <button onClick={handleUploadButtonClick}>upload</button>
            <FileTree projectId={projectId}/>
        </div>
    );
}