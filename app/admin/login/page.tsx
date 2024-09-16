import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

const AdminLoginClient = dynamic(() => import('./AdminLoginClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#000033] to-[#000066]">
      <Loader2 className="h-8 w-8 animate-spin text-white" />
    </div>
  ),
})

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#000033] to-[#000066]">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    }>
      <AdminLoginClient />
    </Suspense>
  )
}