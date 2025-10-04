'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Send, PenTool } from 'lucide-react'
import { addLetter } from '@/lib/letters'

const categories = [
  'School',
  'Career', 
  'Relationships',
  'Personal Growth',
  'Other'
]

export default function WritePage() {
  const [content, setContent] = useState('')
  const [nickname, setNickname] = useState('')
  const [category, setCategory] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!content.trim()) {
      alert('Please write your letter before submitting.')
      return
    }

    setIsSubmitting(true)

    try {
      addLetter({
        content: content.trim(),
        nickname: nickname.trim() || undefined,
        category: category || undefined,
      })

      // Show success message
      alert('Your letter has been submitted! Thank you for sharing your story.')
      router.push('/letters?submitted=true')
    } catch (error) {
      console.error('Error submitting letter:', error)
      alert('Failed to submit your letter. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background stationery-paper">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <Link 
          href="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-2xl serif-title text-primary font-semibold">Dear Failure</h1>
        <div className="w-24"></div> {/* Spacer for centering */}
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl serif-title text-primary mb-4">
            Write Your Letter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your story of growth, resilience, and transformation. 
            Your words may inspire someone else on their journey.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Letter Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-foreground mb-3">
              Your Letter *
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Dear [your failure], thank you for teaching me..."
              className="w-full h-96 p-6 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary handwriting-text text-lg leading-relaxed"
              required
            />
            <p className="text-sm text-muted-foreground mt-2">
              {content.length} characters
            </p>
          </div>

          {/* Optional Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Nickname */}
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-foreground mb-3">
                Nickname (Optional)
              </label>
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="How would you like to sign your letter?"
                className="w-full p-4 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-foreground mb-3">
                Category (Optional)
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-4 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">Choose a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-12 py-4 rounded-lg hover:bg-primary/90 transition-colors text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Letter
                </>
              )}
            </button>
          </div>
        </form>

        {/* Inspiration */}
        <div className="mt-16 text-center">
          <div className="bg-accent/30 rounded-xl p-8">
            <PenTool className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="text-xl serif-title text-primary mb-3">
              Need inspiration?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Think about a moment when you felt like you failed, but looking back, 
              it taught you something valuable. What would you say to that version of yourself?
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
