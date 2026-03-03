interface CalloutBoxProps {
  children: React.ReactNode
}

export default function CalloutBox({ children }: CalloutBoxProps) {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-5 mt-8">
      <div className="flex items-start gap-3">
        <span className="text-blue-500 text-xl mt-0.5">&#9881;</span>
        <div>
          <h4 className="font-semibold text-blue-900 mb-2">In Practice</h4>
          <div className="text-sm text-blue-800 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}
