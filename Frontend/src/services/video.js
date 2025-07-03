import { apiRequest } from './api'

export const videoService = {
  // Get all videos with pagination
  getAllVideos: async (page = 1, limit = 10, query = '', sortBy = 'createdAt', sortType = 'desc') => {
    const response = await apiRequest.get('/videos', {
      params: { page, limit, query, sortBy, sortType }
    })
    return response.data.data
  },

  // Get video by ID
  getVideoById: async (videoId) => {
    const response = await apiRequest.get(`/videos/${videoId}`)
    return response.data.data
  },

  // Upload video
  uploadVideo: async (videoData, onUploadProgress) => {
    const formData = new FormData()
    
    // Append video file and thumbnail
    formData.append('videoFile', videoData.videoFile)
    formData.append('thumbnail', videoData.thumbnail)
    
    // Append text fields
    formData.append('title', videoData.title)
    formData.append('description', videoData.description)
    
    const response = await apiRequest.post('/videos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    })
    return response.data.data
  },

  // Update video
  updateVideo: async (videoId, videoData) => {
    const response = await apiRequest.patch(`/videos/${videoId}`, videoData)
    return response.data.data
  },

  // Delete video
  deleteVideo: async (videoId) => {
    const response = await apiRequest.delete(`/videos/${videoId}`)
    return response.data
  },

  // Toggle video publish status
  togglePublishStatus: async (videoId) => {
    const response = await apiRequest.patch(`/videos/toggle/publish/${videoId}`)
    return response.data.data
  },

  // Update video thumbnail
  updateThumbnail: async (videoId, thumbnailFile) => {
    const formData = new FormData()
    formData.append('thumbnail', thumbnailFile)
    
    const response = await apiRequest.patch(`/videos/thumbnail/${videoId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data.data
  },

  // Like/Unlike video
  toggleVideoLike: async (videoId) => {
    const response = await apiRequest.post(`/likes/toggle/v/${videoId}`)
    return response.data.data
  },

  // Get video comments
  getVideoComments: async (videoId, page = 1, limit = 10) => {
    const response = await apiRequest.get(`/comments/${videoId}`, {
      params: { page, limit }
    })
    return response.data.data
  },

  // Add comment to video
  addComment: async (videoId, content) => {
    const response = await apiRequest.post(`/comments/${videoId}`, { content })
    return response.data.data
  },

  // Update comment
  updateComment: async (commentId, content) => {
    const response = await apiRequest.patch(`/comments/c/${commentId}`, { content })
    return response.data.data
  },

  // Delete comment
  deleteComment: async (commentId) => {
    const response = await apiRequest.delete(`/comments/c/${commentId}`)
    return response.data
  },

  // Toggle comment like
  toggleCommentLike: async (commentId) => {
    const response = await apiRequest.post(`/likes/toggle/c/${commentId}`)
    return response.data.data
  },

  // Get user's videos
  getUserVideos: async (userId, page = 1, limit = 10) => {
    const response = await apiRequest.get('/videos/user', {
      params: { userId, page, limit }
    })
    return response.data.data
  },

  // Subscribe to channel
  toggleSubscription: async (channelId) => {
    const response = await apiRequest.post(`/subscriptions/c/${channelId}`)
    return response.data.data
  },

  // Get channel subscribers
  getChannelSubscribers: async (channelId, page = 1, limit = 10) => {
    const response = await apiRequest.get(`/subscriptions/c/${channelId}`, {
      params: { page, limit }
    })
    return response.data.data
  },

  // Get user subscriptions
  getUserSubscriptions: async (subscriberId, page = 1, limit = 10) => {
    const response = await apiRequest.get(`/subscriptions/u/${subscriberId}`, {
      params: { page, limit }
    })
    return response.data.data
  },

  // Get trending videos
  getTrendingVideos: async (page = 1, limit = 10) => {
    const response = await apiRequest.get('/videos/trending', {
      params: { page, limit }
    })
    return response.data.data
  },

  // Search videos
  searchVideos: async (query, page = 1, limit = 10) => {
    const response = await apiRequest.get('/videos/search', {
      params: { query, page, limit }
    })
    return response.data.data
  },
}
