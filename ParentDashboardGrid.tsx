"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { ChildCard } from "./ChildCard"
import { ChildReportModal } from "./ChildReportModal"
import { ChildData } from "./types"
import {
  BookOpenIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
  UsersIcon,
  CalendarIcon,
  AwardIcon,
  BellIcon,
  XIcon
} from "lucide-react"

interface ParentDashboardGridProps {
  childrenData: ChildData[]
  sidebarCollapsed?: boolean
  onViewChange?: (view: "dashboard" | "messages" | "settings" | "notifications") => void
}

export const ParentDashboardGrid: React.FC<ParentDashboardGridProps> = ({
  childrenData,
  sidebarCollapsed = false,
  onViewChange
}) => {
  const [selectedChild, setSelectedChild] = useState<ChildData | null>(null)
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Ensure component is mounted before rendering interactive elements
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleCardClick = (child: ChildData) => {
    setSelectedChild(child)
  }

  // Calculate summary statistics
  const totalChildren = childrenData.length
  const averageCompletion = Math.round(
    childrenData.reduce((sum, child) => sum + child.courseCompletion, 0) / totalChildren
  )
  const childrenNeedingAttention = childrenData.filter(child => child.status === "Needs attention").length
  const totalActiveAlerts = childrenData.reduce((sum, child) => sum + (child.alerts?.length || 0), 0)

  // Sample important notifications for the dropdown
  const importantNotifications = [
    {
      id: "1",
      title: "Study Drop Alert",
      message: "Sophia's reading scores dropped 15%",
      timestamp: "30 min ago",
      type: "alert",
      childName: "Sophia Chen",
      childId: "3",
      actionType: "view_child" as const
    },
    {
      id: "2", 
      title: "Quiz Reminder",
      message: "Alexander has a History quiz tomorrow",
      timestamp: "2 hours ago",
      type: "reminder",
      childName: "Alexander Kim",
      childId: "4",
      actionType: "view_child" as const
    },
    {
      id: "3",
      title: "Achievement Unlocked",
      message: "Marcus reached 25-day study streak!",
      timestamp: "4 hours ago", 
      type: "achievement",
      childName: "Marcus Thompson",
      childId: "2",
      actionType: "view_child" as const
    }
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return "🚨"
      case "reminder":
        return "⏰"
      case "achievement":
        return "🏆"
      default:
        return "📢"
    }
  }

  // Handle notification click
  const handleNotificationClick = (notification: any) => {
    console.log("Notification clicked:", notification)
    
    // Close the dropdown first
    setShowNotificationDropdown(false)
    
    // Handle different notification actions
    switch (notification.actionType) {
      case "view_child":
        // Find and open the child's detailed report
        const child = childrenData.find(c => c.id === notification.childId)
        if (child) {
          setSelectedChild(child)
        }
        break
      case "view_messages":
        // Navigate to messages section
        if (onViewChange) {
          onViewChange("messages")
        }
        break
      case "view_notifications":
        // Navigate to full notifications page
        if (onViewChange) {
          onViewChange("notifications")
        }
        break
      default:
        // Default action - could show a toast or modal
        console.log("Notification acknowledged:", notification.title)
    }
  }

  // Handle navigation to notifications section
  const handleViewAllNotifications = () => {
    setShowNotificationDropdown(false)
    if (onViewChange) {
      onViewChange("notifications")
    }
  }

  return (
    <div className="w-full space-y-8">
      {/* Header Section with Notification Bell */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4 relative">
          <div>
            <h1 className="text-4xl font-bold text-primary">Family Learning Dashboard</h1>
            <p className="text-lg text-muted-foreground mt-2">
              Monitor and support your children's educational journey
            </p>
          </div>

          {/* Notification Bell Shortcut - Only render when mounted */}
          {isMounted && (
            <div className="absolute right-0 top-0">
              <div className="relative">
                <button
                  onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
                  className="relative p-3 rounded-xl bg-card border border-border hover:bg-accent transition-all duration-200 hover:scale-105 shadow-sm group"
                >
                  <BellIcon className="size-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                </button>

                {/* Notification Dropdown - Only show when mounted and dropdown is open */}
                {showNotificationDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
                    {/* Dropdown Header */}
                    <div className="p-4 border-b border-border bg-muted/30">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">Important Notifications</h3>
                        <button
                          onClick={() => setShowNotificationDropdown(false)}
                          className="p-1 rounded-lg hover:bg-accent transition-colors"
                        >
                          <XIcon className="size-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>

                    {/* Notification List */}
                    <div className="max-h-80 overflow-y-auto">
                      {importantNotifications.map((notification) => (
                        <button
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification)}
                          className="w-full p-4 border-b border-border hover:bg-accent/50 transition-colors cursor-pointer text-left group"
                        >
                          <div className="flex items-start gap-3">
                            <div className="text-lg flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-foreground text-sm mb-1 group-hover:text-primary transition-colors">
                                {notification.title}
                              </h4>
                              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-primary font-medium group-hover:text-primary/80 transition-colors">
                                  {notification.childName}
                                </span>
                                <span className="text-muted-foreground">
                                  {notification.timestamp}
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Dropdown Footer */}
                    <div className="p-3 border-t border-border bg-muted/30">
                      <button 
                        onClick={handleViewAllNotifications}
                        className="w-full text-center text-sm text-primary hover:text-primary/80 hover:bg-primary/10 transition-all duration-200 font-medium py-2 px-3 rounded-lg"
                      >
                        View All Notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <UsersIcon className="size-5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-foreground">{totalChildren}</p>
            <p className="text-sm text-muted-foreground">Children</p>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUpIcon className="size-5 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-2xl font-bold text-foreground">{averageCompletion}%</p>
            <p className="text-sm text-muted-foreground">Avg Progress</p>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangleIcon className="size-5 text-orange-600 dark:text-orange-400" />
            </div>
            <p className="text-2xl font-bold text-foreground">{childrenNeedingAttention}</p>
            <p className="text-sm text-muted-foreground">Need Attention</p>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CalendarIcon className="size-5 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-foreground">{totalActiveAlerts}</p>
            <p className="text-sm text-muted-foreground">Active Alerts</p>
          </div>
        </div>
      </div>

      {/* Alert Banner for Children Needing Attention */}
      {childrenNeedingAttention > 0 && (
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <AlertTriangleIcon className="size-6 text-orange-600 dark:text-orange-400 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-orange-800 dark:text-orange-200">
                {childrenNeedingAttention} {childrenNeedingAttention === 1 ? 'child needs' : 'children need'} your attention
              </h3>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                Click on their cards below to see detailed recommendations and action plans.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Children Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <BookOpenIcon className="size-6 text-primary" />
            Your Children
          </h2>
          <Badge variant="outline" className="text-sm">
            {totalChildren} {totalChildren === 1 ? 'child' : 'children'} enrolled
          </Badge>
        </div>

        {/* Responsive Grid Layout */}
        <div className={`
          grid gap-6 justify-items-center
          ${sidebarCollapsed 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }
        `}>
          {childrenData.map((child) => (
            <div key={child.id} className="w-full max-w-[300px]">
              <ChildCard child={child} onClick={handleCardClick} />
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Highlights */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <AwardIcon className="size-6 text-green-600 dark:text-green-400" />
          <h3 className="text-xl font-semibold text-foreground">Recent Achievements</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {childrenData
            .filter(child => child.studyStreaks >= 14 || child.quizAverage >= 90)
            .slice(0, 3)
            .map((child) => (
              <div key={child.id} className="bg-white/50 dark:bg-black/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3">
                  <img
                    src={child.avatarSrc}
                    alt={child.name}
                    className="size-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-foreground">{child.name}</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      {child.studyStreaks >= 14 && `${child.studyStreaks}-day streak! `}
                      {child.quizAverage >= 90 && `${child.quizAverage}% quiz average`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Click outside to close dropdown - Only render when mounted and dropdown is open */}
      {isMounted && showNotificationDropdown && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowNotificationDropdown(false)}
        />
      )}

      <ChildReportModal
        child={selectedChild}
        onClose={() => setSelectedChild(null)}
      />
    </div>
  )
}