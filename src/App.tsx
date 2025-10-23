import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Mission1 from './pages/Mission1'
import Mission2 from './pages/Mission2'
import Mission3 from './pages/Mission3'
import Mission4 from './pages/Mission4'
import ResultsPage from './pages/ResultsPage'
import Leaderboard from './pages/Leaderboard'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import ProgressBar from './components/Layout/ProgressBar'
import { GameProvider } from './context/GameContext'

export default function App() {
  return (
    <GameProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6">
          <ProgressBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/mission-1" element={<Mission1 />} />
            <Route path="/mission-2" element={<Mission2 />} />
            <Route path="/mission-3" element={<Mission3 />} />
            <Route path="/mission-4" element={<Mission4 />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </GameProvider>
  )
}
