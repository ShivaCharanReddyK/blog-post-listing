import React, { useState } from 'react';
import styles from './CommentForm.module.css';

const CommentForm = ({ onSubmit, isLoggedIn = false, userName = '' }) => {
  const [name, setName] = useState(isLoggedIn ? userName : '');
  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    
    if (!isLoggedIn && !name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!text.trim()) {
      newErrors.text = 'Comment cannot be empty';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate network request delay
    setTimeout(() => {
      onSubmit({
        name: name.trim(),
        text: text.trim(),
        date: new Date(),
      });
      
      // Reset form
      if (!isLoggedIn) {
        setName('');
      }
      setText('');
      setErrors({});
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className={styles.commentFormContainer}>
      <h2 className={styles.formHeading}>Leave a Comment</h2>
      <form className={styles.commentForm} onSubmit={handleSubmit}>
        {!isLoggedIn && (
          <div className={styles.formGroup}>
            <label htmlFor="commenterName" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="commenterName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoggedIn}
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              placeholder="Your name"
              aria-describedby={errors.name ? 'nameError' : undefined}
            />
            {errors.name && (
              <p id="nameError" className={styles.errorText}>
                {errors.name}
              </p>
            )}
          </div>
        )}
        
        <div className={styles.formGroup}>
          <label htmlFor="commentText" className={styles.label}>
            Comment
          </label>
          <textarea
            id="commentText"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isSubmitting}
            className={`${styles.textarea} ${errors.text ? styles.inputError : ''}`}
            placeholder="Write your comment here..."
            rows={4}
            aria-describedby={errors.text ? 'textError' : undefined}
          ></textarea>
          {errors.text && (
            <p id="textError" className={styles.errorText}>
              {errors.text}
            </p>
          )}
        </div>
        
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
