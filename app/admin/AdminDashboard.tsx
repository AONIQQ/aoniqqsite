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
    <div className="min-h-screen bg-gradient-to-br from-[#000033] to-[#000066] text-white">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <header className="bg-blue-900/20 py-4 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="relative w-36 h-12">
            <Image
              src="/images/LargeSideLogo.png"
              alt="Aoniqq Logo"
              layout="fill"
              objectFit="contain"
              priority
            />
          </Link>
          <Button
            onClick={handleLogout}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {error && (
          <Card className="mb-8 bg-red-900/20 border-red-400/20">
            <CardContent className="p-4 flex items-center">
              <AlertCircle className="text-red-400 mr-2" />
              <p className="text-red-200">{error}</p>
            </CardContent>
          </Card>
        )}

        <Card className="mb-8 bg-blue-900/20 border-blue-400/20">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <CardTitle className="text-2xl font-bold">
              {activeTab === 'contacts' ? 'Contact Management' : activeTab === 'leads' ? 'Lead Management' : 'Blog Management'}
            </CardTitle>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
              <Input
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 bg-blue-900/30 border-blue-400/30 text-white placeholder-gray-400"
              />
              <div className="flex space-x-2">
                {activeTab !== 'blog' && (
                  <Button onClick={downloadCSV} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Download CSV
                  </Button>
                )}
                {activeTab === 'blog' && (
                  <Button onClick={() => setShowNewBlogPostDialog(true)} className="bg-green-600 hover:bg-green-700 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    New Blog Post
                  </Button>
                )}
                <Button 
                  onClick={handleSaveChanges} 
                  disabled={isSaving || activeTab === 'blog'} 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  onClick={activeTab === 'contacts' ? fetchContacts : activeTab === 'leads' ? fetchLeads : fetchBlogPosts}
                  disabled={isRefreshing}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? 'Refreshing...' : 'Refresh'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Button
                onClick={() => setActiveTab('contacts')}
                className={`mr-2 ${activeTab === 'contacts' ? 'bg-blue-600' : 'bg-blue-900/30'}`}
              >
                Contacts
              </Button>
              <Button
                onClick={() => setActiveTab('leads')}
                className={`mr-2 ${activeTab === 'leads' ? 'bg-blue-600' : 'bg-blue-900/30'}`}
              >
                Leads
              </Button>
              <Button
                onClick={() => setActiveTab('blog')}
                className={`${activeTab === 'blog' ? 'bg-blue-600' : 'bg-blue-900/30'}`}
              >
                Blog
              </Button>
            </div>
            <div className="overflow-x-auto">
              {sortedItems.length === 0 ? (
                <p>No {activeTab} found.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
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
                      <TableRow key={item.id}>
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
                                <Button
                                  onClick={() => setSelectedMessage((item as Contact).message)}
                                  className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                  View Message
                                </Button>
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
                              <SelectTrigger className="w-[200px] bg-blue-900/30 border-blue-400/30 text-white">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
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
                          <Button
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
        <DialogContent className="bg-blue-900 text-white">
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
                className="w-full bg-blue-800 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="slug" className="block text-sm font-medium mb-1">Slug</label>
              <Input
                id="slug"
                value={newBlogPost.slug}
                onChange={(e) => setNewBlogPost({ ...newBlogPost, slug: e.target.value })}
                className="w-full bg-blue-800 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium mb-1">Excerpt</label>
              <Textarea
                id="excerpt"
                value={newBlogPost.excerpt}
                onChange={(e) => setNewBlogPost({ ...newBlogPost, excerpt: e.target.value })}
                className="w-full bg-blue-800 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
              <Textarea
                id="content"
                value={newBlogPost.content}
                onChange={(e) => setNewBlogPost({ ...newBlogPost, content: e.target.value })}
                className="w-full bg-blue-800 text-white"
                rows={10}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
              Create Blog Post
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="bg-blue-900 text-white">
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