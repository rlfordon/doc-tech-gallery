export const contextText = "You're a senior associate reviewing a junior associate's draft motion for summary judgment. The brief cites a deposition transcript and a case. First, explore how tools can find supporting evidence from the record. Then, verify whether the brief accurately represents what the sources actually say."

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

// === TAB 1: SOURCE DISCOVERY ===

export type MatchScore = 'strong' | 'partial' | 'contradicts'

export interface SourceSuggestion {
  sourceLabel: string
  sourceType: 'deposition' | 'case'
  page?: number
  highlightLines?: number[]
  highlightText?: string
  excerpt: string
  score: MatchScore
  scoreLabel: string
  explanation: string
}

export interface BriefClaim {
  id: string
  text: string
  fullSentence: string
  suggestions: SourceSuggestion[]
}

export const discoveryBriefText = "Plaintiff cannot establish the second element of her hostile work environment claim. During her deposition, Ms. Torres admitted that the alleged comments occurred only twice over a six-month period and that she \"Democrats just didn't feel welcomed\" in the office but \"nobody ever said anything directly to her.\" Furthermore, Ms. Torres conceded that she never reported the incidents to Human Resources despite being aware of the company's reporting procedures. Courts in this district have consistently held that isolated incidents, without more, are insufficient to establish a hostile work environment. Finally, Plaintiff's own testimony confirms that her supervisor took immediate corrective action once informed of the situation."

export const briefClaims: BriefClaim[] = [
  {
    id: 'claim1',
    text: 'the alleged comments occurred only twice over a six-month period',
    fullSentence: 'During her deposition, Ms. Torres admitted that the alleged comments occurred only twice over a six-month period.',
    suggestions: [
      {
        sourceLabel: 'Torres Dep. p.84:12-17',
        sourceType: 'deposition',
        page: 84,
        highlightLines: [12, 13, 14, 15, 16, 17],
        excerpt: 'A. I remember specifically two times where it was said directly to me. But there were other times — maybe four or five more — where I overheard things said to other people, or comments were made in meetings that everyone could hear.',
        score: 'contradicts',
        scoreLabel: 'Contradicts assertion',
        explanation: 'Torres said two incidents were directly to her, but described 4-5 more that were overheard or made in meetings. The brief claims "only twice" total — the source says 6-7 incidents.'
      },
    ]
  },
  {
    id: 'claim2',
    text: '"nobody ever said anything directly to her"',
    fullSentence: 'Ms. Torres said "Democrats just didn\'t feel welcomed" in the office but "nobody ever said anything directly to her."',
    suggestions: [
      {
        sourceLabel: 'Torres Dep. p.84:19-22',
        sourceType: 'deposition',
        page: 84,
        highlightLines: [19, 20, 21, 22],
        excerpt: 'A. Democrats just didn\'t feel welcomed. I mean, nobody ever said anything directly to me about my voter registration or anything, but the comments in meetings made it clear.',
        score: 'partial',
        scoreLabel: 'Partial match — selective quotation',
        explanation: 'The quote is real but truncated. The full quote includes "but the comments in meetings made it clear" — showing she DID experience hostile comments, just in a different form. The omitted clause reverses the meaning.'
      },
    ]
  },
  {
    id: 'claim3',
    text: 'she never reported the incidents to Human Resources',
    fullSentence: 'Ms. Torres conceded that she never reported the incidents to Human Resources despite being aware of the company\'s reporting procedures.',
    suggestions: [
      {
        sourceLabel: 'Torres Dep. p.112:1-8',
        sourceType: 'deposition',
        page: 112,
        highlightLines: [1, 2, 3, 4, 5, 6, 7, 8],
        excerpt: 'Q. Did you ever report these incidents to Human Resources? A. I went to my supervisor first. He said he would handle it. When it kept happening, I went to HR. They said they would look into it. Q. When did you go to HR? A. About three months after the first incident. I have the email I sent them.',
        score: 'contradicts',
        scoreLabel: 'Contradicts assertion',
        explanation: 'The brief says Torres "never reported" to HR. The source says she went to her supervisor AND then went to HR, and has an email to prove it. This is factually incorrect.'
      },
    ]
  },
  {
    id: 'claim4',
    text: 'isolated incidents, without more, are insufficient',
    fullSentence: 'Courts in this district have consistently held that isolated incidents, without more, are insufficient to establish a hostile work environment.',
    suggestions: [
      {
        sourceLabel: 'Henderson v. Oakwood, 142 F. Supp. 3d at 558',
        sourceType: 'case',
        highlightText: 'two or three stray remarks over the course of several months may not, standing alone, rise to the level of severe or pervasive conduct',
        excerpt: '"Two or three stray remarks over the course of several months may not, standing alone, rise to the level of severe or pervasive conduct..." However, the court continues: "Where such remarks are accompanied by other exclusionary conduct — such as deliberate ostracism, reassignment of duties, or a pattern of dismissive behavior — the totality of circumstances may support the claim."',
        score: 'partial',
        scoreLabel: 'Partial match — omits key qualification',
        explanation: 'Henderson supports this proposition only in part. The very next sentence says the analysis "does not end there" and lists factors (ostracism, exclusionary conduct) that may support the claim — which is what Torres describes. Citing only the first half is misleading.'
      },
    ]
  },
  {
    id: 'claim5',
    text: 'her supervisor took immediate corrective action',
    fullSentence: 'Plaintiff\'s own testimony confirms that her supervisor took immediate corrective action once informed of the situation.',
    suggestions: [
      {
        sourceLabel: 'Torres Dep. p.156:14-19',
        sourceType: 'deposition',
        page: 156,
        highlightLines: [14, 15, 16, 17, 18, 19],
        excerpt: 'A. He said he would talk to the people involved. I don\'t know if he actually did, because the comments in meetings didn\'t really stop. They maybe got a little more subtle. Like, instead of saying things outright they would just make looks or change the subject when I walked in.',
        score: 'contradicts',
        scoreLabel: 'Contradicts assertion',
        explanation: 'The brief says "immediate corrective action." The source says the supervisor said he\'d talk to people, Torres doesn\'t know if he did, and the behavior didn\'t stop — it just became more subtle. This is the opposite of effective corrective action.'
      },
    ]
  }
]

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

export const scoreConfig: Record<MatchScore, { label: string; color: string; bgColor: string; borderColor: string; icon: string }> = {
  strong: { label: 'Strong support', color: 'text-green-700', bgColor: 'bg-green-50', borderColor: 'border-green-400', icon: '\u2713' },
  partial: { label: 'Partial match', color: 'text-yellow-700', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-400', icon: '\u26A0' },
  contradicts: { label: 'Contradicts', color: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-400', icon: '\u2717' },
}
