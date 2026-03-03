export const contextText = "This discovery response was produced by opposing counsel. The redacted portions supposedly contain privileged attorney-client communications. But the paralegal who prepared this used three different 'redaction' methods. Only one actually works."

export const calloutText = {
  tools: "Adobe Acrobat Pro (Redact tool — not highlight, not draw), Redactable, Relativity Redaction.",
  context: "Every method above has caused real problems in real cases. Paul Manafort's attorneys filed a \"redacted\" brief in 2019 where the redactions were just black overlays — reporters copy-pasted the hidden text within minutes, revealing secret details of his cooperation with Russian operatives. The Northern District of Alabama has published specific guidance on proper redaction techniques. The only safe method permanently removes the underlying text from all layers of the PDF, including metadata. If you're producing redacted documents in discovery or filing under seal, verify with the Acrobat Redact tool — not highlight, not a shape, not \"print to PDF.\" And always test your own redactions before producing."
}

export interface DocumentParagraph {
  id: string
  text: string
  redactionIndex?: number  // which redaction is in this paragraph (0-3), undefined if none
}

export const documentTitle = "DEFENDANT'S RESPONSES TO PLAINTIFF'S FIRST SET OF INTERROGATORIES"
export const caseCaption = "IN THE UNITED STATES DISTRICT COURT\nFOR THE SOUTHERN DISTRICT OF OHIO\nEASTERN DIVISION\n\nJANE DOE, Plaintiff,\n  v.                           Case No. 2:24-cv-01234\nACME CHEMICAL CORP., Defendant."

export const documentParagraphs: DocumentParagraph[] = [
  {
    id: 'intro',
    text: 'Defendant Acme Chemical Corp. ("Defendant"), by and through undersigned counsel, hereby responds to Plaintiff\'s First Set of Interrogatories as follows:'
  },
  {
    id: 'interrog1',
    text: 'INTERROGATORY NO. 1: Describe all internal analyses, reports, or assessments conducted by Defendant regarding the environmental impact of its manufacturing operations at the Springfield facility between 2018 and 2024.'
  },
  {
    id: 'response1',
    text: 'RESPONSE: Defendant objects to this interrogatory as overbroad and unduly burdensome. Subject to and without waiving said objections, Defendant states that it conducted routine environmental compliance assessments as required by applicable federal and state regulations. [REDACTED — PRIVILEGED]'
  },
  {
    id: 'redaction1',
    redactionIndex: 0,
    text: 'Internal analysis suggests our client\'s product caused the contamination. Recommend settling before discovery of the 2019 lab reports.'
  },
  {
    id: 'interrog2',
    text: 'INTERROGATORY NO. 2: Identify all communications between Defendant\'s executive officers and Defendant\'s environmental compliance department regarding the Springfield facility.'
  },
  {
    id: 'response2',
    text: 'RESPONSE: Defendant objects on the grounds of attorney-client privilege and work product doctrine. Subject to and without waiving said objections, Defendant identifies the following non-privileged communications: quarterly compliance reports dated March 15, June 15, September 15, and December 15 of each year. [REDACTED — PRIVILEGED]'
  },
  {
    id: 'redaction2',
    redactionIndex: 1,
    text: 'CEO was aware of the defect as early as March 2019 — see email chain attached as Exhibit 14.'
  },
  {
    id: 'interrog3',
    text: 'INTERROGATORY NO. 3: State the total amount of any settlement authority approved by Defendant in connection with this matter.'
  },
  {
    id: 'response3',
    text: 'RESPONSE: Defendant objects to this interrogatory as seeking information protected by the attorney-client privilege and work product doctrine. [REDACTED — PRIVILEGED]'
  },
  {
    id: 'redaction3',
    redactionIndex: 2,
    text: 'Settlement authority up to $2.5M approved by General Counsel on 4/12/2024.'
  },
  {
    id: 'interrog4',
    text: 'INTERROGATORY NO. 4: Describe Defendant\'s document retention policies applicable to environmental testing data and communications regarding the Springfield facility.'
  },
  {
    id: 'response4',
    text: 'RESPONSE: Defendant maintains document retention policies in accordance with applicable legal requirements. Relevant policies include Defendant\'s Corporate Records Management Policy (Rev. 2022) and Environmental Records Retention Schedule. [REDACTED — PRIVILEGED]'
  },
  {
    id: 'redaction4',
    redactionIndex: 3,
    text: '[Content permanently removed by Adobe Acrobat Pro Redact tool]'
  }
]

export interface Redaction {
  id: number
  method: string
  hiddenText: string
  explanation: string
  pass: boolean
  animationType: 'copy-paste' | 'drag' | 'extract' | 'proper'
  badge: string
}

export const redactions: Redaction[] = [
  {
    id: 0,
    method: 'Black highlight over text',
    hiddenText: 'Internal analysis suggests our client\'s product caused the contamination. Recommend settling before discovery of the 2019 lab reports.',
    explanation: 'Someone used a black highlight or black font color on black background. The text is still there — it\'s just the same color as the background.',
    pass: false,
    animationType: 'copy-paste',
    badge: 'FAIL — Text fully recoverable by copy/paste'
  },
  {
    id: 1,
    method: 'Black rectangle shape layered over text',
    hiddenText: 'CEO was aware of the defect as early as March 2019 — see email chain attached as Exhibit 14.',
    explanation: 'Someone drew a black rectangle shape on top of the text. The shape is a separate layer — it can be moved, and the text underneath is untouched.',
    pass: false,
    animationType: 'drag',
    badge: 'FAIL — Text fully intact underneath shape layer'
  },
  {
    id: 2,
    method: 'Image flattening with recoverable text layer',
    hiddenText: 'Settlement authority up to $2.5M approved by General Counsel on 4/12/2024.',
    explanation: 'The PDF was "printed to PDF" with black boxes, creating a flat image — but the original text layer from the source Word document was preserved. OCR isn\'t even needed; the text is embedded.',
    pass: false,
    animationType: 'extract',
    badge: 'FAIL — Original text layer preserved in PDF metadata'
  },
  {
    id: 3,
    method: 'Proper redaction (Adobe Acrobat Pro)',
    hiddenText: '',
    explanation: 'The text has been permanently removed from the file. The black bar is not covering anything — the content underneath has been destroyed and replaced.',
    pass: true,
    animationType: 'proper',
    badge: 'PASS — Content permanently removed'
  }
]

export const comparisonTable = [
  { method: 'Black highlight', looksRedacted: 'Yes', actuallyRedacted: 'No', recoverableBy: 'Copy + paste' },
  { method: 'Shape overlay', looksRedacted: 'Yes', actuallyRedacted: 'No', recoverableBy: 'Moving the shape' },
  { method: 'Print-to-PDF with text layer', looksRedacted: 'Yes', actuallyRedacted: 'No', recoverableBy: 'Text extraction tool' },
  { method: 'Adobe Acrobat Redact tool', looksRedacted: 'Yes', actuallyRedacted: 'Yes', recoverableBy: 'Nothing — content destroyed' }
]
