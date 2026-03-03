export const contextText = "You're preparing a consulting agreement for a new client engagement. Instead of drafting from scratch, you'll use a document automation template. Fill in the questionnaire on the left and watch the agreement build itself on the right."

export const calloutText = {
  tools: "HotDocs, Gavel (advanced features), ContractExpress (now Thomson Reuters), Woodpecker (Word add-in), Documate, Afterpattern.",
  context: "In Gavel, you built a guided interview that generates a simple document — but professional document automation handles much more: conditional sections that appear or disappear, entity-specific language, jurisdiction-specific provisions, automatic numbering that adjusts when sections are added or removed, and integration with client databases. Transactional lawyers use these daily for NDAs, engagement letters, and standard agreements."
}

export const clientTypes = ['Individual', 'Corporation', 'LLC'] as const
export const states = ['Ohio', 'New York', 'California', 'Texas'] as const
export const nonCompeteDurations = ['6 months', '1 year', '2 years'] as const
export const paymentOptions = ['Net 30', 'Net 60', 'Upon completion'] as const
export const liabilityCapOptions = ['Contract value', '2x contract value', '$50,000'] as const

export const venueText: Record<string, string> = {
  'Ohio': 'Any disputes shall be resolved in the courts of Franklin County, Ohio.',
  'New York': 'Any disputes shall be resolved in the state or federal courts located in the Borough of Manhattan, New York County.',
  'California': 'Any disputes shall be resolved in the state or federal courts located in San Francisco County, California.',
  'Texas': 'Any disputes shall be resolved in the state or federal courts located in Travis County, Texas.',
}

export const entityLanguage: Record<string, string> = {
  'Individual': 'an individual residing in the State of {state},',
  'Corporation': 'a {state} corporation, with its principal place of business at _______________,',
  'LLC': 'a {state} limited liability company, with its principal place of business at _______________,',
}
