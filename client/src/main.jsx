import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import './index.css'
import Home from './routes/Home/Home.jsx'
import CreatePage from './routes/CreatePage/CreatePage.jsx'
import PostPage from './routes/PostPage/PostPage.jsx'
import AuthPage from './routes/AuthPage/AuthPage.jsx'
import ProfilePage from './routes/ProfilePage/ProfilePage.jsx'
import SearchPage from './routes/SearchPage/SearchPage.jsx'
import MainLayout from './routes/layouts/MainLayout.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Settings from './routes/Settings/Settings.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>

    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/pin/:id' element={<PostPage />} />
            <Route path='/:username' element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/create' element={<CreatePage />} />
              <Route path='/settings' element={<Settings />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />}/>
          </Route>
          <Route path='/auth' element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
