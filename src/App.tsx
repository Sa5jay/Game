import React from 'react'
import Home from './pages/Home'
import Favourites from './pages/Favourites'
import {BrowserRouter as Router, Route , Routes} from'react-router-dom'
import Tags from './pages/Tags'
import Genres from './pages/Genres'
import Stores from './pages/Stores'
import Platforms from './pages/Platforms'


const App = () => {
  return (
    <Router>
      <div className=' min-h-screen  bg-[#0B0C10] '>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/favourites" element={<Favourites/>} />
          <Route path="/tags" element={<Tags/>} />
          <Route path="/genres" element={<Genres/>} />
          <Route path="/stores" element={<Stores/>} />
          <Route path="/platforms" element={<Platforms/>} />
        </Routes>
      </div>
    </Router>
   
  )
}

export default App