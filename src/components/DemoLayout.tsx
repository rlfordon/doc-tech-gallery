import { Link } from 'react-router-dom'
import ContextBox from './ContextBox'
import CalloutBox from './CalloutBox'

interface DemoLayoutProps {
  title: string
  context: React.ReactNode
  callout: React.ReactNode
  children: React.ReactNode
}

export default function DemoLayout({ title, context, callout, children }: DemoLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-200 px-6 py-3">
        <Link to="/" className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1">
          <span>&larr;</span> Back to Gallery
        </Link>
      </nav>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">{title}</h1>
        <ContextBox>{context}</ContextBox>
        {children}
        <CalloutBox>{callout}</CalloutBox>
      </div>
    </div>
  )
}
