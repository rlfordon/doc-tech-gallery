import { useState, useCallback, useRef } from 'react'
import DemoLayout from '../../components/DemoLayout'
import AnimatedReveal from '../../components/AnimatedReveal'
import {
  contextText,
  calloutText,
  documentTitle,
  caseCaption,
  documentParagraphs,
  redactions,
  comparisonTable,
} from './data'

export default function RedactionDemo() {
  const [testing, setTesting] = useState(false)
  const [testedCount, setTestedCount] = useState(0)
  const [activeTest, setActiveTest] = useState<number | null>(null)
  const [completedTests, setCompletedTests] = useState<Set<number>>(new Set())
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const runTests = useCallback(() => {
    if (testing) return
    setTesting(true)
    setTestedCount(0)
    setActiveTest(null)
    setCompletedTests(new Set())

    const timeouts: ReturnType<typeof setTimeout>[] = []

    redactions.forEach((_, index) => {
      // Start each test 3 seconds apart
      const startDelay = index * 3000
      const completeDelay = startDelay + 2000

      const t1 = setTimeout(() => {
        setActiveTest(index)
      }, startDelay)

      const t2 = setTimeout(() => {
        setCompletedTests(prev => new Set([...prev, index]))
        setTestedCount(index + 1)
        if (index === redactions.length - 1) {
          setActiveTest(null)
        }
      }, completeDelay)

      timeouts.push(t1, t2)
    })

    timeoutsRef.current = timeouts
  }, [testing])

  const getRedactionClasses = (redactionIndex: number) => {
    const isActive = activeTest === redactionIndex
    const isComplete = completedTests.has(redactionIndex)
    const redaction = redactions[redactionIndex]

    if (!isActive && !isComplete) {
      // Untested: black bar hiding text
      return {
        barClasses: 'bg-black text-black select-none',
        barStyle: {} as React.CSSProperties,
        textClasses: 'hidden',
        textStyle: {} as React.CSSProperties,
        showCheck: false,
        showShake: false,
      }
    }

    switch (redaction.animationType) {
      case 'copy-paste':
        return {
          barClasses: isComplete
            ? 'bg-yellow-200 text-red-700 font-medium'
            : 'bg-yellow-200 text-red-700 font-medium animate-pulse',
          barStyle: {} as React.CSSProperties,
          textClasses: 'hidden',
          textStyle: {} as React.CSSProperties,
          showCheck: false,
          showShake: false,
        }

      case 'drag':
        return {
          barClasses: 'bg-black text-black select-none transition-transform duration-1000 ease-in-out',
          barStyle: {
            transform: isActive || isComplete ? 'translateX(100%)' : 'translateX(0)',
          } as React.CSSProperties,
          textClasses: 'text-red-700 font-medium',
          textStyle: {} as React.CSSProperties,
          showCheck: false,
          showShake: false,
        }

      case 'extract':
        return {
          barClasses: 'bg-black absolute inset-0 transition-opacity duration-1000',
          barStyle: {
            opacity: isActive || isComplete ? 0.2 : 1,
          } as React.CSSProperties,
          textClasses: 'text-red-700 font-medium transition-opacity duration-1000',
          textStyle: {
            opacity: isActive || isComplete ? 1 : 0,
          } as React.CSSProperties,
          showCheck: false,
          showShake: false,
        }

      case 'proper':
        return {
          barClasses: isActive
            ? 'bg-black text-black select-none animate-shake'
            : 'bg-black text-black select-none',
          barStyle: {} as React.CSSProperties,
          textClasses: 'hidden',
          textStyle: {} as React.CSSProperties,
          showCheck: isComplete,
          showShake: isActive,
        }

      default:
        return {
          barClasses: 'bg-black text-black select-none',
          barStyle: {} as React.CSSProperties,
          textClasses: 'hidden',
          textStyle: {} as React.CSSProperties,
          showCheck: false,
          showShake: false,
        }
    }
  }

  return (
    <DemoLayout
      title="PDF Redaction — Proper vs. Improper"
      context={contextText}
      callout={
        <>
          <p className="font-semibold text-slate-700 mb-1">Recommended tools:</p>
          <p className="text-slate-600 mb-3">{calloutText.tools}</p>
          <p className="text-slate-600">{calloutText.context}</p>
        </>
      }
    >
      {/* Shake animation keyframes */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>

      {/* PDF Viewer */}
      <div className="my-8 border border-slate-300 rounded-lg overflow-hidden shadow-lg">
        {/* PDF header bar */}
        <div className="bg-slate-700 text-white px-4 py-2 flex items-center gap-2 text-sm">
          <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 18h12a2 2 0 002-2V6l-4-4H4a2 2 0 00-2 2v12a2 2 0 002 2zm8-14l4 4h-4V4z" />
          </svg>
          <span className="font-mono">Discovery_Response_Acme_v_Doe.pdf</span>
        </div>

        {/* PDF page area */}
        <div className="bg-slate-200 p-6">
          <div className="bg-white max-w-3xl mx-auto shadow-md px-12 py-10">
            {/* Case caption */}
            <pre className="text-xs text-slate-700 text-center whitespace-pre-wrap font-mono mb-6 leading-relaxed">
              {caseCaption}
            </pre>

            {/* Document title */}
            <h2 className="text-sm font-bold text-center text-slate-900 mb-6 tracking-wide">
              {documentTitle}
            </h2>

            {/* Document body */}
            <div className="text-sm text-slate-800 leading-relaxed space-y-3">
              {documentParagraphs.map((para) => {
                if (para.redactionIndex !== undefined) {
                  const idx = para.redactionIndex
                  const state = getRedactionClasses(idx)
                  const redaction = redactions[idx]

                  if (redaction.animationType === 'drag') {
                    // Drag: bar slides right, text is behind it
                    return (
                      <div key={para.id} className="relative overflow-hidden">
                        {/* Text underneath */}
                        <div className={state.textClasses} style={state.textStyle}>
                          {para.text}
                        </div>
                        {/* Black bar on top, slides right */}
                        <div
                          className={`absolute inset-0 ${state.barClasses}`}
                          style={state.barStyle}
                        >
                          &nbsp;
                        </div>
                      </div>
                    )
                  }

                  if (redaction.animationType === 'extract') {
                    // Extract: bar fades, text appears underneath
                    return (
                      <div key={para.id} className="relative">
                        <div className={state.textClasses} style={state.textStyle}>
                          {para.text}
                        </div>
                        <div className={state.barClasses} style={state.barStyle}>
                          &nbsp;
                        </div>
                      </div>
                    )
                  }

                  if (redaction.animationType === 'proper') {
                    // Proper: bar shakes but nothing revealed
                    return (
                      <div key={para.id} className="flex items-center gap-2">
                        <div className={`flex-1 ${state.barClasses}`} style={state.barStyle}>
                          &nbsp;
                        </div>
                        {state.showCheck && (
                          <span className="text-green-600 text-lg font-bold flex-shrink-0">
                            &#10003;
                          </span>
                        )}
                      </div>
                    )
                  }

                  // copy-paste: bar changes color to reveal text
                  return (
                    <div key={para.id} className={state.barClasses} style={state.barStyle}>
                      {para.text}
                    </div>
                  )
                }

                // Regular paragraph
                const isBold =
                  para.id.startsWith('interrog') || para.id === 'intro'
                return (
                  <p
                    key={para.id}
                    className={isBold ? 'font-semibold' : ''}
                  >
                    {para.text}
                  </p>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Test button */}
      <div className="text-center mb-8">
        <button
          onClick={runTests}
          disabled={testing}
          className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors ${
            testing
              ? 'bg-slate-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {testing && testedCount < redactions.length
            ? `Testing redaction ${Math.min((activeTest ?? 0) + 1, redactions.length)} of ${redactions.length}...`
            : testedCount === redactions.length
              ? 'Tests Complete'
              : 'Test the Redactions'}
        </button>
      </div>

      {/* Result cards */}
      <div className="space-y-4 mb-8">
        {redactions.map((redaction, index) => (
          <AnimatedReveal key={redaction.id} show={completedTests.has(index)} delay={200}>
            <div
              className={`border-l-4 ${
                redaction.pass ? 'border-green-500' : 'border-red-500'
              } bg-slate-50 rounded-r-lg p-4`}
            >
              <div className="flex items-start justify-between gap-4 mb-1">
                <h3 className="font-semibold text-slate-900">
                  {redaction.method}
                </h3>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded whitespace-nowrap ${
                    redaction.pass
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {redaction.badge}
                </span>
              </div>
              <p className="text-sm text-slate-600">{redaction.explanation}</p>
            </div>
          </AnimatedReveal>
        ))}
      </div>

      {/* Comparison table */}
      <AnimatedReveal show={testedCount === redactions.length} delay={400}>
        <div className="mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-slate-100 text-left">
                  <th className="px-4 py-2 font-semibold text-slate-700">Method</th>
                  <th className="px-4 py-2 font-semibold text-slate-700">Looks Redacted?</th>
                  <th className="px-4 py-2 font-semibold text-slate-700">Actually Redacted?</th>
                  <th className="px-4 py-2 font-semibold text-slate-700">Recoverable By</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row, i) => (
                  <tr key={i} className="border-t border-slate-200">
                    <td className="px-4 py-2 text-slate-800">{row.method}</td>
                    <td className="px-4 py-2 text-slate-800">{row.looksRedacted}</td>
                    <td
                      className={`px-4 py-2 font-bold ${
                        row.actuallyRedacted === 'Yes'
                          ? 'text-green-700'
                          : 'text-red-600'
                      }`}
                    >
                      {row.actuallyRedacted}
                    </td>
                    <td className="px-4 py-2 text-slate-800">{row.recoverableBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AnimatedReveal>
    </DemoLayout>
  )
}
