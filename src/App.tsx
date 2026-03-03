import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Gallery from './pages/Gallery'
import MetadataDemo from './demos/MetadataDemo'
import AutomationDemo from './demos/AutomationDemo'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/demo/metadata" element={<MetadataDemo />} />
        <Route path="/demo/automation" element={<AutomationDemo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
