import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

const AdminLoginClient = dynamic(() => import('./AdminLoginClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-clr-primary" />
    </div>
  ),
})

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-clr-primary" />
      </div>
    }>
      <AdminLoginClient />
    </Suspense>
  )
}