interface SplitPanelProps {
  left: React.ReactNode
  right: React.ReactNode
}

export default function SplitPanel({ left, right }: SplitPanelProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2 min-w-0">{left}</div>
      <div className="w-full md:w-1/2 min-w-0">{right}</div>
    </div>
  )
}
