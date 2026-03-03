import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Gallery from './pages/Gallery'
import MetadataDemo from './demos/MetadataDemo'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/demo/metadata" element={<MetadataDemo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
