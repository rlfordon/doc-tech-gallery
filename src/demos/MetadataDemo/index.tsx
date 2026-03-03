import { useState, useEffect, useCallback } from 'react'
import DemoLayout from '../../components/DemoLayout'
import AnimatedReveal from '../../components/AnimatedReveal'
import { ndaContent, metadataLayers, scrubSteps, contextText, calloutText } from './data'

type Phase = 'pristine' | 'inspecting' | 'revealed' | 'sent' | 'scrubbing' | 'clean'

const borderColorMap: Record<string, string> = {
  red: 'border-l-red-500',
  orange: 'border-l-orange-500',
  yellow: 'border-l-yellow-500',
  purple: 'border-l-purple-500',
}

export default function MetadataDemo() {
  const [phase, setPhase] = useState<Phase>('pristine')
  const [revealedCount, setRevealedCount] = useState(0)
  const [scrubStep, setScrubStep] = useState(0)

  // Auto-reveal metadata layers one per second
  useEffect(() => {
    if (phase !== 'inspecting') return
    if (revealedCount >= 5) {
      setPhase('revealed')
      return
    }
    const timer = setTimeout(() => {
      setRevealedCount(prev => prev + 1)
    }, 1000)
    return () => clearTimeout(timer)
  }, [phase, revealedCount])

  // Auto-step through scrub steps
  useEffect(() => {
    if (phase !== 'scrubbing') return
    if (scrubStep >= 3) {
      setPhase('clean')
      return
    }
    const timer = setTimeout(() => {
      setScrubStep(prev => prev + 1)
    }, 1000)
    return () => clearTimeout(timer)
  }, [phase, scrubStep])

  const handleInspect = useCallback(() => {
    setPhase('inspecting')
    setRevealedCount(0)
  }, [])

  const handleSendAsIs = useCallback(() => {
    setPhase('sent')
  }, [])

  const handleScrubAndSend = useCallback(() => {
    setScrubStep(0)
    setPhase('scrubbing')
  }, [])

  return (
    <DemoLayout
      title="Metadata Inspection & Scrubbing"
      context={<span>{contextText}</span>}
      callout={
        <div>
          <p className="mb-2">
            <strong>Tools: </strong>{calloutText.tools}
          </p>
          <p>{calloutText.context}</p>
        </div>
      }
    >
      {/* NDA Document */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-8 mb-6">
        {/* Firm Letterhead */}
        <div className="text-center border-b border-slate-300 pb-4 mb-6">
          <h2 className="text-lg font-semibold tracking-widest uppercase text-slate-800" style={{ fontVariant: 'small-caps' }}>
            {ndaContent.firmName}
          </h2>
          <p className="text-xs text-slate-500 mt-1">{ndaContent.firmAddress}</p>
        </div>

        {/* Document Title */}
        <h3 className="text-center text-base font-bold text-slate-900 mb-6 tracking-wide">
          {ndaContent.title}
        </h3>

        {/* Parties */}
        <p className="text-sm text-slate-700 mb-4 leading-relaxed" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
          {ndaContent.parties}
        </p>

        {/* Sections */}
        {ndaContent.sections.map(section => (
          <div key={section.number} className="mb-4">
            <h4 className="text-sm font-bold text-slate-800 mb-1">
              {section.number}. {section.title}
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
              {section.text}
            </p>
          </div>
        ))}

        {/* Signature Block */}
        <pre className="text-sm text-slate-700 mt-6 whitespace-pre-wrap" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
          {ndaContent.signatureBlock}
        </pre>
      </div>

      {/* Inspect Button */}
      {phase === 'pristine' && (
        <div className="text-center mb-6">
          <button
            onClick={handleInspect}
            className="px-6 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors"
          >
            Inspect Document
          </button>
        </div>
      )}

      {/* Metadata Layers */}
      {(phase === 'inspecting' || phase === 'revealed' || phase === 'sent') && (
        <div className="space-y-3 mb-6">
          {metadataLayers.map((layer, index) => (
            <AnimatedReveal key={layer.id} show={index < revealedCount}>
              <div className={`border-l-4 ${borderColorMap[layer.color]} bg-slate-50 rounded-r-lg p-4`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{layer.icon}</span>
                  <span className="font-semibold text-slate-800 text-sm">{layer.label}</span>
                </div>
                <p className="text-xs font-mono bg-slate-100 rounded px-2 py-1 text-slate-700 mb-2">
                  {layer.content}
                </p>
                <p className="text-sm text-slate-600 italic">{layer.detail}</p>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      )}

      {/* Action Buttons after all revealed */}
      {phase === 'revealed' && (
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={handleSendAsIs}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Send As-Is
          </button>
          <button
            onClick={handleScrubAndSend}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Scrub &amp; Send
          </button>
        </div>
      )}

      {/* Send As-Is Warning */}
      {phase === 'sent' && (
        <AnimatedReveal show={true}>
          <div className="bg-red-50 border border-red-300 rounded-lg p-5 mb-6">
            <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
              <span className="text-xl">&#9888;</span> You just sent opposing counsel:
            </h4>
            <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
              <li>Your client's prior counsel's identity and firm name</li>
              <li>The previous deal party (Meridian Corp) hidden in field codes</li>
              <li>Internal negotiation strategy comments</li>
              <li>A deleted confidentiality carve-out they could recover</li>
              <li>Client network infrastructure details and prior deal dates</li>
            </ul>
          </div>
        </AnimatedReveal>
      )}

      {/* Scrubbing Steps */}
      {(phase === 'scrubbing' || phase === 'clean') && (
        <div className="space-y-3 mb-6">
          {scrubSteps.map((step, index) => (
            <AnimatedReveal key={step.label} show={index < scrubStep}>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                <span className="text-lg">{step.icon}</span>
                <div>
                  <p className="font-semibold text-green-800 text-sm">{step.label}</p>
                  <p className="text-sm text-green-700">{step.description}</p>
                </div>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      )}

      {/* Clean confirmation */}
      {phase === 'clean' && (
        <AnimatedReveal show={true}>
          <div className="bg-green-50 border border-green-300 rounded-lg p-5 mb-6 text-center">
            <span className="text-4xl block mb-2">&#10003;</span>
            <h4 className="font-bold text-green-800 mb-1">Document scrubbed and sent cleanly.</h4>
            <p className="text-sm text-green-700">
              All metadata, comments, tracked changes, and embedded data have been removed.
            </p>
          </div>
        </AnimatedReveal>
      )}
    </DemoLayout>
  )
}
