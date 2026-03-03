export const contextText = "You're building a Non-Disclosure Agreement using your firm's clause library. For each section, select from pre-approved clause options vetted by senior partners. Watch the NDA assemble in real time on the right."

export const calloutText = {
  tools: "Litera Transact, Thomson Reuters Contract Express, firm-specific clause banks, KM (Knowledge Management) platforms.",
  context: "Most large firms maintain libraries of pre-approved clauses vetted by senior partners. Associates don't draft from scratch \u2014 they assemble from approved building blocks, then customize. This ensures consistency, reduces risk, and lets junior lawyers work faster. If you're at a firm that doesn't have a clause library, building one is a great way to demonstrate value."
}

export interface ClauseOption {
  id: string
  label: string
  clauseText: string
  guidance: string
  fullText: string
}

export interface ClauseSection {
  id: string
  title: string
  options: ClauseOption[]
}

export const sections: ClauseSection[] = [
  {
    id: 'nda-type',
    title: 'Type of NDA',
    options: [
      {
        id: 'mutual',
        label: 'Mutual NDA',
        clauseText: 'Both parties agree to protect each other\'s confidential information.',
        guidance: 'Best for: partnerships, joint ventures, equal bargaining power',
        fullText: 'This Mutual Non-Disclosure Agreement ("Agreement") is entered into as of the date last signed below by and between the undersigned parties. Each party (as "Disclosing Party") may disclose certain confidential and proprietary information to the other party (as "Receiving Party"). Both parties agree to protect the confidentiality of the other party\'s Confidential Information under the terms set forth herein.'
      },
      {
        id: 'one-way',
        label: 'One-Way NDA',
        clauseText: 'Receiving party agrees to protect disclosing party\'s information.',
        guidance: 'Best for: hiring contractors, sharing proprietary info with potential investors',
        fullText: 'This Non-Disclosure Agreement ("Agreement") is entered into as of the date last signed below. The Disclosing Party possesses certain confidential and proprietary information and wishes to disclose such information to the Receiving Party solely for the purpose described herein. The Receiving Party agrees to protect the confidentiality of such information under the terms set forth herein.'
      }
    ]
  },
  {
    id: 'definition',
    title: 'Definition of Confidential Information',
    options: [
      {
        id: 'broad',
        label: 'Broad Definition',
        clauseText: '...all information disclosed by either party, whether oral, written, or electronic, that is designated as confidential or that reasonably should be understood to be confidential...',
        guidance: 'More protective, but may be challenged as overbroad',
        fullText: '\u201cConfidential Information\u201d means all information disclosed by the Disclosing Party to the Receiving Party, whether oral, written, electronic, or visual, that is designated as confidential or that, given the nature of the information or the circumstances of disclosure, reasonably should be understood to be confidential. This includes, without limitation, all analyses, compilations, data, studies, or other documents prepared by the Receiving Party that contain or reflect such information.'
      },
      {
        id: 'narrow',
        label: 'Narrow Definition',
        clauseText: '...information specifically marked "CONFIDENTIAL" at the time of disclosure, or if disclosed orally, confirmed in writing within 30 days...',
        guidance: 'Easier to enforce, but requires discipline in marking',
        fullText: '\u201cConfidential Information\u201d means information that is specifically marked "CONFIDENTIAL" or with a similar legend at the time of disclosure. Information disclosed orally shall be considered Confidential Information only if identified as confidential at the time of disclosure and confirmed in writing within thirty (30) days thereafter.'
      },
      {
        id: 'enumerated',
        label: 'Enumerated Definition',
        clauseText: '...including but not limited to: trade secrets, customer lists, financial data, business plans, technical specifications, and software code...',
        guidance: 'Most specific, easiest to understand',
        fullText: '\u201cConfidential Information\u201d means information including but not limited to: trade secrets, inventions, patent applications, customer lists, supplier information, financial data and projections, business plans and strategies, technical specifications, product designs, software code, algorithms, marketing plans, pricing information, and employee information. This definition is intended to be illustrative and not exhaustive.'
      }
    ]
  },
  {
    id: 'exclusions',
    title: 'Exclusions',
    options: [
      {
        id: 'standard',
        label: 'Standard Exclusions',
        clauseText: 'Publicly known info, independently developed, received from third party, required by law.',
        guidance: 'Industry-standard carve-outs accepted by most parties',
        fullText: 'Confidential Information shall not include information that: (a) is or becomes publicly available through no fault of the Receiving Party; (b) was known to the Receiving Party prior to disclosure, as evidenced by written records; (c) is independently developed by the Receiving Party without use of the Confidential Information; (d) is rightfully received from a third party without restriction on disclosure; or (e) is required to be disclosed by law, regulation, or court order, provided that the Receiving Party gives prompt notice to allow the Disclosing Party to seek a protective order.'
      },
      {
        id: 'residuals',
        label: 'Standard + Residuals Clause',
        clauseText: 'Adds: "...information retained in the unaided memory of Receiving Party\'s personnel..."',
        guidance: 'Favors receiving party \u2014 common in tech industry',
        fullText: 'Confidential Information shall not include information that: (a) is or becomes publicly available through no fault of the Receiving Party; (b) was known to the Receiving Party prior to disclosure, as evidenced by written records; (c) is independently developed by the Receiving Party without use of the Confidential Information; (d) is rightfully received from a third party without restriction on disclosure; (e) is required to be disclosed by law, regulation, or court order, provided that the Receiving Party gives prompt notice to allow the Disclosing Party to seek a protective order; or (f) is retained in the unaided memory of Receiving Party\'s personnel who have had access to the Confidential Information, provided that such personnel have not intentionally memorized such information for the purpose of retaining it.'
      }
    ]
  },
  {
    id: 'term',
    title: 'Term',
    options: [
      {
        id: '1-year',
        label: '1 Year',
        clauseText: 'Agreement effective for one year from execution.',
        guidance: 'Standard for business discussions',
        fullText: 'This Agreement shall remain in effect for a period of one (1) year from the date of execution. Either party may terminate this Agreement upon thirty (30) days\' written notice. The obligations of confidentiality shall survive termination for an additional period of one (1) year.'
      },
      {
        id: '3-year',
        label: '3 Years',
        clauseText: 'Agreement effective for three years from execution.',
        guidance: 'Standard for trade secrets',
        fullText: 'This Agreement shall remain in effect for a period of three (3) years from the date of execution. Either party may terminate this Agreement upon thirty (30) days\' written notice. The obligations of confidentiality shall survive termination for an additional period of two (2) years.'
      },
      {
        id: 'perpetual',
        label: 'Perpetual for Trade Secrets',
        clauseText: '...obligations continue for 3 years, except with respect to trade secrets, which shall be protected for so long as they remain trade secrets under applicable law.',
        guidance: 'Maximum protection',
        fullText: 'This Agreement shall remain in effect for a period of three (3) years from the date of execution. Either party may terminate this Agreement upon thirty (30) days\' written notice. The obligations of confidentiality shall survive termination for an additional period of three (3) years, except with respect to trade secrets, which shall be protected for so long as they remain trade secrets under applicable law.'
      }
    ]
  },
  {
    id: 'remedies',
    title: 'Remedies',
    options: [
      {
        id: 'injunctive',
        label: 'Injunctive Relief',
        clauseText: '...the disclosing party shall be entitled to seek injunctive relief in addition to any other remedies available at law...',
        guidance: 'Standard',
        fullText: 'Each party acknowledges that any breach of this Agreement may cause irreparable harm to the Disclosing Party for which monetary damages would be an inadequate remedy. Accordingly, the Disclosing Party shall be entitled to seek injunctive or other equitable relief to prevent or curtail any breach of this Agreement, in addition to any other remedies available at law or in equity.'
      },
      {
        id: 'liquidated',
        label: 'Injunctive Relief + Liquidated Damages',
        clauseText: 'Adds pre-agreed damage amount in addition to injunctive relief.',
        guidance: 'Stronger deterrent, but may be challenged if amount is unreasonable',
        fullText: 'Each party acknowledges that any breach of this Agreement may cause irreparable harm to the Disclosing Party for which monetary damages would be an inadequate remedy. Accordingly, the Disclosing Party shall be entitled to seek injunctive or other equitable relief to prevent or curtail any breach of this Agreement. In addition, the Receiving Party agrees that any unauthorized disclosure of Confidential Information shall entitle the Disclosing Party to liquidated damages in the amount of $50,000 per occurrence, which the parties agree represents a reasonable estimate of the harm likely to result from such disclosure. This liquidated damages provision is in addition to any other remedies available at law or in equity.'
      }
    ]
  }
]
