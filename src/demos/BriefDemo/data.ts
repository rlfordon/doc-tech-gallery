export const contextText = "You're drafting a motion for summary judgment in a hostile work environment case. First, use the source discovery tool to find and cite evidence from the record. Then, switch to the verification tab to see how a different brief — one that's already been cited — misrepresents those same sources."

export const calloutText = {
  tools: "ClearBrief, Litera Check (brief analysis), Thomson Reuters Drafting Assistant.",
  context: "ClearBrief integrates directly into Microsoft Word with two key workflows. First, 'Add Fact Cite': select any sentence and the AI instantly surfaces the best supporting passages from your uploaded record — depositions, exhibits, case law. It scores how well each source supports your assertion. Second, 'Cite Check': analyze every citation to verify the brief accurately represents the source. This is different from hallucination-checking (verifying that citations are real, which Westlaw and Lexis brief analyzers handle). Here, every citation is to a real document — the question is whether the brief accurately represents what the source says. In litigation, this is how partners verify associate work before signing a brief — and how opposing counsel prepares to call out misrepresentations at oral argument."
}

// === SHARED SOURCE DOCUMENTS ===

export interface DepositionPage {
  page: number
  lines: { num: number; text: string }[]
}

export const torresDeposition: DepositionPage[] = [
  {
    page: 84,
    lines: [
      { num: 10, text: 'Q. How many times did you hear comments about' },
      { num: 11, text: '   your political beliefs in the office?' },
      { num: 12, text: 'A. I remember specifically two times where it' },
      { num: 13, text: '   was said directly to me. But there were other' },
      { num: 14, text: '   times — maybe four or five more — where I' },
      { num: 15, text: '   overheard things said to other people, or' },
      { num: 16, text: '   comments were made in meetings that everyone' },
      { num: 17, text: '   could hear.' },
      { num: 18, text: 'Q. Can you describe how the environment felt?' },
      { num: 19, text: 'A. Democrats just didn\'t feel welcomed. I mean,' },
      { num: 20, text: '   nobody ever said anything directly to me about' },
      { num: 21, text: '   my voter registration or anything, but the' },
      { num: 22, text: '   comments in meetings made it clear.' },
    ]
  },
  {
    page: 112,
    lines: [
      { num: 1, text: 'Q. Did you ever report these incidents to Human' },
      { num: 2, text: '   Resources?' },
      { num: 3, text: 'A. I went to my supervisor first. He said he' },
      { num: 4, text: '   would handle it. When it kept happening, I' },
      { num: 5, text: '   went to HR. They said they would look into it.' },
      { num: 6, text: 'Q. When did you go to HR?' },
      { num: 7, text: 'A. About three months after the first incident.' },
      { num: 8, text: '   I have the email I sent them.' },
    ]
  },
  {
    page: 156,
    lines: [
      { num: 12, text: 'Q. What happened after you reported to your' },
      { num: 13, text: '   supervisor?' },
      { num: 14, text: 'A. He said he would talk to the people involved.' },
      { num: 15, text: '   I don\'t know if he actually did, because the' },
      { num: 16, text: '   comments in meetings didn\'t really stop. They' },
      { num: 17, text: '   maybe got a little more subtle. Like, instead' },
      { num: 18, text: '   of saying things outright they would just make' },
      { num: 19, text: '   looks or change the subject when I walked in.' },
    ]
  }
]

export const hendersonCase = {
  title: 'Henderson v. Oakwood Mgmt. Corp., 142 F. Supp. 3d 547, 558 (S.D. Ohio 2015)',
  text: 'The court recognizes that "two or three stray remarks over the course of several months may not, standing alone, rise to the level of severe or pervasive conduct required to establish a hostile work environment claim." However, the analysis does not end there. Where such remarks are accompanied by other exclusionary conduct — such as deliberate ostracism, reassignment of duties, or a pattern of dismissive behavior — the totality of circumstances may support the claim even where individual incidents appear minor. Id. at 559.'
}

// New source: Martinez Affidavit
export const martinezAffidavit = {
  title: 'Declaration of Maria Martinez',
  role: 'Coworker, Marketing Department',
  paragraphs: [
    {
      num: 3,
      text: 'I worked in the cubicle adjacent to Ms. Torres from January 2023 through December 2024. During that time, I personally witnessed comments directed at Ms. Torres regarding her political beliefs on at least four separate occasions during staff meetings.'
    },
    {
      num: 4,
      text: 'On or about March 15, 2024, during a department meeting, our supervisor Mr. Hendricks stated, in front of approximately eight employees, "I don\'t know how anyone with a brain could vote the way some people in this room did." He looked directly at Ms. Torres when he said this. Ms. Torres appeared visibly uncomfortable.'
    },
    {
      num: 7,
      text: 'After Ms. Torres reported the incidents, I observed that she was excluded from two client meetings she would normally have attended. When I asked Mr. Hendricks about this, he said Torres "needed to focus on her own work for a while."'
    }
  ]
}

// New source: HR Complaint Form
export const hrComplaint = {
  title: 'Acme Corp. Human Resources Complaint Record',
  caseNumber: 'HR-2024-0847',
  filedBy: 'Elena Torres',
  dateReceived: 'June 3, 2024',
  entries: [
    {
      label: 'Nature of Complaint',
      text: 'Hostile work environment based on political affiliation. Employee reports repeated comments about political beliefs in staff meetings, direct comments from supervisor, and subsequent exclusion from client meetings after reporting.'
    },
    {
      label: 'Prior Reports',
      text: 'Employee states she reported verbally to direct supervisor (R. Hendricks) on approximately March 20, 2024. States supervisor acknowledged complaint but no action was taken.'
    },
    {
      label: 'HR Action',
      text: 'Investigation opened June 5, 2024. Interviews conducted with reporting employee, supervisor, and three witnesses. See investigation file HR-INV-2024-0312.'
    }
  ]
}

// New source: Employee Handbook
export const employeeHandbook = {
  title: 'Acme Corp. Employee Handbook (Rev. 2023)',
  section: 'Section 4.7 — Anti-Harassment Policy',
  text: 'Acme Corporation is committed to providing a workplace free from harassment based on any protected characteristic, including political affiliation or belief. Employees who believe they have experienced harassment should report the conduct to their supervisor or directly to Human Resources. All complaints will be promptly investigated. Retaliation against employees who report harassment in good faith is strictly prohibited and will result in disciplinary action up to and including termination.'
}

// New legal source
export const williamCase = {
  title: 'Williams v. General Motors Corp., 187 F.3d 553, 563 (6th Cir. 1999)',
  text: 'In determining whether a hostile work environment exists, courts must consider the totality of the circumstances, including "the frequency of the discriminatory conduct; its severity; whether it is physically threatening or humiliating, or a mere offensive utterance; and whether it unreasonably interferes with an employee\'s work performance." The court emphasized that "the effect on the employee\'s psychological well-being is relevant in determining whether the plaintiff actually found the environment abusive."'
}

// === TAB 1: SOURCE DISCOVERY (ClearBrief-style "Add Fact Cite") ===

export interface SourceSuggestion {
  id: string
  sourceType: 'deposition' | 'affidavit' | 'hr-record' | 'handbook' | 'case'
  sourceLabel: string
  excerpt: string
  relevance: 'high' | 'medium' | 'low'
  citation: string
}

export interface BriefClaim {
  id: string
  text: string
  claimType: 'factual' | 'legal'
  suggestions: SourceSuggestion[]
}

export const discoveryBriefParagraphs = [
  {
    id: 'dp1',
    text: 'Plaintiff Elena Torres brings this hostile work environment claim under Title VII and Ohio Rev. Code \u00A7 4112.02. Torres alleges that she was subjected to repeated derogatory comments about her political beliefs in the workplace.'
  },
  {
    id: 'dp2',
    text: 'The record shows that [comments about Torres\'s political beliefs were made on multiple occasions in staff meetings]. [At least one coworker witnessed these comments and observed their effect on Torres].'
  },
  {
    id: 'dp3',
    text: 'After Torres reported the conduct, [she was excluded from client meetings she previously attended]. Torres followed the company\'s internal reporting procedures, [filing a formal complaint with Human Resources after her supervisor failed to act].'
  },
  {
    id: 'dp4',
    text: 'To establish a hostile work environment claim, the plaintiff must show that the conduct was [sufficiently severe or pervasive to alter the conditions of employment]. Courts evaluate the totality of the circumstances, considering [the frequency, severity, and effect of the conduct on the employee].'
  }
]

export const briefClaims: BriefClaim[] = [
  {
    id: 'claim1',
    text: 'comments about Torres\'s political beliefs were made on multiple occasions in staff meetings',
    claimType: 'factual',
    suggestions: [
      {
        id: 's1a',
        sourceType: 'deposition',
        sourceLabel: 'Torres Dep. 84:12-17',
        excerpt: '"I remember specifically two times where it was said directly to me. But there were other times \u2014 maybe four or five more \u2014 where I overheard things said to other people, or comments were made in meetings that everyone could hear."',
        relevance: 'high',
        citation: 'Torres Dep. 84:12-17'
      },
      {
        id: 's1b',
        sourceType: 'affidavit',
        sourceLabel: 'Martinez Decl. \u00B6 3',
        excerpt: '"I personally witnessed comments directed at Ms. Torres regarding her political beliefs on at least four separate occasions during staff meetings."',
        relevance: 'high',
        citation: 'Martinez Decl. \u00B6 3'
      },
      {
        id: 's1c',
        sourceType: 'affidavit',
        sourceLabel: 'Martinez Decl. \u00B6 4',
        excerpt: '"Our supervisor Mr. Hendricks stated, in front of approximately eight employees, \'I don\'t know how anyone with a brain could vote the way some people in this room did.\' He looked directly at Ms. Torres."',
        relevance: 'medium',
        citation: 'Martinez Decl. \u00B6 4'
      }
    ]
  },
  {
    id: 'claim2',
    text: 'At least one coworker witnessed these comments and observed their effect on Torres',
    claimType: 'factual',
    suggestions: [
      {
        id: 's2a',
        sourceType: 'affidavit',
        sourceLabel: 'Martinez Decl. \u00B6 4',
        excerpt: '"He looked directly at Ms. Torres when he said this. Ms. Torres appeared visibly uncomfortable."',
        relevance: 'high',
        citation: 'Martinez Decl. \u00B6 4'
      },
      {
        id: 's2b',
        sourceType: 'deposition',
        sourceLabel: 'Torres Dep. 84:18-22',
        excerpt: '"Democrats just didn\'t feel welcomed. I mean, nobody ever said anything directly to me about my voter registration or anything, but the comments in meetings made it clear."',
        relevance: 'medium',
        citation: 'Torres Dep. 84:18-22'
      }
    ]
  },
  {
    id: 'claim3',
    text: 'she was excluded from client meetings she previously attended',
    claimType: 'factual',
    suggestions: [
      {
        id: 's3a',
        sourceType: 'affidavit',
        sourceLabel: 'Martinez Decl. \u00B6 7',
        excerpt: '"After Ms. Torres reported the incidents, I observed that she was excluded from two client meetings she would normally have attended. When I asked Mr. Hendricks about this, he said Torres \'needed to focus on her own work for a while.\'"',
        relevance: 'high',
        citation: 'Martinez Decl. \u00B6 7'
      },
      {
        id: 's3b',
        sourceType: 'deposition',
        sourceLabel: 'Torres Dep. 156:15-19',
        excerpt: '"I don\'t know if he actually did, because the comments in meetings didn\'t really stop. They maybe got a little more subtle. Like, instead of saying things outright they would just make looks or change the subject when I walked in."',
        relevance: 'medium',
        citation: 'Torres Dep. 156:15-19'
      }
    ]
  },
  {
    id: 'claim4',
    text: 'filing a formal complaint with Human Resources after her supervisor failed to act',
    claimType: 'factual',
    suggestions: [
      {
        id: 's4a',
        sourceType: 'hr-record',
        sourceLabel: 'HR Complaint Record HR-2024-0847',
        excerpt: '"Employee states she reported verbally to direct supervisor (R. Hendricks) on approximately March 20, 2024. States supervisor acknowledged complaint but no action was taken."',
        relevance: 'high',
        citation: 'HR Complaint Record HR-2024-0847'
      },
      {
        id: 's4b',
        sourceType: 'deposition',
        sourceLabel: 'Torres Dep. 112:3-8',
        excerpt: '"I went to my supervisor first. He said he would handle it. When it kept happening, I went to HR. They said they would look into it... About three months after the first incident. I have the email I sent them."',
        relevance: 'high',
        citation: 'Torres Dep. 112:3-8'
      },
      {
        id: 's4c',
        sourceType: 'handbook',
        sourceLabel: 'Employee Handbook \u00A7 4.7',
        excerpt: '"Employees who believe they have experienced harassment should report the conduct to their supervisor or directly to Human Resources. All complaints will be promptly investigated."',
        relevance: 'medium',
        citation: 'Employee Handbook \u00A7 4.7'
      }
    ]
  },
  {
    id: 'claim5',
    text: 'sufficiently severe or pervasive to alter the conditions of employment',
    claimType: 'legal',
    suggestions: [
      {
        id: 's5a',
        sourceType: 'case',
        sourceLabel: 'Williams v. General Motors, 187 F.3d at 563',
        excerpt: '"In determining whether a hostile work environment exists, courts must consider the totality of the circumstances..."',
        relevance: 'high',
        citation: 'Williams v. General Motors Corp., 187 F.3d 553, 563 (6th Cir. 1999)'
      },
      {
        id: 's5b',
        sourceType: 'case',
        sourceLabel: 'Henderson v. Oakwood, 142 F. Supp. 3d at 558',
        excerpt: '"Where such remarks are accompanied by other exclusionary conduct \u2014 such as deliberate ostracism, reassignment of duties, or a pattern of dismissive behavior \u2014 the totality of circumstances may support the claim."',
        relevance: 'high',
        citation: 'Henderson v. Oakwood Mgmt. Corp., 142 F. Supp. 3d 547, 558 (S.D. Ohio 2015)'
      }
    ]
  },
  {
    id: 'claim6',
    text: 'the frequency, severity, and effect of the conduct on the employee',
    claimType: 'legal',
    suggestions: [
      {
        id: 's6a',
        sourceType: 'case',
        sourceLabel: 'Williams v. General Motors, 187 F.3d at 563',
        excerpt: '"...the frequency of the discriminatory conduct; its severity; whether it is physically threatening or humiliating, or a mere offensive utterance; and whether it unreasonably interferes with an employee\'s work performance."',
        relevance: 'high',
        citation: 'Williams v. General Motors Corp., 187 F.3d 553, 563 (6th Cir. 1999)'
      }
    ]
  }
]

export const sourceTypeConfig: Record<string, { icon: string; label: string; color: string }> = {
  'deposition': { icon: '\uD83D\uDCDC', label: 'Deposition', color: 'text-blue-600' },
  'affidavit': { icon: '\uD83D\uDCCB', label: 'Declaration', color: 'text-purple-600' },
  'hr-record': { icon: '\uD83D\uDCC1', label: 'HR Record', color: 'text-amber-600' },
  'handbook': { icon: '\uD83D\uDCD6', label: 'Company Policy', color: 'text-slate-600' },
  'case': { icon: '\u2696\uFE0F', label: 'Case Law', color: 'text-green-700' },
}

export const relevanceConfig: Record<string, { barColor: string; label: string }> = {
  high: { barColor: 'bg-green-500', label: 'Strong match' },
  medium: { barColor: 'bg-yellow-500', label: 'Partial match' },
  low: { barColor: 'bg-slate-300', label: 'Weak match' },
}

// === TAB 2: FACTUAL VERIFICATION ===

export type IssueSeverity = 'mischaracterization' | 'selective' | 'incorrect' | 'misleading'

export interface VerificationIssue {
  id: number
  severity: IssueSeverity
  title: string
  briefHighlight: string
  sourceType: 'deposition' | 'case'
  sourcePage?: number
  sourceHighlightLines?: number[]
  sourceHighlightText?: string
  explanation: string
}

export const severityConfig: Record<IssueSeverity, { label: string; color: string; bgColor: string; borderColor: string }> = {
  mischaracterization: { label: 'MISCHARACTERIZATION', color: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-400' },
  incorrect: { label: 'FACTUALLY INCORRECT', color: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-400' },
  selective: { label: 'SELECTIVE QUOTATION', color: 'text-orange-700', bgColor: 'bg-orange-50', borderColor: 'border-orange-400' },
  misleading: { label: 'MISLEADING CITATION', color: 'text-orange-700', bgColor: 'bg-orange-50', borderColor: 'border-orange-400' },
}

export const verificationBriefParagraphs = [
  {
    id: 'p1',
    text: 'Plaintiff cannot establish the second element of her hostile work environment claim. During her deposition, Ms. Torres admitted that the alleged comments occurred only twice over a six-month period and that she "Democrats just didn\'t feel welcomed" in the office but "nobody ever said anything directly to her." Torres Dep. 84:12-22.'
  },
  {
    id: 'p2',
    text: 'Furthermore, Ms. Torres conceded that she never reported the incidents to Human Resources despite being aware of the company\'s reporting procedures. Torres Dep. 112:3-8.'
  },
  {
    id: 'p3',
    text: 'Courts in this district have consistently held that isolated incidents, without more, are insufficient to establish a hostile work environment. See Henderson v. Oakwood Mgmt. Corp., 142 F. Supp. 3d 547, 558 (S.D. Ohio 2015) ("Two or three stray remarks over the course of several months do not rise to the level of severe or pervasive conduct.").'
  },
  {
    id: 'p4',
    text: 'Finally, Plaintiff\'s own testimony confirms that her supervisor took immediate corrective action once informed of the situation. Torres Dep. 156:14-19.'
  }
]

export const verificationIssues: VerificationIssue[] = [
  {
    id: 1,
    severity: 'mischaracterization',
    title: 'Omits additional incidents',
    briefHighlight: 'the alleged comments occurred only twice over a six-month period',
    sourceType: 'deposition',
    sourcePage: 84,
    sourceHighlightLines: [12, 13, 14, 15, 16, 17],
    explanation: 'Brief says Torres "admitted that the alleged comments occurred only twice." Source shows she said two comments were made directly to her, but she also described "four or five more" overheard or made in meetings. The brief omits the additional incidents entirely, materially changing the characterization.'
  },
  {
    id: 2,
    severity: 'selective',
    title: 'Truncated quotation reverses meaning',
    briefHighlight: '"nobody ever said anything directly to her."',
    sourceType: 'deposition',
    sourcePage: 84,
    sourceHighlightLines: [19, 20, 21, 22],
    explanation: 'Brief quotes "nobody ever said anything directly to her" but the full quote is "nobody ever said anything directly to me about my voter registration or anything, but the comments in meetings made it clear." The "but" clause — which shows she did experience hostile comments in a different form — is omitted.'
  },
  {
    id: 3,
    severity: 'incorrect',
    title: 'Source says the opposite',
    briefHighlight: 'never reported the incidents to Human Resources',
    sourceType: 'deposition',
    sourcePage: 112,
    sourceHighlightLines: [1, 2, 3, 4, 5, 6, 7, 8],
    explanation: 'Brief states Torres "never reported the incidents to Human Resources." The transcript at 112:3-8 says the opposite: she went to her supervisor first, then "went to HR. They said they would look into it." She reported to both her supervisor AND HR.'
  },
  {
    id: 4,
    severity: 'misleading',
    title: 'Omits qualifying language from holding',
    briefHighlight: '"Two or three stray remarks over the course of several months do not rise to the level of severe or pervasive conduct."',
    sourceType: 'case',
    sourceHighlightText: 'However, the analysis does not end there.',
    explanation: 'Brief quotes Henderson for the proposition that "two or three stray remarks" are insufficient. But the opinion\'s next sentence says the analysis "does not end there" and lists factors (ostracism, exclusionary conduct) that may support the claim — which is exactly what Torres describes. The brief cites the first half of the court\'s reasoning while omitting the second half that arguably favors the plaintiff.'
  },
  {
    id: 5,
    severity: 'mischaracterization',
    title: 'Characterizes inaction as corrective action',
    briefHighlight: 'took immediate corrective action',
    sourceType: 'deposition',
    sourcePage: 156,
    sourceHighlightLines: [14, 15, 16, 17, 18, 19],
    explanation: 'Brief says supervisor "took immediate corrective action." The transcript says the supervisor said he would "talk to the people involved," Torres doesn\'t know if he did, and "the comments in meetings didn\'t really stop." This is the opposite of effective corrective action.'
  }
]

export const verificationSummary = {
  factuallyIncorrect: 1,
  mischaracterizations: 2,
  selectiveQuotations: 1,
  misleadingCitations: 1,
  verifiedAccurate: '0 of 4'
}

