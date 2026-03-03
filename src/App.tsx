import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Gallery from './pages/Gallery'
import MetadataDemo from './demos/MetadataDemo'
import AutomationDemo from './demos/AutomationDemo'
import ClauseDemo from './demos/ClauseDemo'
import AIEditingDemo from './demos/AIEditingDemo'
import ContractDemo from './demos/ContractDemo'
import BriefDemo from './demos/BriefDemo'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/demo/metadata" element={<MetadataDemo />} />
        <Route path="/demo/automation" element={<AutomationDemo />} />
        <Route path="/demo/clause-library" element={<ClauseDemo />} />
        <Route path="/demo/ai-editing" element={<AIEditingDemo />} />
        <Route path="/demo/contract-review" element={<ContractDemo />} />
        <Route path="/demo/brief-verification" element={<BriefDemo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
