export const contextText = "Legal writing is often verbose and passive. Here are three different approaches to improving it: AI-powered rewriting, deterministic style rules, and mechanical consistency checking. Each tab shows a different philosophy."

export const calloutText = {
  tools: "AI Editing Tools: Microsoft Copilot in Word, Claude, ChatGPT, Thomson Reuters CoCounsel. Rule-Based Style Tools: BriefCatch (legal writing patterns from Ross Guberman), WordRake (clarity and brevity). Consistency Tools: PerfectIt (defined terms, number formatting, capitalization), Litera Contract Companion (cross-references, defined terms, internal consistency).",
  context: "The key professional skill isn't learning any one tool — it's knowing which type of check to run and when. Use AI for substantive revision, rules for style, and consistency tools for mechanical accuracy."
}

export const verboseParagraph = `It is hereby acknowledged and agreed by the parties hereto that the aforementioned contractor shall be required to provide, on a monthly basis, a detailed written report to the company which shall include, but not be limited to, a comprehensive summary of all services that were performed during the preceding calendar month, together with an itemized accounting of all expenses that were incurred in connection with the performance of such services, and it is further agreed that such report shall be submitted no later than the fifteenth (15th) day of the month immediately following the month in which such services were rendered.`

export const verboseWordCount = 97

export interface DiffSegment {
  type: 'keep' | 'delete' | 'insert'
  text: string
}

export const aiResults: Record<string, { text: string; wordCount: number; diffs: DiffSegment[] }> = {
  concise: {
    text: 'The Contractor shall submit a monthly written report to the Company by the 15th of each month. The report must include a summary of services performed and an itemized expense accounting for the preceding month.',
    wordCount: 35,
    diffs: [
      { type: 'delete', text: 'It is hereby acknowledged and agreed by the parties hereto that the aforementioned contractor' },
      { type: 'insert', text: 'The Contractor' },
      { type: 'delete', text: 'shall be required to provide, on a monthly basis, a detailed written report to the company which shall include, but not be limited to, a comprehensive summary of all services that were performed during the preceding calendar month, together with an itemized accounting of all expenses that were incurred in connection with the performance of such services, and it is further agreed that such report shall be submitted no later than the fifteenth (15th) day of the month immediately following the month in which such services were rendered.' },
      { type: 'insert', text: 'shall submit a monthly written report to the Company by the 15th of each month. The report must include a summary of services performed and an itemized expense accounting for the preceding month.' },
    ]
  },
  activeVoice: {
    text: 'The Contractor shall provide the Company with a detailed written report on a monthly basis. The report shall include a comprehensive summary of all services performed during the preceding calendar month and an itemized accounting of all expenses incurred in performing such services. The Contractor shall submit each report no later than the fifteenth (15th) day of the following month.',
    wordCount: 56,
    diffs: [
      { type: 'delete', text: 'It is hereby acknowledged and agreed by the parties hereto that the aforementioned contractor shall be required to provide,' },
      { type: 'insert', text: 'The Contractor shall provide the Company with a detailed written report' },
      { type: 'delete', text: 'on a monthly basis, a detailed written report to the company which shall include, but not be limited to, a' },
      { type: 'insert', text: 'on a monthly basis. The report shall include a' },
      { type: 'keep', text: 'comprehensive summary of all services' },
      { type: 'delete', text: 'that were' },
      { type: 'keep', text: 'performed during the preceding calendar month' },
      { type: 'delete', text: ', together with' },
      { type: 'insert', text: 'and' },
      { type: 'keep', text: 'an itemized accounting of all expenses' },
      { type: 'delete', text: 'that were' },
      { type: 'keep', text: 'incurred in' },
      { type: 'delete', text: 'connection with the performance of' },
      { type: 'insert', text: 'performing' },
      { type: 'keep', text: 'such services' },
      { type: 'delete', text: ', and it is further agreed that such report shall be submitted' },
      { type: 'insert', text: '. The Contractor shall submit each report' },
      { type: 'keep', text: 'no later than the fifteenth (15th) day of the' },
      { type: 'delete', text: 'month immediately' },
      { type: 'keep', text: 'following' },
      { type: 'delete', text: 'the' },
      { type: 'keep', text: 'month' },
      { type: 'delete', text: 'in which such services were rendered.' },
      { type: 'insert', text: '.' },
    ]
  },
  clientLetter: {
    text: 'Each month, the contractor will send you a report by the 15th covering what work was done and what it cost the previous month.',
    wordCount: 24,
    diffs: [
      { type: 'delete', text: 'It is hereby acknowledged and agreed by the parties hereto that the aforementioned contractor shall be required to provide, on a monthly basis, a detailed written report to the company which shall include, but not be limited to, a comprehensive summary of all services that were performed during the preceding calendar month, together with an itemized accounting of all expenses that were incurred in connection with the performance of such services, and it is further agreed that such report shall be submitted no later than the fifteenth (15th) day of the month immediately following the month in which such services were rendered.' },
      { type: 'insert', text: 'Each month, the contractor will send you a report by the 15th covering what work was done and what it cost the previous month.' },
    ]
  }
}

export const styleFlags = [
  {
    phrase: 'hereby',
    replacement: '[Delete]',
    rule: '"Hereby" adds no meaning in modern legal drafting. (Guberman, Point Made)'
  },
  {
    phrase: 'acknowledged and agreed',
    replacement: '"agreed"',
    rule: 'Doublet — "acknowledged" is redundant when paired with "agreed."'
  },
  {
    phrase: 'aforementioned',
    replacement: '[Delete or replace with specific reference]',
    rule: 'Legalese filler. Specify what you\'re referring to.'
  },
  {
    phrase: 'shall be required to provide',
    replacement: '"shall provide"',
    rule: 'Nominalization. Convert "be required to [verb]" to direct verb.'
  },
  {
    phrase: 'which shall include, but not be limited to',
    replacement: '"including"',
    rule: 'Verbose construction. "Including" already implies non-exhaustiveness under UCC § 1-201(b)(17).'
  },
  {
    phrase: 'in connection with the performance of such services',
    replacement: '"for those services"',
    rule: 'Prepositional phrase chain. Reduce to simplest form.'
  }
]

export const consistencyText = [
  {
    id: 'p1',
    heading: '2.1 Services.',
    text: 'The Contractor shall provide consulting services to Acme Corporation ("Client") as described in Exhibit A. All services shall be performed in accordance with industry standards.'
  },
  {
    id: 'p2',
    heading: '2.2 Reports.',
    text: 'Contractor shall deliver monthly reports to the Client. Reports shall include a summary of all Services performed and expenses incurred. The contractor shall submit reports by the 15th of each month.'
  },
  {
    id: 'p3',
    heading: '2.3 Expenses.',
    text: 'All expenses exceeding $500 require prior written approval from Acme Corp. The client shall reimburse approved expenses within thirty (30) days of receipt of Contractor\'s invoice.'
  }
]

export const consistencyFlags = [
  {
    id: 'cf1',
    instances: [
      { text: 'The Contractor', paragraph: 'p1' },
      { text: 'Contractor', paragraph: 'p2' }
    ],
    explanation: 'Inconsistent use of article. Choose one form and use throughout.',
    color: 'blue'
  },
  {
    id: 'cf2',
    instances: [
      { text: 'Acme Corporation', paragraph: 'p1' },
      { text: 'Acme Corp', paragraph: 'p3' }
    ],
    explanation: 'Party name inconsistency. Use the defined term "Client" or match the full legal name.',
    color: 'purple'
  },
  {
    id: 'cf3',
    instances: [
      { text: '"Client"', paragraph: 'p1' },
      { text: 'the Client', paragraph: 'p2' },
      { text: 'The client', paragraph: 'p3' }
    ],
    explanation: 'Inconsistent capitalization of defined term.',
    color: 'green'
  },
  {
    id: 'cf4',
    instances: [
      { text: 'services', paragraph: 'p1' },
      { text: 'Services', paragraph: 'p2' }
    ],
    explanation: 'Inconsistent capitalization. If "Services" is a defined term, capitalize throughout.',
    color: 'orange'
  },
  {
    id: 'cf5',
    instances: [
      { text: '$500', paragraph: 'p3' },
      { text: 'thirty (30) days', paragraph: 'p3' }
    ],
    explanation: 'Inconsistent number formatting. Either use numerals throughout or spell out all numbers.',
    color: 'red'
  }
]

export const ruleBasedCallout = "Rule-based vs. AI: These edits are deterministic — the same input always produces the same flags. Every suggestion cites a specific rule. You can audit and override individually. AI edits are more flexible (they understand context and can rewrite whole passages) but less predictable. Professional workflows often use both: rule-based tools for consistency, AI tools for substantive revision."

export const consistencyCallout = "Why this matters: These aren't style problems — they're precision problems. \"Acme Corporation\" and \"Acme Corp\" might be treated as two different entities. Inconsistent defined term capitalization can create ambiguity about whether a word carries its defined meaning. PerfectIt and similar tools catch these mechanically across 100-page documents in seconds."
