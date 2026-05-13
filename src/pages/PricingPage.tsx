import { useState } from 'react'
import type { Plan } from '../types'
import { formatPrice, calculateYearlySavings } from '../utils/format'
import { useLocalStorage } from '../hooks/useLocalStorage'

const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 900,
    period: 'monthly',
    features: ['5 projects', '10GB storage', 'Community support', 'Basic analytics'],
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 2900,
    period: 'monthly',
    features: ['Unlimited projects', '100GB storage', 'Priority support', 'Advanced analytics', 'Custom domains', 'AI Insights'],
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 9900,
    period: 'monthly',
    features: ['Everything in Pro', 'SLA guarantee', 'Dedicated CSM', 'SSO / SAML', 'Data residency', 'Audit logs'],
    highlighted: false,
  },
]

interface PlanCardProps {
  plan: Plan
  yearly: boolean
  onSelect: (id: string) => void
  selected: boolean
}

function PlanCard({ plan, yearly, onSelect, selected }: PlanCardProps) {
  const displayPrice = yearly ? Math.round(plan.price * 0.8) : plan.price
  const savings = calculateYearlySavings(plan.price)

  return (
    <div className={`plan-card ${plan.highlighted ? 'plan-card--featured' : ''} ${selected ? 'plan-card--selected' : ''}`}>
      {plan.highlighted && <span className="plan-badge">Most Popular</span>}
      <h2 className="plan-name">{plan.name}</h2>
      <div className="plan-price">
        <span className="price-amount">{formatPrice(displayPrice)}</span>
        <span className="price-period">/ month</span>
      </div>
      {yearly && savings > 0 && (
        <p className="plan-savings">Save {formatPrice(savings * 100)} per year</p>
      )}
      <ul className="plan-features">
        {plan.features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
      <button
        className={`plan-cta ${plan.highlighted ? 'btn-primary' : 'btn-outline'}`}
        onClick={() => onSelect(plan.id)}
      >
        {selected ? 'Selected' : 'Choose Plan'}
      </button>
    </div>
  )
}

export default function PricingPage() {
  const [yearly, setYearly] = useState(false)
  const [selectedPlan, setSelectedPlan] = useLocalStorage<string | null>('selected-plan', null)

  return (
    <main className="pricing-page">
      <header className="page-header">
        <h1>Simple, transparent pricing</h1>
        <p>No hidden fees. Cancel any time.</p>
      </header>

      <div className="billing-toggle">
        <span className={!yearly ? 'toggle-label active' : 'toggle-label'}>Monthly</span>
        <button
          className={`toggle-switch ${yearly ? 'on' : ''}`}
          onClick={() => setYearly(prev => !prev)}
          aria-label="Toggle billing period"
        />
        <span className={yearly ? 'toggle-label active' : 'toggle-label'}>
          Yearly <em className="discount-tag">Save 20%</em>
        </span>
      </div>

      <div className="plans-grid">
        {PLANS.map(plan => (
          <PlanCard
            key={plan.id}
            plan={plan}
            yearly={yearly}
            selected={selectedPlan === plan.id}
            onSelect={setSelectedPlan}
          />
        ))}
      </div>
    </main>
  )
}
