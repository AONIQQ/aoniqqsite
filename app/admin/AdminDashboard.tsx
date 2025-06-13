'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Download, Edit, LogOut, AlertCircle, Trash2, RefreshCw, Plus } from 'lucide-react'
import Image from 'next/image'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import { Textarea } from "@/components/ui/textarea"
import { HoverButton } from '@/components/ui/HoverButton'

interface Contact {
  id: number
  name: string
  email: string
  phone: string
  message: string
  created_at: string
  status: string
}

interface Lead {
  id: number
  name: string
  email: string
  phone: string
  created_at: string
  status: string
}

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  created_at: string
}

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [error, setError] = useState<string | null>(null)
  const [sortField, setSortField] = useState<keyof Contact | keyof Lead | keyof BlogPost>('created_at')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'contacts' | 'leads' | 'blog'>('contacts')
  const [newBlogPost, setNewBlogPost] = useState({ title: '', slug: '', excerpt: '', content: '' })
  const [showNewBlogPostDialog, setShowNewBlogPostDialog] = useState(false)
  const router = useRouter()

  const fetchContacts = useCallback(async () => {
    setIsRefreshing(true)
    try {
      const timestamp = new Date().getTime()
      const response = await fetch(`/api/contacts?timestamp=${timestamp}`)
      if (!response.ok) throw new Error('Failed to fetch contacts')
      const data = await response.json()
      setContacts(data.map((contact: Contact) => ({
        ...contact,
        status: contact.status || 'New'
      })))
      setError(null)
    } catch (error) {
      console.error('Error fetching contacts:', error)
      setError(error instanceof Error ? error.message : 'An error occurred while fetching contacts')
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  const fetchLeads = useCallback(async () => {
    setIsRefreshing(true)
    try {
      const timestamp = new Date().getTime()
      const response = await fetch(`/api/leads?timestamp=${timestamp}`)
      if (!response.ok) throw new Error('Failed to fetch leads')
      const data = await response.json()
      setLeads(data.map((lead: Lead) => ({
        ...lead,
        status: lead.status || 'New'
      })))
      setError(null)
    } catch (error) {
      console.error('Error fetching leads:', error)
      setError(error instanceof Error ? error.message : 'An error occurred while fetching leads')
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  const fetchBlogPosts = useCallback(async () => {
    setIsRefreshing(true)
    try {
      const timestamp = new Date().getTime()
      const response = await fetch(`/api/blog-posts?timestamp=${timestamp}`)
      if (!response.ok) throw new Error('Failed to fetch blog posts')
      const data = await response.json()
      setBlogPosts(data)
      setError(null)
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      setError(error instanceof Error ? error.message : 'An error occurred while fetching blog posts')
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchContacts()
    fetchLeads()
    fetchBlogPosts()
  }, [fetchContacts, fetchLeads, fetchBlogPosts])

  const handleSort = (field: keyof Contact | keyof Lead | keyof BlogPost) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortItems = <T extends Contact | Lead | BlogPost>(items: T[]): T[] => {
    return [...items].sort((a, b) => {
      const aValue = a[sortField as keyof T]
      const bValue = b[sortField as keyof T]
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    }).filter(item => 
      Object.values(item).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }

  const handleStatusChange = (id: number, status: string) => {
    if (activeTab === 'contacts') {
      setContacts(prevContacts =>
        prevContacts.map(contact =>
          contact.id === id ? { ...contact, status } : contact
        )
      )
    } else {
      setLeads(prevLeads =>
        prevLeads.map(lead =>
          lead.id === id ? { ...lead, status } : lead
        )
      )
    }
  }

  const handleSaveChanges = async () => {
    setIsSaving(true)
    toast.info('Saving changes...', { autoClose: false, toastId: 'saving' })

    try {
      const endpoint = activeTab === 'contacts' ? '/api/contacts/updateLeadStatus' : '/api/leads/updateLeadStatus'
      const data = activeTab === 'contacts' ? contacts : leads

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error('Failed to save changes')

      toast.dismiss('saving')
      toast.success("Changes have been saved successfully")
      if (activeTab === 'contacts') {
        await fetchContacts()
      } else {
        await fetchLeads()
      }
    } catch (error) {
      console.error('Error saving changes:', error)
      toast.dismiss('saving')
      toast.error(`Failed to save changes: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm(`Are you sure you want to delete this ${activeTab === 'blog' ? 'blog post' : activeTab === 'contacts' ? 'contact' : 'lead'}?`)) {
      try {
        const endpoint = activeTab === 'contacts' ? `/api/contacts/${id}` : activeTab === 'leads' ? `/api/leads/${id}` : `/api/blog-posts/${id}`
        const response = await fetch(endpoint, {
          method: 'DELETE',
        })

        if (!response.ok) throw new Error(`Failed to delete ${activeTab === 'blog' ? 'blog post' : activeTab === 'contacts' ? 'contact' : 'lead'}`)

        toast.success(`${activeTab === 'blog' ? 'Blog post' : activeTab === 'contacts' ? 'Contact' : 'Lead'} deleted successfully`)
        if (activeTab === 'contacts') {
          await fetchContacts()
        } else if (activeTab === 'leads') {
          await fetchLeads()
        } else {
          await fetchBlogPosts()
        }
      } catch (error) {
        console.error(`Error deleting ${activeTab === 'blog' ? 'blog post' : activeTab === 'contacts' ? 'contact' : 'lead'}:`, error)
        toast.error(`Failed to delete ${activeTab === 'blog' ? 'blog post' : activeTab === 'contacts' ? 'contact' : 'lead'}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }
  }

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('An error occurred during logout. Please try again.')
    }
  }

  const downloadCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Created At', 'Status']
    const data = activeTab === 'contacts'
      ? contacts.map(contact => [
          contact.name,
          contact.email,
          contact.phone,
          new Date(contact.created_at).toLocaleString(),
          contact.status
        ])
      : leads.map(lead => [
          lead.name,
          lead.email,
          lead.phone,
          new Date(lead.created_at).toLocaleString(),
          lead.status
        ])

    const csvContent = [
      headers.join(','),
      ...data.map(row => row.join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `${activeTab}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleCreateBlogPost = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      const response = await fetch('/api/blog-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlogPost),
      })

      if (!response.ok) throw new Error('Failed to create blog post')

      toast.success("Blog post created successfully")
      setShowNewBlogPostDialog(false)
      setNewBlogPost({ title: '', slug: '', excerpt: '', content: '' })
      await fetchBlogPosts()
    } catch (error) {
      console.error('Error creating blog post:', error)
      toast.error(`Failed to create blog post: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsSaving(false)
    }
  }

  const sortedItems = activeTab === 'contacts' 
    ? sortItems(contacts) 
    : activeTab === 'leads' 
    ? sortItems(leads) 
    : sortItems(blogPosts)

  return (
    <div className="min-h-screen bg-obsidian text-ink">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} theme="dark" />
      <header className="bg-obsidian/80 backdrop-blur-md py-4 sticky top-0 z-10 shadow-md border-b border-white-_06">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="relative w-40 h-20">
            <Image
              src="/images/aoniqqlogo.png"
              alt="Aoniqq Logo"
              width={400}
              height={400}
              className="object-contain"
              priority
            />
          </Link>
          <HoverButton onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </HoverButton>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {error && (
          <Card className="mb-8 bg-red-900/40 border-red-400/50">
            <CardContent className="p-4 flex items-center">
              <AlertCircle className="text-red-400 mr-2" />
              <p className="text-white">{error}</p>
            </CardContent>
          </Card>
        )}

        <Card className="mb-8 bg-white/5 border border-white-_06 shadow-diffused-bloom backdrop-blur-sm">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <CardTitle className="text-2xl font-bold text-white font-serif -tracking-wide">
              {activeTab === 'contacts' ? 'Contact Management' : activeTab === 'leads' ? 'Lead Management' : 'Blog Management'}
            </CardTitle>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
              <Input
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 bg-obsidian/80 border-white-_06 text-white placeholder:text-mute focus:ring-2 focus:ring-royal"
              />
              <div className="flex space-x-2">
                {activeTab !== 'blog' && (
                  <HoverButton onClick={downloadCSV}>
                    <Download className="mr-2 h-4 w-4" />
                    Download CSV
                  </HoverButton>
                )}
                {activeTab === 'blog' && (
                  <HoverButton onClick={() => setShowNewBlogPostDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Blog Post
                  </HoverButton>
                )}
                <HoverButton 
                  onClick={handleSaveChanges} 
                  disabled={isSaving || activeTab === 'blog'} 
                >
                  <Edit className="mr-2 h-4 w-4" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </HoverButton>
                <HoverButton
                  onClick={activeTab === 'contacts' ? fetchContacts : activeTab === 'leads' ? fetchLeads : fetchBlogPosts}
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? 'Refreshing...' : 'Refresh'}
                </HoverButton>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <HoverButton
                onClick={() => setActiveTab('contacts')}
                className={activeTab === 'contacts' ? 'bg-royal' : ''}
              >
                Contacts
              </HoverButton>
              <HoverButton
                onClick={() => setActiveTab('leads')}
                className={`ml-2 ${activeTab === 'leads' ? 'bg-royal' : ''}`}
              >
                Leads
              </HoverButton>
              <HoverButton
                onClick={() => setActiveTab('blog')}
                className={`ml-2 ${activeTab === 'blog' ? 'bg-royal' : ''}`}
              >
                Blog
              </HoverButton>
            </div>
            <div className="overflow-x-auto">
              {sortedItems.length === 0 ? (
                <p className="text-mute">No {activeTab} found.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-white-_06">
                      {activeTab === 'blog' ? (
                        <>
                          <TableHead onClick={() => handleSort('title')} className="cursor-pointer">
                            Title {sortField === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
                          </TableHead>
                          <TableHead onClick={() => handleSort('slug')} className="cursor-pointer">
                            Slug {sortField === 'slug' && (sortDirection === 'asc' ? '↑' : '↓')}
                          </TableHead>
                          <TableHead>Excerpt</TableHead>
                        </>
                      ) : (
                        <>
                          <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                            Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                          </TableHead>
                          <TableHead onClick={() => handleSort('email')} className="cursor-pointer">
                            Email {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
                          </TableHead>
                          <TableHead>Phone</TableHead>
                          {activeTab === 'contacts' && <TableHead>Message</TableHead>}
                        </>
                      )}
                      <TableHead onClick={() => handleSort('created_at')} className="cursor-pointer">
                        Created At {sortField === 'created_at' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </TableHead>
                      {activeTab !== 'blog' && <TableHead>Status</TableHead>}
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedItems.map((item) => (
                      <TableRow key={item.id} className="border-b-white-_06">
                        {activeTab === 'blog' ? (
                          <>
                            <TableCell>{(item as BlogPost).title}</TableCell>
                            <TableCell>{(item as BlogPost).slug}</TableCell>
                            <TableCell>{(item as BlogPost).excerpt}</TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell>{(item as Contact | Lead).name}</TableCell>
                            <TableCell>{(item as Contact | Lead).email}</TableCell>
                            <TableCell>{(item as Contact | Lead).phone}</TableCell>
                            {activeTab === 'contacts' && (
                              <TableCell>
                                <HoverButton
                                  onClick={() => setSelectedMessage((item as Contact).message)}
                                >
                                  View Message
                                </HoverButton>
                              </TableCell>
                            )}
                          </>
                        )}
                        <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
                        {activeTab !== 'blog' && (
                          <TableCell>
                            <Select
                              value={(item as Contact | Lead).status}
                              onValueChange={(value) => handleStatusChange(item.id, value)}
                            >
                              <SelectTrigger className="w-[200px] bg-obsidian/80 border-white-_06 text-white placeholder:text-mute">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent className="bg-obsidian/80 text-white border-white-_06">
                                <SelectItem value="New">New</SelectItem>
                                <SelectItem value="Called - No answer">Called - No answer</SelectItem>
                                <SelectItem value="Called - Meeting Booked">Called - Meeting Booked</SelectItem>
                                <SelectItem value="Called - Sale Closed">Called - Sale Closed</SelectItem>
                                <SelectItem value="Multiple No responses">Multiple No responses</SelectItem>
                                <SelectItem value="Called - Bad Lead">Called - Bad Lead</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        )}
                        <TableCell>
                          <HoverButton
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-900/80 hover:bg-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </HoverButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
      <Dialog open={showNewBlogPostDialog} onOpenChange={setShowNewBlogPostDialog}>
        <DialogContent className="bg-obsidian/80 backdrop-blur-md text-white border border-white-_06 rounded-lg shadow-diffused-bloom">
          <DialogHeader>
            <DialogTitle>Create New Blog Post</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateBlogPost} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
              <Input
                id="title"
                value={newBlogPost.title}
                onChange={(e) => setNewBlogPost({ ...newBlogPost, title: e.target.value })}
                className="w-full bg-obsidian/80 text-white border-white-_06"
                required
              />
            </div>
            <div>
              <label htmlFor="slug" className="block text-sm font-medium mb-1">Slug</label>
              <Input
                id="slug"
                value={newBlogPost.slug}
                onChange={(e) => setNewBlogPost({ ...newBlogPost, slug: e.target.value })}
                className="w-full bg-obsidian/80 text-white border-white-_06"
                required
              />
            </div>
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium mb-1">Excerpt</label>
              <Textarea
                id="excerpt"
                value={newBlogPost.excerpt}
                onChange={(e) => setNewBlogPost({ ...newBlogPost, excerpt: e.target.value })}
                className="w-full bg-obsidian/80 text-white border-white-_06"
                required
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
              <Textarea
                id="content"
                value={newBlogPost.content}
                onChange={(e) => setNewBlogPost({ ...newBlogPost, content: e.target.value })}
                className="w-full bg-obsidian/80 text-white border-white-_06"
                rows={10}
                required
              />
            </div>
            <HoverButton type="submit" className="w-full">
              Create Blog Post
            </HoverButton>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="bg-obsidian/80 backdrop-blur-md text-white border border-white-_06 rounded-lg shadow-diffused-bloom">
          <DialogHeader>
            <DialogTitle>Message</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p>{selectedMessage}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}