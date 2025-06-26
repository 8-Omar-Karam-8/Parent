import {
  BookOpenIcon,
  FlaskConicalIcon,
  CalculatorIcon,
  LandmarkIcon,
  GlobeIcon,
  PaletteIcon,
  MusicIcon,
  UserIcon
} from "lucide-react"

export const getSubjectInfo = (subject: string) => {
  const subjectLower = subject.toLowerCase()
  
  switch (subjectLower) {
    case "math":
    case "mathematics":
      return {
        color: "text-blue-700 dark:text-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        icon: <CalculatorIcon className="mr-1 size-3" />,
      }
    case "science":
    case "biology":
    case "chemistry":
    case "physics":
      return {
        color: "text-green-700 dark:text-green-400",
        bgColor: "bg-green-50 dark:bg-green-900/20",
        icon: <FlaskConicalIcon className="mr-1 size-3" />,
      }
    case "reading":
    case "english":
    case "literature":
      return {
        color: "text-purple-700 dark:text-purple-400",
        bgColor: "bg-purple-50 dark:bg-purple-900/20",
        icon: <BookOpenIcon className="mr-1 size-3" />,
      }
    case "history":
    case "social studies":
      return {
        color: "text-orange-700 dark:text-orange-400",
        bgColor: "bg-orange-50 dark:bg-orange-900/20",
        icon: <LandmarkIcon className="mr-1 size-3" />,
      }
    case "geography":
      return {
        color: "text-cyan-700 dark:text-cyan-400",
        bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
        icon: <GlobeIcon className="mr-1 size-3" />,
      }
    case "art":
    case "arts":
      return {
        color: "text-pink-700 dark:text-pink-400",
        bgColor: "bg-pink-50 dark:bg-pink-900/20",
        icon: <PaletteIcon className="mr-1 size-3" />,
      }
    case "music":
      return {
        color: "text-indigo-700 dark:text-indigo-400",
        bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
        icon: <MusicIcon className="mr-1 size-3" />,
      }
    default:
      return {
        color: "text-muted-foreground",
        bgColor: "bg-muted/50",
        icon: <UserIcon className="mr-1 size-3" />,
      }
  }
}

export const getStatusVariant = (status: ChildData["status"]) => {
  switch (status) {
    case "Improving":
      return "success"
    case "Stable":
      return "warning"
    case "Needs attention":
      return "danger-soft"
    default:
      return "default"
  }
}

export const getMoodColor = (emoji: string) => {
  switch (emoji) {
    case "😊":
    case "😎":
    case "🤗":
    case "😄":
      return "text-green-600 dark:text-green-400"
    case "😐":
    case "🤔":
      return "text-yellow-600 dark:text-yellow-400"
    case "😓":
    case "😔":
    case "😰":
      return "text-red-600 dark:text-red-400"
    default:
      return "text-muted-foreground"
  }
}