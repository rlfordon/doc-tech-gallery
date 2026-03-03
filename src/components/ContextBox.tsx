interface ContextBoxProps {
  children: React.ReactNode
}

export default function ContextBox({ children }: ContextBoxProps) {
  return (
    <div className="bg-slate-100 border border-slate-200 rounded-lg p-4 mb-6 text-sm text-slate-700 italic">
      {children}
    </div>
  )
}
