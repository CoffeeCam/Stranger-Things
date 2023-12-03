import React, { useState, useEffect } from 'react';

const BASE_URL = 'https://strangers-things.herokuapp.com/api/2306-FTB-MT-WEB-PT';

function Profile ({ user, onLogout }) {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts?author=${user.username}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          setUserPosts(data.data.posts);
        } else {
          console.error('Error fetching user posts:', data.error.message);
        }
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, [user]);

  return (
    <div className="profile-container">
      <h2 className="profile-heading">Your Profile</h2>
      <p className="welcome-message">Welcome, {user.username}!</p>
      <button className="logout-button" onClick={onLogout}>Logout</button>

      <h3 className="your-posts-heading">Your Posts</h3>
      <ul className="user-posts-list">
        {userPosts.map((post) => (
          <li key={post._id} className="user-post-item">
            <h4 className="post-title">{post.title}</h4>
            <p className="post-description">{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;