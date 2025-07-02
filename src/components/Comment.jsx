import React from 'react';
import styles from './Comment.module.css';
import defaultAvatar from '../assets/default-avatar.png';

const Comment = ({ name, date, text, avatar }) => {
  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={styles.comment}>
      <div className={styles.avatarContainer}>
        <img 
          src={avatar || defaultAvatar} 
          alt={`${name}'s avatar`}
          className={styles.avatar}
        />
      </div>
      <div className={styles.commentContent}>
        <div className={styles.commentHeader}>
          <h3 className={styles.commenterName}>{name}</h3>
          <span className={styles.commentDate}>{formattedDate}</span>
        </div>
        <p className={styles.commentText}>{text}</p>
      </div>
    </div>
  );
};

export default Comment;
