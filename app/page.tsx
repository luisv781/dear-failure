import Link from 'next/link';
import { PenTool, Heart, BookOpen } from 'lucide-react';
import { getRecentLetters } from '@/lib/letters';

export default function Home() {
    const recentLetters = getRecentLetters(3);
    return (
        <div className='min-h-screen bg-background stationery-paper'>
            {/* Navigation */}
            <nav className='flex justify-between items-center p-6 max-w-6xl mx-auto'>
                <h1 className='text-3xl serif-title text-primary font-semibold'>
                    Dear Failure
                </h1>
                <div className='flex gap-4'>
                    <Link
                        href='/letters'
                        className='text-md text-muted-foreground hover:text-primary transition-colors'
                    >
                        Read Letters
                    </Link>
                    <Link
                        href='/write'
                        className='text-md text-muted-foreground hover:text-primary transition-colors'
                    >
                        Write Letter
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className='max-w-4xl mx-auto px-6 py-16'>
                <div className='text-center mb-16'>
                    <h1 className='text-6xl md:text-8xl serif-title text-primary mb-6 leading-tight'>
                        Dear Failure
                    </h1>
                    <p className='text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed'>
                        Write a letter to the moments that made you grow. Share
                        your journey of resilience, learning, and
                        transformation.
                    </p>

                    <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                        <Link
                            href='/write'
                            className='inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200'
                        >
                            <PenTool className='w-5 h-5' />
                            Write a Letter
                        </Link>

                        <Link
                            href='/letters'
                            className='inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-lg hover:bg-secondary/80 transition-colors text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200'
                        >
                            <BookOpen className='w-5 h-5' />
                            Read Letters
                        </Link>
                    </div>
                </div>

                {/* Featured Quote */}
                <div className='text-center mb-16'>
                    <blockquote className='text-3xl serif-title text-primary/80 italic max-w-3xl mx-auto'>
                        "Every failure is a stepping stone to success. Every
                        setback is a setup for a comeback."
                    </blockquote>
                    <p className='text-sm text-muted-foreground mt-4'>
                        — Anonymous
                    </p>
                </div>

                {/* Preview Section */}
                <section className='mb-16'>
                    <h2 className='text-3xl md:text-4xl serif-title text-primary mb-8 text-center'>
                        Recent Letters
                    </h2>
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {recentLetters.map((letter) => (
                            <div
                                key={letter.id}
                                className='letter-card rounded-xl p-6 transition-all duration-300'
                            >
                                <div className='handwriting-text text-sm mb-4 line-clamp-4'>
                                    "{letter.content.substring(0, 100)}..."
                                </div>
                                <div className='flex justify-between items-center text-xs text-muted-foreground'>
                                    {letter.category && (
                                        <span className='bg-accent px-2 py-1 rounded-full'>
                                            {letter.category}
                                        </span>
                                    )}
                                    <span>
                                        {new Date(
                                            letter.createdAt
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='text-center mt-8'>
                        <Link
                            href='/letters'
                            className='inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors'
                        >
                            <Heart className='w-4 h-4' />
                            Read more heartfelt letters
                        </Link>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className='border-t border-border py-8 mt-16'>
                <div className='max-w-6xl mx-auto px-6 text-center'>
                    <p className='text-sm text-muted-foreground'>
                        A safe space to honor your journey through failure and
                        growth. Made by Luis V.
                    </p>
                </div>
            </footer>
        </div>
    );
}
