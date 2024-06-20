import react, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

    return (
        <div>
            <div>
                <h1>Project Title</h1>
                <h3 onClick={handleTagSelectSearch}>#Tag</h3>
            </div>
            <form onSubmit={handleFileUpload}>
                <input type="file" onChange={handleFileChange}/>
                <button type="submit">add</button>
            </form>
            <div>
                <li onClick={handleFileDownload}>Test File</li>
                <button onClick={handleDeleteFile}>delete</button>
            </div>
        </div>
    );
}