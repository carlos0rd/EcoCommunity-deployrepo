import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './assets/components/Header';
import UserFeed from './assets/components/UserFeed';
import CreateCount from './assets/components/CreateCount';
import Feed from './assets/components/Feed';
import About from './assets/components/about/About'; 
import Contact from './assets/components/contact/Contact'; 
import UserPage from './assets/components/UserPage';



function App() {
  const [showHeader, setShowHeader] = useState(true);

  const hideHeader = () => {
    setShowHeader(false);
  };

  const hideCreateCount = () => {
    setShowHeader(false);
  };

  

  return (
  
      <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <Routes>
         <Route path="/"element={<Header hideHeader={hideCreateCount} />}/>
          <Route path="/create-account"element={<CreateCount hideHeader={hideHeader} />}/>
          <Route path="/Feed" element={<Feed />} />
          <Route path="/UserFeed" element={<UserFeed />} />
        
          <Route path="/UserPage/:userId" element={<UserPage/>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<h1>Route not found</h1>} />
        </Routes>
      </div>

  );
}

export default App;
