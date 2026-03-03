import { useState, useCallback, useRef, useEffect } from 'react'
import DemoLayout from '../../components/DemoLayout'
import SplitPanel from '../../components/SplitPanel'
import AnimatedReveal from '../../components/AnimatedReveal'
import {
  contextText,
  calloutText,
  torresDeposition,
  hendersonCase,
  discoveryBriefText,
  briefClaims,
  scoreConfig,
  verificationBriefParagraphs,
  verificationIssues,
  verificationSummary,
  severityConfig,
  type MatchScore,
  type DepositionPage,
  type VerificationIssue,
} from './data'

// ─── Shared Source Document Viewers ──────────────────────────────────

function DepositionViewer({
  pages,
  highlightLines,
  highlightColor,
}: {
  pages: DepositionPage[]
  highlightLines?: number[]
  highlightColor?: string
}) {
  const hlSet = new Set(highlightLines ?? [])
  const bgClass = highlightColor ?? 'bg-red-100'

  return (
    <div className="font-mono text-xs leading-relaxed">
      {pages.map((pg) => (
        <div key={pg.page} className="mb-4">
          <div className="font-bold text-slate-600 mb-1 text-[11px] tracking-wide">
            PAGE {pg.page}
          </div>
          {pg.lines.map((ln) => {
            const isHl = hlSet.has(ln.num)
            return (
              <div
                key={`${pg.page}-${ln.num}`}
                id={`dep-line-${pg.page}-${ln.num}`}
                className={`flex whitespace-pre ${isHl ? `${bgClass} -mx-2 px-2 rounded` : ''}`}
              >
                <span className="w-8 text-right pr-2 text-slate-400 select-none shrink-0">
                  {ln.num}
                </span>
                <span className={isHl ? 'font-medium' : ''}>{ln.text}</span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

function CaseViewer({
  highlightText,
  highlightColor,
}: {
  highlightText?: string
  highlightColor?: string
}) {
  const bgClass = highlightColor ?? 'bg-yellow-100'
  const caseText = hendersonCase.text

  let rendered: React.ReactNode = caseText
  if (highlightText) {
    const idx = caseText.indexOf(highlightText)
    if (idx !== -1) {
      rendered = (
        <>
          {caseText.slice(0, idx)}
          <mark className={`${bgClass} rounded px-0.5`}>
            {caseText.slice(idx, idx + highlightText.length)}
          </mark>
          {caseText.slice(idx + highlightText.length)}
        </>
      )
    }
  }

  return (
    <div>
      <div className="font-serif font-bold text-sm text-slate-800 mb-2">
        {hendersonCase.title}
      </div>
      <div className="font-serif text-sm text-slate-700 leading-relaxed text-justify">
        {rendered}
      </div>
    </div>
  )
}

function SourceTabs({
  activeTab,
  onTabChange,
  depositionHighlightLines,
  depositionHighlightColor,
  caseHighlightText,
  caseHighlightColor,
  filterToPage,
}: {
  activeTab: 'deposition' | 'case'
  onTabChange: (tab: 'deposition' | 'case') => void
  depositionHighlightLines?: number[]
  depositionHighlightColor?: string
  caseHighlightText?: string
  caseHighlightColor?: string
  filterToPage?: number
}) {
  const depositionPages = filterToPage
    ? torresDeposition.filter((p) => p.page === filterToPage)
    : torresDeposition

  return (
    <div>
      <div className="flex border-b border-slate-200 mb-3">
        <button
          className={`px-3 py-1.5 text-xs font-medium transition-colors ${
            activeTab === 'deposition'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-500 hover:text-slate-700'
          }`}
          onClick={() => onTabChange('deposition')}
        >
          Torres Deposition
        </button>
        <button
          className={`px-3 py-1.5 text-xs font-medium transition-colors ${
            activeTab === 'case'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-500 hover:text-slate-700'
          }`}
          onClick={() => onTabChange('case')}
        >
          Henderson v. Oakwood
        </button>
      </div>
      {activeTab === 'deposition' ? (
        <DepositionViewer
          pages={depositionPages}
          highlightLines={depositionHighlightLines}
          highlightColor={depositionHighlightColor}
        />
      ) : (
        <CaseViewer
          highlightText={caseHighlightText}
          highlightColor={caseHighlightColor}
        />
      )}
    </div>
  )
}

// ─── Score / Severity Badges ─────────────────────────────────────────

function ScoreBadge({ score }: { score: MatchScore }) {
  const cfg = scoreConfig[score]
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded border ${cfg.color} ${cfg.bgColor} ${cfg.borderColor}`}
    >
      <span>{cfg.icon}</span> {cfg.label}
    </span>
  )
}

function SeverityBadge({ severity }: { severity: VerificationIssue['severity'] }) {
  const cfg = severityConfig[severity]
  return (
    <span
      className={`inline-flex items-center text-[10px] font-bold tracking-wide px-2 py-0.5 rounded border ${cfg.color} ${cfg.bgColor} ${cfg.borderColor}`}
    >
      {cfg.label}
    </span>
  )
}

// ─── Tab 1: Source Discovery ─────────────────────────────────────────

function SourceDiscoveryTab() {
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null)
  const [sourceTab, setSourceTab] = useState<'deposition' | 'case'>('deposition')

  const activeClaim = briefClaims.find((c) => c.id === selectedClaim) ?? null
  const activeSuggestion = activeClaim?.suggestions[0] ?? null

  // Build brief text with clickable highlights
  function renderBrief() {
    let remaining = discoveryBriefText
    const parts: React.ReactNode[] = []
    let key = 0

    // Sort claims by their position in the text
    const sortedClaims = [...briefClaims].sort(
      (a, b) => remaining.indexOf(a.text) - remaining.indexOf(b.text),
    )

    for (const claim of sortedClaims) {
      const idx = remaining.indexOf(claim.text)
      if (idx === -1) continue

      if (idx > 0) {
        parts.push(<span key={key++}>{remaining.slice(0, idx)}</span>)
      }

      const isSelected = selectedClaim === claim.id
      parts.push(
        <span
          key={key++}
          className={`cursor-pointer rounded transition-all ${
            isSelected
              ? 'bg-blue-200 ring-2 ring-blue-400'
              : 'bg-blue-100 hover:bg-blue-200'
          }`}
          onClick={() => {
            setSelectedClaim(isSelected ? null : claim.id)
            // Auto-switch source tab
            const sug = claim.suggestions[0]
            if (sug) {
              setSourceTab(sug.sourceType)
            }
          }}
        >
          {claim.text}
        </span>,
      )

      remaining = remaining.slice(idx + claim.text.length)
    }

    if (remaining) {
      parts.push(<span key={key++}>{remaining}</span>)
    }

    return parts
  }

  // Determine highlight params for source viewer
  const hlColor = activeSuggestion
    ? activeSuggestion.score === 'contradicts'
      ? 'bg-red-100'
      : activeSuggestion.score === 'partial'
        ? 'bg-yellow-100'
        : 'bg-green-100'
    : undefined

  return (
    <SplitPanel
      left={
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-2">Draft Brief</h3>
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5">
            <p className="font-serif text-sm text-slate-800 leading-relaxed">
              {renderBrief()}
            </p>
          </div>
          {!selectedClaim && (
            <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-xs text-blue-700">
              Click any highlighted claim to find supporting evidence from the record.
            </div>
          )}
        </div>
      }
      right={
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-2">
            {selectedClaim ? 'Suggested Sources' : 'Source Documents'}
          </h3>
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
            {activeClaim && activeSuggestion ? (
              <div className="space-y-4">
                {/* Suggestion card */}
                <div
                  className={`border rounded-lg p-3 ${
                    scoreConfig[activeSuggestion.score].bgColor
                  } ${scoreConfig[activeSuggestion.score].borderColor}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-slate-700">
                      {activeSuggestion.sourceLabel}
                    </span>
                    <ScoreBadge score={activeSuggestion.score} />
                  </div>
                  <p className="text-xs text-slate-600 italic mb-2">
                    &ldquo;{activeSuggestion.excerpt}&rdquo;
                  </p>
                  <p className="text-xs text-slate-700 font-medium">
                    {activeSuggestion.explanation}
                  </p>
                </div>

                {/* Relevant source document */}
                <div className="border-t border-slate-200 pt-3">
                  <SourceTabs
                    activeTab={sourceTab}
                    onTabChange={setSourceTab}
                    depositionHighlightLines={
                      activeSuggestion.sourceType === 'deposition'
                        ? activeSuggestion.highlightLines
                        : undefined
                    }
                    depositionHighlightColor={
                      activeSuggestion.sourceType === 'deposition' ? hlColor : undefined
                    }
                    caseHighlightText={
                      activeSuggestion.sourceType === 'case'
                        ? activeSuggestion.highlightText
                        : undefined
                    }
                    caseHighlightColor={
                      activeSuggestion.sourceType === 'case' ? hlColor : undefined
                    }
                    filterToPage={
                      activeSuggestion.sourceType === 'deposition'
                        ? activeSuggestion.page
                        : undefined
                    }
                  />
                </div>
              </div>
            ) : (
              <SourceTabs
                activeTab={sourceTab}
                onTabChange={setSourceTab}
              />
            )}
          </div>
        </div>
      }
    />
  )
}

// ─── Tab 2: Factual Verification ─────────────────────────────────────

function FactualVerificationTab() {
  const [revealedCount, setRevealedCount] = useState(0)
  const [isRevealing, setIsRevealing] = useState(false)
  const [activeIssueId, setActiveIssueId] = useState<number | null>(null)
  const [sourceTab, setSourceTab] = useState<'deposition' | 'case'>('deposition')
  const briefRef = useRef<HTMLDivElement>(null)

  const visibleIssues = verificationIssues.slice(0, revealedCount)
  const allRevealed = revealedCount >= verificationIssues.length

  const handleVerify = useCallback(() => {
    if (isRevealing) return
    setIsRevealing(true)
    setRevealedCount(0)

    let count = 0
    const interval = setInterval(() => {
      count++
      setRevealedCount(count)
      if (count >= verificationIssues.length) {
        clearInterval(interval)
        setIsRevealing(false)
      }
    }, 800)
  }, [isRevealing])

  // When clicking an issue card, scroll brief highlight into view and switch source tab
  const handleIssueClick = useCallback(
    (issue: VerificationIssue) => {
      setActiveIssueId(issue.id === activeIssueId ? null : issue.id)
      setSourceTab(issue.sourceType)
    },
    [activeIssueId],
  )

  // Scroll brief highlight into view when activeIssueId changes
  useEffect(() => {
    if (activeIssueId != null && briefRef.current) {
      const el = briefRef.current.querySelector(`[data-issue-id="${activeIssueId}"]`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [activeIssueId])

  // Get active issue for source highlighting
  const activeIssue = verificationIssues.find((i) => i.id === activeIssueId) ?? null

  // Build brief paragraphs with issue highlights
  function renderParagraph(para: { id: string; text: string }) {
    // Find all visible issues that apply to this paragraph
    const paraIssues = visibleIssues.filter((issue) => para.text.includes(issue.briefHighlight))

    if (paraIssues.length === 0) return para.text

    // Apply highlights (handle one at a time, nested is unlikely)
    let remaining = para.text
    const parts: React.ReactNode[] = []
    let key = 0

    // Sort by position
    const sorted = [...paraIssues].sort(
      (a, b) => remaining.indexOf(a.briefHighlight) - remaining.indexOf(b.briefHighlight),
    )

    for (const issue of sorted) {
      const idx = remaining.indexOf(issue.briefHighlight)
      if (idx === -1) continue

      if (idx > 0) parts.push(<span key={key++}>{remaining.slice(0, idx)}</span>)

      const cfg = severityConfig[issue.severity]
      const isActive = activeIssueId === issue.id
      parts.push(
        <span
          key={key++}
          data-issue-id={issue.id}
          className={`rounded px-0.5 cursor-pointer transition-all ${cfg.bgColor} ${
            isActive ? `ring-2 ${cfg.borderColor.replace('border-', 'ring-')}` : ''
          }`}
          onClick={() => handleIssueClick(issue)}
        >
          {issue.briefHighlight}
        </span>,
      )

      remaining = remaining.slice(idx + issue.briefHighlight.length)
    }

    if (remaining) parts.push(<span key={key++}>{remaining}</span>)
    return parts
  }

  return (
    <SplitPanel
      left={
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-2">Draft Brief</h3>
          <div
            ref={briefRef}
            className="bg-white border border-slate-200 rounded-lg shadow-sm p-5"
          >
            {verificationBriefParagraphs.map((para) => (
              <p
                key={para.id}
                className="font-serif text-sm text-slate-800 leading-relaxed mb-3 last:mb-0"
              >
                {renderParagraph(para)}
              </p>
            ))}
          </div>
          <div className="mt-3">
            <button
              onClick={handleVerify}
              disabled={isRevealing || allRevealed}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                allRevealed
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : isRevealing
                    ? 'bg-blue-100 text-blue-400 cursor-wait'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {allRevealed
                ? 'Verification Complete'
                : isRevealing
                  ? 'Analyzing...'
                  : 'Verify Brief Against Sources'}
            </button>
          </div>
        </div>
      }
      right={
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-2">Source Documents</h3>
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 mb-4">
            <SourceTabs
              activeTab={sourceTab}
              onTabChange={setSourceTab}
              depositionHighlightLines={
                activeIssue?.sourceType === 'deposition'
                  ? activeIssue.sourceHighlightLines
                  : undefined
              }
              depositionHighlightColor={
                activeIssue
                  ? activeIssue.severity === 'mischaracterization' ||
                    activeIssue.severity === 'incorrect'
                    ? 'bg-red-100'
                    : 'bg-orange-100'
                  : undefined
              }
              caseHighlightText={
                activeIssue?.sourceType === 'case'
                  ? activeIssue.sourceHighlightText
                  : undefined
              }
              caseHighlightColor={
                activeIssue?.sourceType === 'case' ? 'bg-orange-100' : undefined
              }
              filterToPage={
                activeIssue?.sourceType === 'deposition'
                  ? activeIssue.sourcePage
                  : undefined
              }
            />
          </div>

          {/* Issue cards */}
          {visibleIssues.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Issues Found
              </h4>
              {visibleIssues.map((issue, idx) => (
                <AnimatedReveal key={issue.id} show={true} delay={0}>
                  <div
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      activeIssueId === issue.id
                        ? `${severityConfig[issue.severity].bgColor} ${severityConfig[issue.severity].borderColor} ring-1 ${severityConfig[issue.severity].borderColor.replace('border-', 'ring-')}`
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => handleIssueClick(issue)}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                      <SeverityBadge severity={issue.severity} />
                    </div>
                    <div className="text-sm font-medium text-slate-800 mb-1">
                      {issue.title}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {issue.explanation}
                    </p>
                  </div>
                </AnimatedReveal>
              ))}
            </div>
          )}

          {/* Summary dashboard */}
          {allRevealed && (
            <AnimatedReveal show={true} delay={400}>
              <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="text-sm font-bold text-slate-800 mb-3">
                  Verification Summary
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-red-50 border border-red-200 rounded p-2">
                    <div className="text-red-700 font-bold text-lg">
                      {verificationSummary.factuallyIncorrect}
                    </div>
                    <div className="text-red-600">Factually Incorrect</div>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded p-2">
                    <div className="text-red-700 font-bold text-lg">
                      {verificationSummary.mischaracterizations}
                    </div>
                    <div className="text-red-600">Mischaracterizations</div>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded p-2">
                    <div className="text-orange-700 font-bold text-lg">
                      {verificationSummary.selectiveQuotations}
                    </div>
                    <div className="text-orange-600">Selective Quotations</div>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded p-2">
                    <div className="text-orange-700 font-bold text-lg">
                      {verificationSummary.misleadingCitations}
                    </div>
                    <div className="text-orange-600">Misleading Citations</div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-200 text-center">
                  <span className="text-sm font-bold text-slate-800">Verified Accurate: </span>
                  <span className="text-sm font-bold text-red-600">
                    {verificationSummary.verifiedAccurate}
                  </span>
                  <span className="text-xs text-slate-500 ml-1">factual claims</span>
                </div>
              </div>
            </AnimatedReveal>
          )}
        </div>
      }
    />
  )
}

// ─── Main Component ──────────────────────────────────────────────────

type TabId = 'discovery' | 'verification'

export default function BriefDemo() {
  const [activeTab, setActiveTab] = useState<TabId>('discovery')

  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab)
  }, [])

  return (
    <DemoLayout
      title="Brief Verification Against Source Documents"
      context={<>{contextText}</>}
      callout={
        <>
          <strong>Tools:</strong> {calloutText.tools}
          <br />
          <br />
          {calloutText.context}
        </>
      }
    >
      {/* Tab bar */}
      <div className="flex border-b border-slate-200 mb-6">
        <button
          className={`px-4 py-2.5 text-sm font-medium transition-colors ${
            activeTab === 'discovery'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-500 hover:text-slate-700'
          }`}
          onClick={() => handleTabChange('discovery')}
        >
          Find Supporting Evidence
        </button>
        <button
          className={`px-4 py-2.5 text-sm font-medium transition-colors ${
            activeTab === 'verification'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-500 hover:text-slate-700'
          }`}
          onClick={() => handleTabChange('verification')}
        >
          Verify Brief Against Sources
        </button>
      </div>

      {/* Tab content */}
      {activeTab === 'discovery' ? <SourceDiscoveryTab /> : <FactualVerificationTab />}
    </DemoLayout>
  )
}
