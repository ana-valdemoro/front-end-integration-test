import React from 'react';
import './App.css';
import { UserList } from './components/UserList/UserList';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { SearchPost } from './components/SearchPost/SearchPost';
import { Post } from './components/Post/Post';

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/users">Go to Users list</Link>
        <Link to="/">Go to Home</Link>
        <Link to="/post">Go to Post</Link>
        <Routes>
          <Route path="/" element={<p>Home</p>} />
          <Route path="/users" element={<UserList />} />
          <Route path="/post" element={<SearchPost />}/>
          <Route path="/post/:id" element={<Post />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
