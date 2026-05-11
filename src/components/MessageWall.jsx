import { motion } from 'framer-motion'
import { Heart, Quote } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function MessageWall() {
  return (
    <section className="py-24 px-4 sm:px-8 max-w-4xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
      >
        <div className="flex items-center gap-3 justify-center mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/50" />
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">
            From the Heart
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/50" />
        </div>

        <h2 className="text-4xl sm:text-5xl font-bold text-center text-white mb-16">
          A Message for{' '}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-glow-purple">
            Moray
          </span>
        </h2>

        <div className="card-glass border-glow rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-600/20 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-2xl" />

          <Quote size={48} className="text-purple-500/40 mb-6" />

          <div className="relative z-10 space-y-5 text-slate-300 text-lg sm:text-xl leading-relaxed">
            <p>Dear Moray,</p>
            <p>
              Just wanted to make sure your brain is still working at the big 26 x
            </p>
            <p>Happy Birthday!</p>
          </div>

          <div className="relative z-10 mt-10 flex items-center gap-3 text-pink-400 font-semibold">
            <Heart size={18} className="fill-pink-400" />
            <span>Love from Fraser xxx</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
