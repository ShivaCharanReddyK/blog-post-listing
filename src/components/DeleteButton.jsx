import React from 'react';
import styles from './DeleteButton.module.css';

const DeleteButton = ({ onClick }) => {
  return (
    <button 
      className={styles.deleteButton} 
      onClick={onClick}
      aria-label="Delete post"
    >
      Delete
    </button>
  );
};

export default DeleteButton;
