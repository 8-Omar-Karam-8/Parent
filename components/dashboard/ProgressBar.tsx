import { cn } from "@/lib/utils"

interface ProgressBarProps {
  progress: number
  className?: string
  variant?: "default" | "success" | "warning" | "danger"
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  className,
  variant = "default"
}) => {
  const getProgressColor = () => {
    switch (variant) {
      case "success":
        return "bg-green-600 dark:bg-green-500"
      case "warning":
        return "bg-orange-500 dark:bg-orange-400"
      case "danger":
        return "bg-red-500 dark:bg-red-400"
      default:
        return "bg-primary"
    }
  }

  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-muted border border-border",
        className,
      )}
    >
      <div
        className={cn(
          "h-full rounded-full transition-all duration-500 ease-out",
          getProgressColor()
        )}
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  )
}