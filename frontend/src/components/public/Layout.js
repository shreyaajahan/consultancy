import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import initReveal from '../../utils/scrollReveal';

const Layout = ({ children, hideHeader = false }) => {
  useEffect(() => {
    // initialize scroll reveal animations
    initReveal();
  }, []);

  return (
    <div className="app">
      {!hideHeader && <Header />}
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
