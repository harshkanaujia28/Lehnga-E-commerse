"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Edit, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"

const coupons = [
  {
    id: 1,
    code: "SAVE20",
    description: "20% off on all items",
    type: "Percentage",
    value: 20,
    minOrder: 100,
    maxUses: 100,
    used: 45,
    status: "Active",
    expiryDate: "2024-12-31",
  },
  {
    id: 2,
    code: "FLAT50",
    description: "Flat $50 off",
    type: "Fixed",
    value: 50,
    minOrder: 200,
    maxUses: 50,
    used: 23,
    status: "Active",
    expiryDate: "2024-06-30",
  },
  {
    id: 3,
    code: "WELCOME10",
    description: "Welcome discount for new users",
    type: "Percentage",
    value: 10,
    minOrder: 50,
    maxUses: 200,
    used: 156,
    status: "Active",
    expiryDate: "2024-12-31",
  },
  {
    id: 4,
    code: "EXPIRED15",
    description: "15% off - expired",
    type: "Percentage",
    value: 15,
    minOrder: 75,
    maxUses: 75,
    used: 75,
    status: "Expired",
    expiryDate: "2024-01-15",
  },
]

export default function CouponsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <AdminLayout>
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Coupons</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Coupon</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="code">Coupon Code</Label>
                <Input id="code" placeholder="Enter coupon code" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Coupon description" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Discount Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="value">Discount Value</Label>
                <Input id="value" type="number" placeholder="0" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="minOrder">Minimum Order Amount</Label>
                <Input id="minOrder" type="number" placeholder="0" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="maxUses">Maximum Uses</Label>
                <Input id="maxUses" type="number" placeholder="0" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" type="date" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>Create Coupon</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coupon Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium font-mono">{coupon.code}</TableCell>
                  <TableCell>{coupon.description}</TableCell>
                  <TableCell>{coupon.type}</TableCell>
                  <TableCell>{coupon.type === "Percentage" ? `${coupon.value}%` : `$${coupon.value}`}</TableCell>
                  <TableCell>
                    {coupon.used}/{coupon.maxUses}
                  </TableCell>
                  <TableCell>
                    <Badge variant={coupon.status === "Active" ? "default" : "destructive"}>{coupon.status}</Badge>
                  </TableCell>
                  <TableCell>{coupon.expiryDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
    </AdminLayout>
  )
}
