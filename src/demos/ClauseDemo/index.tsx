import { useState, useRef } from 'react'
import DemoLayout from '../../components/DemoLayout'
import SplitPanel from '../../components/SplitPanel'
import { contextText, calloutText, sections } from './data'

export default function ClauseDemo() {
  // Default selections: first option in each section
  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {}
    for (const section of sections) {
      defaults[section.id] = section.options[0].id
    }
    return defaults
  })

  // Track which section just changed for highlight effect
  const [changedSection, setChangedSection] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSelect = (sectionId: string, optionId: string) => {
    setSelections(prev => ({ ...prev, [sectionId]: optionId }))
    setChangedSection(sectionId)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setChangedSection(null), 1500)
  }

  const todayStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const sectionLabels: Record<string, { num: number; heading: string }> = {
    'nda-type': { num: 1, heading: 'TYPE OF NDA' },
    'definition': { num: 2, heading: 'CONFIDENTIAL INFORMATION' },
    'exclusions': { num: 3, heading: 'EXCLUSIONS' },
    'term': { num: 4, heading: 'TERM' },
    'remedies': { num: 5, heading: 'REMEDIES' },
  }

  const getSelectedOption = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId)
    if (!section) return null
    return section.options.find(o => o.id === selections[sectionId]) ?? section.options[0]
  }

  const leftPanel = (
    <div className="space-y-6">
      {sections.map(section => (
        <div key={section.id}>
          <h3 className="text-sm font-bold text-slate-700 mb-2">{section.title}</h3>
          <div className="space-y-2">
            {section.options.map(option => {
              const isSelected = selections[section.id] === option.id
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelect(section.id, option.id)}
                  className={`w-full text-left rounded-md border p-3 transition-colors ${
                    isSelected
                      ? 'border-l-4 border-l-blue-500 border-t-blue-200 border-r-blue-200 border-b-blue-200 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-semibold text-slate-900 text-sm">{option.label}</div>
                  <div className="text-sm text-slate-600 mt-1">&ldquo;{option.clauseText}&rdquo;</div>
                  <div className="text-xs text-slate-500 italic mt-1">{option.guidance}</div>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )

  const rightPanel = (
    <div
      className="bg-white border border-slate-200 rounded-lg shadow-lg p-8 text-sm leading-relaxed"
      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
    >
      <h2
        className="text-center text-base font-bold tracking-wide mb-6"
        style={{ fontFamily: 'inherit' }}
      >
        NON-DISCLOSURE AGREEMENT
      </h2>

      <p className="mb-6">
        This Agreement is entered into as of {todayStr} by and between the undersigned parties.
      </p>

      {sections.map(section => {
        const selected = getSelectedOption(section.id)
        if (!selected) return null
        const label = sectionLabels[section.id]
        const isHighlighted = changedSection === section.id

        return (
          <div key={section.id} className="mb-4">
            <p>
              <span className="font-bold">
                {label.num}. {label.heading}.
              </span>{' '}
              <span
                className={`transition-colors duration-700 ${
                  isHighlighted ? 'bg-yellow-50' : ''
                }`}
              >
                {selected.fullText}
              </span>
            </p>
          </div>
        )
      })}

      {/* Signature block */}
      <p className="mb-2 mt-8">
        IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written
        above.
      </p>

      <div className="mt-8 flex justify-between text-xs">
        <div className="text-center">
          <div className="border-b border-slate-400 w-48 mb-1">&nbsp;</div>
          <div className="text-slate-500">Disclosing Party</div>
        </div>
        <div className="text-center">
          <div className="border-b border-slate-400 w-48 mb-1">&nbsp;</div>
          <div className="text-slate-500">Receiving Party</div>
        </div>
      </div>
    </div>
  )

  return (
    <DemoLayout
      title="Clause Library"
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
      <SplitPanel left={leftPanel} right={rightPanel} />
    </DemoLayout>
  )
}
