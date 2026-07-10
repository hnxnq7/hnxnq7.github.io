import './Page.css'
import './Built.css'

type Entry = {
  date: string
  title: string
  blurb: string
  tag: string
  href?: string
  paperHref?: string
  repoHref?: string
}

const entries: Entry[] = [
  {
    date: '2026 – now',
    title: 'Formal Verification of Montgomery Ladder Security',
    blurb:
      "An ongoing mechanized proof in Rocq of security properties for Curve25519's Montgomery ladder, pursued along three fronts: proving the constant-time CSwap implementation is behaviorally equivalent to the branching version, proving a dual-circuit hardware model leaks no information through the Hamming-weight power side-channel, and building a probabilistic ensemble model showing that masking a secret register with a random value makes power leakage provably independent of the secret.",
    tag: 'formal verification',
  },
  {
    date: '2026',
    title: 'NeuroCLIP + LATA',
    blurb:
      "Audited whether EEG-to-video decoding models are learning real brain signals or just exploiting benchmark quirks, with Emma Wang and Winston Qian. Built NeuroCLIP to test which visual concepts are actually decodable from EEG (action-rich scenes beat passive ones by a wide margin), and LATA, which learned a consistent ~790ms neural response delay across all 20 subjects, never zero.",
    tag: 'research',
    href: 'https://hnxnq7.github.io/mmai/',
    paperHref: 'https://hnxnq7.github.io/mmai/project/MMAI_Project_Final.pdf',
    repoHref: 'https://github.com/winstonqian/EEG2Video',
  },
  {
    date: '2025 – 2026',
    title: 'smartSTAT',
    blurb:
      "A hospital medication-inventory dashboard that pairs real-time restock recommendations with a LightGBM demand-forecasting pipeline. Ran 14+ rounds of sensitivity sweeps against realistic supply-chain constraints (stockouts, expiration, lead time) to get the ordering policy actually right, not just plausible-looking.",
    tag: 'ml',
    href: 'https://hnxnq7.github.io/smartSTAT-ai-rec/',
    repoHref: 'https://github.com/hnxnq7/smartSTAT-ai-rec',
  },
  {
    date: '2023',
    title: 'Automated EEG Analysis for Smart Home Control',
    blurb:
      "Trained an LSTM to translate raw motor-imagery EEG straight into smart home commands (up, down, left, right, enter, return) from a 16-channel headset, hitting 90.54% accuracy and beating 36 of 38 AutoML baselines. Presented at ACSEF 2023.",
    tag: 'research',
  },
]

function Built() {
  return (
    <div className="page">
      <section>
        <span className="label">fun things I've built</span>
        <h1>fun things I've built</h1>
        <p>A running log of stuff I've built or vibe coded!</p>
        <p>(to be added!)</p>
      </section>

      {entries.length === 0 ? (
        <div className="built-empty">
          <p>entries coming soon</p>
        </div>
      ) : (
        <ul className="built-list">
          {entries.map((entry) => (
            <li key={entry.title} className="built-entry">
              <div className="built-date">{entry.date}</div>
              <div className="built-body">
                <span className="built-title">{entry.title}</span>
                <p>{entry.blurb}</p>
                <div className="built-meta">
                  <span className="built-tag">{entry.tag}</span>
                  {entry.href && (
                    <a href={entry.href} className="built-link" target="_blank" rel="noreferrer">
                      demo
                    </a>
                  )}
                  {entry.paperHref && (
                    <a href={entry.paperHref} className="built-link" target="_blank" rel="noreferrer">
                      paper
                    </a>
                  )}
                  {entry.repoHref && (
                    <a href={entry.repoHref} className="built-link" target="_blank" rel="noreferrer">
                      repo
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Built
