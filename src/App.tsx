import "./App.css"

import ErrorBoundary from "@/components/general/ErrorBoundary"

function App() {
  return (
    <ErrorBoundary>
      <div>Hello world!</div>
    </ErrorBoundary>
  )
}

export default App
