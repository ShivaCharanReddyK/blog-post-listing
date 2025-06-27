import React, { useState } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import styles from './CommentSection.module.css';

const CommentSection = ({ postId, comments: initialComments = [] }) => {
  // In a real app, you would fetch comments from an API
  // and handle user authentication status
  const [comments, setComments] = useState(initialComments.length > 0 
    ? initialComments 
    : [
      // Sample comments for demonstration (only used if no comments are provided)
      {
        id: '1',
        name: 'Sarah Johnson',
        date: '2023-06-15T14:30:00',
        text: 'This article was incredibly helpful! I\'ve been trying to understand the differences between CSS Grid and Flexbox for a while, and your explanation made it very clear.',
      },
      {
        id: '2',
        name: 'Mike Thomas',
        date: '2023-06-16T09:15:00',
        text: 'Great post! I particularly liked the examples showing when to use each layout system. I\'ve been using Flexbox for everything but now I see where Grid would be more appropriate.',
      }
    ]
  );
  
  // Simulate logged in user (in a real app, this would come from auth context)
  const [isLoggedIn] = useState(false);
  const [userName] = useState('');
  
  const handleAddComment = (newComment) => {
    const commentWithId = {
      ...newComment,
      id: Date.now().toString()
    };
    
    setComments([...comments, commentWithId]);
  };
  
  return (
    <section className={styles.commentSection}>
      <div className={styles.container}>
        <CommentList comments={comments} />
        <CommentForm 
          onSubmit={handleAddComment}
          isLoggedIn={isLoggedIn}
          userName={userName}
        />
      </div>
    </section>
  );
};

export default CommentSection;
