import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Tags from './pages/Tags'
import Genres from './pages/Genres'
import Stores from './pages/Stores'
import Platforms from './pages/Platforms'
import Description from './pages/Description'
import GameDetails from './pages/GameDetails'
import Developers from './pages/Developers'
import SearchResults from './pages/SerachResults'
import Sidebar from './components/Sidebar'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
  return (
    <Router>
      <div className='min-h-screen p-1 bg-black'>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Sidebar />}/>
          <Route index element={<Home />} />
          <Route path="/game/:id" element={<GameDetails />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/platforms" element={<Platforms />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/tags/:slug" element={<Description />} />
          <Route path="/genres/:slug" element={<Description />} />
          <Route path="/developers/:slug" element={<Description />} />
          <Route path="/platforms/:id" element={<Description />} />
          <Route path="/stores/:id" element={<Description />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
