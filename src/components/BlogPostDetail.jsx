import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './BlogPostDetail.module.css';

const BlogPostDetail = ({ title, content, author, date }) => {
  const { id } = useParams();
  if (!title || !content || !author || !date) {
    return <p className={styles.notFound}>Blog post not found.</p>;
  }

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  return (
    <article className={styles.blogPostDetail}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {id && (
          <Link to={`/edit/${id}`} className={styles.editButton}>
            Edit Post
          </Link>
        )}
      </div>
      <p className={styles.author}>By {author}</p>
      <p className={styles.date}>Published on {formattedDate}</p>
      <div 
        className={styles.content} 
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    </article>
  );
};

export default BlogPostDetail;
