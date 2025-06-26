"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ChildData } from "./types"
import {
  SendIcon,
  SearchIcon,
  FilterIcon,
  MoreVerticalIcon,
  PinIcon,
  StarIcon,
  ClockIcon,
  CheckCheckIcon,
  PhoneIcon,
  VideoIcon,
  PlusIcon,
  BookOpenIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
  SmileIcon,
  PaperclipIcon,
  MicIcon,
  ImageIcon,
  ArrowLeftIcon,
  MessageSquareIcon
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  childId: string
  childName: string
  childAvatar: string
  content: string
  timestamp: Date
  isRead: boolean
  isFromParent: boolean
  type: "text" | "progress" | "alert" | "achievement"
  attachments?: string[]
  isPinned?: boolean
  isStarred?: boolean
}

interface MessagesProps {
  childrenData: ChildData[]
  onBackToDashboard?: () => void
}

export const MessagesSection: React.FC<MessagesProps> = ({ 
  childrenData, 
  onBackToDashboard
}) => {
  const [selectedChild, setSelectedChild] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "unread" | "pinned" | "starred">("all")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Sample messages data
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      childId: "1",
      childName: "Emma Rodriguez",
      childAvatar: "https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
      content: "Great job on completing your math homework! You've improved so much this week. 🎉",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true,
      isFromParent: true,
      type: "achievement",
      isPinned: false,
      isStarred: true
    },
    {
      id: "2",
      childId: "3",
      childName: "Sophia Chen",
      childAvatar: "https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
      content: "I noticed you missed your reading quiz yesterday. Let's schedule some extra practice time together. 📚",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: false,
      isFromParent: true,
      type: "alert",
      isPinned: true,
      isStarred: false
    },
    {
      id: "3",
      childId: "2",
      childName: "Marcus Thompson",
      childAvatar: "https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
      content: "Your 25-day study streak is amazing! Keep up the excellent work. Maybe we can celebrate this weekend? 🏆",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      isRead: true,
      isFromParent: true,
      type: "achievement",
      isPinned: false,
      isStarred: true
    },
    {
      id: "4",
      childId: "4",
      childName: "Alexander Kim",
      childAvatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
      content: "Your history project looks fascinating! I'd love to hear more about what you've learned. 🏛️",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      isRead: true,
      isFromParent: true,
      type: "text",
      isPinned: false,
      isStarred: false
    },
    {
      id: "5",
      childId: "5",
      childName: "Isabella Martinez",
      childAvatar: "https://images.pexels.com/photos/1845208/pexels-photo-1845208.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
      content: "Your art project is beautiful! You're so creative. Can't wait to see it displayed at home. 🎨",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      isRead: false,
      isFromParent: true,
      type: "achievement",
      isPinned: false,
      isStarred: false
    }
  ])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when child is selected
  useEffect(() => {
    if (selectedChild && inputRef.current) {
      inputRef.current.focus()
    }
  }, [selectedChild])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChild) return

    const selectedChildData = childrenData.find(child => child.id === selectedChild)
    if (!selectedChildData) return

    const message: Message = {
      id: Date.now().toString(),
      childId: selectedChild,
      childName: selectedChildData.name,
      childAvatar: selectedChildData.avatarSrc,
      content: newMessage.trim(),
      timestamp: new Date(),
      isRead: true,
      isFromParent: true,
      type: "text"
    }

    setMessages(prev => [...prev, message])
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getMessageIcon = (type: Message["type"]) => {
    switch (type) {
      case "progress":
        return <TrendingUpIcon className="size-4 text-blue-600 dark:text-blue-400" />
      case "alert":
        return <AlertTriangleIcon className="size-4 text-orange-600 dark:text-orange-400" />
      case "achievement":
        return <StarIcon className="size-4 text-yellow-600 dark:text-yellow-400" />
      default:
        return <BookOpenIcon className="size-4 text-gray-600 dark:text-gray-400" />
    }
  }

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.childName.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = () => {
      switch (filterType) {
        case "unread":
          return !message.isRead
        case "pinned":
          return message.isPinned
        case "starred":
          return message.isStarred
        default:
          return true
      }
    }

    return matchesSearch && matchesFilter()
  })

  const selectedChildMessages = selectedChild 
    ? filteredMessages.filter(msg => msg.childId === selectedChild)
    : []

  const unreadCount = messages.filter(msg => !msg.isRead).length

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
            <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <MessageSquareIcon className="size-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">Messages</h1>
              <p className="text-muted-foreground">
                Communicate with your children about their learning progress
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Messages Interface - Much Larger */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 180px)' }}>
        <div className="flex h-full">
          {/* Children List Sidebar - Slightly Narrower */}
          <div className="w-80 border-r border-border bg-muted/30 flex flex-col">
            {/* Search and Filter */}
            <div className="p-4 border-b border-border">
              <div className="space-y-3">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <div className="flex gap-1.5">
                  {["all", "unread", "pinned", "starred"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setFilterType(filter as any)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize",
                        filterType === filter
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted text-muted-foreground hover:bg-accent"
                      )}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Children List - Enhanced */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {childrenData.map((child) => {
                const childMessages = filteredMessages.filter(msg => msg.childId === child.id)
                const lastMessage = childMessages[childMessages.length - 1]
                const unreadChildMessages = childMessages.filter(msg => !msg.isRead).length

                return (
                  <button
                    key={child.id}
                    onClick={() => setSelectedChild(child.id)}
                    className={cn(
                      "w-full p-4 rounded-xl border transition-all duration-200 hover:scale-[1.01] text-left group",
                      selectedChild === child.id
                        ? "bg-primary/10 border-primary/20 shadow-sm ring-1 ring-primary/10"
                        : "bg-card border-border hover:bg-accent/50 hover:shadow-sm"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Image
                          src={child.avatarSrc}
                          alt={child.name}
                          width={48}
                          height={48}
                          className="size-12 rounded-full object-cover ring-2 ring-border group-hover:ring-primary/20 transition-all"
                        />
                        <div className="absolute -bottom-1 -right-1 size-4 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
                          <BookOpenIcon className="size-2 text-blue-800 dark:text-blue-600" />
                        </div>
                        {unreadChildMessages > 0 && (
                          <div className="absolute -top-1 -left-1 size-5 rounded-full bg-red-500 flex items-center justify-center">
                            <span className="text-xs font-bold text-white">{unreadChildMessages}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-foreground truncate">{child.name}</h3>
                          {lastMessage && (
                            <span className="text-xs text-muted-foreground">
                              {lastMessage.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{child.gradeLevel}</p>
                        {lastMessage && (
                          <div className="flex items-center gap-2">
                            {getMessageIcon(lastMessage.type)}
                            <p className="text-xs text-muted-foreground truncate flex-1">
                              {lastMessage.content.substring(0, 35)}...
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Chat Area - Much Larger */}
          <div className="flex-1 flex flex-col">
            {selectedChild ? (
              <>
                {/* Chat Header - More Compact */}
                <div className="p-4 border-b border-border bg-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {(() => {
                        const child = childrenData.find(c => c.id === selectedChild)
                        return child ? (
                          <>
                            <div className="relative">
                              <Image
                                src={child.avatarSrc}
                                alt={child.name}
                                width={40}
                                height={40}
                                className="size-10 rounded-full object-cover ring-2 ring-border"
                              />
                              <div className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-green-500 border-2 border-card" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">{child.name}</h3>
                              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                                <div className="size-1.5 rounded-full bg-green-500" />
                                {child.gradeLevel} • Online
                              </p>
                            </div>
                          </>
                        ) : null
                      })()}
                    </div>

                    <div className="flex items-center gap-1">
                      <button className="p-2.5 rounded-full hover:bg-accent transition-colors">
                        <VideoIcon className="size-4 text-muted-foreground" />
                      </button>
                      <button className="p-2.5 rounded-full hover:bg-accent transition-colors">
                        <PhoneIcon className="size-4 text-muted-foreground" />
                      </button>
                      <button className="p-2.5 rounded-full hover:bg-accent transition-colors">
                        <MoreVerticalIcon className="size-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages Area - Much Larger */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-muted/20">
                  {selectedChildMessages.map((message, index) => (
                    <div key={message.id} className="flex gap-4 group">
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary flex-shrink-0 shadow-sm">
                        <BookOpenIcon className="size-5 text-primary-foreground" />
                      </div>
                      
                      <div className="max-w-[75%] flex-1">
                        <div className="rounded-2xl rounded-tl-md p-5 bg-card text-foreground border border-border shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-2 mb-3">
                            {getMessageIcon(message.type)}
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                              {message.type}
                            </span>
                            <div className="flex-1" />
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              {message.isPinned && <PinIcon className="size-3 text-blue-600" />}
                              {message.isStarred && <StarIcon className="size-3 text-yellow-600" />}
                            </div>
                          </div>
                          <p className="leading-relaxed text-sm mb-4">{message.content}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">
                              {message.timestamp.toLocaleString([], { 
                                month: 'short', 
                                day: 'numeric',
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                            <CheckCheckIcon className="size-3 text-green-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Enhanced Input Area */}
                <div className="p-6 border-t border-border bg-card">
                  <div className="flex gap-3 items-end">
                    <div className="flex gap-2">
                      <button className="p-3 rounded-full hover:bg-accent transition-colors group">
                        <PaperclipIcon className="size-5 text-muted-foreground group-hover:text-foreground" />
                      </button>
                      <button className="p-3 rounded-full hover:bg-accent transition-colors group">
                        <ImageIcon className="size-5 text-muted-foreground group-hover:text-foreground" />
                      </button>
                      <button className="p-3 rounded-full hover:bg-accent transition-colors group">
                        <SmileIcon className="size-5 text-muted-foreground group-hover:text-foreground" />
                      </button>
                    </div>
                    
                    <div className="flex-1 relative">
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="w-full rounded-2xl border border-border bg-background px-6 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 shadow-sm"
                        style={{ minHeight: '56px' }}
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="p-3 rounded-full hover:bg-accent transition-colors group">
                        <MicIcon className="size-5 text-muted-foreground group-hover:text-foreground" />
                      </button>
                      <button 
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="flex items-center justify-center size-14 rounded-full bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                      >
                        <SendIcon className="size-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* No Child Selected - Enhanced */
              <div className="flex-1 flex items-center justify-center bg-muted/20">
                <div className="text-center space-y-6 max-w-md">
                  <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <MessageSquareIcon className="size-12 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-3">Select a Child to Start Messaging</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Choose a child from the sidebar to start a conversation and track their educational progress through personalized messages.
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <div className="size-2 rounded-full bg-green-500" />
                    <span>{unreadCount} unread messages</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}