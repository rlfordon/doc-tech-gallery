export const contextText = "You're reviewing a services agreement from the other side. The contract looks standard, but several provisions are one-sided or missing entirely. Click 'Run Review' to see what an AI contract review tool would flag."

export const calloutText = {
  tools: "Luminance, Kira Systems, DocuSign Insight (Seal), Onit ReviewAI, Thomson Reuters Contract Intelligence.",
  context: "AI-powered contract review can scan hundreds of contracts in minutes, flagging risks that would take a human reviewer hours. These tools are widely used in M&A due diligence, lease abstraction, and compliance reviews. The key professional skill: understanding why something is flagged and whether it actually matters in your deal context. The AI finds issues — the lawyer decides which ones matter."
}

export interface ContractSection {
  number: number
  title: string
  text: string
}

export const contractSections: ContractSection[] = [
  {
    number: 5,
    title: 'INDEMNIFICATION',
    text: 'Service Provider shall indemnify, defend, and hold harmless Client and its affiliates from and against any and all claims, damages, losses, costs, and expenses (including attorneys\' fees) arising out of or relating to (a) any breach of this Agreement by Service Provider, (b) any negligent or wrongful act or omission of Service Provider, or (c) any claims by third parties relating to the services provided hereunder.'
  },
  {
    number: 6,
    title: 'LIMITATION OF LIABILITY',
    text: 'IN NO EVENT SHALL CLIENT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM THIS AGREEMENT.'
  },
  {
    number: 7,
    title: 'TERMINATION',
    text: 'Client may terminate this Agreement at any time, for any reason, upon written notice to Service Provider. Upon termination, Service Provider shall immediately cease all work and deliver all work product to Client. Client shall pay Service Provider for services rendered through the date of termination.'
  },
  {
    number: 8,
    title: 'INTELLECTUAL PROPERTY',
    text: 'All work product created by Service Provider under this Agreement shall be considered "work made for hire" and shall be the exclusive property of Client. Service Provider hereby assigns all right, title, and interest in any work product to Client.'
  },
  {
    number: 9,
    title: 'NON-SOLICITATION',
    text: 'For a period of three (3) years following termination, Service Provider shall not directly or indirectly solicit any employee or client of Client.'
  }
]

export type Severity = 'high' | 'medium' | 'notable' | 'missing'

export interface Issue {
  id: number
  severity: Severity
  title: string
  sectionNumber: number | null
  highlightText: string | null
  explanation: string
}

export const issues: Issue[] = [
  {
    id: 1,
    severity: 'high',
    title: 'One-sided indemnification',
    sectionNumber: 5,
    highlightText: 'Service Provider shall indemnify, defend, and hold harmless Client',
    explanation: 'Indemnification runs only from Service Provider to Client. Consider requesting mutual indemnification, or at minimum, indemnification for Client\'s own negligence.'
  },
  {
    id: 2,
    severity: 'high',
    title: 'No liability cap',
    sectionNumber: 5,
    highlightText: 'any and all claims, damages, losses, costs, and expenses',
    explanation: 'Indemnification has no cap on Service Provider\'s exposure. Standard practice is to cap at 1-2x the contract value or total fees paid.'
  },
  {
    id: 3,
    severity: 'medium',
    title: 'One-sided liability limitation',
    sectionNumber: 6,
    highlightText: 'IN NO EVENT SHALL CLIENT BE LIABLE',
    explanation: 'Liability limitation protects only Client. Service Provider has unlimited exposure via indemnification but no reciprocal protection.'
  },
  {
    id: 4,
    severity: 'medium',
    title: 'Termination for convenience (one-sided)',
    sectionNumber: 7,
    highlightText: 'Client may terminate this Agreement at any time, for any reason',
    explanation: 'Only Client can terminate at will. Service Provider has no termination rights. Consider adding mutual termination for convenience or termination for cause.'
  },
  {
    id: 5,
    severity: 'medium',
    title: 'Work-for-hire overreach',
    sectionNumber: 8,
    highlightText: 'shall be considered "work made for hire"',
    explanation: 'Work-for-hire designation may not apply to independent contractor relationships under copyright law. The assignment clause is a good backup, but consider whether pre-existing IP needs to be carved out.'
  },
  {
    id: 6,
    severity: 'notable',
    title: 'Broad non-solicitation',
    sectionNumber: 9,
    highlightText: 'three (3) years',
    explanation: 'Three-year non-solicitation is aggressive. Industry standard is 12-24 months. May be unenforceable in some jurisdictions (e.g., California).'
  },
  {
    id: 7,
    severity: 'missing',
    title: 'Missing provisions',
    sectionNumber: null,
    highlightText: null,
    explanation: 'No limitation on consequential damages for Service Provider. No dispute resolution clause. No data protection/confidentiality provision.'
  }
]

export const severityConfig: Record<Severity, { label: string; bgColor: string; textColor: string; borderColor: string; highlightColor: string }> = {
  high: { label: 'HIGH RISK', bgColor: 'bg-red-50', textColor: 'text-red-700', borderColor: 'border-red-400', highlightColor: 'bg-red-100' },
  medium: { label: 'MEDIUM RISK', bgColor: 'bg-orange-50', textColor: 'text-orange-700', borderColor: 'border-orange-400', highlightColor: 'bg-orange-100' },
  notable: { label: 'NOTABLE', bgColor: 'bg-blue-50', textColor: 'text-blue-700', borderColor: 'border-blue-400', highlightColor: 'bg-blue-100' },
  missing: { label: 'MISSING', bgColor: 'bg-slate-50', textColor: 'text-slate-700', borderColor: 'border-slate-400', highlightColor: '' }
}
