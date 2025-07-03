import { useState, useEffect } from 'react'
import { videoService } from '../services/video'
import VideoCard from '../components/video/VideoCard'
import Loading from '../components/common/Loading'
import { Flame, TrendingUp, Clock, PlayCircle } from 'lucide-react'

const Home = () => {
  const [videos, setVideos] = useState([])
  const [trendingVideos, setTrendingVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    fetchVideos()
    fetchTrendingVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      setLoading(true)
      const response = await videoService.getAllVideos(1, 20)
      setVideos(response.docs || [])
    } catch (err) {
      setError('Failed to load videos')
      console.error('Error fetching videos:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchTrendingVideos = async () => {
    try {
      const response = await videoService.getTrendingVideos(1, 10)
      setTrendingVideos(response.docs || [])
    } catch (err) {
      console.error('Error fetching trending videos:', err)
    }
  }

  const tabs = [
    { id: 'all', label: 'All', icon: PlayCircle },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'recent', label: 'Recent', icon: Clock },
  ]

  const getDisplayVideos = () => {
    switch (activeTab) {
      case 'trending':
        return trendingVideos
      case 'recent':
        return videos.slice(0, 10)
      default:
        return videos
    }
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-2">⚠️ Error</div>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
          <button
            onClick={fetchVideos}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to ChaiTube
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover, watch, and share amazing videos
            </p>
            <div className="flex items-center justify-center space-x-8 text-lg">
              <div className="flex items-center">
                <Flame className="h-6 w-6 mr-2" />
                <span>Trending Content</span>
              </div>
              <div className="flex items-center">
                <PlayCircle className="h-6 w-6 mr-2" />
                <span>HD Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex space-x-1 bg-gray-200 dark:bg-gray-800 p-1 rounded-lg w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-orange-500 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Videos Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {getDisplayVideos().length === 0 ? (
          <div className="text-center py-12">
            <PlayCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No videos found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Be the first to upload a video!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {getDisplayVideos().map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        )}
      </div>

      {/* Load More Button */}
      {videos.length > 0 && (
        <div className="text-center mt-12 mb-8">
          <button
            onClick={() => {
              // Implement load more functionality
              console.log('Load more videos')
            }}
            className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors font-medium"
          >
            Load More Videos
          </button>
        </div>
      )}
    </div>
  )
}

export default Home
