import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { VideoProvider } from './context/VideoContext'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/common/Header'
import Sidebar from './components/common/Sidebar'
import Footer from './components/common/Footer'
import ProtectedRoute from './components/auth/ProtectedRoute'
import ErrorBoundary from './components/common/ErrorBoundary'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import VideoWatch from './pages/VideoWatch'
import Profile from './pages/Profile'
import Upload from './pages/Upload'
import Search from './pages/Search'
import NotFound from './pages/NotFound'

import './App.css'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <VideoProvider>
            <Router>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Header />
                <div className="flex">
                  <Sidebar />
                  <main className="flex-1 p-4 lg:p-6">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/watch/:id" element={<VideoWatch />} />
                      <Route path="/search" element={<Search />} />
                      <Route
                        path="/profile"
                        element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/upload"
                        element={
                          <ProtectedRoute>
                            <Upload />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </div>
                <Footer />
              </div>
            </Router>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </VideoProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
