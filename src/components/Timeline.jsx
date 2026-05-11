import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const events = [
  {
    year: '2001',
    title: 'The Main Character Arrives',
    description: 'Born into the world and immediately demanding all the attention. Some things never change.',
    emoji: '🍼',
  },
  {
    year: '2006',
    title: 'First Time Beating Me at Something',
    description: 'You won a board game (probably by luck) and never let me forget it. The rivalry was born.',
    emoji: '🏆',
  },
  {
    year: '2009',
    title: 'The Great Lego Incident',
    description: 'You know what you did. We don\'t talk about it. But it\'s on the record now.',
    emoji: '🧱',
  },
  {
    year: '2014',
    title: 'High School Era Begins',
    description: 'Suddenly too cool for us. Somehow still showed up to family dinner every Sunday.',
    emoji: '😎',
  },
  {
    year: '2018',
    title: 'The Glow-Up',
    description: 'Something clicked. You started figuring out who you were and it was honestly impressive to watch.',
    emoji: '✨',
  },
  {
    year: '2024',
    title: 'Absolutely Thriving',
    description: 'Living proof that the quiet ones really do go the furthest. We\'re all rooting for you.',
    emoji: '🚀',
  },
]

export default function Timeline() {
  return (
    <section className="py-24 px-4 sm:px-8 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center gap-3 justify-center mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/50" />
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">
            The Journey
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/50" />
        </div>

        <h2 className="text-4xl sm:text-5xl font-bold text-center text-white mb-16">
          Iconic{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Moments
          </span>
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/80 via-purple-500/60 to-transparent" />

          <div className="space-y-10">
            {events.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-8 pl-2"
              >
                {/* Dot */}
                <div className="relative flex-shrink-0 w-10 h-10 rounded-full border border-blue-500/50 bg-blue-900/40 flex items-center justify-center z-10 mt-1">
                  <span className="text-lg">{event.emoji}</span>
                  <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping [animation-duration:3s]" />
                </div>

                {/* Content */}
                <div className="card-glass rounded-2xl p-5 flex-1 hover:border-blue-500/40 transition-colors duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-blue-400 font-mono text-sm font-bold">{event.year}</span>
                    <Star size={12} className="text-purple-400 fill-purple-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{event.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
