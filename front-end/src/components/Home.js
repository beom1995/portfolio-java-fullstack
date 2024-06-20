import axios from "axios";
import react, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Home() {
    const [projectInfo, setProjectInfo] = useState([]);
    const [projectName, setProjectName] = useState('');
    const { userName } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // axios get으로 프로젝트 목록 받아오기
        // axios.get(`/api/projects/1`)
        //      .then(response => {
        //         console.log(response.data);
        //         setProjectInfo(response.data);
        //         console.log(projectInfo);
        //      })
        //      .catch(error => console.log(error));

        console.log('project list');
    }, []);

    const handleProjectSearch = () => {
        navigate('/search');
    }

    const handleTagSearch = () => {
        navigate(`/tag`);
    }

    const handleAddProject = () => {
        navigate(`/project/${userName}/create`);
    }

    const handleDeleteProject = () => {
        console.log('delete');
    }

    const handleSelectProject = (e) => {
        setProjectName('test');
        navigate(`/project/${userName}/${projectName}`)
    }

    return (
        <div>
            <div>
                <button onClick={handleProjectSearch}>Search</button>
                <button onClick={handleTagSearch}>Tag</button>
            </div>
            <div>
                <h1>~My Projects~</h1>
                <button onClick={handleAddProject}>create</button>
            </div>
            <div>
                <ul>
                    <li onClick={handleSelectProject}>Project Title</li>
                    <button onClick={handleDeleteProject}>delete</button>
                </ul>
            </div>
        </div>
    );
}