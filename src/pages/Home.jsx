import React, { useEffect, useState,useRef } from 'react';
import Landing from '../components/Home/Landing';
import MockTest from '../components/Home/Mocktest';
import Footer from '../components/Footer';

const Home = ()=>{

  const mockTestRef = useRef(null); // Step 1: Create a ref

  const handleExploreClick = () => {
    if (mockTestRef.current) {
      mockTestRef.current.scrollIntoView({ behavior: 'smooth' }); // Step 2: Scroll to the ref
    }
  };

return(
  <>

<Landing onExploreClick={handleExploreClick} />
      <div ref={mockTestRef}> {/* Attach the ref to this div */}
        <MockTest />
      </div>
      <Footer />
  
  </>
);
}


export default Home;
