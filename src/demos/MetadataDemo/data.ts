export const ndaContent = {
  firmName: "HARRISON & COLE LLP",
  firmAddress: "200 Public Square, Suite 3000, Cleveland, OH 44114",
  title: "NON-DISCLOSURE AGREEMENT",
  parties: `This Non-Disclosure Agreement ("Agreement") is entered into as of January 15, 2025, by and between Apex Industries, Inc., a Delaware corporation ("Disclosing Party"), and TechFlow Inc., a California corporation ("Receiving Party").`,
  sections: [
    {
      number: 1,
      title: "CONFIDENTIAL INFORMATION",
      text: `"Confidential Information" means any and all non-public information disclosed by the Disclosing Party to the Receiving Party, whether oral, written, or electronic, including but not limited to trade secrets, business plans, financial data, customer lists, technical specifications, and software code.`
    },
    {
      number: 2,
      title: "OBLIGATIONS",
      text: `The Receiving Party agrees to: (a) hold all Confidential Information in strict confidence; (b) not disclose Confidential Information to any third party without prior written consent; (c) use Confidential Information solely for the purpose of evaluating a potential business relationship between the parties.`
    },
    {
      number: 3,
      title: "TERM",
      text: `This Agreement shall remain in effect for a period of two (2) years from the date of execution. The obligations of confidentiality shall survive termination for an additional period of three (3) years.`
    },
    {
      number: 4,
      title: "GOVERNING LAW",
      text: `This Agreement shall be governed by and construed in accordance with the laws of the State of Ohio, without regard to its conflict of laws principles.`
    }
  ],
  signatureBlock: `IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

_____________________________          _____________________________
Apex Industries, Inc.                  TechFlow Inc.
Disclosing Party                       Receiving Party`
}

export const metadataLayers = [
  {
    id: 'author',
    label: 'Author & Routing Info',
    icon: '👤',
    content: 'Created by: Sarah Chen | Last modified by: opposing_counsel_jsmith | Company: RIVAL LAW FIRM LLP',
    detail: "The document was received from opposing counsel in the prior deal, not drafted by your firm. You're about to send opposing counsel their own firm's metadata.",
    color: 'red'
  },
  {
    id: 'ghost',
    label: 'Ghosted Client Name',
    icon: '👻',
    content: 'Field code value: "Meridian Corp" (visible text shows "TechFlow Inc.")',
    detail: "The old client name is still embedded in a field code even though the visible text says 'TechFlow Inc.' If opposing counsel opens Document Properties, they'll see the prior deal party.",
    color: 'orange'
  },
  {
    id: 'comment',
    label: 'Hidden Comments',
    icon: '💬',
    content: '"Mike — Apex pushed hard on the non-compete last time. We gave in at 12 months but our bottom line was 6. Don\'t go above 6 months this round."',
    detail: "Your negotiation strategy from the prior deal is embedded in the document.",
    color: 'yellow'
  },
  {
    id: 'tracked',
    label: 'Tracked Changes (Accepted but Recoverable)',
    icon: '📝',
    content: 'Deleted paragraph (recoverable): "Notwithstanding the foregoing, Confidential Information shall not include information pertaining to environmental compliance matters, remediation costs, or regulatory proceedings involving the Disclosing Party."',
    detail: "An unfavorable carve-out to the confidentiality definition that was negotiated away in the prior deal. Opposing counsel could see what your client gave up last time.",
    color: 'red'
  },
  {
    id: 'embedded',
    label: 'Embedded Data',
    icon: '🖨️',
    content: 'Printer path: \\\\APEXCORP-DC1\\Legal-3rdFloor | Last printed: 2024-11-14',
    detail: "Reveals the client's internal network naming convention and dates the prior deal.",
    color: 'purple'
  }
]

export const scrubSteps = [
  {
    label: 'Step 1: Document Inspector',
    description: 'File > Info > Check for Issues > Inspect Document → Remove All for each category',
    icon: '🔍'
  },
  {
    label: 'Step 2: Save As New File',
    description: 'Save as a new .docx file to break the revision history link to the original',
    icon: '💾'
  },
  {
    label: 'Step 3: Final Check',
    description: 'Re-run Document Inspector to verify all metadata has been removed',
    icon: '✅'
  }
]

export const contextText = "You're a second-year associate. You pulled this NDA from the firm's files — it was used for a prior matter between your client Apex Industries and Meridian Corp. You've updated the party names and deal terms for the new matter (Apex Industries and TechFlow Inc.). The partner says: 'Clean it up and send it over.' It looks ready."

export const calloutText = {
  tools: "Litera Scrub (DocScrub), Microsoft Document Inspector (built into Word: File > Info > Check for Issues), Workshare Protect, BigHand Metadata Management.",
  context: "Metadata disasters are real: in 2006, the UN circulated an Iraq War report where tracked changes revealed the original source was a US intelligence document. In February 2026, a DHS PDF contained embedded metadata revealing ICE personnel behind detention center plans. Law firms now have automatic metadata cleaning on every outgoing email attachment. Knowing how to inspect and clean documents is a basic professional competency — and knowing why matters even more."
}
