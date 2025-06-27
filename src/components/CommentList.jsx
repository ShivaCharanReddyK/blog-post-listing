import React from 'react';
import Comment from './Comment';
import styles from './CommentList.module.css';

const CommentList = ({ comments = [] }) => {
  if (comments.length === 0) {
    return <p className={styles.noComments}>No comments yet. Be the first to comment!</p>;
  }

  return (
    <div className={styles.commentList}>
      <h2 className={styles.commentsHeading}>
        {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
      </h2>
      <div className={styles.commentItems}>
        {comments.map((comment, index) => (
          <Comment 
            key={comment.id || index}
            name={comment.name}
            date={comment.date}
            text={comment.text}
            avatar={comment.avatar}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
