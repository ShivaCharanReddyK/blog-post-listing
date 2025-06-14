import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogPostForm from '../components/BlogPostForm';
import styles from './EditBlogPost.module.css';

const EditBlogPost = ({ posts, updatePost }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the post to edit
  const post = posts.find(post => post.id === id);

  const handleSubmit = (postData) => {
    // Update the post
    updatePost(postData);
    
    // Navigate to the post detail page
    navigate(`/posts/${id}`);
  };

  if (!post) {
    return <div className={styles.notFound}>Blog post not found.</div>;
  }

  return (
    <div className={styles.editBlogPost}>
      <h1>Edit Blog Post</h1>
      <BlogPostForm post={post} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditBlogPost;
