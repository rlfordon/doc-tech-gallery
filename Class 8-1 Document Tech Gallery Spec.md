# Document Technology Gallery — App Spec

**Purpose:** An interactive web gallery that lets law students experience 7 key document technology patterns they'll encounter in legal practice. Each demo is simplified but functional — completable in 60-90 seconds. Students have already completed Procertas (basic Word/PDF mechanics), so this goes *beyond* basics to show the professional ecosystem.

**Inspired by:** [Legal Tech Gallery](https://legaltechgallery.lovable.app/) by Petra Moravcová

**Design:** Clean, modern, card-based gallery landing page. Each card links to a self-contained interactive demo. Navigation back to gallery from each demo. Mobile-friendly but optimized for laptop.

**Organizing principle:** The demos follow the document lifecycle — Create, Edit, Review, Protect.

---

## Landing Page

Title: **Document Technology Gallery**
Subtitle: *Beyond Word and Acrobat: The tools lawyers actually use*

Brief intro text: "In practice, basic Word and PDF skills are table stakes. Law firms, courts, and clients expect lawyers to work within a broader ecosystem of document technology. This gallery lets you experience seven key patterns — each simplified, but representative of tools you'll encounter on day one."

7 cards, each with:
- Icon/illustration
- Pattern name
- One-line description
- "Try it" button
- Estimated time (60-90 sec)

Cards are organized in four groups with subtle section labels:
- **Create:** Document Automation, Clause Library
- **Edit:** AI-Assisted Document Editing
- **Review:** Contract Review & Issue Spotting, Brief Verification
- **Protect:** Metadata Inspection & Scrubbing, PDF Redaction

---

## Demo 1: Metadata Inspection & Scrubbing

**Card description:** "You grabbed an old NDA to reuse for a new client. See what you're about to send opposing counsel."

**Scenario setup:**
- A document preview that looks polished and professional — an NDA on fictional firm letterhead, ready to send to opposing counsel for a new deal
- A brief context box at top: "You're a second-year associate. You pulled this NDA from the firm's files — it was used for a prior matter between your client Apex Industries and Meridian Corp. You've updated the party names and deal terms for the new matter (Apex Industries and TechFlow Inc.). The partner says: 'Clean it up and send it over.' It looks ready."
- The NDA looks perfectly clean and ready to send
- Button: "Inspect Document"

**On click "Inspect" — reveals hidden layers one at a time (with animation):**

1. **Author & routing info:** "Created by: Sarah Chen | Last modified by: opposing_counsel_jsmith | Company: RIVAL LAW FIRM LLP" — the document was *received from opposing counsel* in the prior deal, not drafted by your firm. You're about to send opposing counsel their own firm's metadata.

2. **Ghosted client name:** In the header, "Meridian Corp" briefly flashes — the old client name is still embedded in a field code even though the visible text says "TechFlow Inc." If opposing counsel opens Document Properties, they'll see the prior deal party.

3. **Hidden comments:** A comment bubble appears: "Mike — Apex pushed hard on the non-compete last time. We gave in at 12 months but our bottom line was 6. Don't go above 6 months this round." — Your negotiation strategy from the prior deal is embedded in the document.

4. **Tracked changes (hidden, accepted but recoverable):** A paragraph that was "deleted" but still embedded in the file's revision history: an unfavorable carve-out to the confidentiality definition that was negotiated away in the prior deal. Opposing counsel could see what your client gave up last time.

5. **Embedded data:** "Printer path: \\APEXCORP-DC1\Legal-3rdFloor" — reveals the client's internal network naming convention. Also: "Last printed: 2024-11-14" — dates the prior deal.

After all layers revealed, two buttons appear:
- **"Send As-Is"** — a red warning screen: "You just sent opposing counsel: your client's negotiation history, prior deal terms, the old counterparty's name, and internal network information."
- **"Scrub & Send"** — walks through a 3-step cleaning process: (1) Document Inspector → Remove All for each category, (2) Save as new file (breaks revision history link), (3) Final check. Green checkmark: "Clean document ready."

**"In Practice" callout box:**
> **Tools:** Litera Scrub (DocScrub), Microsoft Document Inspector (built into Word: File > Info > Check for Issues), Workshare Protect, BigHand Metadata Management. Metadata disasters are real: in 2006, the UN circulated an Iraq War report where tracked changes revealed the original source was a US intelligence document. In February 2026, a DHS PDF contained embedded metadata revealing ICE personnel behind detention center plans. Law firms now have automatic metadata cleaning on every outgoing email attachment. Knowing how to inspect and clean documents is a basic professional competency — and knowing *why* matters even more.

---

## Demo 2: Document Automation — Conditional Logic

**Card description:** "Watch a contract write itself as you answer questions."

**What the user sees:**
- Split screen: left side is a **questionnaire panel**, right side is a **live document preview**
- The document is a simplified consulting agreement (~300 words with blanks and conditional sections)

**Questionnaire fields (left panel):**
1. **Client name:** [text input, default empty]
2. **Client type:** [dropdown: Individual / Corporation / LLC]
3. **Governing law:** [dropdown: Ohio / New York / California / Texas]
4. **Include non-compete clause?** [toggle: Yes/No]
5. **Non-compete duration:** [dropdown: 6 months / 1 year / 2 years] — *only visible if non-compete = Yes*
6. **Payment terms:** [dropdown: Net 30 / Net 60 / Upon completion]
7. **Include limitation of liability?** [toggle: Yes/No]
8. **Liability cap:** [dropdown: Contract value / 2x contract value / $50,000] — *only visible if limitation = Yes*

**Document preview (right panel):**
- Shows the agreement updating in real-time as user fills in fields
- Variables highlighted in yellow when filled (e.g., `[Client Name]` becomes `Acme Corp` in yellow highlight)
- Conditional sections fade in/out with animation:
  - If "Corporation" selected → entity-specific language appears ("a [State] corporation, with its principal place of business at...")
  - If Non-compete = Yes → entire non-compete section appears
  - If Non-compete = No → section is absent (not just hidden — actually gone from the document flow)
  - If Limitation of Liability = Yes → liability cap section appears with the selected cap amount
  - Different governing law → different choice-of-law clause text, including state-specific venue provisions

**Template text (right panel) — Consulting Agreement:**

```
CONSULTING AGREEMENT

This Consulting Agreement ("Agreement") is entered into as of [today's date auto-filled] by and between:

[IF Individual] [Client Name] ("Client"), an individual residing in the State of [Governing Law State],
[IF Corporation] [Client Name] ("Client"), a [Governing Law State] corporation, with its principal place of business at _______________,
[IF LLC] [Client Name] ("Client"), a [Governing Law State] limited liability company, with its principal place of business at _______________,

and Buckeye Consulting Group LLC ("Consultant"), an Ohio limited liability company.

1. SERVICES. Consultant shall provide professional consulting services as described in Exhibit A.

2. COMPENSATION. Client shall pay Consultant according to the fee schedule in Exhibit B. Payment is due [Net 30 / Net 60 / Upon completion of services].

[IF Non-Compete = Yes]
3. NON-COMPETITION. During the term of this Agreement and for a period of [duration] following its termination, Client agrees not to engage any consultant who is then-currently providing services to Consultant for substantially similar services.
[END IF]

[IF Limitation of Liability = Yes]
[Next #]. LIMITATION OF LIABILITY. In no event shall Consultant's total liability under this Agreement exceed [Liability Cap]. This limitation applies to all causes of action in the aggregate.
[END IF]

[Next #]. GOVERNING LAW. This Agreement shall be governed by the laws of the State of [Governing Law State].
[IF Ohio] Any disputes shall be resolved in the courts of Franklin County, Ohio.
[IF New York] Any disputes shall be resolved in the state or federal courts located in the Borough of Manhattan, New York County.
[IF California] Any disputes shall be resolved in the state or federal courts located in San Francisco County, California.
[IF Texas] Any disputes shall be resolved in the state or federal courts located in Travis County, Texas.

[Next #]. ENTIRE AGREEMENT. This Agreement constitutes the entire agreement between the parties and supersedes all prior negotiations and agreements.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

_____________________________          _____________________________
[Client Name]                          Buckeye Consulting Group LLC
Client                                 Consultant
```

**"In Practice" callout box:**
> **Tools:** HotDocs, Gavel (advanced features), ContractExpress (now Thomson Reuters), Woodpecker (Word add-in), Documate, Afterpattern. In Gavel, you built a guided interview that generates a simple document — but professional document automation handles much more: conditional sections that appear or disappear, entity-specific language, jurisdiction-specific provisions, automatic numbering that adjusts when sections are added or removed, and integration with client databases. Transactional lawyers use these daily for NDAs, engagement letters, and standard agreements.

---

## Demo 3: Clause Library

**Card description:** "Assemble a contract from pre-approved building blocks."

**What the user sees:**
- Building an NDA (Non-Disclosure Agreement) by selecting clause options
- Left panel: 5 sections of the NDA, each with 2-3 clause options as selectable cards
- Right panel: live preview of the assembled NDA

**Sections and clause options:**

**Section 1: Type of NDA**
- Option A: **Mutual NDA** — "Both parties agree to protect each other's confidential information." *(Best for: partnerships, joint ventures, equal bargaining power)*
- Option B: **One-Way NDA** — "Receiving party agrees to protect disclosing party's information." *(Best for: hiring contractors, sharing proprietary info with potential investors)*

**Section 2: Definition of Confidential Information**
- Option A: **Broad definition** — "...all information disclosed by either party, whether oral, written, or electronic, that is designated as confidential or that reasonably should be understood to be confidential..." *(More protective, but may be challenged as overbroad)*
- Option B: **Narrow definition** — "...information specifically marked 'CONFIDENTIAL' at the time of disclosure, or if disclosed orally, confirmed in writing within 30 days..." *(Easier to enforce, but requires discipline in marking)*
- Option C: **Enumerated definition** — "...including but not limited to: trade secrets, customer lists, financial data, business plans, technical specifications, and software code..." *(Most specific, easiest to understand)*

**Section 3: Exclusions**
- Option A: **Standard exclusions** — publicly known info, independently developed, received from third party, required by law
- Option B: **Standard + residuals clause** — adds: "...information retained in the unaided memory of Receiving Party's personnel..." *(Favors receiving party — common in tech industry)*

**Section 4: Term**
- Option A: **1 year** *(Standard for business discussions)*
- Option B: **3 years** *(Standard for trade secrets)*
- Option C: **Perpetual for trade secrets** — "...obligations continue for 3 years, except with respect to trade secrets, which shall be protected for so long as they remain trade secrets under applicable law." *(Maximum protection)*

**Section 5: Remedies**
- Option A: **Injunctive relief** — "...the disclosing party shall be entitled to seek injunctive relief in addition to any other remedies available at law..." *(Standard)*
- Option B: **Injunctive relief + liquidated damages** — adds pre-agreed damage amount *(Stronger deterrent, but may be challenged if amount is unreasonable)*

Each option card has:
- A short label (bolded)
- 1-2 sentences of the actual clause language
- A parenthetical note about when/why you'd choose this option (in italics)

As user selects options, the right panel assembles the full NDA in real-time.

**"In Practice" callout box:**
> **Tools:** Litera Transact, Thomson Reuters Contract Express, firm-specific clause banks, KM (Knowledge Management) platforms. Most large firms maintain libraries of pre-approved clauses vetted by senior partners. Associates don't draft from scratch — they assemble from approved building blocks, then customize. This ensures consistency, reduces risk, and lets junior lawyers work faster. If you're at a firm that doesn't have a clause library, building one is a great way to demonstrate value.

---

## Demo 4: AI-Assisted Document Editing

**Card description:** "Edit a legal document three ways: AI, rules, and consistency checking."

**What the user sees:**
- A text area containing a verbose, passive-voice legal paragraph (~150 words)
- Below it: three tabs — **AI Edit**, **Style Rules**, **Consistency Check**
- Below that: results panel showing "before/after" with track-change-style markup

**Starting text (intentionally bad legal writing):**
> It is hereby acknowledged and agreed by the parties hereto that the aforementioned contractor shall be required to provide, on a monthly basis, a detailed written report to the company which shall include, but not be limited to, a comprehensive summary of all services that were performed during the preceding calendar month, together with an itemized accounting of all expenses that were incurred in connection with the performance of such services, and it is further agreed that such report shall be submitted no later than the fifteenth (15th) day of the month immediately following the month in which such services were rendered.

### Tab 1: AI Edit

**Preset command buttons:**
1. **"Make it concise"** → Cuts to ~60 words, eliminates legalese
2. **"Convert to active voice"** → Rewrites in active voice, keeps length similar
3. **"Simplify for client letter"** → Plain English version a non-lawyer would understand

**Pre-built results:**

*"Make it concise" result:*
> The Contractor shall submit a monthly written report to the Company by the 15th of each month. The report must include a summary of services performed and an itemized expense accounting for the preceding month.

*"Convert to active voice" result:*
> The Contractor shall provide the Company with a detailed written report on a monthly basis. The report shall include a comprehensive summary of all services performed during the preceding calendar month and an itemized accounting of all expenses incurred in performing such services. The Contractor shall submit each report no later than the fifteenth (15th) day of the following month.

*"Simplify for client letter" result:*
> Each month, the contractor will send you a report by the 15th covering what work was done and what it cost the previous month.

Each result shows:
- The edited version with deletions in red strikethrough and additions in blue underline (like track changes)
- A clean version toggle
- Word count comparison (e.g., "Before: 127 words → After: 52 words")

### Tab 2: Style Rules (BriefCatch / WordRake approach)

**What this shows:** A different philosophy — rule-based, pattern-matching edits rather than AI rewriting. The same paragraph analyzed by deterministic rules.

**Flagged issues (shown as highlighted spans with sidebar explanations):**
1. **"hereby"** → Delete. *Rule: "Hereby" adds no meaning in modern legal drafting. (Guberman, Point Made)*
2. **"acknowledged and agreed"** → "agreed" *Rule: Doublet — "acknowledged" is redundant when paired with "agreed."*
3. **"aforementioned"** → Delete or replace with specific reference. *Rule: Legalese filler. Specify what you're referring to.*
4. **"shall be required to provide"** → "shall provide" *Rule: Nominalization. Convert "be required to [verb]" to direct verb.*
5. **"which shall include, but not be limited to"** → "including" *Rule: Verbose construction. "Including" already implies non-exhaustiveness under UCC § 1-201(b)(17).*
6. **"in connection with the performance of such services"** → "for those services" *Rule: Prepositional phrase chain. Reduce to simplest form.*

**Key pedagogical point (shown in a callout):**
> **Rule-based vs. AI:** These edits are deterministic — the same input always produces the same flags. Every suggestion cites a specific rule. You can audit and override individually. AI edits are more flexible (they understand context and can rewrite whole passages) but less predictable. Professional workflows often use both: rule-based tools for consistency, AI tools for substantive revision.

### Tab 3: Consistency Check (PerfectIt approach)

**What this shows:** A different *kind* of quality check — not style or substance, but mechanical consistency across a document.

**For this demo, switch to a longer excerpt (~3 paragraphs of a contract) with intentional inconsistencies planted throughout:**

Sample text (shown in document viewer):
> **2.1 Services.** The Contractor shall provide consulting services to Acme Corporation ("Client") as described in Exhibit A. All services shall be performed in accordance with industry standards.
>
> **2.2 Reports.** Contractor shall deliver monthly reports to the Client. Reports shall include a summary of all Services performed and expenses incurred. The contractor shall submit reports by the 15th of each month.
>
> **2.3 Expenses.** All expenses exceeding $500 require prior written approval from Acme Corp. The client shall reimburse approved expenses within thirty (30) days of receipt of Contractor's invoice.

**On click "Check Consistency" — flags appear:**
1. **"The Contractor" vs. "Contractor"** (¶2.1 vs. ¶2.2) — *Inconsistent use of article. Choose one and use throughout.*
2. **"Acme Corporation" vs. "Acme Corp"** (¶2.1 vs. ¶2.3) — *Party name inconsistency. Use the defined term "Client" or match the full legal name.*
3. **"Client" vs. "the Client" vs. "the client"** (¶2.1, ¶2.2, ¶2.3) — *Inconsistent capitalization of defined term.*
4. **"services" vs. "Services"** (¶2.1 vs. ¶2.2) — *Inconsistent capitalization. If "Services" is a defined term, capitalize throughout.*
5. **"$500" vs. "thirty (30) days"** (¶2.3) — *Inconsistent number formatting. Either use numerals throughout or spell out all numbers.*

**Key pedagogical point (shown in a callout):**
> **Why this matters:** These aren't style problems — they're precision problems. "Acme Corporation" and "Acme Corp" might be treated as two different entities. Inconsistent defined term capitalization can create ambiguity about whether a word carries its defined meaning. PerfectIt and similar tools catch these mechanically across 100-page documents in seconds.

**"In Practice" callout box:**
> **AI Editing Tools:** Microsoft Copilot in Word, Claude, ChatGPT, Thomson Reuters CoCounsel. **Rule-Based Style Tools:** BriefCatch (legal writing patterns from Ross Guberman), WordRake (clarity and brevity). **Consistency Tools:** PerfectIt (defined terms, number formatting, capitalization), Litera Contract Companion (cross-references, defined terms, internal consistency). The key professional skill isn't learning any one tool — it's knowing which *type* of check to run and when. Use AI for substantive revision, rules for style, and consistency tools for mechanical accuracy.

---

## Demo 5: Contract Review & Issue Spotting

**Card description:** "See how AI flags risks in contract language."

**What the user sees:**
- A contract clause displayed in a document-style viewer (looks like a page)
- Button: "Run Review"

**Contract text (a deliberately problematic services agreement excerpt, ~250 words with multiple issues):**

> **5. INDEMNIFICATION.** Service Provider shall indemnify, defend, and hold harmless Client and its affiliates from and against any and all claims, damages, losses, costs, and expenses (including attorneys' fees) arising out of or relating to (a) any breach of this Agreement by Service Provider, (b) any negligent or wrongful act or omission of Service Provider, or (c) any claims by third parties relating to the services provided hereunder.
>
> **6. LIMITATION OF LIABILITY.** IN NO EVENT SHALL CLIENT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM THIS AGREEMENT.
>
> **7. TERMINATION.** Client may terminate this Agreement at any time, for any reason, upon written notice to Service Provider. Upon termination, Service Provider shall immediately cease all work and deliver all work product to Client. Client shall pay Service Provider for services rendered through the date of termination.
>
> **8. INTELLECTUAL PROPERTY.** All work product created by Service Provider under this Agreement shall be considered "work made for hire" and shall be the exclusive property of Client. Service Provider hereby assigns all right, title, and interest in any work product to Client.
>
> **9. NON-SOLICITATION.** For a period of three (3) years following termination, Service Provider shall not directly or indirectly solicit any employee or client of Client.

**On click "Run Review" — issues flagged with color-coded highlights and sidebar annotations:**

1. **HIGH RISK — One-sided indemnification** (Section 5): "Indemnification runs only from Service Provider to Client. Consider requesting mutual indemnification, or at minimum, indemnification for Client's own negligence."

2. **HIGH RISK — No liability cap** (Section 5): "Indemnification has no cap on Service Provider's exposure. Standard practice is to cap at 1-2x the contract value or total fees paid."

3. **MEDIUM RISK — One-sided liability limitation** (Section 6): "Liability limitation protects only Client. Service Provider has unlimited exposure via indemnification but no reciprocal protection."

4. **MEDIUM RISK — Termination for convenience (one-sided)** (Section 7): "Only Client can terminate at will. Service Provider has no termination rights. Consider adding mutual termination for convenience or termination for cause."

5. **MEDIUM RISK — Work-for-hire overreach** (Section 8): "Work-for-hire designation may not apply to independent contractor relationships under copyright law. The assignment clause is a good backup, but consider whether pre-existing IP needs to be carved out."

6. **NOTABLE — Broad non-solicitation** (Section 9): "Three-year non-solicitation is aggressive. Industry standard is 12-24 months. May be unenforceable in some jurisdictions (e.g., California)."

7. **MISSING PROVISION:** "No limitation on consequential damages for Service Provider. No dispute resolution clause. No data protection/confidentiality provision."

After all issues display, show a **summary dashboard:**
- High Risk: 2
- Medium Risk: 3
- Notable: 1
- Missing Provisions: 3

**"In Practice" callout box:**
> **Tools:** Luminance, Kira Systems, DocuSign Insight (Seal), Onit ReviewAI, Thomson Reuters Contract Intelligence. AI-powered contract review can scan hundreds of contracts in minutes, flagging risks that would take a human reviewer hours. These tools are widely used in M&A due diligence, lease abstraction, and compliance reviews. The key professional skill: understanding *why* something is flagged and whether it actually matters in your deal context. The AI finds issues — the lawyer decides which ones matter.

---

## Demo 6: Brief Verification Against Source Documents

**Card description:** "Does your brief actually say what the record says? Check your work against the source."

**Scenario setup:**
- Split screen: left panel shows an **excerpt from a legal brief** (a motion for summary judgment, ~4 paragraphs with citations to deposition testimony and case law). Right panel shows the **source documents** — a deposition transcript and a case excerpt.
- Context box at top: "You're a senior associate reviewing a junior associate's draft motion for summary judgment. The brief cites a deposition transcript and two cases. Before this goes to the partner, you need to verify that the brief accurately represents what the sources actually say."
- Button: "Verify Brief Against Sources"

**Brief text (left panel):**

> Plaintiff cannot establish the second element of her hostile work environment claim. During her deposition, Ms. Torres **admitted that the alleged comments occurred only twice over a six-month period** and that she **"Democrats just didn't feel welcomed" in the office but "nobody ever said anything directly to her."** Torres Dep. 84:12-22.
>
> Furthermore, Ms. Torres **conceded that she never reported the incidents to Human Resources** despite being aware of the company's reporting procedures. Torres Dep. 112:3-8.
>
> Courts in this district have consistently held that isolated incidents, without more, are insufficient to establish a hostile work environment. *See Henderson v. Oakwood Mgmt. Corp.*, 142 F. Supp. 3d 547, 558 (S.D. Ohio 2015) ("**Two or three stray remarks over the course of several months do not rise to the level of severe or pervasive conduct.**").
>
> Finally, Plaintiff's own testimony confirms that her supervisor **took immediate corrective action** once informed of the situation. Torres Dep. 156:14-19.

**Source documents (right panel, tabbed):**

*Tab 1: Torres Deposition Transcript*
```
PAGE 84
 10  Q. How many times did you hear comments about
 11     your political beliefs in the office?
 12  A. I remember specifically two times where it
 13     was said directly to me. But there were other
 14     times — maybe four or five more — where I
 15     overheard things said to other people, or
 16     comments were made in meetings that everyone
 17     could hear.
 18  Q. Can you describe how the environment felt?
 19  A. Democrats just didn't feel welcomed. I mean,
 20     nobody ever said anything directly to me about
 21     my voter registration or anything, but the
 22     comments in meetings made it clear.

PAGE 112
  1  Q. Did you ever report these incidents to Human
  2     Resources?
  3  A. I went to my supervisor first. He said he
  4     would handle it. When it kept happening, I
  5     went to HR. They said they would look into it.
  6  Q. When did you go to HR?
  7  A. About three months after the first incident.
  8  I have the email I sent them.

PAGE 156
 12  Q. What happened after you reported to your
 13     supervisor?
 14  A. He said he would talk to the people involved.
 15     I don't know if he actually did, because the
 16     comments in meetings didn't really stop. They
 17     maybe got a little more subtle. Like, instead
 18     of saying things outright they would just make
 19     looks or change the subject when I walked in.
```

*Tab 2: Henderson v. Oakwood (relevant passage)*
```
The court recognizes that "two or three stray remarks over
the course of several months may not, standing alone, rise
to the level of severe or pervasive conduct required to
establish a hostile work environment claim." However, the
analysis does not end there. Where such remarks are
accompanied by other exclusionary conduct — such as
deliberate ostracism, reassignment of duties, or a pattern
of dismissive behavior — the totality of circumstances may
support the claim even where individual incidents appear
minor. Id. at 559.
```

**On click "Verify" — issues appear with color-coded highlighting in the brief, linked to highlighted passages in the sources:**

1. **MISCHARACTERIZATION (Red)** — Brief says Torres "admitted that the alleged comments occurred only twice over a six-month period." Source shows she said two comments were made *directly to her*, but she also described "four or five more" overheard or made in meetings. The brief omits the additional incidents entirely, materially changing the characterization.

2. **SELECTIVE QUOTATION (Orange)** — Brief quotes "nobody ever said anything directly to her" but the full quote is "nobody ever said anything directly to me about my voter registration or anything, but the comments in meetings made it clear." The "but" clause — which shows she *did* experience hostile comments in a different form — is omitted.

3. **FACTUALLY INCORRECT (Red)** — Brief states Torres "never reported the incidents to Human Resources." The transcript at 112:3-8 says the opposite: "I went to HR. They said they would look into it." She reported to both her supervisor AND HR.

4. **MISLEADING CASE CITATION (Orange)** — Brief quotes Henderson for the proposition that "two or three stray remarks" are insufficient. But the opinion's *next sentence* says the analysis doesn't end there and lists additional factors (ostracism, exclusionary conduct) that may support the claim — which is exactly what Torres describes. The brief cites the first half of the court's reasoning while omitting the second half that arguably favors the plaintiff.

5. **MISCHARACTERIZATION (Red)** — Brief says supervisor "took immediate corrective action." The transcript says the supervisor said he would "talk to the people involved," Torres doesn't know if he did, and "the comments in meetings didn't really stop." This is the opposite of effective corrective action.

**Summary dashboard:**
- Factually Incorrect: 1
- Mischaracterizations: 2
- Selective Quotations: 1
- Misleading Citations: 1
- Verified Accurate: 0 of 4 factual claims

**"In Practice" callout box:**
> **Tools:** ClearBrief, Litera Check (brief analysis), Thomson Reuters Drafting Assistant. This is different from hallucination-checking (verifying that citations are real, which you practiced in Week 7). Here, every citation is to a real document — the question is whether the brief *accurately represents what the source says*. ClearBrief color-codes how closely brief language tracks the underlying evidence, highlights discrepancies, and works with deposition transcripts, case law, and the full record. In litigation, this is how partners verify associate work before signing a brief — and how opposing counsel prepares to call out misrepresentations at oral argument.

---

## Demo 7: PDF Redaction — Proper vs. Improper

**Card description:** "Think your redactions are hiding information? Think again."

**Scenario setup:**
- A professional-looking legal document (a court filing or discovery response) displayed in a PDF viewer style
- The document has several "redacted" passages — black rectangles covering text in multiple locations
- Context box at top: "This discovery response was produced by opposing counsel. The redacted portions supposedly contain privileged attorney-client communications. But the paralegal who prepared this used three different 'redaction' methods. Only one actually works."
- Button: "Test the Redactions"

**The document (a fictional discovery response, ~1 page):**

Shows a response to interrogatories with 4 redacted sections, each using a different (visually identical) method. All four black bars look the same to the naked eye.

**On click "Test the Redactions" — each redaction is tested one by one:**

**Redaction 1: Black highlight over text**
- Animation: cursor selects the "redacted" text, copies it, pastes into a text box below
- **EXPOSED:** "Internal analysis suggests our client's product caused the contamination. Recommend settling before discovery of the 2019 lab reports."
- **Method:** Someone used a black highlight or black font color on black background. The text is still there — it's just the same color as the background.
- **Red warning badge:** "FAIL — Text fully recoverable by copy/paste"

**Redaction 2: Black rectangle shape layered over text**
- Animation: the black rectangle is "grabbed" and dragged aside, revealing text underneath
- **EXPOSED:** "CEO was aware of the defect as early as March 2019 — see email chain attached as Exhibit 14."
- **Method:** Someone drew a black rectangle shape on top of the text. The shape is a separate layer — it can be moved, and the text underneath is untouched.
- **Red warning badge:** "FAIL — Text fully intact underneath shape layer"

**Redaction 3: Image flattening with recoverable text layer**
- Animation: shows the PDF being opened in a text extraction tool, which pulls the text from behind the visual redaction
- **EXPOSED:** "Settlement authority up to $2.5M approved by General Counsel on 4/12/2024."
- **Method:** The PDF was "printed to PDF" with black boxes, creating a flat image — but the original text layer from the source Word document was preserved. OCR isn't even needed; the text is embedded.
- **Red warning badge:** "FAIL — Original text layer preserved in PDF metadata"

**Redaction 4: Proper redaction (Adobe Acrobat Pro)**
- Animation: same tests attempted — copy/paste returns nothing, no layers to move, text extraction finds only "[REDACTED]" placeholder text
- **RESULT:** The text has been permanently removed from the file. The black bar is not covering anything — the content underneath has been destroyed and replaced.
- **Green badge:** "PASS — Content permanently removed"

**After all four tests, a side-by-side comparison:**

| Method | Looks Redacted? | Actually Redacted? | Recoverable By |
|---|---|---|---|
| Black highlight | Yes | No | Copy + paste |
| Shape overlay | Yes | No | Moving the shape |
| Print-to-PDF with text layer | Yes | No | Text extraction tool |
| Adobe Acrobat Redact tool | Yes | **Yes** | Nothing — content destroyed |

**"In Practice" callout box:**
> **Tools:** Adobe Acrobat Pro (Redact tool — not highlight, not draw), Redactable, Relativity Redaction. Every method above has caused real problems in real cases. Paul Manafort's attorneys filed a "redacted" brief in 2019 where the redactions were just black overlays — reporters copy-pasted the hidden text within minutes, revealing secret details of his cooperation with Russian operatives. The Northern District of Alabama has published specific guidance on proper redaction techniques. The only safe method permanently removes the underlying text from all layers of the PDF, including metadata. If you're producing redacted documents in discovery or filing under seal, verify with the Acrobat Redact tool — not highlight, not a shape, not "print to PDF." And always test your own redactions before producing.

---

## Technical Notes

- **No backend required** — all demos can run client-side with pre-built content
- **No API keys** — Demo 4's AI tab uses pre-computed before/after pairs, not live AI calls
- **Responsive** but laptop-optimized (students will use in class)
- **No login required**
- **Estimated build time:** These are simplified interactive demos, not production tools. The interactivity is mostly: show/hide content, swap text, highlight text, animate transitions.
- Demo 6 (Brief Verification) is the most complex — requires split-panel with linked highlighting between brief and source documents. Consider whether tab switching or side-by-side works better for the viewport.

## Suggested Tech
- Lovable, Replit, or similar vibe-coding platform
- Single page app (React or vanilla) with client-side routing
- Tailwind CSS or similar for clean styling

## LTC4 Alignment

This gallery maps to the LTC4 Document Competency framework (Reference PDFs/LTC4-DocumentCompetency.pdf) as follows:

| Demo | LTC4 Stage |
|---|---|
| Metadata Inspection & Scrubbing | Stage 6: Finalizing (metadata), Re-Using Documents (clearing prior matter info) |
| Document Automation | Stage 1: Planning (templates), Stage 3: Creating Content |
| Clause Library | Stage 2: Research (clause banks, model forms) |
| AI-Assisted Document Editing | Stage 5: Reviewing (editing for clarity, proofreading, consistency) |
| Contract Review & Issue Spotting | Stage 2: Research (reviewing legal authority) |
| Brief Verification | Stage 2: Research (validating cited authority, confirming quotes) |
| PDF Redaction | Stage 6: Finalizing (redaction, generating PDF for delivery) |
