"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { ChildData } from "./types"
import {
  BellIcon,
  CheckIcon,
  XIcon,
  TrashIcon,
  ArchiveIcon,
  FilterIcon,
  SearchIcon,
  MoreVerticalIcon,
  AlertTriangleIcon,
  TrendingUpIcon,
  StarIcon,
  BookOpenIcon,
  ClockIcon,
  UserIcon,
  MessageSquareIcon,
  CalendarIcon,
  ArrowLeftIcon,
  CheckCheckIcon,
  EyeIcon,
  PinIcon,
  RefreshCwIcon,
  SettingsIcon,
  ZapIcon,
  AwardIcon,
  HeartIcon,
  TrendingDownIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "progress" | "alert" | "achievement" | "reminder" | "message" | "system"
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  isImportant: boolean
  isPinned: boolean
  childId?: string
  childName?: string
  childAvatar?: string
  actionRequired?: boolean
  category: "academic" | "behavioral" | "system" | "social"
}

interface NotificationsSectionProps {
  childrenData: ChildData[]
  onBackToDashboard?: () => void
}

export const NotificationsSection: React.FC<NotificationsSectionProps> = ({ 
  childrenData, 
  onBackToDashboard
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "alert",
      title: "Study Drop Alert",
      message: "Sophia's reading comprehension scores dropped 15% this week. Consider scheduling additional practice sessions.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: false,
      isImportant: true,
      isPinned: true,
      childId: "3",
      childName: "Sophia Chen",
      childAvatar: "https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
      actionRequired: true,
      category: "academic"
    },
    {
      id: "2",
      type: "achievement",
      title: "25-Day Study Streak! 🏆",
      message: "Marcus has maintained a 25-day study streak! This is an excellent achievement that deserves recognition.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false,
      isImportant: false,
      isPinned: false,
      childId: "2",
      childName: "Marcus Thompson",
      childAvatar: "https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
      actionRequired: false,
      category: "academic"
    },
    {
      id: "3",
      type: "progress",
      title: "Weekly Progress Report",
      message: "Emma completed 85% of her coursework this week with a 92% quiz average. Great improvement!",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: true,
      isImportant: false,
      isPinned: false,
      childId: "1",
      childName: "Emma Rodriguez",
      childAvatar: "https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
      actionRequired: false,
      category: "academic"
    },
    {
      id: "4",
      type: "reminder",
      title: "Upcoming Quiz Reminder",
      message: "Alexander has a History quiz scheduled for November 7th. Make sure he's prepared!",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      isRead: true,
      isImportant: false,
      isPinned: false,
      childId: "4",
      childName: "Alexander Kim",
      childAvatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
      actionRequired: false,
      category: "academic"
    },
    {
      id: "5",
      type: "achievement",
      title: "Art Project Excellence",
      message: "Isabella's latest art project received top marks! Her creativity continues to shine.",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      isRead: false,
      isImportant: false,
      isPinned: false,
      childId: "5",
      childName: "Isabella Martinez",
      childAvatar: "https://images.pexels.com/photos/1845208/pexels-photo-1845208.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
      actionRequired: false,
      category: "academic"
    },
    {
      id: "6",
      type: "system",
      title: "Platform Update Available",
      message: "New features are available including enhanced progress tracking and improved AI insights.",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      isRead: true,
      isImportant: false,
      isPinned: false,
      actionRequired: false,
      category: "system"
    }
  ])

  const [filter, setFilter] = useState<"all" | "unread" | "important" | "pinned">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])
  const [expandedNotifications, setExpandedNotifications] = useState<string[]>([])

  const getNotificationIcon = (type: Notification["type"]) => {
    const iconProps = { className: "size-5" }
    
    switch (type) {
      case "progress":
        return <TrendingUpIcon {...iconProps} className="size-5 text-emerald-600 dark:text-emerald-400" />
      case "alert":
        return <AlertTriangleIcon {...iconProps} className="size-5 text-red-500 dark:text-red-400" />
      case "achievement":
        return <AwardIcon {...iconProps} className="size-5 text-amber-500 dark:text-amber-400" />
      case "reminder":
        return <ClockIcon {...iconProps} className="size-5 text-violet-500 dark:text-violet-400" />
      case "message":
        return <MessageSquareIcon {...iconProps} className="size-5 text-blue-500 dark:text-blue-400" />
      case "system":
        return <ZapIcon {...iconProps} className="size-5 text-indigo-500 dark:text-indigo-400" />
      default:
        return <BellIcon {...iconProps} className="size-5 text-muted-foreground" />
    }
  }

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "progress":
        return "border-emerald-500/30 bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/10"
      case "alert":
        return "border-red-500/30 bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-800/10"
      case "achievement":
        return "border-amber-500/30 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/10"
      case "reminder":
        return "border-violet-500/30 bg-gradient-to-br from-violet-50 to-violet-100/50 dark:from-violet-900/20 dark:to-violet-800/10"
      case "message":
        return "border-blue-500/30 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10"
      case "system":
        return "border-indigo-500/30 bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-900/20 dark:to-indigo-800/10"
      default:
        return "border-gray-500/30 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-900/20 dark:to-gray-800/10"
    }
  }

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (notification.childName && notification.childName.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesFilter = () => {
      switch (filter) {
        case "unread":
          return !notification.isRead
        case "important":
          return notification.isImportant
        case "pinned":
          return notification.isPinned
        default:
          return true
      }
    }

    return matchesSearch && matchesFilter()
  })

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const togglePin = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isPinned: !notification.isPinned } : notification
      )
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const toggleExpanded = (id: string) => {
    setExpandedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(notifId => notifId !== id)
        : [...prev, id]
    )
  }

  const unreadCount = notifications.filter(n => !n.isRead).length
  const importantCount = notifications.filter(n => n.isImportant).length
  const pinnedCount = notifications.filter(n => n.isPinned).length

  return (
    <div className="w-full h-full bg-background">
      {/* Compact Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToDashboard}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <ArrowLeftIcon className="size-6 text-muted-foreground" />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-200/50 dark:border-blue-800/50">
                <BellIcon className="size-6 text-blue-600 dark:text-blue-400" />
              </div>
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 size-5 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{unreadCount}</span>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Notifications</h1>
              <p className="text-sm text-muted-foreground">Stay updated with learning progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Controls */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            
            <div className="flex gap-1">
              {[
                { key: "all", label: "All", count: notifications.length },
                { key: "unread", label: "Unread", count: unreadCount },
                { key: "important", label: "Important", count: importantCount },
                { key: "pinned", label: "Pinned", count: pinnedCount }
              ].map(({ key, label, count }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key as any)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                    filter === key
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent"
                  )}
                >
                  {label} ({count})
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors text-xs"
          >
            <CheckCheckIcon className="size-3" />
            Mark All Read
          </button>
        </div>
      </div>

      {/* Horizontal Grid Layout - Side by Side */}
      <div className="w-full">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <BellIcon className="size-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Notifications</h3>
            <p className="text-muted-foreground text-center">
              {filter === "all" ? "You're all caught up!" : `No ${filter} notifications found.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredNotifications.map((notification, index) => {
              const isExpanded = expandedNotifications.includes(notification.id)
              
              return (
                <div
                  key={notification.id}
                  className={cn(
                    "relative border-2 transition-all duration-300 hover:shadow-lg rounded-xl overflow-hidden group cursor-pointer",
                    getNotificationColor(notification.type),
                    !notification.isRead && "ring-2 ring-primary/40 shadow-lg",
                    isExpanded ? "col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 shadow-xl scale-[1.02]" : "hover:scale-[1.02]"
                  )}
                  onClick={() => toggleExpanded(notification.id)}
                >
                  {/* Notification Card Header */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/70 dark:bg-black/20 shadow-sm">
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground text-sm leading-tight">
                              {notification.title}
                            </h4>
                            {!notification.isRead && (
                              <div className="size-2 rounded-full bg-primary flex-shrink-0" />
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {notification.childId && (
                              <div className="flex items-center gap-1.5">
                                <img
                                  src={notification.childAvatar}
                                  alt={notification.childName}
                                  className="size-4 rounded-full object-cover ring-1 ring-white/50"
                                />
                                <span className="text-xs text-foreground/70 font-medium">{notification.childName}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs text-foreground/60">
                          {notification.timestamp.toLocaleString([], {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        
                        <div className="flex items-center gap-1">
                          {notification.isPinned && (
                            <PinIcon className="size-3 text-blue-600 dark:text-blue-400" />
                          )}
                          {notification.isImportant && (
                            <AlertTriangleIcon className="size-3 text-amber-600 dark:text-amber-400" />
                          )}
                          {notification.actionRequired && (
                            <div className="px-1.5 py-0.5 rounded-full bg-orange-500/20 text-orange-700 dark:text-orange-300 text-xs font-medium">
                              Action
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Preview Message - Always Visible */}
                    <p className={cn(
                      "text-sm text-foreground/80 leading-relaxed",
                      isExpanded ? "mb-4" : "line-clamp-2"
                    )}>
                      {notification.message}
                    </p>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-white/20 dark:border-black/20">
                        {/* Action Required Banner */}
                        {notification.actionRequired && (
                          <div className="p-3 rounded-lg bg-orange-500/30 border border-orange-400/50 mb-4">
                            <div className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
                              <AlertTriangleIcon className="size-4" />
                              <span className="text-sm font-semibold">Action Required</span>
                            </div>
                          </div>
                        )}

                        {/* Child Details */}
                        {notification.childId && (
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-black/20 mb-4">
                            <img
                              src={notification.childAvatar}
                              alt={notification.childName}
                              className="size-8 rounded-full object-cover ring-2 ring-white/70"
                            />
                            <div>
                              <p className="text-sm font-semibold text-foreground">{notification.childName}</p>
                              <p className="text-xs text-foreground/70">
                                {childrenData.find(child => child.id === notification.childId)?.gradeLevel}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            {!notification.isRead && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  markAsRead(notification.id)
                                }}
                                className="p-2 rounded-lg bg-white/50 dark:bg-black/20 hover:bg-white/70 dark:hover:bg-black/30 transition-colors"
                                title="Mark as read"
                              >
                                <EyeIcon className="size-4 text-foreground/70" />
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                togglePin(notification.id)
                              }}
                              className="p-2 rounded-lg bg-white/50 dark:bg-black/20 hover:bg-white/70 dark:hover:bg-black/30 transition-colors"
                              title={notification.isPinned ? "Unpin" : "Pin"}
                            >
                              <PinIcon className={cn(
                                "size-4",
                                notification.isPinned ? "text-blue-600 dark:text-blue-400" : "text-foreground/70"
                              )} />
                            </button>
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notification.id)
                            }}
                            className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
                            title="Delete"
                          >
                            <TrashIcon className="size-4 text-red-600 dark:text-red-400" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Expand/Collapse Indicator */}
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-1 rounded-full bg-white/70 dark:bg-black/30">
                        {isExpanded ? (
                          <ChevronUpIcon className="size-3 text-foreground/70" />
                        ) : (
                          <ChevronDownIcon className="size-3 text-foreground/70" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}