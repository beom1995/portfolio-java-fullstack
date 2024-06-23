import './App.css';
import { Routes, Route } from "react-router-dom";
import Project from './components/Project';
import Login from './components/Login';
import Signup from './components/Signup';
import Tag from './components/Tag';
import Home from './components/Home';
import Search from './components/Search';
import Error from './components/Error';
import FileAndFolderUpload from './components/FileAndFolderUpload';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<Search />} />
<<<<<<< Updated upstream
        <Route path="/tag/:tagName" element={<Tag />} />
        <Route path="/project/:projectId" element={<Project />} />
=======
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/tags" element={<Tag />} />
        <Route path="/tags/:tagName" element={<TagSearchResults />} />
        <Route path="/project/:userName/create" element={<CreateProject />} />
        <Route path="/project/:userName/:projectName" element={<Project />} />
        <Route path="/project/:userName/:projectName/upload" element={<FileAndFolderUpload />} />
>>>>>>> Stashed changes
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
