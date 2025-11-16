import "./App.css"

import { Routes, Route } from "react-router-dom"
import ErrorBoundary from "@/components/general/ErrorBoundary"
import Home from "@/pages/Home/Home"
import Precipitation from "@/pages/Precipitation/Precipitation"

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/precipitation" element={<Precipitation />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default App
