"use client"

import { useState, useCallback, useMemo, useRef, useEffect } from "react"
import { XIcon, SendIcon, BotIcon, ArrowLeftIcon, MoreVerticalIcon, PhoneIcon, VideoIcon } from "lucide-react"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  isTyping?: boolean
}

interface RafiqAIChatbotProps {
  isOpen: boolean
  onClose: () => void
}

export const RafiqAIChatbot: React.FC<RafiqAIChatbotProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm Rafiq, your AI educational assistant. I can help you understand your children's progress, suggest study strategies, and answer questions about their learning journey. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ])
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Enhanced AI responses based on context
  const getAIResponse = useCallback((userMessage: string): string => {
    const messageLower = userMessage.toLowerCase()
    
    // Progress-related queries
    if (messageLower.includes('progress') || messageLower.includes('performance')) {
      return "Based on your children's current data, I can see some interesting patterns! 📊\n\n✅ Emma is showing consistent improvement with an 85% course completion rate\n⚠️ Sophia might need some extra attention with her recent study drop\n🚀 Marcus is excelling with 94% completion\n\nWould you like me to create a personalized study plan for any specific child?"
    }
    
    // Study strategies
    if (messageLower.includes('study') || messageLower.includes('learn') || messageLower.includes('improve')) {
      return "Great question! Here are some proven strategies I recommend: 📚\n\n🎯 Set up consistent study schedules\n⏰ Use the Pomodoro technique (25-min focused sessions)\n🏆 Create reward systems for completed lessons\n👥 Encourage peer learning\n🎮 Gamify the learning experience\n\nWhich child would you like me to focus these strategies on?"
    }
    
    // Specific child queries
    if (messageLower.includes('emma')) {
      return "Emma is doing wonderfully! 🌟\n\n📈 85% course completion rate\n🎯 92% quiz average\n🔥 18-day study streak\n😊 Positive mood indicator\n\nShe shows great consistency! I'd suggest maintaining her current momentum and perhaps introducing more challenging materials to keep her engaged. Would you like specific subject recommendations?"
    }
    
    if (messageLower.includes('marcus')) {
      return "Marcus is absolutely excelling! 🚀\n\n📈 94% course completion rate\n🎯 96% quiz average\n🔥 25-day study streak (impressive!)\n😎 Confident and stable\n\nHe seems ready for advanced challenges. Consider enrolling him in accelerated programs or peer tutoring opportunities where he can help others too!"
    }
    
    if (messageLower.includes('sophia')) {
      return "I notice Sophia needs some extra support. 💙\n\n📊 Current status: 48% completion\n⚠️ Recent study drops detected\n📚 Reading comprehension concerns\n\nRecommended action plan:\n1️⃣ Shorter, more frequent study sessions\n2️⃣ Interactive learning games\n3️⃣ One-on-one tutoring support\n4️⃣ Identify any underlying challenges\n\nWould you like me to create a detailed recovery plan?"
    }
    
    if (messageLower.includes('alexander')) {
      return "Alexander is maintaining steady progress! 📊\n\n📈 78% completion rate\n🎯 88% quiz average\n🔥 14-day study streak\n🤔 Thoughtful learner\n\nTo boost his performance, try:\n• Incorporating his interests into learning\n• Setting achievable weekly goals\n• Adding more interactive elements\n\nWhat subjects is he most interested in?"
    }
    
    if (messageLower.includes('isabella')) {
      return "Isabella is performing excellently! ⭐\n\n📈 91% completion rate\n🎯 93% quiz average\n🔥 22-day study streak\n😄 Very positive attitude\n\nShe demonstrates strong discipline! She might benefit from:\n• Leadership opportunities\n• Helping other students\n• Advanced creative projects\n• Challenge-based learning\n\nShe's ready for the next level!"
    }
    
    // Default response with suggestions
    return "That's an interesting question! 🤔\n\nI'm continuously learning to provide better insights. Right now, I can help you with:\n\n• 📊 Analyzing your children's progress\n• 📅 Creating personalized study schedules\n• 🎯 Suggesting learning strategies\n• ⚠️ Identifying areas needing attention\n• 🎮 Recommending educational tools\n\nTry asking me something like:\n• \"How is [child's name] doing?\"\n• \"Create a study plan for this week\"\n• \"What can I do about the alerts?\"\n• \"How to improve reading skills?\"\n\nWhat would you like to explore?"
  }, [])

  const handleSendMessage = useCallback(() => {
    if (!message.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message.trim(),
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setMessage("")
    setIsTyping(true)

    // Simulate realistic typing delay based on response length
    const response = getAIResponse(userMessage.text)
    const typingDelay = Math.min(Math.max(response.length * 30, 1500), 4000)
    
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, typingDelay)
  }, [message, isTyping, getAIResponse])

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }, [handleSendMessage])

  // Quick action buttons
  const quickActions = [
    "📊 How are all my children doing?",
    "📚 Study strategies for Sophia",
    "📅 Create this week's schedule",
    "⚠️ What about the alerts?",
    "🎯 How to keep them motivated?",
    "📈 Show me progress trends"
  ]

  const handleQuickAction = useCallback((action: string) => {
    setMessage(action)
    setTimeout(() => {
      handleSendMessage()
    }, 100)
  }, [handleSendMessage])

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col animate-in slide-in-from-right duration-300">
      {/* Professional Header */}
      <div className="flex items-center justify-between border-b border-border p-4 bg-card">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-accent transition-colors"
          >
            <ArrowLeftIcon className="size-6 text-foreground" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="relative flex size-12 items-center justify-center rounded-full bg-primary shadow-sm">
              <BotIcon className="size-7 text-primary-foreground" />
              <div className="absolute -bottom-1 -right-1 size-4 rounded-full bg-green-500 border-2 border-background" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-xl">Rafiq AI Assistant</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <div className="size-2 rounded-full bg-green-500" />
                {isTyping ? "Typing..." : "Online • Educational AI"}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-3 rounded-full hover:bg-accent transition-colors">
            <VideoIcon className="size-5 text-muted-foreground" />
          </button>
          <button className="p-3 rounded-full hover:bg-accent transition-colors">
            <PhoneIcon className="size-5 text-muted-foreground" />
          </button>
          <button className="p-3 rounded-full hover:bg-accent transition-colors">
            <MoreVerticalIcon className="size-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
        {/* Welcome message with date separator */}
        <div className="flex justify-center mb-6">
          <div className="bg-muted rounded-full px-4 py-2 text-xs text-muted-foreground">
            Today
          </div>
        </div>

        {messages.map((msg, index) => (
          <div key={msg.id} className={`flex gap-3 ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
            {msg.isBot && (
              <div className="flex size-10 items-center justify-center rounded-full bg-primary flex-shrink-0 shadow-sm">
                <BotIcon className="size-5 text-primary-foreground" />
              </div>
            )}
            
            <div className={`max-w-[70%] ${msg.isBot ? 'order-2' : 'order-1'}`}>
              <div className={`rounded-2xl p-4 shadow-sm ${
                msg.isBot 
                  ? 'bg-card text-foreground border border-border rounded-tl-md' 
                  : 'bg-primary text-primary-foreground rounded-tr-md ml-auto'
              }`}>
                <p className="leading-relaxed whitespace-pre-wrap text-sm">{msg.text}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs opacity-60">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {!msg.isBot && (
                    <div className="flex gap-1">
                      <div className="size-1 rounded-full bg-current opacity-60" />
                      <div className="size-1 rounded-full bg-current opacity-60" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary flex-shrink-0 shadow-sm">
              <BotIcon className="size-5 text-primary-foreground" />
            </div>
            <div className="max-w-[70%]">
              <div className="rounded-2xl rounded-tl-md p-4 bg-card text-foreground border border-border shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="size-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="size-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="size-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-sm text-muted-foreground">Rafiq is thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions (only show when conversation is new) */}
      {messages.length === 1 && (
        <div className="p-4 border-t border-border bg-card">
          <p className="text-sm text-muted-foreground mb-3 font-medium">Quick actions to get started:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action)}
                className="text-sm px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground hover:bg-accent transition-all duration-200 hover:scale-[1.02] text-left"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isTyping}
              className="w-full rounded-2xl border border-border bg-background px-6 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 disabled:opacity-50 resize-none"
              style={{ minHeight: '52px' }}
            />
          </div>
          <button 
            onClick={handleSendMessage}
            disabled={!message.trim() || isTyping}
            className="flex items-center justify-center size-12 rounded-full bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <SendIcon className="size-5" />
          </button>
        </div>
      </div>
    </div>
  )
}