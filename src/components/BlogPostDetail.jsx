import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DeleteButton from './DeleteButton';
import ConfirmationDialog from './ConfirmationDialog';
import styles from './BlogPostDetail.module.css';

const BlogPostDetail = ({ title, content, author, date, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleBackClick = (e) => {
    if (e.ctrlKey || e.metaKey) {
      // Let the browser handle cmd/ctrl+click
      return;
    }
    e.preventDefault();
    navigate('/');
  };

  if (!title || !content || !author || !date) {
    return <p className={styles.notFound}>Blog post not found.</p>;
  }

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    setIsDeleting(true);
    
    // Simulate async operation (in a real app, this would be an API call)
    setTimeout(() => {
      onDelete(id);
      setIsDeleting(false);
      navigate('/');
    }, 800);
  };

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });  return (
    <article className={styles.blogPostDetail}>      <Link 
        to="/" 
        className={styles.backButton} 
        aria-label="Go back to homepage"
        onClick={handleBackClick}
      >
        <span className={styles.backArrow}>←</span> Back to Posts
      </Link>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.actions}>
          {id && (
            <Link to={`/edit/${id}`} className={styles.editButton}>
              Edit Post
            </Link>
          )}
          <DeleteButton onClick={handleOpenDialog} />
        </div>      </div>
      <div className={styles.meta}>
        <p className={styles.author}>{author}</p>
        <p className={styles.date}>{formattedDate}</p>
      </div>
      <div 
        className={styles.content} 
        dangerouslySetInnerHTML={{ __html: content }} 
      />
      
      <ConfirmationDialog 
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </article>
  );
};

export default BlogPostDetail;
