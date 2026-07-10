import './Constellations.css'

type StarPoint = { x: number; y: number; r: number; o: number }
type Edge = [number, number]

function StarShape({
  points,
  edges,
  color,
}: {
  points: StarPoint[]
  edges: Edge[]
  color: string
}) {
  return (
    <svg viewBox="0 0 100 100" width="340" height="340">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={points[a].x}
          y1={points[a].y}
          x2={points[b].x}
          y2={points[b].y}
          stroke={color}
          strokeWidth="0.15"
          opacity="0.08"
        />
      ))}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={color} opacity={p.o} />
      ))}
    </svg>
  )
}

// leo: sickle head + hindquarter triangle, since Leo is also a cat's name :)
const leo: StarPoint[] = [
  { x: 15, y: 12, r: 0.42, o: 0.5 },
  { x: 10, y: 28, r: 0.28, o: 0.35 },
  { x: 16, y: 44, r: 0.55, o: 0.6 },
  { x: 46, y: 46, r: 0.32, o: 0.4 },
  { x: 76, y: 36, r: 0.48, o: 0.55 },
  { x: 46, y: 60, r: 0.3, o: 0.38 },
]
const leoEdges: Edge[] = [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5], [5, 4]]

const cassiopeia: StarPoint[] = [
  { x: 10, y: 55, r: 0.32, o: 0.42 },
  { x: 30, y: 25, r: 0.5, o: 0.58 },
  { x: 50, y: 50, r: 0.28, o: 0.35 },
  { x: 70, y: 20, r: 0.45, o: 0.52 },
  { x: 90, y: 45, r: 0.32, o: 0.4 },
]
const cassiopeiaEdges: Edge[] = [[0, 1], [1, 2], [2, 3], [3, 4]]

// cancer: a little crab, body with two claws and four legs
const cancer: StarPoint[] = [
  { x: 50, y: 50, r: 0.55, o: 0.6 },
  { x: 30, y: 35, r: 0.3, o: 0.38 },
  { x: 18, y: 20, r: 0.4, o: 0.48 },
  { x: 70, y: 35, r: 0.28, o: 0.35 },
  { x: 82, y: 20, r: 0.45, o: 0.52 },
  { x: 35, y: 65, r: 0.3, o: 0.38 },
  { x: 25, y: 80, r: 0.36, o: 0.45 },
  { x: 65, y: 65, r: 0.28, o: 0.35 },
  { x: 75, y: 80, r: 0.42, o: 0.5 },
]
const cancerEdges: Edge[] = [
  [0, 1], [1, 2],
  [0, 3], [3, 4],
  [0, 5], [5, 6],
  [0, 7], [7, 8],
]

function Constellations() {
  return (
    <>
      <div className="constellation constellation-leo">
        <StarShape points={leo} edges={leoEdges} color="var(--star)" />
      </div>
      <div className="constellation constellation-cassiopeia">
        <StarShape points={cassiopeia} edges={cassiopeiaEdges} color="var(--star)" />
      </div>
      <div className="constellation constellation-cancer">
        <StarShape points={cancer} edges={cancerEdges} color="#f0d3da" />
      </div>
    </>
  )
}

export default Constellations
