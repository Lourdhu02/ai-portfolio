export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  tags: string[]
  thumbnail: string
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
  category: string
  tech: string[]
  architecture?: string
  timeline?: string
  role?: string
  impact?: string
}

export interface Experience {
  id: string
  company: string
  role: string
  startDate: string
  endDate?: string
  description: string
  highlights: string[]
  type: 'career' | 'education'
}

export interface Skill {
  name: string
  proficiency: number
  category: 'frontend' | 'ai' | 'cloud' | 'systems' | 'design'
  keywords: string[]
}

export interface Profile {
  name: string
  title: string
  subtitle: string
  bio: string
  email: string
  location: string
  avatar: string
  social: {
    github?: string
    linkedin?: string
    twitter?: string
  }
}
