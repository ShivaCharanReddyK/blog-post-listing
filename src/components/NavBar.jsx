import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import blogLogo from '../assets/blog-logo.png';
import styles from './NavBar.module.css';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && 
          menuRef.current && 
          !menuRef.current.contains(event.target) && 
          !buttonRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close menu when ESC key is pressed
  useEffect(() => {
    const handleEscKey = (event) => {
      if (isMenuOpen && event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isMenuOpen]);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Main navigation">      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo} aria-label="Blog home">
          <img src={blogLogo} alt="BlogPost" className={styles.logoImage} />
        </Link>

        {/* Desktop navigation */}
        <div className={styles.desktopNav}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/new" className={styles.navLink}>Create Post</Link>
          <Link to="/" className={styles.navLink}>About</Link>
        </div>

        {/* Mobile hamburger button */}
        <button 
          ref={buttonRef}
          className={styles.menuButton} 
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.line1Open : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.line2Open : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.line3Open : ''}`}></span>
        </button>
      </div>

      {/* Mobile menu */}
      <div 
        ref={menuRef}
        id="mobile-menu"
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.showMobileMenu : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <Link 
          to="/" 
          className={styles.mobileNavLink}
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        <Link 
          to="/new" 
          className={styles.mobileNavLink}
          onClick={() => setIsMenuOpen(false)}
        >
          Create Post
        </Link>
        <Link 
          to="/" 
          className={styles.mobileNavLink}
          onClick={() => setIsMenuOpen(false)}
        >
          About
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
