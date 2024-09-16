'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Download, Edit, LogOut, AlertCircle, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'

interface Contact {
  id: number
  name: string
  email: string
  phone: string
  message: string
  created_at: string
  status: string
}

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [error, setError] = useState<string | null>(null)
  const [sortField, setSortField] = useState<keyof Contact>('created_at')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      // Optionally, set an error state here to display to the user
    }
  };

  const handleSort = (field: keyof Contact) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortContacts = (contacts: Contact[]): Contact[] => {
    return [...contacts].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    }).filter(contact => 
      Object.values(contact).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }

  const handleStatusChange = (id: number, status: string) => {
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.id === id ? { ...contact, status } : contact
      )
    )
  }

  const handleSaveChanges = async () => {
    setIsSaving(true)
    toast.info('Saving changes...', { autoClose: false, toastId: 'saving' })

    try {
      const response = await fetch('/api/contacts/updateLeadStatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contacts)
      })

      if (!response.ok) throw new Error('Failed to save changes')

      toast.dismiss('saving')
      toast.success("Changes have been saved successfully")
      await fetchContacts() // Refresh data after saving
    } catch (error) {
      console.error('Error saving changes:', error)
      toast.dismiss('saving')
      toast.error(`Failed to save changes: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteContact = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        const response = await fetch(`/api/contacts/${id}`, {
          method: 'DELETE',
        })

        if (!response.ok) throw new Error('Failed to delete contact')

        toast.success("Contact deleted successfully")
        await fetchContacts() // Refresh data after deleting
      } catch (error) {
        console.error('Error deleting contact:', error)
        toast.error(`Failed to delete contact: ${error instanceof Error ? error.message : 'Unknown error'}`)
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
    const headers = ['Name', 'Email', 'Phone', 'Message', 'Created At', 'Status']
    const data = contacts.map(contact => [
      contact.name,
      contact.email,
      contact.phone,
      `"${contact.message.replace(/"/g, '""')}"`,
      new Date(contact.created_at).toLocaleString(),
      contact.status
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
      link.setAttribute('download', 'contacts.csv')
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const sortedContacts = sortContacts(contacts)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000033] to-[#000066] text-white">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <header className="bg-blue-900/20 py-4 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="relative w-36 h-12">
            <Image
              src="/images/LargeSideLogo.png"
              alt="Aoniqq Logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 144px, 144px"
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
            <CardTitle className="text-2xl font-bold">Contact Management</CardTitle>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
              <Input
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 bg-blue-900/30 border-blue-400/30 text-white placeholder-gray-400"
              />
              <div className="flex space-x-2">
                <Button onClick={downloadCSV} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Download className="mr-2 h-4 w-4" />
                  Download CSV
                </Button>
                <Button 
                  onClick={handleSaveChanges} 
                  disabled={isSaving} 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {sortedContacts.length === 0 ? (
              <p>No contacts found.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                      Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead onClick={() => handleSort('email')} className="cursor-pointer">
                      Email {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead onClick={() => handleSort('created_at')} className="cursor-pointer">
                      Created At {sortField === 'created_at' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedContacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>{contact.name}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.phone}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="link" className="text-left p-0 h-auto font-normal">
                              <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                                {contact.message}
                              </div>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px] bg-blue-900 text-white">
                            <DialogHeader>
                              <DialogTitle>Full Message</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4 max-h-[60vh] overflow-y-auto">
                              {contact.message}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                      <TableCell>{new Date(contact.created_at).toLocaleString()}</TableCell>
                      <TableCell>
                        <Select
                          value={contact.status}
                          onValueChange={(value) => handleStatusChange(contact.id, value)}
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
                      <TableCell>
                        <Button
                          onClick={() => handleDeleteContact(contact.id)}
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
          </CardContent>
        </Card>
      </main>
    </div>
  )
}