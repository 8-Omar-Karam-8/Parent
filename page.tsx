"use client"

import { useState } from "react"
import { ParentDashboardGrid } from "@/components/dashboard/ParentDashboardGrid"
import { MessagesSection } from "@/components/dashboard/MessagesSection"
import { SettingsSection } from "@/components/dashboard/SettingsSection"
import { NotificationsSection } from "@/components/dashboard/NotificationsSection"
import { Sidebar } from "@/components/navigation/Sidebar"
import { RafiqAIChatbot } from "@/components/dashboard/RafiqAIChatbot"
import { ChildData } from "@/components/dashboard/types"

const sampleChildrenData: ChildData[] = [
  {
    id: "1",
    name: "Emma Rodriguez",
    avatarSrc: "https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
    gradeLevel: "5th Grade",
    courseCompletion: 85,
    quizAverage: 92,
    studyStreaks: 18,
    moodEmoji: "😊",
    status: "Improving",
    nextQuizDate: "Nov 2",
    nextQuizSubject: "Mathematics",
    alerts: [],
    recentActivity: {
      completedLessons: 12,
      hoursStudied: 8.5,
      badgesEarned: 3
    }
  },
  {
    id: "2",
    name: "Marcus Thompson",
    avatarSrc: "https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
    gradeLevel: "7th Grade", 
    courseCompletion: 94,
    quizAverage: 96,
    studyStreaks: 25,
    moodEmoji: "😎",
    status: "Stable",
    nextQuizDate: "Nov 5",
    nextQuizSubject: "Science",
    alerts: [],
    recentActivity: {
      completedLessons: 15,
      hoursStudied: 12,
      badgesEarned: 5
    }
  },
  {
    id: "3", 
    name: "Sophia Chen",
    avatarSrc: "https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
    gradeLevel: "3rd Grade",
    courseCompletion: 48,
    quizAverage: 67,
    studyStreaks: 4,
    moodEmoji: "😓",
    status: "Needs attention",
    nextQuizDate: "Nov 1",
    nextQuizSubject: "Reading",
    alerts: ["Study Drop", "Missed Quiz"],
    tooltip: "Reading comprehension scores dropped 15% this week. Consider additional practice sessions.",
    recentActivity: {
      completedLessons: 5,
      hoursStudied: 3.5,
      badgesEarned: 1
    }
  },
  {
    id: "4",
    name: "Alexander Kim",
    avatarSrc: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1", 
    gradeLevel: "6th Grade",
    courseCompletion: 78,
    quizAverage: 88,
    studyStreaks: 14,
    moodEmoji: "🤔",
    status: "Stable",
    nextQuizDate: "Nov 7",
    nextQuizSubject: "History",
    alerts: [],
    recentActivity: {
      completedLessons: 10,
      hoursStudied: 7,
      badgesEarned: 2
    }
  },
  {
    id: "5",
    name: "Isabella Martinez",
    avatarSrc: "https://images.pexels.com/photos/1845208/pexels-photo-1845208.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
    gradeLevel: "4th Grade", 
    courseCompletion: 91,
    quizAverage: 93,
    studyStreaks: 22,
    moodEmoji: "😄",
    status: "Improving",
    nextQuizDate: "Nov 3",
    nextQuizSubject: "Art",
    alerts: [],
    recentActivity: {
      completedLessons: 14,
      hoursStudied: 9,
      badgesEarned: 4
    }
  }
]

type ViewType = "dashboard" | "messages" | "settings" | "notifications"

export default function Home() {
  const [isAIOpen, setIsAIOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentView, setCurrentView] = useState<ViewType>("dashboard")

  const handleAIToggle = () => {
    setIsAIOpen(!isAIOpen)
  }

  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed)
  }

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view)
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "messages":
        return (
          <MessagesSection
            childrenData={sampleChildrenData}
            onBackToDashboard={() => setCurrentView("dashboard")}
          />
        )
      case "settings":
        return (
          <SettingsSection
            childrenData={sampleChildrenData}
            onBackToDashboard={() => setCurrentView("dashboard")}
          />
        )
      case "notifications":
        return (
          <NotificationsSection
            childrenData={sampleChildrenData}
            onBackToDashboard={() => setCurrentView("dashboard")}
          />
        )
      default:
        return (
          <ParentDashboardGrid
            childrenData={sampleChildrenData}
            sidebarCollapsed={sidebarCollapsed}
            onViewChange={handleViewChange}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        onAIToggle={handleAIToggle} 
        onToggle={handleSidebarToggle}
        onViewChange={handleViewChange}
        currentView={currentView}
        childrenData={sampleChildrenData}
      />
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-80'}`}>
        <div className="min-h-screen p-6">
          <div className="w-full max-w-7xl mx-auto">
            {renderCurrentView()}
          </div>
        </div>
      </div>
      <RafiqAIChatbot isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
    </div>
  )
}