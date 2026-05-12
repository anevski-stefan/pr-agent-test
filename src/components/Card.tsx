import type { ReactNode } from 'react'

interface CardProps {
  title: string
  description?: string
  icon?: string
  badge?: string
  onClick?: () => void
  children?: ReactNode
  variant?: 'default' | 'highlighted' | 'ghost'
}

export default function Card({
  title,
  description,
  icon,
  badge,
  onClick,
  children,
  variant = 'default',
}: CardProps) {
  return (
    <div
      className={`card card--${variant}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {badge && <span className="card-badge">{badge}</span>}
      {icon && <span className="card-icon">{icon}</span>}
      <h3 className="card-title">{title}</h3>
      {description && <p className="card-description">{description}</p>}
      {children}
    </div>
  )
}
