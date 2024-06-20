import React from "react";
import { useNavigate } from "react-router-dom";

export default function Project() {

    const navigate = useNavigate();

    const handleUploadButtonClick = () => {
        navigate('/upload');
    }

    return (
        <div>
            <h1>project</h1>
            <button onClick={handleUploadButtonClick}>upload</button>
        </div>
    );
}