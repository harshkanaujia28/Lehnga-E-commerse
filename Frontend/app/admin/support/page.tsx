"use client"

import { useState } from "react"
import {
  Search,
  MessageSquare,
  Package,
  DollarSign,
  Clock,
  Eye,
  Mail,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AdminLayout } from "@/components/admin-layout"

export default function SupportPageDemo() {

  // ✅ MOCK DATA
  const [supportTickets] = useState([
    {
      _id: "TCK12345",
      customer: "Amit Sharma",
      email: "amit@example.com",
      subject: "Package leaking smell",
      fragrance: "Oud Royale",
      priority: "high",
      status: "open",
      orderId: "ORD9001",
      date: "2025-01-02",
      description: "Bottle leaked inside packaging. Smell everywhere.",
    },
    {
      _id: "TCK98765",
      customer: "Neha Singh",
      email: "neha@example.com",
      subject: "Payment deducted twice",
      fragrance: "Aqua Mist",
      priority: "medium",
      status: "resolved",
      orderId: "ORD9032",
      date: "2025-01-06",
      description: "UPI charged twice for same order.",
    },
  ])

  const [returns] = useState([
    {
      _id: "RET9911",
      customer: "Rahul Verma",
      email: "rahul@example.com",
      orderId: "ORD5001",
      reason: "Wrong product delivered",
      totalRefund: 799,
      status: "pending_approval",
      date: "2025-01-03",
      items: [
        { name: "Zafrine Royal", reason: "wrong_product", condition: "unopened", refundAmount: 799 }
      ],
      returnMethod: "mail"
    },
  ])

  const [refunds] = useState([
    {
      id: "REF1122",
      customer: "Simran Kaur",
      orderId: "ORD1122",
      fragrance: "Glam Rose",
      amount: 499,
      status: "pending",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [selectedReturn, setSelectedReturn] = useState<any>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-yellow-100 text-yellow-800"
      case "resolved": return "bg-green-100 text-green-800"
      case "pending_approval": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800"
      case "medium": return "bg-orange-100 text-orange-800"
      case "low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const filteredTickets = supportTickets.filter((ticket) =>
    ticket.customer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredReturns = returns.filter((r) =>
    r.customer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AdminLayout>
    <div className="p-5 space-y-6">
      <h2 className="text-3xl font-bold">Support & Returns (Demo)</h2>
      <p className="text-muted-foreground">All data is demo only</p>

      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card><CardHeader className="flex justify-between"><CardTitle>Open Tickets</CardTitle><MessageSquare className="w-4 h-4"/></CardHeader>
        <CardContent><div className="text-2xl font-bold">{supportTickets.filter(t=>t.status==="open").length}</div></CardContent></Card>

        <Card><CardHeader className="flex justify-between"><CardTitle>Pending Returns</CardTitle><Package className="w-4 h-4"/></CardHeader>
        <CardContent><div className="text-2xl font-bold">{returns.filter(r=>r.status==="pending_approval").length}</div></CardContent></Card>

        <Card><CardHeader className="flex justify-between"><CardTitle>Pending Refunds</CardTitle><DollarSign className="w-4 h-4"/></CardHeader>
        <CardContent><div className="text-2xl font-bold">{refunds.filter(r=>r.status==="pending").length}</div></CardContent></Card>

        <Card><CardHeader className="flex justify-between"><CardTitle>Avg Response Time</CardTitle><Clock className="w-4 h-4"/></CardHeader>
        <CardContent><div className="text-2xl font-bold">2.4h</div></CardContent></Card>
      </div>

      {/* TABS */}
      <Tabs defaultValue="tickets">
        <TabsList>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="returns">Returns</TabsTrigger>
        </TabsList>

        {/* ========== TICKETS TAB ========== */}
        <TabsContent value="tickets">
          <Card>
            <CardHeader>
              <CardTitle>Tickets ({filteredTickets.length})</CardTitle>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400"/>
                <Input placeholder="Search..." className="pl-9" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
              </div>
            </CardHeader>

            <CardContent>
              <table className="w-full">
                <tbody>
                  {filteredTickets.map(ticket => (
                    <tr key={ticket._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 font-medium">{ticket._id}</td>
                      <td>{ticket.customer}</td>
                      <td><Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge></td>
                      <td><Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge></td>
                      <td>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={()=>setSelectedTicket(ticket)}>
                              <Eye className="w-4 h-4"/>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Ticket Details</DialogTitle>
                            </DialogHeader>
                            {selectedTicket && (
                              <div>
                                <p><b>Customer:</b> {selectedTicket.customer}</p>
                                <p><b>Email:</b> {selectedTicket.email}</p>
                                <p><b>Subject:</b> {selectedTicket.subject}</p>
                                <p><b>Description:</b> {selectedTicket.description}</p>

                                <Textarea className="mt-3" placeholder="Reply..."/>
                                <div className="flex mt-3 space-x-2">
                                  <Button>Send</Button>
                                  <Button variant="outline"><Mail className="mr-2 w-4 h-4"/>Email</Button>
                                  <Button variant="outline"><Phone className="mr-2 w-4 h-4"/>Call</Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* RETURNS TAB */}
        <TabsContent value="returns">
          <Card>
            <CardHeader><CardTitle>Returns ({filteredReturns.length})</CardTitle></CardHeader>
            <CardContent>
              <table className="w-full">
                <tbody>
                  {filteredReturns.map(r => (
                    <tr key={r._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 font-medium">{r._id}</td>
                      <td>{r.customer}</td>
                      <td><Badge className={getStatusColor(r.status)}>{r.status}</Badge></td>
                      <td>₹{r.totalRefund}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
    </AdminLayout>
  )
}
