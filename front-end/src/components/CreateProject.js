import axios from "axios";
import react, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateProject() {
    const { userName } = useParams();
    const [project, setProject] = useState('');
    const [tag, setTag] = useState();
    const navigate = useNavigate();
    const [tags, setTags] = useState([
            { id: 1, name: 'CSS' },
            { id: 2, name: 'HTML' },
            { id: 3, name: 'Java' },
            { id: 4, name: 'JavaScript' },
            { id: 5, name: 'Python' },
            { id: 6, name: 'React' },
            { id: 7, name: 'Node.js' },
            { id: 8, name: 'Ruby' },
          ]);

    const handleTitleChange = (e) => {
        setProject(e.target.value);
    }

    const handleCheckTitle = (e) => {
        e.preventDefault();
        console.log(project);
    }
    
    const handleTagCheck = (e) => {
        console.log(e.target.value);
        setTag(e.target.value);
    }

    const handleProjectCreate = (e) => {
        // axios.post(`/api/project`, {
        //     projectTitle: project,
        //     tag: tag
        // });
        e.preventDefault();
        console.log(project);
        console.log(tag);
        navigate(`/home/${userName}`)
    }

    return (
        <div>
            <h2>Create Project</h2>
            <form>
                Project Title: <input onChange={handleTitleChange}></input>
                <button onClick={handleCheckTitle}>check</button>
                <br />
                <form onChange={handleTagCheck}>
                    {tags.map((tag) => (
                        <li>
                            <input type="checkbox" value={tag.id} id={tag.name} />
                            <label for={tag.name}>{tag.name}</label>
                        </li>
                    ))}
                </form>
                <br />
                <button onClick={handleProjectCreate}>create</button>
            </form>
        </div>
    )
}