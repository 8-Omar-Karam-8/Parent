"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ChildData } from "@/components/dashboard/types"
import {
  UserIcon,
  SettingsIcon,
  HelpCircleIcon,
  LogOutIcon,
  HomeIcon,
  MessageSquareIcon,
  MenuIcon,
  XIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  BotIcon,
  BellIcon
} from "lucide-react"
import { cn } from "@/lib/utils"

type ViewType = "dashboard" | "messages" | "settings" | "notifications"

interface SidebarProps {
  className?: string
  onAIToggle?: () => void
  onToggle?: (collapsed: boolean) => void
  onViewChange?: (view: ViewType) => void
  currentView?: ViewType
  childrenData?: ChildData[]
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  className, 
  onAIToggle, 
  onToggle,
  onViewChange,
  currentView = "dashboard",
  childrenData = []
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Notify parent component when sidebar state changes
  useEffect(() => {
    onToggle?.(isCollapsed)
  }, [isCollapsed, onToggle])

  // Calculate total alerts for notifications badge
  const totalActiveAlerts = childrenData.reduce((sum, child) => sum + (child.alerts?.length || 0), 0)

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: HomeIcon,
      badge: null,
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "icon-bg-yellow",
      onClick: () => onViewChange?.("dashboard")
    },
    {
      id: "ai-assistant",
      label: "AI Assistant",
      icon: BotIcon,
      badge: "New",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "icon-bg-blue",
      onClick: onAIToggle
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageSquareIcon,
      badge: "3",
      color: "text-green-600 dark:text-green-400",
      bgColor: "icon-bg-green",
      onClick: () => onViewChange?.("messages")
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: BellIcon,
      badge: totalActiveAlerts > 0 ? totalActiveAlerts.toString() : null,
      color: "text-red-600 dark:text-red-400",
      bgColor: "icon-bg-red",
      onClick: () => onViewChange?.("notifications")
    },
    {
      id: "settings",
      label: "Settings",
      icon: SettingsIcon,
      badge: null,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "icon-bg-purple",
      onClick: () => onViewChange?.("settings")
    },
    {
      id: "help",
      label: "Help & Support",
      icon: HelpCircleIcon,
      badge: null,
      color: "text-cyan-600 dark:text-cyan-400",
      bgColor: "icon-bg-cyan"
    }
  ]

  const handleItemClick = (item: any) => {
    if (item.onClick) {
      item.onClick()
    }
  }

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-30 h-screen bg-card border-r border-border shadow-sm transition-all duration-300 flex flex-col",
        isCollapsed ? "w-20" : "w-80",
        className
      )}
    >
      {/* Header Section with Hamburger Menu */}
      <div className="relative p-4 border-b border-border bg-muted/30 flex-shrink-0">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="size-10 rounded-lg flex items-center justify-center icon-bg-blue">
                  <BookOpenIcon className="size-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-primary">Rafiq Education</h1>
                <p className="text-xs text-muted-foreground">Parent Portal</p>
              </div>
            </div>
          )}
          
          {/* Hamburger Menu Button */}
          <button
            onClick={handleToggle}
            className={cn(
              "p-3 rounded-lg bg-muted border border-border hover:bg-accent transition-all duration-200 hover:scale-105",
              isCollapsed && "mx-auto"
            )}
          >
            {isCollapsed ? (
              <MenuIcon className="size-5 text-primary" />
            ) : (
              <XIcon className="size-5 text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Profile Section - Enhanced for collapsed state */}
      <div className={cn("border-b border-border flex-shrink-0", isCollapsed ? "p-3" : "p-6")}>
        <div className={cn("flex items-center", isCollapsed ? "justify-center" : "gap-4")}>
          <div className="relative">
            <Image
              src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1"
              alt="Parent Profile"
              width={isCollapsed ? 40 : 60}
              height={isCollapsed ? 40 : 60}
              className={cn(
                "relative rounded-lg object-cover ring-2 ring-border shadow-sm",
                isCollapsed ? "size-10" : "size-15"
              )}
            />
            <div className={cn(
              "absolute rounded-full bg-green-500 border-2 border-card",
              isCollapsed ? "size-3 -bottom-0.5 -right-0.5" : "size-5 -bottom-1 -right-1"
            )} />
            <div className={cn(
              "absolute rounded-md bg-card border border-border flex items-center justify-center shadow-sm",
              isCollapsed ? "size-4 -top-0.5 -left-0.5" : "size-6 -top-1 -left-1"
            )}>
              <ShieldCheckIcon className={cn("text-blue-600 dark:text-blue-400", isCollapsed ? "size-2" : "size-3")} />
            </div>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">Sarah Johnson</h3>
              <p className="text-sm text-muted-foreground truncate">Premium Parent</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Items - All items in one section, no scrolling needed */}
      <div className="flex-1 p-3 flex flex-col justify-between">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = (item.id === "dashboard" && currentView === "dashboard") || 
                           (item.id === "messages" && currentView === "messages") ||
                           (item.id === "notifications" && currentView === "notifications") ||
                           (item.id === "settings" && currentView === "settings")
            
            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => handleItemClick(item)}
                  className={cn(
                    "w-full flex items-center rounded-lg transition-all duration-200 hover:scale-[1.02] relative",
                    isCollapsed ? "p-2.5 justify-center" : "gap-3 p-3",
                    isActive
                      ? "bg-primary/10 border border-primary/20 shadow-sm"
                      : "hover:bg-accent/50"
                  )}
                >
                  <div className={cn(
                    "flex items-center justify-center rounded-md transition-all duration-200",
                    isCollapsed ? "size-11" : "size-12",
                    isActive 
                      ? "bg-primary/20" 
                      : item.bgColor
                  )}>
                    <Icon className={cn(
                      "size-5 transition-colors",
                      isActive ? "text-primary" : item.color
                    )} />
                  </div>
                  
                  {!isCollapsed && (
                    <div className="flex-1 flex items-center justify-between min-w-0">
                      <span className={cn(
                        "font-medium truncate",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {item.label}
                      </span>
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className={cn(
                            "ml-2 text-xs",
                            item.id === "ai-assistant" 
                              ? "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
                              : item.id === "messages"
                              ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                              : item.id === "notifications"
                              ? "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  )}
                </button>
                
                {/* Tooltip for collapsed state - Shows badge info in tooltip only */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-card border border-border rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap">
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                    {item.badge && (
                      <Badge className="ml-2 text-xs bg-primary/20 text-primary">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Sign Out Button - At the bottom */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="relative group">
            <button className={cn(
              "w-full flex items-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group/btn hover:scale-[1.02] border border-red-200 dark:border-red-800",
              isCollapsed ? "p-2.5 justify-center" : "gap-3 p-3"
            )}>
              <div className={cn(
                "flex items-center justify-center rounded-md bg-red-100 dark:bg-red-900/30 group-hover/btn:bg-red-200 dark:group-hover/btn:bg-red-900/50 transition-all duration-200",
                isCollapsed ? "size-11" : "size-12"
              )}>
                <LogOutIcon className="size-5 text-red-600 dark:text-red-400" />
              </div>
              {!isCollapsed && (
                <span className="font-medium text-red-600 dark:text-red-400 group-hover/btn:text-red-700 dark:group-hover/btn:text-red-300 transition-colors">
                  Sign Out
                </span>
              )}
            </button>
            
            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-card border border-red-200 dark:border-red-800 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap">
                <span className="text-sm font-medium text-red-600 dark:text-red-400">Sign Out</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}