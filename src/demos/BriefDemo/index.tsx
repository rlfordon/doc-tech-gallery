import DemoLayout from '../../components/DemoLayout'

export default function BriefDemo() {
  return (
    <DemoLayout
      title="Brief Verification Against Source Documents"
      context={
        <>
          You're a senior associate reviewing a junior associate's draft motion for summary
          judgment. The brief cites a deposition transcript and two cases. Before this goes to the
          partner, you need to verify that the brief accurately represents what the sources actually say.
        </>
      }
      callout={
        <>
          <strong>Tools:</strong> ClearBrief, Litera Check (brief analysis), Thomson Reuters
          Drafting Assistant. This is different from hallucination-checking (verifying that citations
          are real). Here, every citation is to a real document — the question is whether the brief{' '}
          <em>accurately represents what the source says</em>. ClearBrief color-codes how closely
          brief language tracks the underlying evidence, highlights discrepancies, and works with
          deposition transcripts, case law, and the full record.
        </>
      }
    >
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-12 text-center">
        <div className="text-4xl mb-4">🚧</div>
        <h2 className="text-xl font-semibold text-slate-700 mb-2">Coming Soon</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          This demo is being refined to include source discovery features — suggesting relevant
          source documents as you work. Check back soon.
        </p>
      </div>
    </DemoLayout>
  )
}
