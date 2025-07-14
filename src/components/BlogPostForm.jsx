import React, { useState } from 'react';
import styles from './BlogPostForm.module.css';

const BlogPostForm = ({ post, onSubmit }) => {
  // Initialize state with existing post data or empty strings
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [author, setAuthor] = useState(post?.author || '');
  const [date, setDate] = useState(post?.date || '');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format date for input element
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form fields
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!content.trim()) newErrors.content = 'Content is required';
    if (!author.trim()) newErrors.author = 'Author is required';
    if (!date) newErrors.date = 'Publication date is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Show submitting state
    setIsSubmitting(true);
    
    // Call the onSubmit callback with form data
    onSubmit({ 
      id: post?.id, // Pass the id if editing an existing post
      title, 
      content, 
      author, 
      date 
    });
    
    // Reset form (optional, depending on requirements)
    // Can be removed if the form should not reset after submission
    if (!post) {
      setTitle('');
      setContent('');
      setAuthor('');
      setDate('');
    }
    
    setErrors({});
    setIsSubmitting(false);
  };

  return (
    <form className={styles.blogPostForm} onSubmit={handleSubmit} noValidate>
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>Title</label>
        <div className={styles.inputContainer}>
          <input
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${styles.input} ${errors.title ? styles.errorInput : ''}`}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <p id="title-error" className={styles.error} role="alert">
              {errors.title}
            </p>
          )}
        </div>
      </div>      <div className={styles.formGroup}>
        <label htmlFor="content" className={styles.label}>Content</label>
        <div className={styles.inputContainer}>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`${styles.textarea} ${errors.content ? styles.errorInput : ''}`}
            rows="10"
            aria-invalid={!!errors.content}
            aria-describedby={errors.content ? "content-error" : undefined}
            placeholder="Enter HTML content here"
          ></textarea>
          {errors.content && (
            <p id="content-error" className={styles.error} role="alert">
              {errors.content}
            </p>
          )}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="author" className={styles.label}>Author</label>
        <div className={styles.inputContainer}>
          <input
            id="author"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className={`${styles.input} ${errors.author ? styles.errorInput : ''}`}
            aria-invalid={!!errors.author}
            aria-describedby={errors.author ? "author-error" : undefined}
          />
          {errors.author && (
            <p id="author-error" className={styles.error} role="alert">
              {errors.author}
            </p>
          )}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="date" className={styles.label}>Publication Date</label>
        <div className={styles.inputContainer}>
          <input
            id="date"
            name="date"
            type="date"
            value={formatDateForInput(date)}
            onChange={(e) => setDate(e.target.value)}
            className={`${styles.input} ${errors.date ? styles.errorInput : ''}`}
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? "date-error" : undefined}
          />
          {errors.date && (
            <p id="date-error" className={styles.error} role="alert">
              {errors.date}
            </p>
          )}
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : post ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
};

export default BlogPostForm;
