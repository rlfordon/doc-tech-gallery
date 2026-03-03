import { useState, useRef, useEffect, useCallback } from 'react'
import DemoLayout from '../../components/DemoLayout'
import AnimatedReveal from '../../components/AnimatedReveal'
import {
  contextText,
  calloutText,
  verboseParagraph,
  verboseWordCount,
  aiResults,
  styleFlags,
  consistencyText,
  consistencyFlags,
  ruleBasedCallout,
  consistencyCallout,
} from './data'
import type { DiffSegment } from './data'

type TabId = 'ai-edit' | 'style-rules' | 'consistency'

const tabs: { id: TabId; label: string }[] = [
  { id: 'ai-edit', label: 'AI Edit' },
  { id: 'style-rules', label: 'Style Rules' },
  { id: 'consistency', label: 'Consistency Check' },
]

/* ------------------------------------------------------------------ */
/*  Tab 1 — AI Edit                                                    */
/* ------------------------------------------------------------------ */

function AIEditTab() {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [showClean, setShowClean] = useState(false)

  const buttons = [
    { key: 'concise', label: 'Make it concise' },
    { key: 'activeVoice', label: 'Convert to active voice' },
    { key: 'clientLetter', label: 'Simplify for client letter' },
  ]

  const result = selectedStyle ? aiResults[selectedStyle] : null

  return (
    <div className="space-y-6">
      {/* Original paragraph */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Original Text
        </h3>
        <p
          className="text-sm leading-relaxed text-slate-800"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          {verboseParagraph}
        </p>
        <div className="mt-3 text-xs text-slate-500">{verboseWordCount} words</div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        {buttons.map((btn) => (
          <button
            key={btn.key}
            type="button"
            onClick={() => {
              setSelectedStyle(btn.key)
              setShowClean(false)
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedStyle === btn.key
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Result */}
      {result && (
        <div className="space-y-4">
          {/* Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowClean(!showClean)}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              {showClean ? 'Show markup view' : 'Show clean view'}
            </button>
            <span className="inline-flex items-center gap-2 text-xs bg-slate-100 rounded-full px-3 py-1">
              Before: <strong>{verboseWordCount}</strong> words &rarr; After:{' '}
              <strong>{result.wordCount}</strong> words
            </span>
          </div>

          {/* Diff / clean view */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
              {showClean ? 'Revised Text' : 'Markup View'}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              {showClean
                ? result.text
                : result.diffs.map((seg: DiffSegment, i: number) => {
                    if (seg.type === 'delete') {
                      return (
                        <span key={i} className="bg-red-50 text-red-700 line-through">
                          {seg.text}
                        </span>
                      )
                    }
                    if (seg.type === 'insert') {
                      return (
                        <span key={i} className="bg-blue-50 text-blue-700 underline">
                          {seg.text}
                        </span>
                      )
                    }
                    return <span key={i}>{seg.text}</span>
                  })}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Tab 2 — Style Rules                                                */
/* ------------------------------------------------------------------ */

function StyleRulesTab() {
  const [activeFlag, setActiveFlag] = useState<number | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // Build highlighted paragraph by splitting on flagged phrases
  const renderHighlightedText = () => {
    let remaining = verboseParagraph
    const parts: { text: string; flagIndex: number | null }[] = []

    // Find all phrase positions and sort by position
    const positions: { start: number; end: number; flagIndex: number }[] = []
    for (let i = 0; i < styleFlags.length; i++) {
      const phrase = styleFlags[i].phrase
      const idx = remaining.toLowerCase().indexOf(phrase.toLowerCase())
      if (idx !== -1) {
        positions.push({ start: idx, end: idx + phrase.length, flagIndex: i })
      }
    }
    positions.sort((a, b) => a.start - b.start)

    let cursor = 0
    for (const pos of positions) {
      if (pos.start > cursor) {
        parts.push({ text: remaining.slice(cursor, pos.start), flagIndex: null })
      }
      parts.push({ text: remaining.slice(pos.start, pos.end), flagIndex: pos.flagIndex })
      cursor = pos.end
    }
    if (cursor < remaining.length) {
      parts.push({ text: remaining.slice(cursor), flagIndex: null })
    }

    return parts.map((part, i) => {
      if (part.flagIndex === null) {
        return <span key={i}>{part.text}</span>
      }
      const isActive = activeFlag === part.flagIndex
      return (
        <span
          key={i}
          onClick={() => {
            setActiveFlag(part.flagIndex)
            cardRefs.current[part.flagIndex!]?.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
            })
          }}
          className={`cursor-pointer rounded px-0.5 transition-colors ${
            isActive ? 'bg-amber-300' : 'bg-amber-100 hover:bg-amber-200'
          }`}
        >
          {part.text}
        </span>
      )
    })
  }

  return (
    <div className="space-y-6">
      {/* Highlighted paragraph */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Original Text &mdash; Style Issues Highlighted
        </h3>
        <p
          className="text-sm leading-relaxed text-slate-800"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          {renderHighlightedText()}
        </p>
      </div>

      {/* Rule cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Style Rules ({styleFlags.length} issues)
        </h3>
        {styleFlags.map((flag, i) => {
          const isActive = activeFlag === i
          return (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el
              }}
              onClick={() => setActiveFlag(i)}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                isActive
                  ? 'border-amber-400 bg-amber-50 shadow-md'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-sm font-semibold text-slate-900">
                    &ldquo;{flag.phrase}&rdquo;
                  </span>
                  <span className="text-sm text-slate-500 mx-2">&rarr;</span>
                  <span className="text-sm font-medium text-blue-700">{flag.replacement}</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-2">{flag.rule}</p>
            </div>
          )
        })}
      </div>

      {/* Callout */}
      <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-5">
        <div className="flex items-start gap-3">
          <span className="text-amber-500 text-xl mt-0.5">&#9881;</span>
          <div>
            <h4 className="font-semibold text-amber-900 mb-2">Rule-Based vs. AI</h4>
            <p className="text-sm text-amber-800 leading-relaxed">{ruleBasedCallout}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Tab 3 — Consistency Check                                          */
/* ------------------------------------------------------------------ */

const colorMap: Record<string, { bg: string; underline: string; card: string; text: string }> = {
  blue: {
    bg: 'bg-blue-100',
    underline: 'underline decoration-blue-500 decoration-2',
    card: 'border-blue-400 bg-blue-50',
    text: 'text-blue-800',
  },
  purple: {
    bg: 'bg-purple-100',
    underline: 'underline decoration-purple-500 decoration-2',
    card: 'border-purple-400 bg-purple-50',
    text: 'text-purple-800',
  },
  green: {
    bg: 'bg-green-100',
    underline: 'underline decoration-green-500 decoration-2',
    card: 'border-green-400 bg-green-50',
    text: 'text-green-800',
  },
  orange: {
    bg: 'bg-orange-100',
    underline: 'underline decoration-orange-500 decoration-2',
    card: 'border-orange-400 bg-orange-50',
    text: 'text-orange-800',
  },
  red: {
    bg: 'bg-red-100',
    underline: 'underline decoration-red-500 decoration-2',
    card: 'border-red-400 bg-red-50',
    text: 'text-red-800',
  },
}

function ConsistencyTab() {
  const [checking, setChecking] = useState(false)
  const [visibleFlags, setVisibleFlags] = useState<string[]>([])

  const handleCheck = useCallback(() => {
    setChecking(true)
    setVisibleFlags([])
    consistencyFlags.forEach((flag, i) => {
      setTimeout(() => {
        setVisibleFlags((prev) => [...prev, flag.id])
      }, (i + 1) * 500)
    })
  }, [])

  // Reset when unmounted handled by parent resetting key

  // Build paragraph text with highlights
  const renderParagraph = (paraId: string, heading: string, text: string) => {
    // Find all instances that apply to this paragraph
    const instances: { text: string; color: string; start: number }[] = []
    for (const flag of consistencyFlags) {
      if (!visibleFlags.includes(flag.id)) continue
      for (const inst of flag.instances) {
        if (inst.paragraph !== paraId) continue
        const idx = text.indexOf(inst.text)
        if (idx !== -1) {
          instances.push({ text: inst.text, color: flag.color, start: idx })
        }
      }
    }
    instances.sort((a, b) => a.start - b.start)

    const parts: React.ReactNode[] = []
    let cursor = 0
    for (let i = 0; i < instances.length; i++) {
      const inst = instances[i]
      if (inst.start > cursor) {
        parts.push(<span key={`t-${i}`}>{text.slice(cursor, inst.start)}</span>)
      }
      const colors = colorMap[inst.color] || colorMap.blue
      parts.push(
        <span key={`h-${i}`} className={`${colors.underline} ${colors.bg} rounded px-0.5`}>
          {inst.text}
        </span>
      )
      cursor = inst.start + inst.text.length
    }
    if (cursor < text.length) {
      parts.push(<span key="tail">{text.slice(cursor)}</span>)
    }

    return (
      <div className="mb-4">
        <p
          className="text-sm leading-relaxed text-slate-800"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          <span className="font-bold">{heading}</span> {parts}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Contract text */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Contract Excerpt
        </h3>
        {consistencyText.map((para) => renderParagraph(para.id, para.heading, para.text))}
      </div>

      {/* Check button */}
      {!checking && (
        <button
          type="button"
          onClick={handleCheck}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Check Consistency
        </button>
      )}

      {/* Flag cards */}
      {checking && (
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Consistency Issues ({consistencyFlags.length})
          </h3>
          {consistencyFlags.map((flag, i) => {
            const colors = colorMap[flag.color] || colorMap.blue
            return (
              <AnimatedReveal key={flag.id} show={visibleFlags.includes(flag.id)} delay={0}>
                <div className={`border rounded-lg p-4 ${colors.card}`}>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {flag.instances.map((inst, j) => (
                      <span
                        key={j}
                        className={`inline-block text-sm font-mono px-2 py-0.5 rounded ${colors.bg} ${colors.text}`}
                      >
                        &ldquo;{inst.text}&rdquo;{' '}
                        <span className="text-xs opacity-70">({inst.paragraph})</span>
                      </span>
                    ))}
                  </div>
                  <p className={`text-sm ${colors.text}`}>{flag.explanation}</p>
                </div>
              </AnimatedReveal>
            )
          })}
        </div>
      )}

      {/* Callout */}
      {checking && visibleFlags.length === consistencyFlags.length && (
        <div className="bg-slate-50 border-l-4 border-slate-400 rounded-r-lg p-5">
          <div className="flex items-start gap-3">
            <span className="text-slate-500 text-xl mt-0.5">&#9881;</span>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Why This Matters</h4>
              <p className="text-sm text-slate-700 leading-relaxed">{consistencyCallout}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Demo Component                                                */
/* ------------------------------------------------------------------ */

export default function AIEditingDemo() {
  const [activeTab, setActiveTab] = useState<TabId>('ai-edit')
  // Key forces remount to reset child state
  const [tabKey, setTabKey] = useState(0)

  const switchTab = (tab: TabId) => {
    setActiveTab(tab)
    setTabKey((k) => k + 1)
  }

  return (
    <DemoLayout
      title="AI-Assisted Document Editing"
      context={<span>{contextText}</span>}
      callout={
        <div>
          <p className="mb-2">
            <strong>Tools: </strong>
            {calloutText.tools}
          </p>
          <p>{calloutText.context}</p>
        </div>
      }
    >
      {/* Tab bar */}
      <div className="border-b border-slate-200 mb-6">
        <div className="flex gap-6">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => switchTab(tab.id)}
                className={`pb-2 text-sm transition-colors border-b-2 ${
                  isActive
                    ? 'border-blue-500 text-blue-700 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab content — key forces reset */}
      <div key={tabKey}>
        {activeTab === 'ai-edit' && <AIEditTab />}
        {activeTab === 'style-rules' && <StyleRulesTab />}
        {activeTab === 'consistency' && <ConsistencyTab />}
      </div>
    </DemoLayout>
  )
}
