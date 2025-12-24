
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import Products from './pages/Products.tsx';
import Contact from './pages/Contact.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/contato" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
