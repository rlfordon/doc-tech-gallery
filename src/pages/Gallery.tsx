import GalleryCard from '../components/GalleryCard'

const sections = [
  {
    label: 'Create',
    demos: [
      {
        icon: '\u2699\uFE0F',
        title: 'Document Automation',
        description: 'Watch a contract write itself as you answer questions.',
        path: '/demo/automation',
        time: '~90 sec',
      },
      {
        icon: '\uD83E\uDDF1',
        title: 'Clause Library',
        description: 'Assemble a contract from pre-approved building blocks.',
        path: '/demo/clause-library',
        time: '~60 sec',
      },
    ],
  },
  {
    label: 'Edit',
    demos: [
      {
        icon: '\u270F\uFE0F',
        title: 'AI-Assisted Document Editing',
        description: 'Edit a legal document three ways: AI, rules, and consistency checking.',
        path: '/demo/ai-editing',
        time: '~90 sec',
      },
    ],
  },
  {
    label: 'Review',
    demos: [
      {
        icon: '\uD83D\uDD0D',
        title: 'Contract Review & Issue Spotting',
        description: 'See how AI flags risks in contract language.',
        path: '/demo/contract-review',
        time: '~60 sec',
      },
      {
        icon: '\uD83D\uDCCB',
        title: 'Brief Verification',
        description: "Does your brief actually say what the record says? Check your work against the source.",
        path: '/demo/brief-verification',
        time: '~90 sec',
      },
    ],
  },
  {
    label: 'Protect',
    demos: [
      {
        icon: '\uD83D\uDD75\uFE0F',
        title: 'Metadata Inspection & Scrubbing',
        description: "You grabbed an old NDA to reuse for a new client. See what you're about to send opposing counsel.",
        path: '/demo/metadata',
        time: '~90 sec',
      },
      {
        icon: '\u2588\u2588',
        title: 'PDF Redaction',
        description: 'Think your redactions are hiding information? Think again.',
        path: '/demo/redaction',
        time: '~60 sec',
      },
    ],
  },
]

export default function Gallery() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Document Technology Gallery</h1>
        <p className="text-lg text-slate-500 italic mb-6">
          Beyond Word and Acrobat: The tools lawyers actually use
        </p>
        <p className="text-sm text-slate-600 mb-10 max-w-3xl leading-relaxed">
          In practice, basic Word and PDF skills are table stakes. Law firms, courts, and clients
          expect lawyers to work within a broader ecosystem of document technology. This gallery
          lets you experience seven key patterns — each simplified, but representative of tools
          you'll encounter on day one.
        </p>

        {sections.map((section) => (
          <div key={section.label} className="mb-10">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              {section.label}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.demos.map((demo) => (
                <GalleryCard key={demo.path} {...demo} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
