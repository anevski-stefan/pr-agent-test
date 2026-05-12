import { useState, useMemo } from 'react'
import Card from '../components/Card'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useDebounce } from '../hooks/useDebounce'
import type { Feature } from '../types'

const ALL_FEATURES: Feature[] = [
  { id: 1, title: 'Edge Caching', description: 'Sub-10ms response times globally via 300+ PoPs.', icon: '⚡', premium: false },
  { id: 2, title: 'Auto Scaling', description: 'Handles traffic spikes without manual intervention.', icon: '📈', premium: false },
  { id: 3, title: 'AI Insights', description: 'Anomaly detection and smart alerting powered by ML.', icon: '🤖', premium: true },
  { id: 4, title: 'Audit Logs', description: 'Immutable, tamper-proof log trail for compliance.', icon: '🔐', premium: true },
  { id: 5, title: 'Custom Domains', description: 'Bring your own domain with automatic TLS.', icon: '🌐', premium: false },
  { id: 6, title: 'Webhooks', description: 'Real-time event delivery to any HTTP endpoint.', icon: '🔗', premium: false },
  { id: 7, title: 'Team Roles', description: 'Granular permissions across projects and environments.', icon: '👥', premium: true },
  { id: 8, title: 'Data Residency', description: 'Pin your data to specific geographic regions.', icon: '🗺️', premium: true },
]

function FeatureGrid({ features }: { features: Feature[] }) {
  const { ref, isVisible } = useIntersectionObserver(0.05)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`feature-grid ${isVisible ? 'visible' : ''}`}
    >
      {features.map(f => (
        <Card
          key={f.id}
          title={f.title}
          description={f.description}
          icon={f.icon}
          badge={f.premium ? 'Pro' : undefined}
          variant={f.premium ? 'highlighted' : 'default'}
        />
      ))}
    </div>
  )
}

export default function FeaturesPage() {
  const [search, setSearch] = useState('')
  const [showPremium, setShowPremium] = useState<boolean | null>(null)
  const debouncedSearch = useDebounce(search, 300)

  const filtered = useMemo(() => {
    return ALL_FEATURES.filter(f => {
      const matchesSearch =
        f.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        f.description.toLowerCase().includes(debouncedSearch)
      const matchesTier =
        showPremium === null ? true : f.premium === showPremium
      return matchesSearch && matchesTier
    })
  }, [debouncedSearch, showPremium])

  return (
    <main className="features-page">
      <header className="page-header">
        <h1>Features</h1>
        <p>Everything you need to build, ship, and scale.</p>
      </header>

      <div className="features-controls">
        <input
          type="search"
          placeholder="Search features..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
        <div className="filter-pills">
          <button
            className={`pill ${showPremium === null ? 'active' : ''}`}
            onClick={() => setShowPremium(null)}
          >
            All
          </button>
          <button
            className={`pill ${showPremium === false ? 'active' : ''}`}
            onClick={() => setShowPremium(false)}
          >
            Free
          </button>
          <button
            className={`pill ${showPremium === true ? 'active' : ''}`}
            onClick={() => setShowPremium(true)}
          >
            Pro
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">No features match your search.</p>
      ) : (
        <FeatureGrid features={filtered} />
      )}
    </main>
  )
}
