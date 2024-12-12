import React from 'react'
import Banner from '../Components/Banner'
import Freebooks from '../Components/Freebooks';

function Home() {
  return (
    <> 
        <div className="bg-slate-900">
            <Banner/>
    
            <Freebooks/>
        </div>
    </>
  );
}

export default Home