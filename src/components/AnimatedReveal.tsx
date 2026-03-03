import { useEffect, useState } from 'react'

interface AnimatedRevealProps {
  show: boolean
  delay?: number
  children: React.ReactNode
}

export default function AnimatedReveal({ show, delay = 0, children }: AnimatedRevealProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setVisible(true), delay)
      return () => clearTimeout(timer)
    } else {
      setVisible(false)
    }
  }, [show, delay])

  return (
    <div
      className={`transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      {children}
    </div>
  )
}
