import type { Testimonial } from '../types'
import { getInitials, truncate } from '../utils/format'

interface Props {
  testimonial: Testimonial
  compact?: boolean
}

const STAR = '★'
const EMPTY_STAR = '☆'

export default function TestimonialCard({ testimonial, compact = false }: Props) {
  const stars = Array.from({ length: 5 }, (_, i) =>
    i < testimonial.rating ? STAR : EMPTY_STAR
  )

  const bodyText = compact ? truncate(testimonial.body, 80) : testimonial.body

  return (
    <div className="testimonial-card">
      <div className="testimonial-stars">{stars.join('')}</div>
      <blockquote className="testimonial-body">"{bodyText}"</blockquote>
      <div className="testimonial-author">
        <div className="author-avatar">
          {testimonial.avatar ? (
            <img src={testimonial.avatar} alt={testimonial.author} />
          ) : (
            <span>{getInitials(testimonial.author)}</span>
          )}
        </div>
        <div className="author-meta">
          <strong>{testimonial.author}</strong>
          <span>{testimonial.role} at {testimonial.company}</span>
        </div>
      </div>
    </div>
  )
}
