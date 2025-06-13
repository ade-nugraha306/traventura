import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Index from './Pages/Index';
import About from './Pages/About';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import NotFound from './Pages/NotFound';
import Chatbot from './Pages/Chatbot';
import Detail from './Pages/Detail';
import Recommendation from './Pages/Recommendation';
import Highlight from './Pages/Highlight';
import Search from './Pages/Search';

const GOOGLE_CLIENT_ID = "921863995362-t8tqcllq4347idednkh2kmi9238epikl.apps.googleusercontent.com"; // Ganti dengan Client ID dari Google Developer Console

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/highlight" element={<Highlight />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;