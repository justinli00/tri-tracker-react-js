import React, { useEffect, useState } from 'react';
import './App.css';
import PostList from './components/PostList';
import PostLoadingComponent from './components/PostLoading';
import axiosInstance from './axios';

function App() {
  const PostLoading = PostLoadingComponent(PostList);
  const [appState, setAppState] = useState({
    loading: false,
    posts: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    axiosInstance.get('post')
      .then((posts) => {
        setAppState({ loading: false, posts: posts.data})
      })
      .catch((error) => {
        if(!(localStorage.getItem('access_token') == null && error.response.status === 401)) //it's only ok in this case -- catch 401
          console.log(error.message);
          console.log(error);
      });
  }, [setAppState]);
  return (
    <div className = "App">
        <h1>Latest Posts</h1>
        <PostLoading 
          isLoading = {appState.loading}
          posts = {appState.posts}
        />
    </div>
  )
}

export default App;