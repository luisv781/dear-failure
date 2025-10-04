'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Shuffle, Filter, Heart, Calendar } from 'lucide-react'
import { getAllLetters, getLettersByCategory, getShuffledLetters } from '@/lib/letters'
import { toast } from 'sonner'

interface Letter {
  id: string
  content: string
  nickname?: string
  category?: string
  createdAt: string
}

const categories = [
  'School',
  'Career', 
  'Relationships',
  'Personal Growth',
  'Other'
]

function LettersContent() {
  const [letters, setLetters] = useState<Letter[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isShuffling, setIsShuffling] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    loadLetters()
    
    // Success message is already shown on the write page
  }, [selectedCategory])

  const loadLetters = () => {
    setLoading(true)
    try {
      let lettersData: Letter[]
      
      if (isShuffling) {
        lettersData = getShuffledLetters(50)
      } else if (selectedCategory) {
        lettersData = getLettersByCategory(selectedCategory)
      } else {
        lettersData = getAllLetters()
      }
      
      setLetters(lettersData)
    } catch (error) {
      console.error('Error loading letters:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleShuffle = () => {
    setIsShuffling(true)
    setTimeout(() => {
      loadLetters()
      setIsShuffling(false)
    }, 100)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return date.toLocaleDateString()
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-background stationery-paper">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <Link 
          href="/"
          className="text-md flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-2xl serif-title text-primary font-semibold">Dear Failure</h1>
        <Link 
          href="/write"
          className="text-md text-muted-foreground hover:text-primary transition-colors"
        >
          Write Letter
        </Link>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-7xl serif-title text-primary mb-4">
            Letters Archive
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Read heartfelt letters from people who have found strength in their failures.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={handleShuffle}
            disabled={isShuffling}
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-2 rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-50"
          >
            <Shuffle className="w-4 h-4" />
            {isShuffling ? 'Shuffling...' : 'Shuffle'}
          </button>
        </div>

        {/* Letters Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="wait">
              {letters.map((letter) => (
                <motion.div
                  key={letter.id}
                  variants={letterVariants}
                  layout
                  className="letter-card rounded-xl p-6 transition-all duration-300"
                >
                  <div className="handwriting-text text-sm mb-4 leading-relaxed">
                    {letter.content}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      {letter.category && (
                        <span className="bg-accent px-2 py-1 rounded-full">
                          {letter.category}
                        </span>
                      )}
                      {letter.nickname && (
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {letter.nickname}
                        </span>
                      )}
                    </div>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(letter.createdAt)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && letters.length === 0 && (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl serif-title text-primary mb-2">
              No letters found
            </h3>
            <p className="text-muted-foreground mb-6">
              {selectedCategory 
                ? `No letters in the ${selectedCategory} category yet.`
                : 'Be the first to share your story.'
              }
            </p>
            <Link 
              href="/write"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Write the First Letter
            </Link>
          </div>
        )}

        {/* Call to Action */}
        {letters.length > 0 && (
          <div className="text-center mt-16">
            <div className="bg-accent/30 rounded-xl p-8">
              <h3 className="text-xl serif-title text-primary mb-3">
                Inspired by these stories?
              </h3>
              <p className="text-muted-foreground mb-6">
                Share your own journey of growth and resilience.
              </p>
              <Link 
                href="/write"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Write Your Letter
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default function LettersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>}>
      <LettersContent />
    </Suspense>
  )
}
