import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './index.css'
import Commentpage from './pages/Commentpage'
import Homepage from './pages/Homepage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path={`/comments/:postId`} element={<Commentpage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App
