import React, { memo, useMemo } from 'react';
import LazyImage from './LazyImage';
import styles from './Comment.module.css';
import defaultAvatar from '../assets/default-avatar.png';

const Comment = memo(({ name, date, text, avatar }) => {
  // Format date with memoization
  const formattedDate = useMemo(() => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, [date]);

  return (
    <div className={styles.comment}>
      <div className={styles.avatarContainer}>
        <LazyImage 
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
});

Comment.displayName = 'Comment';

export default Comment;
