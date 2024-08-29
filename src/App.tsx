import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Reversal } from './pages/Reversal/Reversal'
import { MultipleBaseline } from './pages/MultipleBaseline/MultipleBaseline'

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/reversal" element={<Reversal/>}/>
        <Route path="/multiple-baseline" element={<MultipleBaseline/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
