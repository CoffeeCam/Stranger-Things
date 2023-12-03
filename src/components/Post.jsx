import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BASE_URL = 'https://strangers-things.herokuapp.com/api/2306-FTB-MT-WEB-PT';

function Post ({ user }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts`);
        const data = await response.json();
        setPosts(data.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    // ... (your existing delete post logic)
  };

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            {user && user.username === post.author.username && (
              <button onClick={() => handleDeletePost(post._id)}>Delete Post</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Post;