'use client'

import { useState } from 'react'
import { useAuth, useRequireAuth } from '../../lib/auth'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  Calendar, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Plus,
  User,
  Briefcase,
  TrendingUp,
  DollarSign,
  FileText,
  Image,
  Video,
  Instagram,
  Youtube,
  Twitter
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// =====================================================
// DASHBOARD LAYOUT COMPONENT
// =====================================================

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, signOut } = useAuth()
  const { loading } = useRequireAuth('/login')
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Navigation items based on user type
  const getNavigationItems = () => {
    if (!user) return []

    const baseItems = [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: Home,
        current: pathname === '/dashboard'
      },
      {
        name: 'Campaigns',
        href: '/dashboard/campaigns',
        icon: Briefcase,
        current: pathname.startsWith('/dashboard/campaigns')
      },
      {
        name: 'Analytics',
        href: '/dashboard/analytics',
        icon: BarChart3,
        current: pathname.startsWith('/dashboard/analytics')
      },
      {
        name: 'Messages',
        href: '/dashboard/messages',
        icon: MessageSquare,
        current: pathname.startsWith('/dashboard/messages')
      }
    ]

    if (user.user_type === 'brand') {
      return [
        ...baseItems,
        {
          name: 'Creators',
          href: '/dashboard/creators',
          icon: Users,
          current: pathname.startsWith('/dashboard/creators')
        },
        {
          name: 'Applications',
          href: '/dashboard/applications',
          icon: FileText,
          current: pathname.startsWith('/dashboard/applications')
        }
      ]
    }

    if (user.user_type === 'creator') {
      return [
        ...baseItems,
        {
          name: 'Opportunities',
          href: '/dashboard/opportunities',
          icon: TrendingUp,
          current: pathname.startsWith('/dashboard/opportunities')
        },
        {
          name: 'Applications',
          href: '/dashboard/applications',
          icon: FileText,
          current: pathname.startsWith('/dashboard/applications')
        },
        {
          name: 'Portfolio',
          href: '/dashboard/portfolio',
          icon: Image,
          current: pathname.startsWith('/dashboard/portfolio')
        },
        {
          name: 'Earnings',
          href: '/dashboard/earnings',
          icon: DollarSign,
          current: pathname.startsWith('/dashboard/earnings')
        }
      ]
    }

    return baseItems
  }

  const navigationItems = getNavigationItems()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:hidden"
          >
            <SidebarContent 
              user={user}
              navigationItems={navigationItems}
              onClose={() => setSidebarOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <SidebarContent 
          user={user}
          navigationItems={navigationItems}
        />
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Search */}
            <div className="flex-1 max-w-lg mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search campaigns, creators..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Create button */}
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {user?.user_type === 'brand' ? 'New Campaign' : 'Apply'}
                </span>
              </button>

              {/* User menu */}
              <div className="relative">
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.full_name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user?.user_type}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

// =====================================================
// SIDEBAR CONTENT COMPONENT
// =====================================================

interface SidebarContentProps {
  user: any
  navigationItems: any[]
  onClose?: () => void
}

function SidebarContent({ user, navigationItems, onClose }: SidebarContentProps) {
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    if (onClose) onClose()
  }

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <span className="text-xl font-bold text-gray-900">ViralReach</span>
        </Link>
        
        {/* Close button for mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                item.current
                  ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={onClose}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
            {user?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.full_name || 'User'}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {user?.user_type} • {user?.subscription_tier}
            </p>
          </div>
        </div>

        {/* User actions */}
        <div className="space-y-1">
          <Link
            href="/dashboard/profile"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
            onClick={onClose}
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </Link>
          
          <Link
            href="/dashboard/settings"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
            onClick={onClose}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
          
          <button
            onClick={handleSignOut}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </div>
  )
} 