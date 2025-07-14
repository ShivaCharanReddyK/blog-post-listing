import React from 'react';
import { useNavigate } from 'react-router-dom';
import BlogPostForm from '../components/BlogPostForm';
import styles from './NewBlogPost.module.css';

const NewBlogPost = ({ addPost }) => {
  const navigate = useNavigate();

  const handleSubmit = (postData) => {
    // Generate a new ID (in a real app, this would be handled by the backend)
    const newPost = {
      ...postData,
      id: Date.now().toString(), // Simple ID generation
      url: `/posts/${Date.now().toString()}`, // Generate URL based on ID
      summary: postData.content.replace(/<[^>]+>/g, ' ').slice(0, 100) + '...' // Generate a summary from content
    };
    
    // Add the new post
    addPost(newPost);
    
    // Navigate to the home page
    navigate('/');
  };

  return (
    <div className={styles.newBlogPost}>
      <h1>Create New Blog Post</h1>
      <BlogPostForm onSubmit={handleSubmit} />
    </div>
  );
};

export default NewBlogPost;
