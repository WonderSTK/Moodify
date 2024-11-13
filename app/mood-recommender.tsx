"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Film, Book, Music } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getMovieRecommendations, getBookRecommendations, getSongRecommendations } from './api'

interface Movie {
  title: string;
  poster_path?: string;
  release_date?: string;
}

interface Book {
  title: string;
  authors: string[];
  coverUrl?: string;
}

interface Song {
  title: string;
  artist: string;
  image?: Array<{
    '#text': string;
    size: string;
  }>;
}

interface Recommendations {
  movies: Movie[];
  books: Book[];
  songs: Song[];
}

export default function MoodRecommender() {
  const [mood, setMood] = useState("")
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<Recommendations | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const [movies, books, songs] = await Promise.all([
        getMovieRecommendations(mood),
        getBookRecommendations(mood),
        getSongRecommendations(mood)
      ])

      // Transform songs to match the Song interface
      const transformedSongs = songs.map((song: { title?: string; name?: string; artist: string; image?: Array<{ '#text': string; size: string }> }) => ({
        title: song.title || song.name || 'Unknown Title',
        artist: song.artist,
        image: song.image
      }))

      setRecommendations({ movies, books, songs: transformedSongs })
    } catch (error) {
      console.error("Error fetching recommendations:", error)
      setError("An error occurred while fetching recommendations. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="p-4 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8">Mood-Based Recommendations</h1>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
            <Input
              type="text"
              placeholder="Enter your current mood..."
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="flex-grow text-lg"
            />
            <Button type="submit" disabled={loading} className="text-lg w-full sm:w-auto">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Get Recommendations"}
            </Button>
          </form>

          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}

          {recommendations && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <RecommendationSection
                title="Movies"
                icon={<Film className="h-6 w-6" />}
                items={recommendations.movies}
                renderItem={(movie: Movie) => (
                  <RecommendationItem
                    title={movie.title}
                    subtitle={movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
                    imageUrl={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/300x450'}
                    searchTerm={`${movie.title} movie`}
                  />
                )}
              />
              <RecommendationSection
                title="Books"
                icon={<Book className="h-6 w-6" />}
                items={recommendations.books}
                renderItem={(book: Book) => (
                  <RecommendationItem
                    title={book.title}
                    subtitle={book.authors.join(', ')}
                    imageUrl={book.coverUrl || 'https://via.placeholder.com/300x450'}
                    searchTerm={`${book.title} book`}
                  />
                )}
              />
              <RecommendationSection
                title="Songs"
                icon={<Music className="h-6 w-6" />}
                items={recommendations.songs}
                renderItem={(song: Song) => (
                  <RecommendationItem
                    title={song.title}
                    subtitle={song.artist}
                    imageUrl={song.image?.[3]['#text'] || 'https://via.placeholder.com/300x300'}
                    searchTerm={`${song.title} ${song.artist} song`}
                  />
                )}
              />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

function RecommendationSection<T>({ title, icon, items, renderItem }: { 
  title: string, 
  icon: React.ReactNode, 
  items: T[], 
  renderItem: (item: T) => React.ReactNode 
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="grid grid-cols-1 gap-4">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {renderItem(item)}
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function RecommendationItem({ title, subtitle, imageUrl, searchTerm }: {
  title: string,
  subtitle: string,
  imageUrl: string,
  searchTerm: string
}) {
  return (
    <Link href={`https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`} target="_blank" rel="noopener noreferrer">
      <div className="flex items-center space-x-4 p-2 rounded-lg transition-colors hover:bg-gray-100">
        <div className="relative w-20 h-20 flex-shrink-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="rounded-md object-cover"
            sizes="(max-width: 768px) 80px, 80px"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loop
              target.src = 'https://via.placeholder.com/80';
            }}
          />
        </div>
        <div className="flex-grow">
          <h3 className="font-semibold line-clamp-1">{title}</h3>
          <p className="text-sm text-gray-500 line-clamp-1">{subtitle}</p>
        </div>
      </div>
    </Link>
  )
}