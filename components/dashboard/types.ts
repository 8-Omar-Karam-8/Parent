export interface ChildData {
  id: string
  name: string
  avatarSrc: string
  gradeLevel: string
  courseCompletion: number
  quizAverage: number
  studyStreaks: number
  moodEmoji: string
  status: "Improving" | "Stable" | "Needs attention"
  nextQuizDate: string
  nextQuizSubject: string
  alerts?: ("Missed Quiz" | "Study Drop")[]
  tooltip?: string
  recentActivity?: {
    completedLessons: number
    hoursStudied: number
    badgesEarned: number
  }
}

export interface ParentDashboardCarouselProps {
  childrenData: ChildData[]
  autoplayDelay?: number
  showPagination?: boolean
  showNavigation?: boolean
}