import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import './index.css'
import WordleGate from './components/WordleGate'
import Hero from './components/Hero'
import MessageWall from './components/MessageWall'
import PhotoGallery from './components/PhotoGallery'
import Footer from './components/Footer'

function fireUnlockConfetti() {
  const burst = (opts) => confetti({ ...opts, colors: ['#3b82f6', '#a855f7', '#06b6d4', '#f472b6', '#facc15'] })
  burst({ particleCount: 250, spread: 160, origin: { y: 0.5 }, scalar: 1.2, gravity: 0.8 })
  setTimeout(() => {
    burst({ particleCount: 180, angle: 60,  spread: 80, origin: { x: 0, y: 0.6 } })
    burst({ particleCount: 180, angle: 120, spread: 80, origin: { x: 1, y: 0.6 } })
  }, 250)
  setTimeout(() => burst({ particleCount: 120, spread: 200, origin: { y: 0.3 } }), 600)
}

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false)

  const handleUnlock = () => {
    fireUnlockConfetti()
    setIsUnlocked(true)
  }

  return (
    <div className="min-h-screen bg-[#050510] text-slate-200">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5 }}
          >
            <WordleGate onUnlock={handleUnlock} />
          </motion.div>
        ) : (
          <motion.div
            key="birthday"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <Hero />

            <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
            <MessageWall />

            <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
            <PhotoGallery />

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
