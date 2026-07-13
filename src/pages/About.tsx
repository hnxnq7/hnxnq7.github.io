import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Page.css'

const important = [
  { label: 'luna', to: '/luna' },
  { label: 'leo', to: '/leo' },
  { label: 'singing', to: '/singing' },
  { label: 'traveling', to: '/places' },
  { label: '🌌', to: '/north-star', hidden: true },
]

function About() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const toggle = (key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <div className="page">
      <div>
        <span className="label">about</span>
        <h1>hi, I'm Rachel!</h1>
        <p>I enjoy chasing interesting ideas, building things, and exploring the world.</p>
      </div>

      <div className="divider">
        <span className="divider-star">✦</span>
      </div>

      <section>
        <p>
          I'm currently studying CS & Math at MIT. I love fast-paced,
          challenging work, especially when it involves heavy collaboration
          with other people!
        </p>
        <p>
          Outside of that: I travel every chance I get, and I'm always down
          for an adventure or an unplanned side quest with friends :D
        </p>
      </section>

      <section>
        <button type="button" className="section-toggle" onClick={() => toggle('currently')}>
          <span className="label">currently</span>
          <span className="toggle-icon">{expanded.has('currently') ? '−' : '+'}</span>
        </button>
        {expanded.has('currently') && (
          <p>
            Right now I'm into formal verification, proving that code and
            programs actually does what it claims to. I'm especially excited
            about a future where agent written code from spec gets
            automatically checked by proof assistants, killing
            hallucination driven bugs before they ship, and where we can scale
            that kind of guarantee to systems that can't afford to be wrong.
            This would lead to a lot more trusted, spec-driven coding, where
            ideas become truly what matter most.
          </p>
        )}
      </section>

      <section>
        <button type="button" className="section-toggle" onClick={() => toggle('generally')}>
          <span className="label">generally</span>
          <span className="toggle-icon">{expanded.has('generally') ? '−' : '+'}</span>
        </button>
        {expanded.has('generally') && (
          <p>
            I love meeting people who are building things they're excited
            about! in all kinds of fields.
          </p>
        )}
      </section>

      <section>
        <span className="label emoji-label">💌</span>
        <ul className="important-list">
          {important.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={item.hidden ? 'hidden-link' : undefined}
                aria-label={item.hidden ? 'a more personal page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="contact-section">
        <p className="contact">
          <a href="https://www.linkedin.com/in/rachel-li-063262248/" target="_blank" rel="noreferrer">
            linkedin
          </a>
          {' · '}
          <a href="https://github.com/hnxnq7" target="_blank" rel="noreferrer">
            github
          </a>
          {' · '}
          lirachel at mit dot edu
        </p>
      </section>
    </div>
  )
}

export default About
