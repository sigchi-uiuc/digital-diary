"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { updateProfile, uploadProfilePicture } from "@/lib/actions/profile"

interface UserProfile {
  id: string
  username: string
  firstName: string | null
  lastName: string | null
  email: string
  profilePicture: string | null
  createdAt: Date
  updatedAt: Date
  journalEntriesCount: number
  privateEntriesCount: number
  publicEntriesCount: number
  protectedEntriesCount: number
}

interface Props {
  initialProfile: UserProfile
}

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function EditProfileForm({ initialProfile }: Props) {
  const { update: updateSession } = useSession()
  const router = useRouter()

  const [firstName, setFirstName] = useState(initialProfile.firstName || "")
  const [lastName, setLastName] = useState(initialProfile.lastName || "")
  const [profilePicture, setProfilePicture] = useState(initialProfile.profilePicture || "")
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null)
  const [uploadingPicture, setUploadingPicture] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const displayName = () => {
    const first = firstName.trim()
    const last = lastName.trim()
    if (first && last) return `${first} ${last}`
    if (first) return first
    if (last) return last
    return initialProfile.username
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File too large. Please upload an image smaller than 5MB.")
      return
    }

    setProfilePictureFile(file)
    setUploadingPicture(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("profilePicture", file)
      const result = await uploadProfilePicture(formData)
      setProfilePicture(result.profilePicture)
      await updateSession()
      setSuccess("Profile picture updated!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload profile picture")
    } finally {
      setUploadingPicture(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSuccess("")

    try {
      await updateProfile({
        firstName: firstName.trim() || undefined,
        lastName: lastName.trim() || undefined,
      })
      await updateSession()
      setSuccess("Profile updated! Redirecting...")
      setTimeout(() => router.push("/"), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen relative z-10">
      <nav className="glass-strong sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link
              href="/"
              className="glass rounded-2xl px-4 py-2 text-sm font-medium text-[#1a4d3e] hover:bg-white/40 transition-all"
            >
              ← Digital Diary
            </Link>
            <span className="text-sm text-[#1a4d3e]/70">
              Welcome, {displayName()}!
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="panel-soft overflow-hidden">
            <div className="px-6 py-5 border-b border-white/20">
              <h1 className="text-2xl font-bold text-[#1a4d3e]">Edit Profile</h1>
              <p className="mt-1 text-sm text-[#1a4d3e]/60">
                Update your personal information and profile settings
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className="glass-strong rounded-2xl border border-red-200/50 p-4">
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              )}
              {success && (
                <div className="glass rounded-2xl border border-[#52C9A2]/50 p-4">
                  <p className="text-[#1a4d3e] font-medium">{success}</p>
                </div>
              )}

              {/* Profile Picture */}
              <div>
                <label className="block text-sm font-medium text-[#1a4d3e] mb-3">
                  Profile Picture
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                    {profilePicture ? (
                      <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#4A90E2] to-[#52C9A2] flex items-center justify-center text-white text-xl font-bold">
                        {displayName().charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleFileChange}
                        disabled={uploadingPicture}
                        id="profile-picture-upload"
                      />
                      <label
                        htmlFor="profile-picture-upload"
                        className={`input-glass block w-full px-4 py-3 cursor-pointer hover:bg-white/85 transition-colors ${
                          uploadingPicture ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#1a4d3e]">
                            {uploadingPicture
                              ? "Uploading..."
                              : profilePictureFile
                              ? profilePictureFile.name
                              : "Choose Profile Picture"}
                          </span>
                          <svg className="w-4 h-4 text-[#1a4d3e]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                      </label>
                    </div>
                    <p className="mt-1 text-xs text-[#1a4d3e]/50">
                      JPEG, PNG, GIF, or WebP — max 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#1a4d3e] mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="input-glass w-full px-4 py-3 focus:ring-2 focus:ring-[#4A90E2]"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-[#1a4d3e] mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="input-glass w-full px-4 py-3 focus:ring-2 focus:ring-[#4A90E2]"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              {/* Username (read-only) */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-[#1a4d3e] mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  disabled
                  className="input-glass w-full px-4 py-3 opacity-60 cursor-not-allowed"
                  value={initialProfile.username}
                />
                <p className="mt-1 text-xs text-[#1a4d3e]/50">
                  Username is derived from your email and is read-only
                </p>
              </div>

              {/* Email (read-only) */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#1a4d3e] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  disabled
                  className="input-glass w-full px-4 py-3 opacity-60 cursor-not-allowed"
                  value={initialProfile.email}
                />
                <p className="mt-1 text-xs text-[#1a4d3e]/50">
                  Email cannot be changed for security reasons
                </p>
              </div>

              {/* Stats */}
              <div className="panel-soft p-5">
                <h3 className="text-sm font-semibold text-[#1a4d3e] mb-4">Account Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] bg-clip-text text-transparent">
                      {initialProfile.journalEntriesCount}
                    </div>
                    <div className="text-xs text-[#1a4d3e]/60 mt-1">Total</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-[#52C9A2] to-[#63D4B3] bg-clip-text text-transparent">
                      {initialProfile.publicEntriesCount}
                    </div>
                    <div className="text-xs text-[#1a4d3e]/60 mt-1">Public</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-[#FFD93D] to-[#FFE66D] bg-clip-text text-transparent">
                      {initialProfile.protectedEntriesCount}
                    </div>
                    <div className="text-xs text-[#1a4d3e]/60 mt-1">Protected</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#1a4d3e]/50">
                      {initialProfile.privateEntriesCount}
                    </div>
                    <div className="text-xs text-[#1a4d3e]/60 mt-1">Private</div>
                  </div>
                </div>
                <div className="mt-4 text-xs text-[#1a4d3e]/50 text-center">
                  Member since {formatDate(initialProfile.createdAt)}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-white/20">
                <Link
                  href="/"
                  className="glass rounded-2xl px-4 py-2 text-sm font-medium text-[#1a4d3e] hover:bg-white/40 transition-all"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-glossy rounded-2xl px-6 py-2.5 text-white font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
