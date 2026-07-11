import { useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from '../theme'
import Constellations from './Constellations'
import './Page.css'
import './Journey.css'

type Category = 'experiences' | 'education' | 'travelling' | 'volunteering' | 'life' | 'quests'

// 'life' has no filter button — it's always shown, not toggleable
const FILTERS: Category[] = ['experiences', 'education', 'travelling', 'volunteering']
const DEFAULT_OFF: Category[] = ['travelling']
const ALWAYS_ON: Category[] = ['life']
const FADE_OUT_MS = 400

type Entry = {
  id: string
  title: string
  org: string
  url?: string
  subOrg?: string
  subOrgUrl?: string
  employment?: string
  start: string
  end: string | 'present'
  durationLabel?: string
  location?: string
  blurb?: string
  category: Category
}

const BORN = '2007-07-12'
const BORN_LOCATION = 'Shanghai, China'

// real placeholder data, blurbs kept for a future clickable popup, not rendered inline yet
const entries: Entry[] = [
  {
    id: 'axiom',
    title: 'Research Engineer Intern',
    org: 'Axiom',
    url: 'https://axiommath.ai/',
    employment: 'Full-time',
    start: '2026-05',
    end: 'present',
    durationLabel: '3 mos',
    category: 'experiences',
  },
  {
    id: 'csail',
    title: 'Undergraduate Student Researcher',
    org: 'MIT CSAIL',
    url: 'https://csail.mit.edu/',
    subOrg: 'Programming Language & Verification',
    subOrgUrl: 'http://plv.csail.mit.edu/',
    employment: 'Part-time',
    start: '2025-10',
    end: 'present',
    durationLabel: '10 mos',
    blurb: 'Undergraduate research (UROP) in Programming Language & Verification Group under Professor Adam Chlipala.',
    category: 'experiences',
  },
  {
    id: 'unsloth',
    title: 'Machine Learning Engineer',
    org: 'Unsloth AI',
    url: 'https://unsloth.ai/',
    employment: 'Internship',
    start: '2025-12',
    end: '2026-02',
    durationLabel: '3 mos',
    blurb: 'Built distributed multi GPU (DDP) training workflows for LLMs, designed telemetry pipelines for performance monitoring, and contributed to enabling AMD GPU (ROCm) support by resolving cross stack issues across PyTorch, Triton, and Transformers.',
    category: 'experiences',
  },
  {
    id: 'jane-street',
    title: 'Jane Street WiSE Program Participant',
    org: 'Jane Street',
    url: 'https://www.janestreet.com/',
    start: '2025-07',
    end: '2025-07',
    durationLabel: '1 mo',
    location: 'New York, United States',
    category: 'experiences',
  },
  {
    id: 'ross',
    title: 'Student at the Ross Mathematics Program',
    org: 'The Ross Mathematics Program',
    url: 'https://rossprogram.org/',
    start: '2024-06',
    end: '2024-07',
    durationLabel: '2 mos',
    blurb: 'Studied number theory, focusing on rigorous proofs from axioms to quadratic reciprocity and its applications. Attended advanced lectures in functional analysis, translation surface, and machine learning. Co authored a proof based paper on the FTA.',
    category: 'education',
  },
  {
    id: 'alphastar',
    title: 'Problem Writer at AlphaStar Academy',
    org: 'AlphaStar Academy',
    url: 'https://alphastar.academy/',
    start: '2023-12',
    end: '2023-12',
    durationLabel: '1 mo',
    blurb: 'Wrote problems for AMC series mock exams and local math competitions such as PiMC on topics algebra, geometry, combinatorics, and number theory spanning from AMC8 to AIME difficulty.',
    category: 'experiences',
  },
  {
    id: 'mit',
    title: 'CS & Math',
    org: 'MIT',
    url: 'https://www.mit.edu/',
    start: '2025-08',
    end: 'present',
    category: 'education',
  },
  {
    id: 'msjhs',
    title: 'Student',
    org: 'Mission San Jose High School',
    url: 'https://fremontunified.org/msjhs/',
    start: '2021-08',
    end: '2025-05',
    category: 'education',
  },
  {
    id: 'youth4good',
    title: 'Co-President',
    org: 'Youth4Good, Non-profit',
    url: 'https://www.youth4good.us/',
    start: '2021-05',
    end: '2025-05',
    durationLabel: '4 yrs 1 mo',
    category: 'volunteering',
  },
  {
    id: 'futurebridge',
    title: 'President of ASPiRE',
    org: 'FutureBridge',
    url: 'https://thefuturebridge.org/',
    start: '2023-04',
    end: '2025-06',
    durationLabel: '2 yrs 3 mos',
    category: 'volunteering',
  },
  {
    id: 'integirls',
    title: 'Problem Writer',
    org: 'INTEGIRLS',
    url: 'https://www.integirls.org/',
    start: '2024-03',
    end: '2025-05',
    durationLabel: '1 yr 3 mos',
    category: 'volunteering',
  },
  {
    id: 'moved-bay-area',
    title: 'moved',
    org: 'Bay Area, California',
    start: '2018-08',
    end: '2018-08',
    category: 'life',
  },
  {
    id: 'trip-la-2026',
    title: 'Trip',
    org: 'Los Angeles',
    start: '2026-07',
    end: '2026-07',
    category: 'travelling',
  },
  {
    id: 'trip-lee',
    title: 'Cabin trip with friends',
    org: 'Lee, Massachusetts',
    start: '2026-02',
    end: '2026-03',
    category: 'travelling',
  },
  {
    id: 'trip-maui',
    title: 'Trip',
    org: 'Maui, Hawaii',
    start: '2025-12',
    end: '2025-12',
    category: 'travelling',
  },
  {
    id: 'trip-white-mountains',
    title: 'Backpacking trip',
    org: 'White Mountains, New Hampshire',
    start: '2025-11',
    end: '2025-11',
    category: 'travelling',
  },
  {
    id: 'trip-tokyo',
    title: 'Trip',
    org: 'Tokyo',
    location: 'Japan',
    start: '2025-07',
    end: '2025-07',
    category: 'travelling',
  },
  {
    id: 'trip-china',
    title: 'Trip',
    org: 'Shanghai, Beijing, Hangzhou, Suzhou & Hong Kong',
    location: 'China',
    start: '2025-06',
    end: '2025-06',
    category: 'travelling',
  },
  {
    id: 'trip-uk',
    title: 'Trip',
    org: 'London & Cambridge',
    location: 'UK',
    start: '2025-03',
    end: '2025-03',
    category: 'travelling',
  },
  {
    id: 'trip-vancouver',
    title: 'Trip',
    org: 'Vancouver',
    location: 'Canada',
    start: '2024-12',
    end: '2024-12',
    category: 'travelling',
  },
  {
    id: 'trip-oahu',
    title: 'Trip',
    org: 'Oahu, Hawaii',
    start: '2022-11',
    end: '2022-11',
    category: 'travelling',
  },
  {
    id: 'trip-east-coast',
    title: 'Trip',
    org: 'East Coast',
    start: '2022-07',
    end: '2022-07',
    category: 'travelling',
  },
  {
    id: 'trip-la-2021',
    title: 'Trip',
    org: 'Los Angeles',
    start: '2021-12',
    end: '2021-12',
    category: 'travelling',
  },
  {
    id: 'trip-tahoe',
    title: 'Trip',
    org: 'Lake Tahoe',
    start: '2021-11',
    end: '2021-11',
    category: 'travelling',
  },
  {
    id: 'trip-yellowstone',
    title: 'Trip',
    org: 'Yellowstone',
    start: '2019-07',
    end: '2019-07',
    category: 'travelling',
  },
  {
    id: 'trip-salt-lake-city',
    title: 'Trip',
    org: 'Salt Lake City',
    start: '2018-12',
    end: '2018-12',
    category: 'travelling',
  },
  {
    id: 'trip-socal-roadtrip',
    title: 'Trip',
    org: 'SoCal Road Trip',
    start: '2018-11',
    end: '2018-11',
    category: 'travelling',
  },
  {
    id: 'trip-la-sd-bayarea',
    title: 'Trip',
    org: 'Los Angeles, San Diego & Bay Area',
    start: '2015-07',
    end: '2015-08',
    category: 'travelling',
  },
  {
    id: 'trip-philippines',
    title: 'Trip',
    org: 'Philippines',
    start: '2015-02',
    end: '2015-02',
    category: 'travelling',
  },
  {
    id: 'trip-harbin-paektu',
    title: 'Trip',
    org: 'Harbin & Paektu Mountain',
    location: 'China',
    start: '2015-01',
    end: '2015-01',
    category: 'travelling',
  },
  {
    id: 'trip-jeju',
    title: 'Trip',
    org: 'Jeju Island',
    location: 'Korea',
    start: '2014-08',
    end: '2014-08',
    category: 'travelling',
  },
  {
    id: 'trip-tokyo-2014',
    title: 'Trip',
    org: 'Tokyo',
    location: 'Japan',
    start: '2014-07',
    end: '2014-07',
    category: 'travelling',
  },
]

function monthIndexFromStr(s: string) {
  const [y, m] = s.split('-').map(Number)
  return y * 12 + (m - 1)
}

function monthIndexFromDate(d: Date) {
  return d.getFullYear() * 12 + d.getMonth()
}

function formatMonth(s: string) {
  const [y, m] = s.split('-').map(Number)
  const names = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
  return `${names[m - 1]} ${y}`
}

function formatRange(entry: Entry) {
  const endLabel = entry.end === 'present' ? 'now' : formatMonth(entry.end)
  if (entry.start === entry.end) return formatMonth(entry.start)
  return `${formatMonth(entry.start)} – ${endLabel}`
}

const NOW_PAD = 55
const GAP_HEIGHT = 160
const BORN_PAD = 30

// fixed pixels-per-month density: adding entries further back in time only
// extends the timeline downward, it never re-compresses entries already on
// it (unlike a fixed total-height model, where widening the date range
// shrinks everyone else's spacing to fit)
const PIXELS_PER_MONTH = 47

// long stretches with nothing logged (e.g. a multi-year gap) count for less
// pixel-space than their real calendar length, so one sparse period can't
// dominate the timeline — capped, not deleted, so the gap is still visible
const MAX_GAP_MONTHS = 18

const now = new Date()
const nowIdx = monthIndexFromDate(now)
const bornIdx = monthIndexFromStr(BORN.slice(0, 7))

// side is assigned once from the full chronological order of every entry (not
// just the currently-visible ones), so toggling a filter never flips an entry
// from one side of the spine to the other — only the vertical spacing changes
const GLOBAL_SIDE_BY_ID = new Map<string, 'left' | 'right'>()
;[...entries]
  .sort((a, b) => monthIndexFromStr(a.start) - monthIndexFromStr(b.start))
  .forEach((entry, i) => GLOBAL_SIDE_BY_ID.set(entry.id, i % 2 === 0 ? 'right' : 'left'))

const bgDots = [
  { top: 30, left: 12 },
  { top: 220, left: 82 },
  { top: 430, left: 25 },
  { top: 640, left: 90 },
  { top: 850, left: 15 },
  { top: 1060, left: 70 },
  { top: 1270, left: 55 },
  { top: 1480, left: 45 },
  { top: 1690, left: 30 },
  { top: 1900, left: 65 },
  { top: 2050, left: 40 },
]

function Journey() {
  const { theme, setTheme } = useTheme()
  const [active, setActive] = useState<Set<Category>>(
    new Set(FILTERS.filter((f) => !DEFAULT_OFF.includes(f)))
  )

  useEffect(() => {
    setTheme('night')
  }, [setTheme])

  const toggleFilter = (cat: Category) => {
    setActive((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
  }

  // a category toggled off keeps rendering (with a fade-out class) for
  // FADE_OUT_MS before actually leaving `visible` — otherwise entries would
  // just vanish instantly with no way to animate their disappearance
  const [justHidden, setJustHidden] = useState<Set<Category>>(new Set())
  const prevActiveRef = useRef(active)
  useEffect(() => {
    const prevActive = prevActiveRef.current
    const newlyHidden = FILTERS.filter((c) => prevActive.has(c) && !active.has(c))
    if (newlyHidden.length > 0) {
      setJustHidden((prev) => {
        const next = new Set(prev)
        newlyHidden.forEach((c) => next.add(c))
        return next
      })
    }
    const timers = newlyHidden.map((c) =>
      setTimeout(() => {
        setJustHidden((prev) => {
          const next = new Set(prev)
          next.delete(c)
          return next
        })
      }, FADE_OUT_MS)
    )
    prevActiveRef.current = active
    return () => timers.forEach(clearTimeout)
  }, [active])

  // scale is recomputed from only the visible entries: toggling on a category
  // that reaches further back in time extends the timeline further down, but
  // never changes the spacing of entries already on it (fixed px-per-month)
  const { visible, bornTop, containerHeight, sideById, labelTopById } = useMemo(() => {
    const visible = entries.filter(
      (e) => active.has(e.category) || justHidden.has(e.category) || ALWAYS_ON.includes(e.category)
    )
    const starts = visible.length > 0 ? visible.map((e) => monthIndexFromStr(e.start)) : [bornIdx]
    const baseIdx = Math.min(...starts)

    // build a compressed time axis: every month-index actually used by a
    // visible entry (or "now"/the earliest one) gets a cumulative "effective"
    // position, where each gap between consecutive instants is capped at
    // MAX_GAP_MONTHS before being added up
    const instants = new Set<number>([baseIdx, nowIdx])
    visible.forEach((e) => {
      instants.add(monthIndexFromStr(e.start))
      instants.add(e.end === 'present' ? nowIdx : monthIndexFromStr(e.end))
    })
    const sortedInstants = [...instants].sort((a, b) => a - b)
    const effectiveByIdx = new Map<number, number>([[sortedInstants[0], 0]])
    let cumulative = 0
    for (let i = 1; i < sortedInstants.length; i++) {
      cumulative += Math.min(sortedInstants[i] - sortedInstants[i - 1], MAX_GAP_MONTHS)
      effectiveByIdx.set(sortedInstants[i], cumulative)
    }
    const totalEffectiveMonths = Math.max(cumulative, 1)
    const activeHeight = totalEffectiveMonths * PIXELS_PER_MONTH

    const bornTop = NOW_PAD + activeHeight + GAP_HEIGHT
    const containerHeight = bornTop + BORN_PAD

    const topForIdx = (idx: number) => {
      const frac = (effectiveByIdx.get(idx) ?? 0) / totalEffectiveMonths
      return NOW_PAD + (1 - frac) * activeHeight
    }

    const positioned = visible.map((entry) => {
      const startIdx = monthIndexFromStr(entry.start)
      const endIdx = entry.end === 'present' ? nowIdx : monthIndexFromStr(entry.end)
      return { entry, topStart: topForIdx(startIdx), topEnd: topForIdx(endIdx) }
    })

    const sideById = GLOBAL_SIDE_BY_ID
    const sortedByTop = [...positioned].sort((a, b) => a.topStart - b.topStart)

    // entries close together in time land on the same vertical stretch of the
    // timeline, so their text labels can overlap even though their dots don't —
    // push same-side labels down (never up) to clear the previous label's actual
    // rendered height, while the dot and duration segment stay on the true
    // chronological position
    const estimateLabelHeight = (entry: Entry) => {
      let h = 16 + 16 + 6 // date line + org line + margins
      h += entry.subOrg ? 36 : 18 // title wraps to 2 lines when a subOrg is shown
      if (entry.location) h += 14
      return h
    }
    const LABEL_GAP = 20
    const lastLabelBottomBySide: Record<'left' | 'right', number> = { left: -Infinity, right: -Infinity }
    const labelTopById = new Map<string, number>()
    sortedByTop.forEach((p) => {
      const side = sideById.get(p.entry.id)!
      const labelTop = Math.max(p.topStart, lastLabelBottomBySide[side])
      labelTopById.set(p.entry.id, labelTop)
      lastLabelBottomBySide[side] = labelTop + estimateLabelHeight(p.entry) + LABEL_GAP
    })

    return { visible: positioned, bornTop, containerHeight, sideById, labelTopById }
  }, [active, justHidden])

  return (
    <div className="page journey-page">
      <span className="label">journey</span>

      <div className="filters">
        {FILTERS.map((cat) => (
          <button
            key={cat}
            type="button"
            className={active.has(cat) ? 'filter-btn active' : 'filter-btn'}
            onClick={() => toggleFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {theme === 'night' && (
        <>
          {bgDots.map((dot, i) => (
            <span key={i} className="bg-dot" style={{ top: dot.top, left: dot.left }} />
          ))}
          <Constellations />
        </>
      )}

      <div className="timeline" style={{ height: containerHeight }}>
        <div className="line" />

        <div className="tl-anchor" style={{ top: 0 }}>
          <div className="dot" />
          <div className="desc">now</div>
        </div>

        {visible.map(({ entry, topStart, topEnd }) => {
          const segTop = Math.min(topStart, topEnd) - topStart
          const segHeight = Math.max(Math.abs(topStart - topEnd), 2)
          const onRight = sideById.get(entry.id) === 'right'
          const labelOffset = (labelTopById.get(entry.id) ?? topStart) - topStart
          const content = (
            <>
              <div className="date">{formatRange(entry)}</div>
              <div className={entry.category === 'travelling' ? 'entry-title trip-title' : 'entry-title'}>
                {entry.url ? (
                  <a href={entry.url} target="_blank" rel="noreferrer">
                    {entry.org}
                  </a>
                ) : (
                  entry.org
                )}
                {entry.subOrg && (
                  <>
                    {' · '}
                    {entry.subOrgUrl ? (
                      <a href={entry.subOrgUrl} target="_blank" rel="noreferrer">
                        {entry.subOrg}
                      </a>
                    ) : (
                      entry.subOrg
                    )}
                  </>
                )}
              </div>
              <div className="entry-org">
                {entry.title}
                {entry.employment ? ` · ${entry.employment}` : ''}
              </div>
              {entry.location && <div className="entry-location">{entry.location}</div>}
            </>
          )
          const isLeaving = !active.has(entry.category) && !ALWAYS_ON.includes(entry.category)
          return (
            <div
              className={`tl-item ${onRight ? 'right' : 'left'}${isLeaving ? ' leaving' : ''}`}
              style={{ top: topStart }}
              key={entry.id}
            >
              <div className="segment" style={{ top: segTop, height: segHeight }} />
              <div className="dot" />
              {labelOffset > 4 && <div className="leader" style={{ height: labelOffset }} />}
              <div className="side" style={{ top: labelOffset }}>{content}</div>
            </div>
          )
        })}

        <div className="tl-anchor" style={{ top: bornTop }}>
          <div className="dot" />
          <div className="date">{BORN}</div>
          <div className="desc">born</div>
          <div className="entry-location">{BORN_LOCATION}</div>
        </div>
      </div>
    </div>
  )
}

export default Journey
