import { motion } from 'framer-motion'

// ─── ADD YOUR PHOTOS HERE ───────────────────────────────────────────────────
// Drop image files into the  birthday-page/public/photos/  folder,
// then add entries below with the filename and a caption.
// Example: { src: '/photos/beach2019.jpg', caption: 'Summer 2019' }
const photos = [
  { src: '/photos/moray1.jpg' },
  { src: '/photos/moray2.jpg' },
  { src: '/photos/moray3.jpg' },
  { src: '/photos/moray4.jpg' },
  { src: '/photos/moray5.jpg' },
  { src: '/photos/moray6.jpg' },
  { src: '/photos/moray7.jpg' },
]
// ────────────────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function PhotoGallery() {
  return (
    <section className="py-24 px-4 sm:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center gap-3 justify-center mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-500/50" />
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
            Core Memories
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-500/50" />
        </div>

        <h2 className="text-4xl sm:text-5xl font-bold text-center text-white mb-16">
          Moments That{' '}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Hit Different
          </span>
        </h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
              style={{ border: '1px solid rgba(99,102,241,0.2)' }}
            >
              <img
                src={photo.src}
                alt=""
                className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
              />

              {/* Dark overlay base so border glow reads well */}
              <div className="absolute inset-0 bg-black/20" />

              {/* Border glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
                style={{ boxShadow: 'inset 0 0 30px rgba(99,102,241,0.2)' }}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
