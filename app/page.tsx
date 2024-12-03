'use client'
import { CourseListingPageSkeleton } from '@/app/ui/skeletons';
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/dashboard')
  }, [])

  return <div></div>
}