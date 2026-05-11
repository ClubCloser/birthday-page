import { motion } from 'framer-motion'
import { Cake } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function Footer() {
  const miniConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 1 },
      colors: ['#3b82f6', '#a855f7', '#f472b6'],
    })
  }

  return (
    <footer className="relative py-20 px-4 text-center overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-purple-600/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-2xl mx-auto"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
          className="inline-block mb-6"
        >
          <Cake size={48} className="text-purple-400 mx-auto" />
        </motion.div>

        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Happy Birthday, Moray 💜
        </h3>

        <p className="text-slate-500 text-base leading-relaxed mb-2">
          Made with way too much love by Fraser.
        </p>
        <p className="text-slate-600 text-sm mb-8">
          You had to <em>Wordle</em> your way in. Was that not enough of a gift?
        </p>

        <button
          onClick={miniConfetti}
          className="text-slate-600 hover:text-purple-400 transition-colors duration-300 text-sm underline underline-offset-4 cursor-pointer"
        >
          Click for one more confetti explosion 🎊
        </button>

        <div className="mt-12 text-slate-700 text-xs">
          &copy; {new Date().getFullYear()} · Handcrafted with ❤️ by Fraser · Just for you
        </div>
      </motion.div>
    </footer>
  )
}
