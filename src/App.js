import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/Posts';
import PostLoadingComponent from './components/PostLoading';
import apiCall from './urls'

function App() {
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading: false,
    posts: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    fetch(apiCall(0), { 
      method:"GET"
    })
      .then((resp) => resp.json())
      .then((posts) => {
        setAppState({ loading: false, posts: posts})
      })
      .catch(error => alert(error.message));
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