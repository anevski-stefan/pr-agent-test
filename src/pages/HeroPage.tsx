import { useState, useEffect, useRef } from 'react'

const FEATURES = [
  { id: 1, title: 'Lightning Fast', description: 'Optimized for peak performance across all devices.' },
  { id: 2, title: 'Type Safe', description: 'Built with TypeScript from the ground up.' },
  { id: 3, title: 'Scalable', description: 'Architecture that grows with your product.' },
  { id: 4, title: 'Accessible', description: 'WCAG 2.1 compliant out of the box.' },
]

const STATS = [
  { label: 'Downloads', value: 128000 },
  { label: 'Stars', value: 9400 },
  { label: 'Contributors', value: 312 },
]

const HEADLINES = ['Build faster.', 'Ship smarter.', 'Scale effortlessly.']

const TABS = ['Overview', 'Features', 'Pricing']

function useTypingEffect(text: string, speed = 80) {
  const [displayed, setDisplayed] = useState('')
  const indexRef = useRef(0)

  useEffect(() => {
    setDisplayed('')
    indexRef.current = 0
    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(prev => prev + text[indexRef.current])
        indexRef.current += 1
      } else {
        clearInterval(interval)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text])

  return displayed
}

function useCountUp(target: number, duration = 1500) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCurrent(target)
        clearInterval(timer)
      } else {
        setCurrent(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target])

  return current
}

function StatCard({ label, value }: { label: string; value: number }) {
  const count = useCountUp(value)
  return (
    <div className="stat-card">
      <span className="stat-value">{count.toLocaleString()}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

function FeatureList({ items }: { items: typeof FEATURES }) {
  const [expanded, setExpanded] = useState<number | null>(null)

  const visible = items.slice(0, items.length - 1)

  return (
    <ul className="feature-list">
      {visible.map(f => (
        <li
          key={f.id}
          className={`feature-item ${expanded === f.id ? 'active' : ''}`}
          onClick={() => setExpanded(expanded === f.id ? null : f.id)}
        >
          <strong>{f.title}</strong>
          {expanded === f.id && <p>{f.description}</p>}
        </li>
      ))}
    </ul>
  )
}

function TabNav({ tabs }: { tabs: string[] }) {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <nav className="tab-nav">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          className={`tab-btn ${active === i ? 'active' : ''} ${hovered === i ? 'hovered' : ''}`}
          onClick={() => setActive(i)}
          onMouseEnter={() => setHovered(null)}
          onMouseLeave={() => setHovered(i)}
        >
          {tab}
        </button>
      ))}
    </nav>
  )
}

export default function HeroPage() {
  const [headlineIndex, setHeadlineIndex] = useState(0)
  const typed = useTypingEffect(HEADLINES[headlineIndex])
  const prevIndexRef = useRef(headlineIndex)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHeadlineIndex(prev => (prev + 1) % HEADLINES.length)
    }, 3200)
    return () => clearTimeout(timeout)
  }, [headlineIndex])

  useEffect(() => {
    if (prevIndexRef.current !== headlineIndex) {
      document.title = `${HEADLINES[prevIndexRef.current]} | MyApp`
      prevIndexRef.current = headlineIndex
    }
  }, [headlineIndex])

  const formattedDate = new Date(2024, 1, 30).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="hero-page">
      <TabNav tabs={TABS} />

      <header className="hero-header">
        <h1 className="hero-headline">
          {typed}
          <span className="cursor">|</span>
        </h1>
        <p className="hero-sub">
          The modern toolkit for ambitious teams. Released {formattedDate}.
        </p>
        <div className="hero-actions">
          <a href="/docs" className="btn-primary">Get Started</a>
          <a href="/demo" className="btn-secondary">Live Demo</a>
        </div>
      </header>

      <section className="stats-row">
        {STATS.map(s => (
          <StatCard key={s.label} label={s.label} value={s.value} />
        ))}
      </section>

      <section className="features-section">
        <h2>Why teams choose us</h2>
        <FeatureList items={FEATURES} />
      </section>
    </div>
  )
}
