import axios from "axios";
import react, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "./Pagination";

export default function Home() {
    const [projectInfo, setProjectInfo] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    const { userName } = useParams();
    const navigate = useNavigate();

    const fetchProjectInfo = async (page) => {
        try {
            const response = await axios.get(`/api/projects?userName=${userName}&page=${page}`);
            const result = await response.data;
            setProjectInfo(result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProjectInfo(0);
    }, []);

    useEffect(() => {
        if(isDelete) {
            setIsDelete(false);
        }
        fetchProjectInfo(projectInfo.page - 1);
    }, [isDelete])

    const handleProjectSearch = () => {
        navigate('/search');
    }

    const handleTagSearch = () => {
        navigate(`/tag`);
    }

    const handleAddProject = () => {
        navigate(`/project/${userName}/create`);
    }

    const handleDeleteProject = (e) => {
        if(window.confirm(`프로젝트를 삭제하시겠습니까?(프로젝트 삭제 시 프로젝트에 속한 파일도 모두 삭제됩니다.)`)){
            axios.delete(`/api/project/${e.target.id}`)
            .then(response => setIsDelete(true))
            .catch(error => navigate(`/error`));
        } else {
            return;
        }
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
                    {projectInfo.resultList && projectInfo.resultList.map((project) => (
                        <div>
                            <li key={project.projectId} id={project.projectTitle} onClick={handleSelectProject}>
                            {project.projectTitle}</li>
                            <button id={project.projectId} onClick={handleDeleteProject}>delete</button>
                        </div>
                    ))}
                </ul>
                <Pagination
                    projectInfo={projectInfo}
                    handleProjectPageInfo={fetchProjectInfo} />
            </div>
        </div>
    );
}