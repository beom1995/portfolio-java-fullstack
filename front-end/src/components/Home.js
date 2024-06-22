import axios from "axios";
import react, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Home() {
    const [projectInfo, setProjectInfo] = useState([]);
    const { userName } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // axios get으로 프로젝트 목록 받아오기
        axios.get(`/api/projects/${userName}`)
             .then(response => {
                const result = response.data;
                setProjectInfo(result);
             })
             .catch(error => console.log(error));
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
        navigate(`/project/${userName}/${e.target.id}`);
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
                    {projectInfo && projectInfo.map((project) => (
                        <li key={project.projectId} id={project.projectTitle} onClick={handleSelectProject}>
                            {project.projectTitle}
                            <button onClick={handleDeleteProject}>delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}