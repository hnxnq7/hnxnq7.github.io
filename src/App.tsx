import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './theme'
import Layout from './components/Layout'
import About from './pages/About'
import NorthStar from './pages/NorthStar'
import Built from './pages/Built'
import Journey from './pages/Journey'
import Placeholder from './pages/Placeholder'
import Places from './pages/Places'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<About />} />
            <Route path="north-star" element={<NorthStar />} />
            <Route path="built" element={<Built />} />
            <Route path="journey" element={<Journey />} />
            <Route path="luna" element={<Placeholder title="luna" />} />
            <Route path="leo" element={<Placeholder title="leo" />} />
            <Route path="singing" element={<Placeholder title="singing" />} />
            <Route path="places" element={<Places />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
