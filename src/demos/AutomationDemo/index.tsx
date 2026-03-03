import { useState } from 'react'
import DemoLayout from '../../components/DemoLayout'
import SplitPanel from '../../components/SplitPanel'
import {
  contextText,
  calloutText,
  clientTypes,
  states,
  nonCompeteDurations,
  paymentOptions,
  liabilityCapOptions,
  venueText,
  entityLanguage,
} from './data'

interface FormState {
  clientName: string
  clientType: string
  governingLaw: string
  includeNonCompete: boolean
  nonCompeteDuration: string
  paymentTerms: string
  includeLiability: boolean
  liabilityCap: string
}

const defaultForm: FormState = {
  clientName: '',
  clientType: 'Corporation',
  governingLaw: 'Ohio',
  includeNonCompete: false,
  nonCompeteDuration: '1 year',
  paymentTerms: 'Net 30',
  includeLiability: false,
  liabilityCap: 'Contract value',
}

function Variable({ value, placeholder }: { value: string; placeholder: string }) {
  if (value) {
    return (
      <span className="bg-yellow-100 transition-colors duration-300">{value}</span>
    )
  }
  return <span className="text-slate-400">{placeholder}</span>
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-slate-800' : 'bg-slate-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

export default function AutomationDemo() {
  const [form, setForm] = useState<FormState>(defaultForm)

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const todayStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Build entity language string
  const rawEntity = entityLanguage[form.clientType] ?? ''
  const entity = rawEntity.replace('{state}', form.governingLaw)

  // Dynamic section numbering
  let sectionNum = 2 // sections 1 and 2 are always present
  const nonCompeteNum = form.includeNonCompete ? ++sectionNum : null
  const liabilityNum = form.includeLiability ? ++sectionNum : null
  const governingLawNum = ++sectionNum
  const entireAgreementNum = ++sectionNum

  const selectClass =
    'w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400'
  const inputClass = selectClass

  const questionnaire = (
    <div className="space-y-4">
      {/* Client Name */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Client Name</label>
        <input
          type="text"
          className={inputClass}
          placeholder="Enter client name"
          value={form.clientName}
          onChange={e => update('clientName', e.target.value)}
        />
      </div>

      {/* Client Type */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Client Type</label>
        <select
          className={selectClass}
          value={form.clientType}
          onChange={e => update('clientType', e.target.value)}
        >
          {clientTypes.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Governing Law */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Governing Law</label>
        <select
          className={selectClass}
          value={form.governingLaw}
          onChange={e => update('governingLaw', e.target.value)}
        >
          {states.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Non-Compete Toggle */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">
          Include non-compete clause?
        </label>
        <Toggle
          checked={form.includeNonCompete}
          onChange={v => update('includeNonCompete', v)}
        />
      </div>

      {/* Non-Compete Duration — conditional */}
      {form.includeNonCompete && (
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Non-Compete Duration
          </label>
          <select
            className={selectClass}
            value={form.nonCompeteDuration}
            onChange={e => update('nonCompeteDuration', e.target.value)}
          >
            {nonCompeteDurations.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      )}

      {/* Payment Terms */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Payment Terms</label>
        <select
          className={selectClass}
          value={form.paymentTerms}
          onChange={e => update('paymentTerms', e.target.value)}
        >
          {paymentOptions.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Liability Toggle */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">
          Include limitation of liability?
        </label>
        <Toggle
          checked={form.includeLiability}
          onChange={v => update('includeLiability', v)}
        />
      </div>

      {/* Liability Cap — conditional */}
      {form.includeLiability && (
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Liability Cap</label>
          <select
            className={selectClass}
            value={form.liabilityCap}
            onChange={e => update('liabilityCap', e.target.value)}
          >
            {liabilityCapOptions.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  )

  const document = (
    <div
      className="bg-white border border-slate-200 rounded-lg shadow-lg p-8 text-sm leading-relaxed"
      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
    >
      <h2 className="text-center text-base font-bold tracking-wide mb-6" style={{ fontFamily: 'inherit' }}>
        CONSULTING AGREEMENT
      </h2>

      <p className="mb-4">
        This Consulting Agreement (&ldquo;Agreement&rdquo;) is entered into as of{' '}
        <Variable value={todayStr} placeholder="[Date]" /> by and between:
      </p>

      <p className="mb-4">
        <Variable value={form.clientName} placeholder="[Client Name]" /> (&ldquo;Client&rdquo;),{' '}
        {entity}
      </p>

      <p className="mb-6">
        and Buckeye Consulting Group LLC (&ldquo;Consultant&rdquo;), an Ohio limited liability company.
      </p>

      {/* Section 1 */}
      <p className="mb-4">
        <span className="font-bold">1. SERVICES.</span> Consultant shall provide professional
        consulting services as described in Exhibit A.
      </p>

      {/* Section 2 */}
      <p className="mb-4">
        <span className="font-bold">2. COMPENSATION.</span> Client shall pay Consultant according to
        the fee schedule in Exhibit B. Payment is due{' '}
        <Variable value={form.paymentTerms} placeholder="[Payment Terms]" />.
      </p>

      {/* Non-Compete — conditional */}
      <div
        className="transition-all duration-500 ease-in-out overflow-hidden"
        style={{
          maxHeight: form.includeNonCompete ? '500px' : '0',
          opacity: form.includeNonCompete ? 1 : 0,
        }}
      >
        <p className="mb-4">
          <span className="font-bold">{nonCompeteNum ?? ''}. NON-COMPETITION.</span> During the term
          of this Agreement and for a period of{' '}
          <Variable value={form.nonCompeteDuration} placeholder="[Duration]" /> following its
          termination, Client agrees not to engage any consultant who is then-currently providing
          services to Consultant for substantially similar services.
        </p>
      </div>

      {/* Liability — conditional */}
      <div
        className="transition-all duration-500 ease-in-out overflow-hidden"
        style={{
          maxHeight: form.includeLiability ? '500px' : '0',
          opacity: form.includeLiability ? 1 : 0,
        }}
      >
        <p className="mb-4">
          <span className="font-bold">{liabilityNum ?? ''}. LIMITATION OF LIABILITY.</span> In no
          event shall Consultant&rsquo;s total liability under this Agreement exceed{' '}
          <Variable value={form.liabilityCap} placeholder="[Liability Cap]" />. This limitation
          applies to all causes of action in the aggregate.
        </p>
      </div>

      {/* Governing Law */}
      <p className="mb-4">
        <span className="font-bold">{governingLawNum}. GOVERNING LAW.</span> This Agreement shall be
        governed by the laws of the State of{' '}
        <Variable value={form.governingLaw} placeholder="[State]" />.{' '}
        {venueText[form.governingLaw] ?? ''}
      </p>

      {/* Entire Agreement */}
      <p className="mb-6">
        <span className="font-bold">{entireAgreementNum}. ENTIRE AGREEMENT.</span> This Agreement
        constitutes the entire agreement between the parties and supersedes all prior negotiations and
        agreements.
      </p>

      {/* Signature block */}
      <p className="mb-2 mt-8">
        IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written
        above.
      </p>

      <div className="mt-8 flex justify-between text-xs">
        <div className="text-center">
          <div className="border-b border-slate-400 w-48 mb-1">&nbsp;</div>
          <div><Variable value={form.clientName} placeholder="[Client Name]" /></div>
          <div className="text-slate-500">Client</div>
        </div>
        <div className="text-center">
          <div className="border-b border-slate-400 w-48 mb-1">&nbsp;</div>
          <div>Buckeye Consulting Group LLC</div>
          <div className="text-slate-500">Consultant</div>
        </div>
      </div>
    </div>
  )

  return (
    <DemoLayout
      title="Document Automation"
      context={<span>{contextText}</span>}
      callout={
        <div>
          <p className="mb-2">
            <strong>Tools: </strong>{calloutText.tools}
          </p>
          <p>{calloutText.context}</p>
        </div>
      }
    >
      <SplitPanel left={questionnaire} right={document} />
    </DemoLayout>
  )
}
