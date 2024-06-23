import axios from "axios";
import react, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateProject() {
    const { userName } = useParams();
    const [isCheck, setIsCheck] = useState(false);
    // true, false로 해서 projectTitle 중복 체크하기 (useState 이용)
    // 해서 값이 true일 때만 create가 실행되도록 처리할 것
    const [isblank, setIsBlank] = useState(true);
    const [projectTitle, setProjectTitle] = useState('');
    const [isNotDuplicate, setIsNotDuplicate] = useState(false);
    const [tagId, setTagId] = useState(0);
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
            { id: 9, name: 'etc..' }
          ]);

    const handleTitleChange = (e) => {
        if(e.target.value.trim() !== ''){
            setIsBlank(false);
        }
        setIsCheck(false);
        setProjectTitle(e.target.value);
    }

    const handleCheckTitle = (e) => {
        e.preventDefault();

        // title 중복 체크 시도 확인(check 버튼을 1번이라도 눌렀는지?)
        if(!isCheck) {
            setIsCheck(true);
        }

        if(isblank) {
            alert('프로젝트 이름을 입력하세요.');
            return;
        }

        axios.get(`/api/check?userName=${userName}&projectTitle=${projectTitle}`)
        .then(response => {
            setIsNotDuplicate(true)
            alert('사용 가능한 프로젝트 이름입니다.');
        })
        .catch(error => alert('사용 불가능한 프로젝트 이름입니다.'));
    }
    
    const handleTagCheck = (e) => {
        setTagId(e.target.value);
    }

    const handleProjectCreate = (e) => {
        e.preventDefault();

        if(isblank){
            alert('프로젝트 이름을 입력하세요.');
            return;
        }

        if(!isCheck) {
            alert('프로젝트 이름 중복 확인이 필요합니다.');
            return;
        }

        if(tagId === 0) {
            alert('태그를 선택하세요.');
            return;
        }

        if(!isNotDuplicate) {
            alert('프로젝트 이름이 중복입니다. 다시 입력해 주세요.');
            return;
        }

        axios.post(`/api/project`, {
            projectTitle: projectTitle,
            tagId: tagId,
            userName: userName
        })
        .then(response => {
            let title = response.data.projectTitle;
            navigate(`/project/${userName}/${title}`);
        })
        .catch(error => navigate(`/error`));
    }

    return (
        <div>
            <h2>Create Project</h2>
            <form>
                Project Title: <input onChange={handleTitleChange} required></input>
                <button onClick={handleCheckTitle}>check</button>
                <br />
                <div onChange={handleTagCheck} style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {tags.map((tag) => (
                        <span key={tag.id} style={{ marginRight: '10px' }}>
                            <input type="radio" value={tag.id} id={tag.name} name="tag" />
                            {tag.name}
                        </span>
                    ))}
                </div>
                <br />
                <button onClick={handleProjectCreate}>create</button>
            </form>
        </div>
    )
}