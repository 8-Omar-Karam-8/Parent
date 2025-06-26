"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ProgressBar } from "./ProgressBar"
import { getSubjectInfo, getStatusVariant, getMoodColor } from "./utils"
import { ChildData } from "./types"
import {
  AlertTriangleIcon,
  ArrowDownIcon,
  TrendingUpIcon,
  ClockIcon,
  AwardIcon,
  BookOpenIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ChildCardProps {
  child: ChildData
  onClick: (child: ChildData) => void
}

export const ChildCard: React.FC<ChildCardProps> = ({ child, onClick }) => {
  const subjectInfo = getSubjectInfo(child.nextQuizSubject)

  return (
    <div
      className="group relative flex h-full w-[280px] cursor-pointer transform-gpu flex-col overflow-hidden rounded-2xl border border-border bg-card px-6 py-5 shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-[1.01] hover:shadow-md card-subtle"
      onClick={() => onClick(child)}
    >
      
      {/* Alerts with professional styling */}
      {child.alerts && child.alerts.length > 0 && (
        <div className="absolute right-3 top-3 flex flex-col gap-1 z-10">
          {child.alerts.includes("Missed Quiz") && (
            <Badge variant="destructive" className="rounded-full px-2 py-0.5 text-xs">
              <AlertTriangleIcon className="mr-1 size-3" /> Missed Quiz
            </Badge>
          )}
          {child.alerts.includes("Study Drop") && (
            <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-xs bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800">
              <ArrowDownIcon className="mr-1 size-3" /> Study Drop
            </Badge>
          )}
        </div>
      )}

      {/* Avatar Section with professional styling */}
      <div className="flex flex-col items-center pt-4 pb-2">
        <div className="group/avatar relative">
          <Image
            src={child.avatarSrc}
            alt={child.name}
            width={80}
            height={80}
            className="relative size-20 rounded-full object-cover ring-2 ring-border shadow-sm transition-all duration-200 group-hover/avatar:scale-105"
          />
          <div className="absolute -bottom-1 -right-1 size-6 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
            <BookOpenIcon className="size-3 text-blue-800 dark:text-blue-600" />
          </div>
        </div>
        <h3 className="mt-3 text-center text-xl font-semibold text-foreground tracking-tight">
          {child.name}
        </h3>
        <p className="text-sm text-muted-foreground font-medium">
          {child.gradeLevel}
        </p>
      </div>

      {/* Mood Section */}
      <div className="mb-4 flex items-center justify-center gap-2">
        <span className="text-sm text-muted-foreground font-medium">Today:</span>
        <span className="text-lg">
          {child.moodEmoji}
        </span>
      </div>

      {/* Progress Section with professional styling */}
      <div className="mb-4 flex flex-col gap-4">
        <div className="text-center">
          <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <TrendingUpIcon className="size-3" />
              Course Progress
            </span>
            <span className="font-semibold text-foreground">
              {child.courseCompletion}%
            </span>
          </div>
          <ProgressBar 
            progress={child.courseCompletion} 
            variant={child.courseCompletion >= 80 ? "success" : child.courseCompletion >= 60 ? "warning" : "danger"}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="rounded-lg bg-muted/50 p-3 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Quiz Average</p>
            <p className="font-semibold text-foreground text-lg">{child.quizAverage}%</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-3 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Study Streak</p>
            <p className="font-semibold text-foreground text-lg flex items-center justify-center gap-1">
              <AwardIcon className="size-3 text-amber-600 dark:text-amber-400" />
              {child.studyStreaks}
            </p>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-4 flex justify-center">
        <Badge
          variant={getStatusVariant(child.status)}
          className="rounded-full text-xs px-4 py-1.5 font-medium"
          title={child.status === "Needs attention" ? child.tooltip : undefined}
        >
          {child.status}
        </Badge>
      </div>

      {/* Next Quiz Section */}
      <div className="mt-auto">
        <div className="rounded-xl bg-muted/30 p-4 text-center border border-border">
          <p className="text-xs text-muted-foreground mb-2 flex items-center justify-center gap-1">
            <ClockIcon className="size-3" />
            Next Quiz
          </p>
          <p className="text-sm font-semibold text-foreground mb-3">{child.nextQuizDate}</p>
          <Badge 
            className={cn(
              "text-xs rounded-full border-border hover:bg-accent transition-colors",
              subjectInfo.color,
              subjectInfo.bgColor
            )}
          >
            {subjectInfo.icon}
            {child.nextQuizSubject}
          </Badge>
        </div>
      </div>

      {/* Professional Hover Indicator */}
      <div className="absolute bottom-4 right-4 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
        <div className="flex items-center rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary backdrop-blur-sm border border-primary/20">
          <span className="mr-1">📊</span>
          View Details
        </div>
      </div>
    </div>
  )
}