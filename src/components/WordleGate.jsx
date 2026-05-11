import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Delete, HelpCircle, RotateCcw } from 'lucide-react'

const TARGET = 'MORAY'
const MAX_GUESSES = 6
const WORD_LENGTH = 5

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
]

// A small set of valid 5-letter words to prevent nonsense guesses
// In a real Wordle you'd import a full dictionary; this is enough for the gate.
const VALID_WORDS = new Set([
  'MORAY','ABOUT','ABOVE','ABUSE','ACTOR','ACUTE','ADMIT','ADOPT','ADULT',
  'AFTER','AGAIN','AGENT','AGREE','AHEAD','ALARM','ALBUM','ALERT','ALIKE',
  'ALIVE','ALLEY','ALLOW','ALONE','ALONG','ALTER','ANGEL','ANGER','ANGLE',
  'ANGRY','ANIME','ANKLE','ANNEX','ANTIC','ANVIL','APART','APPLE','APPLY',
  'APRIL','ARGUE','ARISE','ARMED','ARMOR','ARRAY','ARROW','ARSON','ASIDE',
  'ASSET','ATLAS','ATTIC','AUDIO','AUDIT','AVOID','AWAKE','AWARD','AWARE',
  'AWFUL','BADLY','BAKER','BASIC','BASIS','BATCH','BEACH','BEARD','BEAST',
  'BEGAN','BEGIN','BEING','BELOW','BENCH','BIBLE','BLACK','BLADE','BLAME',
  'BLAND','BLANK','BLAST','BLAZE','BLEED','BLEND','BLESS','BLIND','BLOCK',
  'BLOOD','BLOOM','BLOWN','BOARD','BONUS','BOOST','BOOTH','BOUND','BRAIN',
  'BRAVE','BREAD','BREAK','BREED','BRIDE','BRIEF','BRING','BROAD','BROKE',
  'BROWN','BRUSH','BUILD','BUILT','BUNCH','BURST','BUYER','CARRY','CATCH',
  'CAUSE','CEASE','CHAIN','CHAIR','CHAOS','CHARM','CHART','CHASE','CHEAP',
  'CHECK','CHEEK','CHEST','CHIEF','CHILD','CHINA','CHOIR','CHORD','CHUNK',
  'CIVIC','CIVIL','CLAIM','CLASH','CLASS','CLEAN','CLEAR','CLERK','CLICK',
  'CLIFF','CLIMB','CLOCK','CLONE','CLOSE','CLOUD','COACH','COAST','COMET',
  'COMIC','CORAL','COUNT','COURT','COVER','CRASH','CREAM','CREEK','CRIME',
  'CROSS','CROWD','CROWN','CRUEL','CRUSH','CURVE','CYCLE','DAILY','DAIRY',
  'DANCE','DARK','DEATH','DEBUT','DELAY','DEMON','DENSE','DEPTH','DIRTY',
  'DISCO','DITCH','DIVER','DIZZY','DOING','DOUBT','DOUGH','DRAFT','DRAIN',
  'DRAMA','DRAPE','DRAWL','DREAM','DRESS','DRIED','DRIFT','DRILL','DRINK',
  'DRIVE','DROVE','DRYER','DUNNO','DYING','EAGER','EARLY','EARTH','EIGHT',
  'ELITE','EMPTY','ENEMY','ENJOY','ENTER','ENTRY','EQUAL','ERROR','EVENT',
  'EVERY','EXACT','EXCEL','EXIST','EXTRA','FABLE','FACED','FAIRY','FAITH',
  'FALSE','FANCY','FATAL','FAULT','FEAST','FENCE','FEVER','FIBER','FIELD',
  'FIFTY','FIGHT','FINAL','FIRST','FIXED','FLAIR','FLAME','FLASH','FLEET',
  'FLESH','FLOAT','FLOOD','FLOOR','FLOUR','FLUID','FLUTE','FOCAL','FOCUS',
  'FOLKS','FORCE','FORGE','FORTE','FORUM','FOUND','FRAME','FRANK','FRAUD',
  'FREAK','FRESH','FRONT','FROST','FRUIT','FULLY','FUNNY','GHOST','GIANT',
  'GIVEN','GLAND','GLARE','GLASS','GLOBE','GLOOM','GLORY','GLOSS','GLOVE',
  'GOING','GRACE','GRADE','GRAIN','GRAND','GRANT','GRASP','GRASS','GRAVE',
  'GREAT','GREEN','GREET','GRIEF','GRILL','GRIND','GROAN','GROSS','GROUP',
  'GROWN','GUARD','GUIDE','GUILE','GUISE','GUSTO','HABIT','HAPPY','HARSH',
  'HASTE','HAVEN','HEART','HEAVY','HENCE','HERBS','HINGE','HIRED','HONOR',
  'HORSE','HOTEL','HOUSE','HUMAN','HUMOR','HURRY','HYPER','IDEAL','IMAGE',
  'IMPLY','INDEX','INDIE','INNER','INPUT','INTER','INTRO','IRONY','ISSUE',
  'IVORY','JAPAN','JELLY','JEWEL','JOINT','JUDGE','JUICE','JUICY','KARMA',
  'KNIFE','KNOCK','KNOWN','LABEL','LARGE','LASER','LATER','LAUGH','LAYER',
  'LEAVE','LEGAL','LEVEL','LIGHT','LIMIT','LINEN','LIVER','LOCAL','LOGIC',
  'LOOSE','LOVER','LOWER','LUCKY','LUNAR','MAGIC','MAJOR','MANOR','MARSH',
  'MATCH','MAYOR','MEDIA','MERCY','MERIT','METAL','MIDST','MIGHT','MINOR',
  'MINUS','MIXED','MODEL','MONEY','MONTH','MOUNT','MOUSE','MOUTH','MOVED',
  'MUSIC','NAIVE','NASTY','NERVE','NEVER','NIGHT','NOISE','NORTH','NOTED',
  'NOVEL','NURSE','NYMPH','OCCUR','OCEAN','OFFER','OFTEN','OLIVE','OMEGA',
  'ONION','ONSET','OPERA','ORDER','OTHER','OUTER','OWING','OWNER','PAINT',
  'PANEL','PANIC','PARTY','PASTA','PATCH','PAUSE','PEACE','PEARL','PENNY',
  'PERIL','PHASE','PHONE','PHOTO','PILOT','PITCH','PIXEL','PIZZA','PLACE',
  'PLAIN','PLANE','PLANT','PLATE','PLAZA','PLEAD','PLUCK','POINT','POKER',
  'POLAR','POPPY','PORCH','POSED','POWER','PRESS','PRICE','PRIDE','PRIME',
  'PRINT','PRIOR','PRIZE','PROBE','PROOF','PROUD','PROVE','PROWL','PULSE',
  'PURSE','QUEEN','QUEST','QUEUE','QUICK','QUIET','QUITE','QUOTA','QUOTE',
  'RAISE','RALLY','RANCH','RANGE','RAPID','RATIO','REACH','READY','REALM',
  'REBEL','REFER','REIGN','RELAX','REMIX','REPLY','REPAY','RIDER','RIDGE',
  'RIGHT','RIGID','RISKY','RIVAL','RIVER','ROBOT','ROCKY','ROUGE','ROUGH',
  'ROUND','ROUTE','ROYAL','RULER','RURAL','SAINT','SALAD','SAUCE','SCALE',
  'SCARE','SCENE','SCORE','SCOUT','SEIZE','SENSE','SERVE','SETUP','SEVEN',
  'SHAKE','SHALL','SHAME','SHAPE','SHARE','SHARP','SHELF','SHELL','SHIFT',
  'SHINE','SHIRT','SHOCK','SHORE','SHORT','SIGHT','SKILL','SKULL','SLEEP',
  'SLICE','SLIDE','SLOPE','SMART','SMELL','SMILE','SMOKE','SNAKE','SOLVE',
  'SORRY','SOUTH','SPACE','SPARE','SPARK','SPEAK','SPEED','SPEND','SPENT',
  'SPICE','SPIKE','SPINE','SPITE','SPLIT','SPOKE','SPORT','SPRAY','SQUAD',
  'STACK','STAFF','STAGE','STAIN','STALE','STAND','START','STATE','STAYS',
  'STEAM','STEEL','STEEP','STICK','STIFF','STOCK','STONE','STORE','STORM',
  'STORY','STRAP','STRAY','STRIP','STUCK','STUDY','STUFF','STYLE','SUGAR',
  'SUITE','SUPER','SURGE','SWAMP','SWEAR','SWEEP','SWIFT','SWING','SWORD',
  'SWORN','TABLE','TASTE','TEACH','TEARS','TEETH','TEMPO','TENSE','THEIR',
  'THEME','THERE','THICK','THING','THINK','THIRD','THOSE','THREE','THREW',
  'THROW','TIGHT','TIMER','TIRED','TITLE','TODAY','TOKEN','TOTAL','TOUCH',
  'TOUGH','TOWER','TOXIC','TRACK','TRADE','TRAIL','TRAIN','TRAIT','TRAMP',
  'TRASH','TREAT','TREND','TRIAL','TRIBE','TRIED','TRICK','TRIED','TROPE',
  'TRUCK','TRULY','TRUST','TRUTH','TWIST','ULTRA','UNDER','UNION','UNITY',
  'UNTIL','UPPER','UPSET','URBAN','USAGE','USUAL','UTILE','UTTER','VALID',
  'VALUE','VALVE','VAULT','VERSE','VIDEO','VIGOR','VIRAL','VIRTUE','VISIT',
  'VISTA','VITAL','VIVID','VOCAL','VOICE','VOTER','WASTE','WATCH','WATER',
  'WEARY','WEIGH','WEIRD','WHALE','WHEAT','WHERE','WHILE','WHITE','WHOLE',
  'WHOSE','WIDER','WITCH','WOMEN','WORLD','WORRY','WORSE','WORST','WORTH',
  'WOULD','WOUND','WRATH','WRIST','WRONG','YIELD','YOUNG','YOURS','YOUTH',
  'ZEBRA','ZONAL','ROCKY','GRAVY','PROXY','DECOY','FORAY','SPRAY','DECAY',
])

function evaluateGuess(guess) {
  const result = Array(WORD_LENGTH).fill('absent')
  const targetArr = TARGET.split('')
  const guessArr = guess.split('')
  const used = Array(WORD_LENGTH).fill(false)

  // First pass — correct positions
  guessArr.forEach((letter, i) => {
    if (letter === targetArr[i]) {
      result[i] = 'correct'
      used[i] = true
    }
  })

  // Second pass — present but wrong position
  guessArr.forEach((letter, i) => {
    if (result[i] === 'correct') return
    const j = targetArr.findIndex((t, idx) => t === letter && !used[idx])
    if (j !== -1) {
      result[i] = 'present'
      used[j] = true
    }
  })

  return result
}

function getTileStyle(status, revealed) {
  if (!revealed) return { background: 'transparent', borderColor: 'rgba(99,102,241,0.3)', color: '#e2e8f0' }
  const map = {
    correct: { background: '#6aaa64', borderColor: '#6aaa64', color: '#fff' },
    present: { background: '#c9b458', borderColor: '#c9b458', color: '#fff' },
    absent:  { background: '#3a3a3c', borderColor: '#3a3a3c', color: '#fff' },
  }
  return map[status]
}

function getKeyStyle(status) {
  const map = {
    correct: 'bg-[#6aaa64] text-white border-[#6aaa64]',
    present: 'bg-[#c9b458] text-white border-[#c9b458]',
    absent:  'bg-[#3a3a3c] text-slate-400 border-[#3a3a3c]',
  }
  return map[status] ?? 'bg-[#1e1e2e] text-slate-200 border-white/10 hover:bg-[#2a2a3e] hover:border-purple-500/40'
}

export default function WordleGate({ onUnlock }) {
  const [guesses, setGuesses] = useState([])           // [{word, result}]
  const [current, setCurrent] = useState('')
  const [shake, setShake] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [message, setMessage] = useState('')
  const [won, setWon] = useState(false)
  const [lost, setLost] = useState(false)

  // Build key → best status map
  const keyStatuses = {}
  guesses.forEach(({ word, result }) => {
    word.split('').forEach((letter, i) => {
      const prev = keyStatuses[letter]
      const cur = result[i]
      if (prev === 'correct') return
      if (cur === 'correct' || prev === undefined) { keyStatuses[letter] = cur; return }
      if (cur === 'present' && prev !== 'correct') keyStatuses[letter] = cur
      if (cur === 'absent' && !prev) keyStatuses[letter] = cur
    })
  })

  const submitGuess = useCallback(() => {
    if (current.length !== WORD_LENGTH) {
      setMessage('Not enough letters')
      setShake(true)
      setTimeout(() => { setShake(false); setMessage('') }, 600)
      return
    }
    const result = evaluateGuess(current)
    const newGuesses = [...guesses, { word: current, result }]
    setGuesses(newGuesses)
    setCurrent('')

    if (current === TARGET) {
      setWon(true)
      setTimeout(onUnlock, 1800)
    } else if (newGuesses.length >= MAX_GUESSES) {
      setLost(true)
    }
  }, [current, guesses, onUnlock])

  const pressKey = useCallback((key) => {
    if (won || lost) return
    if (key === 'ENTER') { submitGuess(); return }
    if (key === '⌫' || key === 'BACKSPACE') {
      setCurrent(c => c.slice(0, -1)); return
    }
    if (/^[A-Z]$/.test(key) && current.length < WORD_LENGTH) {
      setCurrent(c => c + key)
    }
  }, [won, lost, current, submitGuess])

  // Physical keyboard support
  useEffect(() => {
    const onKey = (e) => pressKey(e.key.toUpperCase())
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [pressKey])

  const reset = () => {
    setGuesses([]); setCurrent(''); setWon(false); setLost(false); setMessage('')
  }

  // Build grid rows: completed guesses + current row + empty rows
  const rows = []
  for (let i = 0; i < MAX_GUESSES; i++) {
    if (i < guesses.length) {
      rows.push({ letters: guesses[i].word.split(''), result: guesses[i].result, revealed: true })
    } else if (i === guesses.length && !won && !lost) {
      const letters = current.split('')
      while (letters.length < WORD_LENGTH) letters.push('')
      rows.push({ letters, result: Array(WORD_LENGTH).fill('absent'), revealed: false })
    } else {
      rows.push({ letters: Array(WORD_LENGTH).fill(''), result: Array(WORD_LENGTH).fill('absent'), revealed: false })
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl animate-pulse [animation-delay:1.5s]" />
      </div>
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.8) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-4">
            🔐 Wordle Gate
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Birthday Wordle
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Guess the 5-letter word to unlock your birthday surprise.
            <br />You have <span className="text-purple-400 font-semibold">{MAX_GUESSES} attempts</span>.
          </p>
        </div>

        {/* Toast message */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center mb-4 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold"
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <div className="flex flex-col gap-2 mb-6">
          {rows.map((row, ri) => (
            <motion.div
              key={ri}
              className="flex gap-2 justify-center"
              animate={shake && ri === guesses.length ? { x: [-6, 6, -6, 6, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              {row.letters.map((letter, ci) => {
                const isCurrentRow = ri === guesses.length && !won && !lost
                const style = getTileStyle(row.result[ci], row.revealed)
                return (
                  <motion.div
                    key={ci}
                    initial={false}
                    animate={
                      row.revealed
                        ? { rotateX: [0, 90, 0], scale: [1, 0.9, 1] }
                        : isCurrentRow && letter
                        ? { scale: [1, 1.12, 1] }
                        : {}
                    }
                    transition={{ duration: 0.4, delay: row.revealed ? ci * 0.12 : 0 }}
                    className="w-14 h-14 flex items-center justify-center rounded-lg border-2 text-xl font-black uppercase select-none"
                    style={{
                      ...style,
                      borderWidth: '2px',
                    }}
                  >
                    {letter}
                  </motion.div>
                )
              })}
            </motion.div>
          ))}
        </div>

        {/* Win / Lose states */}
        <AnimatePresence>
          {won && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-4 py-3 rounded-2xl bg-[#6aaa64]/20 border border-[#6aaa64]/40 text-[#6aaa64] font-bold text-lg"
            >
              🎉 You got it! Unlocking...
            </motion.div>
          )}
          {lost && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-4 py-3 rounded-2xl bg-red-900/20 border border-red-500/30 text-red-400 font-bold"
            >
              The word was <span className="text-white">{TARGET}</span>
              <button onClick={reset} className="ml-3 inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors">
                <RotateCcw size={12} /> Try again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Virtual keyboard */}
        <div className="flex flex-col gap-2">
          {KEYBOARD_ROWS.map((row, ri) => (
            <div key={ri} className="flex gap-1.5 justify-center">
              {row.map((key) => {
                const isWide = key === 'ENTER' || key === '⌫'
                const status = keyStatuses[key]
                return (
                  <button
                    key={key}
                    onClick={() => pressKey(key)}
                    className={`
                      ${isWide ? 'px-3 text-xs min-w-[52px]' : 'w-9 text-sm'}
                      h-14 rounded-lg border font-bold uppercase transition-all duration-200 select-none cursor-pointer
                      active:scale-95 flex items-center justify-center
                      ${getKeyStyle(status)}
                    `}
                  >
                    {key === '⌫' ? <Delete size={16} /> : key}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {/* Hint button */}
        <div className="text-center mt-6">
          <button
            onClick={() => setShowHint(h => !h)}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-purple-400 transition-colors duration-200 text-sm cursor-pointer"
          >
            <HelpCircle size={15} />
            {showHint ? 'Hide hint' : 'Need a hint?'}
          </button>
          <AnimatePresence>
            {showHint && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 text-purple-300 text-sm font-medium px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20"
              >
                💡 <em>What is your name?</em>
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
