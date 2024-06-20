import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Project from './components/Project';
import Login from './components/Login';
import Signup from './components/Signup';
import Tag from './components/Tag';
import Home from './components/Home';
import Search from './components/Search';
import Error from './components/Error';
import CreateProject from './components/CreateProject';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/project/:userName" element={<Home />} />
        <Route path="/" element={<Login />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<Search />} />
        <Route path="/tag" element={<Tag />} />
        <Route path="/project/:userName/:projectName" element={<Project />} />
        <Route path="/project/:userName/create" element={<CreateProject />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
