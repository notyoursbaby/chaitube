import { apiRequest } from './api'

export const authService = {
  // Login user
  login: async (credentials) => {
    const response = await apiRequest.post('/users/login', credentials)
    return response.data.data
  },

  // Register user
  register: async (userData) => {
    const formData = new FormData()
    
    // Append text fields
    Object.keys(userData).forEach(key => {
      if (key !== 'avatar' && key !== 'coverImage') {
        formData.append(key, userData[key])
      }
    })
    
    // Append files
    if (userData.avatar) {
      formData.append('avatar', userData.avatar)
    }
    if (userData.coverImage) {
      formData.append('coverImage', userData.coverImage)
    }
    
    const response = await apiRequest.post('/users/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data.data
  },

  // Logout user
  logout: async () => {
    const response = await apiRequest.post('/users/logout')
    return response.data
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await apiRequest.get('/users/current-user')
    return response.data.data
  },

  // Refresh access token
  refreshToken: async (refreshToken) => {
    const response = await apiRequest.post('/users/refresh-token', {
      refreshToken,
    })
    return response.data.data
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await apiRequest.post('/users/change-password', passwordData)
    return response.data
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await apiRequest.patch('/users/update-account', userData)
    return response.data.data
  },

  // Update user avatar
  updateAvatar: async (avatarFile) => {
    const formData = new FormData()
    formData.append('avatar', avatarFile)
    
    const response = await apiRequest.patch('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data.data
  },

  // Update cover image
  updateCoverImage: async (coverImageFile) => {
    const formData = new FormData()
    formData.append('coverImage', coverImageFile)
    
    const response = await apiRequest.patch('/users/cover-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data.data
  },

  // Get user channel profile
  getUserChannelProfile: async (username) => {
    const response = await apiRequest.get(`/users/c/${username}`)
    return response.data.data
  },

  // Get user watch history
  getWatchHistory: async () => {
    const response = await apiRequest.get('/users/history')
    return response.data.data
  },
}
