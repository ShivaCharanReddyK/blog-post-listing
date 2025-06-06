import React from 'react';
import { Routes, Route, useParams, Link } from 'react-router-dom';
import BlogPostList from './components/BlogPostList';
import BlogPostDetail from './components/BlogPostDetail';

const samplePosts = [
  {
    id: '1',
    title: 'Getting Started with React',
    summary: 'Learn the basics of React and build your first application.',
    content: `<p>React is a JavaScript library for building user interfaces. It's declarative, efficient, and flexible, making it a popular choice for modern web development.</p>
              <h2>Why React?</h2>
              <p>React allows you to create reusable UI components that can be composed to build complex interfaces. Its virtual DOM implementation ensures efficient updates and rendering.</p>
              <h2>Setting Up Your First React App</h2>
              <p>The easiest way to get started with React is to use Create React App:</p>
              <pre>npx create-react-app my-app</pre>
              <p>This sets up a new React project with all the necessary configurations and dependencies.</p>
              <h2>Components and Props</h2>
              <p>React is all about components. A component is a self-contained piece of code that returns a React element describing what should appear on the screen.</p>
              <p>Learn more at <a href="https://reactjs.org" target="_blank">React's official website</a>.</p>`,
    author: 'Jane Smith',
    date: '2023-01-01',
    url: '/posts/1',
  },
  {
    id: '2',
    title: 'CSS Grid vs. Flexbox',
    summary: 'A comparison of two powerful layout systems in CSS.',
    content: `<p>CSS Grid and Flexbox are two layout systems in CSS that solve different problems and can be used together effectively.</p>
              <h2>Flexbox</h2>
              <p>Flexbox is designed for one-dimensional layouts - either rows OR columns. It's perfect for:</p>
              <ul>
                <li>Navigation menus</li>
                <li>Form controls</li>
                <li>Aligning items within a container</li>
              </ul>
              <h2>CSS Grid</h2>
              <p>CSS Grid is designed for two-dimensional layouts - rows AND columns simultaneously. It excels at:</p>
              <ul>
                <li>Page layouts</li>
                <li>Complex grid systems</li>
                <li>Placing items precisely in a grid</li>
              </ul>
              <h2>When to Use Each</h2>
              <p>Use Flexbox for UI elements and simple layouts. Use Grid for complex page layouts and two-dimensional positioning.</p>
              <p>Both can be used together: Grid for the overall layout, and Flexbox for components within the grid.</p>`,
    author: 'Alex Johnson',
    date: '2023-02-15',
    url: '/posts/2',
  },
  {
    id: '3',
    title: 'Accessibility in Web Development',
    summary: 'Tips for making your web applications more accessible.',
    content: `<p>Web accessibility means making websites usable for people with various disabilities and impairments.</p>
              <h2>Why Accessibility Matters</h2>
              <p>Creating accessible websites ensures that all users, regardless of ability, can access your content. It's not just good practice—it's often required by law.</p>
              <h2>Key Accessibility Tips</h2>
              <ol>
                <li><strong>Use semantic HTML</strong>: Elements like &lt;nav&gt;, &lt;main&gt;, and &lt;aside&gt; help screen readers understand your page structure.</li>
                <li><strong>Provide alternative text</strong>: Always include alt attributes for images.</li>
                <li><strong>Ensure keyboard navigation</strong>: Make sure users can navigate your site using only a keyboard.</li>
                <li><strong>Maintain sufficient color contrast</strong>: Text should be easily readable against its background.</li>
                <li><strong>Create descriptive links</strong>: Avoid "click here" and instead use descriptive link text.</li>
              </ol>
              <h2>Testing Tools</h2>
              <p>Use tools like WAVE, axe, or Lighthouse to test your site's accessibility.</p>
              <p>Remember that accessibility benefits everyone, not just users with disabilities.</p>`,
    author: 'Morgan Lee',
    date: '2023-03-10',
    url: '/posts/3',
  },
];

// Single BlogPost page component that uses the BlogPostDetail component
const BlogPost = () => {
  const { id } = useParams();
  const post = samplePosts.find(post => post.id === id);
  
  if (!post) {
    return <BlogPostDetail />;
  }
  
  return (
    <BlogPostDetail
      title={post.title}
      content={post.content}
      author={post.author}
      date={post.date}
    />
  );
};

function App() {
  return (
    <>
      <h1>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Blog Posts
        </Link>
      </h1>
      <Routes>
        <Route path="/" element={<BlogPostList posts={samplePosts} />} />
        <Route path="posts/:id" element={<BlogPost />} />
      </Routes>
    </>
  );
}

export default App;
