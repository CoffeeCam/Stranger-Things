import React, { useState } from 'react';

function CreatePost ({ user }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`, 
        },
        body: JSON.stringify({
          post: {
            title,
            description,
          },
        }),
      });

      const data = await response.json();

      // Handle success or show an error message
      if (data.success) {
        console.log('Post created successfully:', data.data.post);
      } else {
        console.error('Error creating post:', data.error.message);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;