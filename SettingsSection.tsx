"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { ChildData } from "./types"
import {
  SettingsIcon,
  MoonIcon,
  SunIcon,
  BellIcon,
  ShieldIcon,
  UserIcon,
  VolumeXIcon,
  Volume2Icon,
  MonitorIcon,
  SmartphoneIcon,
  MailIcon,
  MessageSquareIcon,
  EyeIcon,
  EyeOffIcon,
  KeyIcon,
  CreditCardIcon,
  HelpCircleIcon,
  InfoIcon,
  LogOutIcon,
  DownloadIcon,
  TrashIcon,
  RefreshCwIcon,
  ArrowLeftIcon,
  CheckIcon,
  XIcon,
  PlusIcon,
  EditIcon,
  SaveIcon
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SettingsSectionProps {
  childrenData: ChildData[]
  onBackToDashboard?: () => void
}

type ThemeMode = "light" | "dark" | "system"

export const SettingsSection: React.FC<SettingsSectionProps> = ({ 
  childrenData, 
  onBackToDashboard
}) => {
  const [activeTab, setActiveTab] = useState("appearance")
  const [theme, setTheme] = useState<ThemeMode>("light")
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    progressUpdates: true,
    weeklyReports: true,
    achievements: true,
    alerts: true,
    reminders: true
  })
  const [privacy, setPrivacy] = useState({
    profileVisibility: "private",
    dataSharing: false,
    analytics: true,
    childDataProtection: true
  })
  const [preferences, setPreferences] = useState({
    language: "English",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    soundEnabled: true,
    volume: [75],
    autoSave: true,
    compactMode: false
  })
  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    role: "Premium Parent"
  })
  const [isEditing, setIsEditing] = useState(false)
  const [tempProfile, setTempProfile] = useState(profile)

  // Apply theme changes
  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.remove("light")
      root.classList.add("dark")
    } else if (theme === "light") {
      root.classList.remove("dark")
      root.classList.add("light")
    } else {
      // System preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      root.classList.remove("light", "dark")
      if (prefersDark) {
        root.classList.add("dark")
      } else {
        root.classList.add("light")
      }
    }
  }, [theme])

  const settingsTabs = [
    {
      id: "appearance",
      label: "Appearance",
      icon: theme === "dark" ? MoonIcon : SunIcon,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "icon-bg-purple",
      borderColor: "border-theme-purple"
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: BellIcon,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "icon-bg-blue",
      borderColor: "border-theme-blue",
      badge: Object.values(notifications).filter(Boolean).length
    },
    {
      id: "privacy",
      label: "Privacy & Security",
      icon: ShieldIcon,
      color: "text-green-600 dark:text-green-400",
      bgColor: "icon-bg-green",
      borderColor: "border-theme-green"
    },
    {
      id: "profile",
      label: "Profile",
      icon: UserIcon,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "icon-bg-orange",
      borderColor: "border-theme-orange"
    },
    {
      id: "preferences",
      label: "Preferences",
      icon: SettingsIcon,
      color: "text-cyan-600 dark:text-cyan-400",
      bgColor: "icon-bg-cyan",
      borderColor: "border-theme-cyan"
    },
    {
      id: "account",
      label: "Account",
      icon: CreditCardIcon,
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "icon-bg-pink",
      borderColor: "border-theme-pink"
    }
  ]

  const handleSaveProfile = () => {
    setProfile(tempProfile)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setTempProfile(profile)
    setIsEditing(false)
  }

  const renderAppearanceSettings = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Theme Settings</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {[
              { 
                mode: "light" as ThemeMode, 
                icon: SunIcon, 
                label: "Light", 
                desc: "Clean and bright",
                bgColor: "bg-yellow-50 dark:bg-yellow-900/10",
                borderColor: "border-yellow-200 dark:border-yellow-800",
                iconColor: "text-yellow-600 dark:text-yellow-400"
              },
              { 
                mode: "dark" as ThemeMode, 
                icon: MoonIcon, 
                label: "Dark", 
                desc: "Easy on the eyes",
                bgColor: "bg-slate-50 dark:bg-slate-900/10",
                borderColor: "border-slate-200 dark:border-slate-800",
                iconColor: "text-slate-600 dark:text-slate-400"
              },
              { 
                mode: "system" as ThemeMode, 
                icon: MonitorIcon, 
                label: "System", 
                desc: "Match device",
                bgColor: "bg-blue-50 dark:bg-blue-900/10",
                borderColor: "border-blue-200 dark:border-blue-800",
                iconColor: "text-blue-600 dark:text-blue-400"
              }
            ].map(({ mode, icon: Icon, label, desc, bgColor, borderColor, iconColor }) => (
              <button
                key={mode}
                onClick={() => setTheme(mode)}
                className={cn(
                  "p-6 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] text-center",
                  theme === mode
                    ? "border-primary bg-primary/10 shadow-lg ring-2 ring-primary/20"
                    : `border-border bg-card hover:bg-accent/50 ${borderColor}`
                )}
              >
                <div className={cn(
                  "size-12 rounded-lg flex items-center justify-center mx-auto mb-3",
                  theme === mode ? "bg-primary/20" : bgColor
                )}>
                  <Icon className={cn(
                    "size-6",
                    theme === mode ? "text-primary" : iconColor
                  )} />
                </div>
                <h4 className="font-semibold text-foreground mb-1">{label}</h4>
                <p className="text-sm text-muted-foreground">{desc}</p>
                {theme === mode && (
                  <div className="mt-3 flex justify-center">
                    <CheckIcon className="size-5 text-primary" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Display Options</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
            <div>
              <h4 className="font-medium text-foreground">Compact Mode</h4>
              <p className="text-sm text-muted-foreground">Reduce spacing and padding for more content</p>
            </div>
            <Switch
              checked={preferences.compactMode}
              onCheckedChange={(checked) => 
                setPreferences(prev => ({ ...prev, compactMode: checked }))
              }
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Notification Channels</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { 
              key: "email", 
              icon: MailIcon, 
              label: "Email Notifications", 
              desc: "Receive updates via email",
              bgColor: "icon-bg-red",
              iconColor: "text-red-600 dark:text-red-400"
            },
            { 
              key: "push", 
              icon: SmartphoneIcon, 
              label: "Push Notifications", 
              desc: "Browser and mobile alerts",
              bgColor: "icon-bg-blue",
              iconColor: "text-blue-600 dark:text-blue-400"
            },
            { 
              key: "sms", 
              icon: MessageSquareIcon, 
              label: "SMS Notifications", 
              desc: "Text message alerts",
              bgColor: "icon-bg-green",
              iconColor: "text-green-600 dark:text-green-400"
            }
          ].map(({ key, icon: Icon, label, desc, bgColor, iconColor }) => (
            <div key={key} className="p-4 rounded-lg bg-card border border-border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg", bgColor)}>
                    <Icon className={cn("size-5", iconColor)} />
                  </div>
                  <h4 className="font-medium text-foreground">{label}</h4>
                </div>
                <Switch
                  checked={notifications[key as keyof typeof notifications] as boolean}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, [key]: checked }))
                  }
                />
              </div>
              <p className="text-sm text-muted-foreground ml-11">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Notification Types</h3>
        <div className="space-y-3">
          {[
            { key: "progressUpdates", label: "Progress Updates", desc: "Daily learning progress reports" },
            { key: "weeklyReports", label: "Weekly Reports", desc: "Comprehensive weekly summaries" },
            { key: "achievements", label: "Achievements", desc: "Celebrate your children's milestones" },
            { key: "alerts", label: "Important Alerts", desc: "Urgent notifications requiring attention" },
            { key: "reminders", label: "Study Reminders", desc: "Scheduled study and quiz reminders" }
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
              <div>
                <h4 className="font-medium text-foreground">{label}</h4>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
              <Switch
                checked={notifications[key as keyof typeof notifications] as boolean}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, [key]: checked }))
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Sound Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-3">
              <div className={cn("p-2 rounded-lg", preferences.soundEnabled ? "icon-bg-green" : "icon-bg-gray")}>
                {preferences.soundEnabled ? (
                  <Volume2Icon className="size-5 text-green-600 dark:text-green-400" />
                ) : (
                  <VolumeXIcon className="size-5 text-gray-600 dark:text-gray-400" />
                )}
              </div>
              <div>
                <h4 className="font-medium text-foreground">Sound Effects</h4>
                <p className="text-sm text-muted-foreground">Enable notification sounds</p>
              </div>
            </div>
            <Switch
              checked={preferences.soundEnabled}
              onCheckedChange={(checked) => 
                setPreferences(prev => ({ ...prev, soundEnabled: checked }))
              }
            />
          </div>

          {preferences.soundEnabled && (
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-foreground">Volume Level</h4>
                <span className="text-sm text-muted-foreground">{preferences.volume[0]}%</span>
              </div>
              <Slider
                value={preferences.volume}
                onValueChange={(value) => 
                  setPreferences(prev => ({ ...prev, volume: value }))
                }
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderPrivacySettings = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Privacy Controls</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg icon-bg-blue">
                  <EyeIcon className="size-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-medium text-foreground">Profile Visibility</h4>
              </div>
              <select
                value={privacy.profileVisibility}
                onChange={(e) => setPrivacy(prev => ({ ...prev, profileVisibility: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="private">Private</option>
                <option value="friends">Friends Only</option>
                <option value="public">Public</option>
              </select>
            </div>
            <p className="text-sm text-muted-foreground ml-11">Control who can see your profile information</p>
          </div>

          {[
            { 
              key: "dataSharing", 
              icon: ShieldIcon, 
              label: "Data Sharing", 
              desc: "Share anonymized data for research",
              bgColor: "icon-bg-green",
              iconColor: "text-green-600 dark:text-green-400"
            },
            { 
              key: "analytics", 
              icon: InfoIcon, 
              label: "Usage Analytics", 
              desc: "Help improve the platform with usage data",
              bgColor: "icon-bg-cyan",
              iconColor: "text-cyan-600 dark:text-cyan-400"
            },
            { 
              key: "childDataProtection", 
              icon: UserIcon, 
              label: "Child Data Protection", 
              desc: "Enhanced protection for children's data",
              bgColor: "icon-bg-orange",
              iconColor: "text-orange-600 dark:text-orange-400"
            }
          ].map(({ key, icon: Icon, label, desc, bgColor, iconColor }) => (
            <div key={key} className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-lg", bgColor)}>
                  <Icon className={cn("size-5", iconColor)} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{label}</h4>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
              <Switch
                checked={privacy[key as keyof typeof privacy] as boolean}
                onCheckedChange={(checked) => 
                  setPrivacy(prev => ({ ...prev, [key]: checked }))
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Security</h3>
        <div className="space-y-3">
          <button className="w-full p-4 rounded-lg bg-card border border-border hover:bg-accent transition-colors text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg icon-bg-yellow">
                <KeyIcon className="size-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Change Password</h4>
                <p className="text-sm text-muted-foreground">Update your account password</p>
              </div>
            </div>
          </button>

          <button className="w-full p-4 rounded-lg bg-card border border-border hover:bg-accent transition-colors text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg icon-bg-green">
                <ShieldIcon className="size-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )

  const renderProfileSettings = () => (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground">Profile Information</h3>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <EditIcon className="size-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSaveProfile}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                <SaveIcon className="size-4" />
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-colors"
              >
                <XIcon className="size-4" />
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempProfile.name}
                  onChange={(e) => setTempProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              ) : (
                <div className="px-4 py-3 rounded-lg bg-card border border-border text-foreground">
                  {profile.name}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  value={tempProfile.email}
                  onChange={(e) => setTempProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              ) : (
                <div className="px-4 py-3 rounded-lg bg-card border border-border text-foreground">
                  {profile.email}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={tempProfile.phone}
                  onChange={(e) => setTempProfile(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              ) : (
                <div className="px-4 py-3 rounded-lg bg-card border border-border text-foreground">
                  {profile.phone}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Account Type</label>
              <div className="px-4 py-3 rounded-lg bg-card border border-border">
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  {profile.role}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Children Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {childrenData.map((child) => (
            <div key={child.id} className="p-4 rounded-lg bg-card border border-border">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={child.avatarSrc}
                  alt={child.name}
                  className="size-10 rounded-full object-cover ring-2 ring-border"
                />
                <div>
                  <h4 className="font-medium text-foreground">{child.name}</h4>
                  <p className="text-sm text-muted-foreground">{child.gradeLevel}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Progress:</span>
                  <span className="font-medium text-foreground">{child.courseCompletion}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quiz Average:</span>
                  <span className="font-medium text-foreground">{child.quizAverage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPreferencesSettings = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">General Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Language</label>
              <select
                value={preferences.language}
                onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="English">English</option>
                <option value="Spanish">Español</option>
                <option value="French">Français</option>
                <option value="German">Deutsch</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Timezone</label>
              <select
                value={preferences.timezone}
                onChange={(e) => setPreferences(prev => ({ ...prev, timezone: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Date Format</label>
              <select
                value={preferences.dateFormat}
                onChange={(e) => setPreferences(prev => ({ ...prev, dateFormat: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
              <div>
                <h4 className="font-medium text-foreground">Auto-Save</h4>
                <p className="text-sm text-muted-foreground">Automatically save changes</p>
              </div>
              <Switch
                checked={preferences.autoSave}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, autoSave: checked }))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAccountSettings = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Subscription & Billing</h3>
        <div className="p-6 rounded-lg bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-semibold text-foreground">Premium Parent Plan</h4>
              <p className="text-muted-foreground">Full access to all features</p>
            </div>
            <Badge className="bg-primary text-primary-foreground">Active</Badge>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Next billing:</span>
              <p className="font-medium text-foreground">December 15, 2024</p>
            </div>
            <div>
              <span className="text-muted-foreground">Amount:</span>
              <p className="font-medium text-foreground">$29.99/month</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Data Management</h3>
        <div className="space-y-3">
          <button className="w-full p-4 rounded-lg bg-card border border-border hover:bg-accent transition-colors text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg icon-bg-blue">
                <DownloadIcon className="size-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Export Data</h4>
                <p className="text-sm text-muted-foreground">Download all your data and reports</p>
              </div>
            </div>
          </button>

          <button className="w-full p-4 rounded-lg bg-card border border-border hover:bg-accent transition-colors text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg icon-bg-green">
                <RefreshCwIcon className="size-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Sync Data</h4>
                <p className="text-sm text-muted-foreground">Synchronize across all devices</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Danger Zone</h3>
        <div className="space-y-3">
          <button className="w-full p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                <TrashIcon className="size-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h4 className="font-medium text-red-700 dark:text-red-300">Delete Account</h4>
                <p className="text-sm text-red-600 dark:text-red-400">Permanently delete your account and all data</p>
              </div>
            </div>
          </button>

          <button className="w-full p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <LogOutIcon className="size-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h4 className="font-medium text-orange-700 dark:text-orange-300">Sign Out All Devices</h4>
                <p className="text-sm text-orange-600 dark:text-orange-400">Sign out from all logged-in devices</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case "appearance":
        return renderAppearanceSettings()
      case "notifications":
        return renderNotificationSettings()
      case "privacy":
        return renderPrivacySettings()
      case "profile":
        return renderProfileSettings()
      case "preferences":
        return renderPreferencesSettings()
      case "account":
        return renderAccountSettings()
      default:
        return renderAppearanceSettings()
    }
  }

  return (
    <div className="w-full h-full bg-background">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToDashboard}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <ArrowLeftIcon className="size-6 text-muted-foreground" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl icon-bg-purple border-theme-purple">
              <SettingsIcon className="size-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">Settings</h1>
              <p className="text-muted-foreground">
                Customize your experience and manage your account
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Interface */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 180px)' }}>
        <div className="flex h-full">
          {/* Settings Sidebar */}
          <div className="w-80 border-r border-border bg-muted/30 flex flex-col">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Settings Menu</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-2 pb-6">
              {settingsTabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200 hover:scale-[1.01] text-left",
                      isActive
                        ? "bg-primary/10 border border-primary/20 shadow-sm"
                        : "hover:bg-accent/50"
                    )}
                  >
                    <div className={cn(
                      "flex items-center justify-center size-10 rounded-lg transition-all duration-200",
                      isActive ? "bg-primary/20" : tab.bgColor
                    )}>
                      <Icon className={cn("size-5", isActive ? "text-primary" : tab.color)} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={cn(
                          "font-medium truncate",
                          isActive ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {tab.label}
                        </span>
                        {tab.badge && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {tab.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-8">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}