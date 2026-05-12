export interface Feature {
  id: number
  title: string
  description: string
  icon: string
  premium: boolean
}

export interface Plan {
  id: string
  name: string
  price: number
  period: 'monthly' | 'yearly'
  features: string[]
  highlighted: boolean
}

export interface Testimonial {
  id: number
  author: string
  role: string
  company: string
  avatar: string
  body: string
  rating: number
}

export interface NavLink {
  label: string
  path: string
}

export interface StatItem {
  label: string
  value: number
  suffix?: string
}
