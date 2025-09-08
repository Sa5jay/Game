import Home from './pages/Home'
import Favourites from './pages/Favourites'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Tags from './pages/Tags'
import Genres from './pages/Genres'
import Stores from './pages/Stores'
import Platforms from './pages/Platforms'
import Description from './components/Description'
import GameDetails from './components/GameDetails'
import Developers from './pages/Developers'

const App = () => {
  return (
    <Router>
      <div className='min-h-screen bg-[#0A0A0A]'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameDetails />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/platforms" element={<Platforms />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/tags/:slug" element={<Description />} />
          <Route path="/genres/:slug" element={<Description />} />
          <Route path="/platforms/:id" element={<Description />} />
          <Route path="/stores/:id" element={<Description />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
