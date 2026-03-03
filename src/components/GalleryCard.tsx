import { Link } from 'react-router-dom'

interface GalleryCardProps {
  icon: string
  title: string
  description: string
  path: string
  time: string
}

export default function GalleryCard({ icon, title, description, path, time }: GalleryCardProps) {
  return (
    <Link
      to={path}
      className="block bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-600 mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">{time}</span>
        <span className="text-sm font-medium text-blue-600 hover:text-blue-700">Try it &rarr;</span>
      </div>
    </Link>
  )
}
