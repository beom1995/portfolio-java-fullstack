import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import FileTree from "./FileTree";

export default function Project() {

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