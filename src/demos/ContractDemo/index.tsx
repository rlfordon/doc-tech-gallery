import { useState, useCallback } from 'react'
import DemoLayout from '../../components/DemoLayout'
import AnimatedReveal from '../../components/AnimatedReveal'
import {
  contextText,
  calloutText,
  contractSections,
  issues,
  severityConfig,
} from './data'
import type { Issue, Severity } from './data'

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Render section text, highlighting matching issue phrases */
function renderSectionText(
  text: string,
  sectionNumber: number,
  visibleIssues: number
) {
  // Collect highlights that apply to this section
  const highlights: { text: string; severity: Severity; start: number }[] = []

  for (let i = 0; i < visibleIssues && i < issues.length; i++) {
    const issue = issues[i]
    if (issue.sectionNumber !== sectionNumber || !issue.highlightText) continue
    const idx = text.indexOf(issue.highlightText)
    if (idx !== -1) {
      highlights.push({ text: issue.highlightText, severity: issue.severity, start: idx })
    }
  }
  highlights.sort((a, b) => a.start - b.start)

  if (highlights.length === 0) {
    return <span>{text}</span>
  }

  const parts: React.ReactNode[] = []
  let cursor = 0

  for (let i = 0; i < highlights.length; i++) {
    const h = highlights[i]
    // Skip overlapping highlights
    if (h.start < cursor) continue

    if (h.start > cursor) {
      parts.push(<span key={`t-${sectionNumber}-${i}`}>{text.slice(cursor, h.start)}</span>)
    }
    const config = severityConfig[h.severity]
    parts.push(
      <span
        key={`h-${sectionNumber}-${i}`}
        className={`${config.highlightColor} rounded px-0.5 transition-colors duration-300`}
      >
        {h.text}
      </span>
    )
    cursor = h.start + h.text.length
  }
  if (cursor < text.length) {
    parts.push(<span key={`tail-${sectionNumber}`}>{text.slice(cursor)}</span>)
  }

  return <>{parts}</>
}

/* ------------------------------------------------------------------ */
/*  Issue Card                                                         */
/* ------------------------------------------------------------------ */

function IssueCard({ issue }: { issue: Issue }) {
  const config = severityConfig[issue.severity]

  if (issue.severity === 'missing') {
    // Split explanation into bullet points at ". No " boundaries
    const items = issue.explanation
      .split(/\.\s+(?=No )/)
      .map((s) => s.replace(/\.$/, '').trim())
      .filter(Boolean)

    return (
      <div className={`border rounded-lg p-4 ${config.bgColor} ${config.borderColor} border-l-4`}>
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded ${config.bgColor} ${config.textColor} border ${config.borderColor}`}
          >
            {config.label}
          </span>
          <span className="text-sm font-semibold text-slate-900">{issue.title}</span>
        </div>
        <ul className="text-sm text-slate-700 leading-relaxed list-disc list-inside space-y-1">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className={`border rounded-lg p-4 ${config.bgColor} ${config.borderColor} border-l-4`}>
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded ${config.bgColor} ${config.textColor} border ${config.borderColor}`}
        >
          {config.label}
        </span>
        <span className="text-sm font-semibold text-slate-900">{issue.title}</span>
      </div>
      {issue.sectionNumber && (
        <p className="text-xs text-slate-500 mb-1">Section {issue.sectionNumber}</p>
      )}
      <p className="text-sm text-slate-700 leading-relaxed">{issue.explanation}</p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Summary Dashboard                                                  */
/* ------------------------------------------------------------------ */

function SummaryDashboard() {
  const stats: { label: string; count: number; severity: Severity }[] = [
    { label: 'High Risk', count: 2, severity: 'high' },
    { label: 'Medium Risk', count: 3, severity: 'medium' },
    { label: 'Notable', count: 1, severity: 'notable' },
    { label: 'Missing Provisions', count: 3, severity: 'missing' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
      {stats.map((s) => {
        const config = severityConfig[s.severity]
        return (
          <div
            key={s.label}
            className={`rounded-lg border p-4 text-center ${config.bgColor} ${config.borderColor}`}
          >
            <div className={`text-2xl font-bold ${config.textColor}`}>{s.count}</div>
            <div className={`text-xs font-medium ${config.textColor} mt-1`}>{s.label}</div>
          </div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ContractDemo() {
  const [reviewed, setReviewed] = useState(false)
  const [visibleIssues, setVisibleIssues] = useState(0)

  const handleRunReview = useCallback(() => {
    setReviewed(true)
    setVisibleIssues(0)
    for (let i = 1; i <= issues.length; i++) {
      setTimeout(() => {
        setVisibleIssues(i)
      }, i * 500)
    }
  }, [])

  return (
    <DemoLayout
      title="Contract Review & Issue Spotting"
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
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Contract panel */}
        <div className="lg:w-3/5">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
              Services Agreement (Excerpt)
            </h3>
            <div className="space-y-4">
              {contractSections.map((section) => (
                <div key={section.number}>
                  <p
                    className="text-sm leading-relaxed text-slate-800"
                    style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                  >
                    <span className="font-bold">
                      {section.number}. {section.title}.
                    </span>{' '}
                    {renderSectionText(section.text, section.number, visibleIssues)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Run Review button */}
          {!reviewed && (
            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={handleRunReview}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Run Review
              </button>
            </div>
          )}
        </div>

        {/* Issue sidebar */}
        {reviewed && (
          <div className="lg:w-2/5 space-y-3">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Flagged Issues ({issues.length})
            </h3>
            {issues.map((issue, i) => (
              <AnimatedReveal key={issue.id} show={visibleIssues > i} delay={0}>
                <IssueCard issue={issue} />
              </AnimatedReveal>
            ))}
          </div>
        )}
      </div>

      {/* Summary dashboard */}
      {visibleIssues === issues.length && (
        <AnimatedReveal show={true} delay={300}>
          <SummaryDashboard />
        </AnimatedReveal>
      )}
    </DemoLayout>
  )
}
