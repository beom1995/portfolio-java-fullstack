import './App.css';
import { Routes, Route } from "react-router-dom";
import styled from 'styled-components';
import Project from './components/Project';
import Login from './components/Login';
import Signup from './components/Signup';
import Tag from './components/Tag';
import Home from './components/Home';
import Search from './components/Search';
import Error from './components/Error';
import FileAndFolderUpload from './components/FileAndFolderUpload';
import CreateProject from './components/CreateProject';
import SearchResults from './components/SearchResults';
import TagSearchResults from './components/TagSearchResults';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

function App() {
  return (
    <div className="App">
      <AppContainer>
        <Routes>
          <Route path="/project/:userName" element={<Home />} />
          <Route path="/" element={<Login />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/tags" element={<Tag />} />
          <Route path="/tags/:tagName" element={<TagSearchResults />} />
          <Route path="/project/:userName/create" element={<CreateProject />} />
          <Route path="/project/:userName/:projectTitle" element={<Project />} />
          <Route path="/project/:userName/:projectTitle/upload" element={<FileAndFolderUpload />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </AppContainer>
    </div>
  );
}

export default App;
