"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ProgressBar } from "./ProgressBar"
import { getSubjectInfo, getStatusVariant } from "./utils"
import { ChildData } from "./types"
import {
  XIcon,
  DownloadIcon,
  AlertTriangleIcon,
  ArrowDownIcon,
  TrendingUpIcon,
  AwardIcon,
  ClockIcon,
  BookOpenIcon,
  UserIcon,
} from "lucide-react"

interface ChildReportModalProps {
  child: ChildData | null
  onClose: () => void
}

export const ChildReportModal: React.FC<ChildReportModalProps> = ({
  child,
  onClose,
}) => {
  const [isMounted, setIsMounted] = useState(false)

  // Ensure component is mounted before rendering modal content
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Handle escape key - only when modal is open
  useEffect(() => {
    if (!child || !isMounted) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose, child, isMounted])

  // Prevent body scroll when modal is open - only when modal is open
  useEffect(() => {
    if (!child || !isMounted) return

    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [child, isMounted])

  // Don't render anything until mounted to prevent hydration issues
  if (!isMounted) {
    return null
  }

  // Don't render modal if no child is selected
  if (!child) {
    return null
  }

  const subjectInfo = getSubjectInfo(child.nextQuizSubject)

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 9999
      }}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-10 rounded-full p-2 text-foreground/70 hover:bg-accent hover:text-foreground transition-colors"
        >
          <XIcon className="size-5" />
        </button>

        <div className="p-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-primary mb-2">
              {child.name}'s Progress Report
            </h2>
            <p className="text-muted-foreground">
              Comprehensive overview of academic performance and engagement
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Profile Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Image
                  src={child.avatarSrc}
                  alt={child.name}
                  width={128}
                  height={128}
                  className="relative size-32 rounded-full object-cover ring-4 ring-border shadow-sm"
                />
                <div className="absolute -bottom-2 -right-2 rounded-full bg-card p-2 shadow-sm border border-border">
                  <span className="text-2xl">{child.moodEmoji}</span>
                </div>
                <div className="absolute -top-2 -left-2 size-8 rounded-full bg-primary flex items-center justify-center shadow-sm">
                  <UserIcon className="size-4 text-primary-foreground" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground">{child.name}</h3>
                <p className="text-muted-foreground">{child.gradeLevel}</p>
                <Badge
                  variant={getStatusVariant(child.status)}
                  className="mt-2"
                  title={child.status === "Needs attention" ? child.tooltip : undefined}
                >
                  {child.status}
                </Badge>
              </div>
            </div>

            {/* Progress Metrics */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground flex items-center gap-2">
                    <TrendingUpIcon className="size-4" />
                    Course Completion
                  </span>
                  <span className="text-lg font-semibold text-primary">
                    {child.courseCompletion}%
                  </span>
                </div>
                <ProgressBar 
                  progress={child.courseCompletion} 
                  className="h-3"
                  variant={child.courseCompletion >= 80 ? "success" : child.courseCompletion >= 60 ? "warning" : "danger"}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted/50 border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Quiz Average</p>
                  <p className="text-2xl font-semibold text-primary">{child.quizAverage}%</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50 border border-border">
                  <p className="text-sm text-muted-foreground mb-1 flex items-center justify-center gap-1">
                    <AwardIcon className="size-3" />
                    Study Streak
                  </p>
                  <p className="text-2xl font-semibold text-primary">{child.studyStreaks}</p>
                </div>
              </div>

              {child.recentActivity && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <BookOpenIcon className="size-4" />
                    Recent Activity
                  </h4>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center p-2 rounded bg-muted/50 border border-border">
                      <p className="font-medium text-primary">{child.recentActivity.completedLessons}</p>
                      <p className="text-xs text-muted-foreground">Lessons</p>
                    </div>
                    <div className="text-center p-2 rounded bg-muted/50 border border-border">
                      <p className="font-medium text-primary">{child.recentActivity.hoursStudied}h</p>
                      <p className="text-xs text-muted-foreground">Studied</p>
                    </div>
                    <div className="text-center p-2 rounded bg-muted/50 border border-border">
                      <p className="font-medium text-primary">{child.recentActivity.badgesEarned}</p>
                      <p className="text-xs text-muted-foreground">Badges</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Upcoming & Alerts */}
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <ClockIcon className="size-4" />
                  Upcoming Quiz
                </h4>
                <div className="p-4 rounded-lg border border-border bg-muted/30">
                  <p className="font-medium text-foreground mb-2">{child.nextQuizDate}</p>
                  <Badge className={`${subjectInfo.color} ${subjectInfo.bgColor}`}>
                    {subjectInfo.icon}
                    {child.nextQuizSubject}
                  </Badge>
                </div>
              </div>

              {child.alerts && child.alerts.length > 0 && (
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Active Alerts</h4>
                  <div className="space-y-2">
                    {child.alerts.includes("Missed Quiz") && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800">
                        <AlertTriangleIcon className="size-4 text-red-600 dark:text-red-400" />
                        <span className="text-sm text-red-700 dark:text-red-300">Missed recent quiz</span>
                      </div>
                    )}
                    {child.alerts.includes("Study Drop") && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-orange-50 border border-orange-200 dark:bg-orange-900/20 dark:border-orange-800">
                        <ArrowDownIcon className="size-4 text-orange-600 dark:text-orange-400" />
                        <span className="text-sm text-orange-700 dark:text-orange-300">Study time decreased</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end border-t border-border pt-6">
            <button className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              <DownloadIcon className="mr-2 size-4" /> 
              Download Full Report PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}