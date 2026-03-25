import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './Pages/Home'
import Coin from './Pages/Coin'
import NotFound from './Pages/NotFound'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/crypto-coin/:id' element={<Coin />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
