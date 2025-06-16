import React, { useEffect, useRef } from 'react';
import styles from './ConfirmationDialog.module.css';

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, isDeleting }) => {
  const dialogRef = useRef(null);
  const cancelButtonRef = useRef(null);
  const deleteButtonRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (isOpen && event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      // Store the previously focused element
      previousActiveElement.current = document.activeElement;
      
      // Add event listener for escape key
      window.addEventListener('keydown', handleEscapeKey);

      // Focus the dialog when it opens
      dialogRef.current?.focus();
    }

    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Handle focus trap
  useEffect(() => {
    const handleTabKey = (event) => {
      if (!isOpen || !cancelButtonRef.current || !deleteButtonRef.current) return;

      if (event.key === 'Tab') {
        // Handle focus trap
        if (event.shiftKey && document.activeElement === cancelButtonRef.current) {
          event.preventDefault();
          deleteButtonRef.current.focus();
        } else if (!event.shiftKey && document.activeElement === deleteButtonRef.current) {
          event.preventDefault();
          cancelButtonRef.current.focus();
        }
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleTabKey);
    }

    return () => {
      window.removeEventListener('keydown', handleTabKey);

      // Return focus to the element that was focused before the dialog was opened
      if (!isOpen && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        ref={dialogRef}
        tabIndex="-1"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="dialog-title" className={styles.title}>Confirm Deletion</h2>
        <p id="dialog-description" className={styles.description}>
          Are you sure you want to delete this post?
        </p>
        <div className={styles.buttons}>
          <button 
            className={styles.cancelButton} 
            onClick={onClose}
            ref={cancelButtonRef}
          >
            Cancel
          </button>
          <button 
            className={styles.deleteButton} 
            onClick={onConfirm}
            ref={deleteButtonRef}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
