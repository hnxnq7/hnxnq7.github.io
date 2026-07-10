import './Page.css'
import './Built.css'

function Placeholder({ title }: { title: string }) {
  return (
    <div className="page">
      <section>
        <span className="label">{title}</span>
        <h1>{title}</h1>
      </section>
      <div className="built-empty">
        <p>coming soon</p>
      </div>
    </div>
  )
}

export default Placeholder
