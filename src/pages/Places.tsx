import './Page.css'
import './Places.css'

// equirectangular projection onto a 200x100 grid — the same math is used for
// every place and every landmass box below, so they're guaranteed to line up
// (an earlier version hand-guessed both independently and they drifted apart)
function project(lat: number, lon: number) {
  return { x: ((lon + 180) / 360) * 200, y: ((90 - lat) / 180) * 100 }
}

type Place = { label: string; lat: number; lon: number }

const places: Place[] = [
  { label: 'Bay Area, California', lat: 37.77, lon: -122.42 },
  { label: 'Los Angeles', lat: 34.05, lon: -118.24 },
  { label: 'San Diego', lat: 32.72, lon: -117.16 },
  { label: 'Lake Tahoe', lat: 39.09, lon: -120.03 },
  { label: 'Reno, Nevada', lat: 39.53, lon: -119.81 },
  { label: 'Salt Lake City', lat: 40.76, lon: -111.89 },
  { label: 'Yellowstone', lat: 44.6, lon: -110.55 },
  { label: 'Bloomington, Indiana', lat: 39.17, lon: -86.53 },
  { label: 'Oahu, Hawaii', lat: 21.31, lon: -157.86 },
  { label: 'Maui, Hawaii', lat: 20.8, lon: -156.33 },
  { label: 'Vancouver, Canada', lat: 49.28, lon: -123.12 },
  { label: 'New York', lat: 40.71, lon: -74.01 },
  { label: 'Massachusetts', lat: 42.31, lon: -73.25 },
  { label: 'White Mountains, NH', lat: 44.27, lon: -71.3 },
  { label: 'London & Cambridge, UK', lat: 51.85, lon: 0.0 },
  { label: 'Shanghai, China (born here!)', lat: 31.23, lon: 121.47 },
  { label: 'Beijing, China', lat: 39.9, lon: 116.41 },
  { label: 'Hangzhou & Suzhou, China', lat: 30.79, lon: 120.39 },
  { label: 'Hong Kong', lat: 22.32, lon: 114.17 },
  { label: 'Harbin & Paektu Mountain, China', lat: 45.8, lon: 126.53 },
  { label: 'Tokyo, Japan', lat: 35.68, lon: 139.65 },
  { label: 'Jeju Island, Korea', lat: 33.5, lon: 126.53 },
  { label: 'Philippines', lat: 14.6, lon: 120.98 },
]

// rough real-world bounding boxes per landmass (lat/lon extents), projected
// through the same function as the dots above — an abstraction of where each
// continent is, not a coastline, but honestly aligned with the real dots
const landmasses = [
  { name: 'na', latRange: [24, 70] as const, lonRange: [-130, -60] as const },
  { name: 'sa', latRange: [-55, 12] as const, lonRange: [-82, -35] as const },
  { name: 'eu', latRange: [36, 60] as const, lonRange: [-10, 30] as const },
  { name: 'af', latRange: [-35, 37] as const, lonRange: [-18, 52] as const },
  { name: 'as', latRange: [5, 55] as const, lonRange: [45, 145] as const },
  { name: 'au', latRange: [-44, -10] as const, lonRange: [112, 154] as const },
]

function Places() {
  return (
    <div className="page">
      <section>
        <span className="label">places I've been</span>
        <h1>places I've been</h1>
        <p>
          so far it's really just East Asia, the US, Canada, and a bit of
          Europe · hoping for a lot more!
        </p>
        <p>will add pictures! :D</p>
      </section>

      <div className="world-map">
        <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
          <g className="continents">
            {landmasses.map((m) => {
              const topLeft = project(m.latRange[1], m.lonRange[0])
              const bottomRight = project(m.latRange[0], m.lonRange[1])
              return (
                <rect
                  key={m.name}
                  x={topLeft.x}
                  y={topLeft.y}
                  width={bottomRight.x - topLeft.x}
                  height={bottomRight.y - topLeft.y}
                  rx="10"
                />
              )
            })}
          </g>
          <g className="place-dots">
            {places.map((p) => {
              const { x, y } = project(p.lat, p.lon)
              return (
                <g key={p.label} className="place-dot">
                  <circle cx={x} cy={y} r="1.4" />
                  <text x={x} y={y - 3} textAnchor="middle">
                    {p.label}
                  </text>
                </g>
              )
            })}
          </g>
        </svg>
      </div>
    </div>
  )
}

export default Places
