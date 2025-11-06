"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { AdminLayout } from "@/components/admin-layout"

export default function CategoriesPageDemo() {
  // ✅ STATIC DUMMY CATEGORIES
  const [categories, setCategories] = useState([
    {
      _id: "cat1",
      gender: "Men",
      productType: "Shoes",
      subCategories: ["Sneakers", "Boots"],
      state: "Active"
    },
    {
      _id: "cat2",
      gender: "Women",
      productType: "Perfume",
      subCategories: ["Floral", "Luxury"],
      state: "Active"
    },
    {
      _id: "cat3",
      gender: "Unisex",
      productType: "Bags",
      subCategories: ["Leather", "Travel"],
      state: "Inactive"
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<any>(null)

  const [formData, setFormData] = useState({
    gender: "Men",
    productType: "",
    subCategories: "",
    state: "Active"
  })

  // ✅ Handle input change
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // ✅ Add Category (Frontend only)
  const handleAddCategory = () => {
    if (!formData.productType.trim()) {
      alert("Product Type is required")
      return
    }

    const newCategory = {
      _id: "cat_" + Date.now(),
      gender: formData.gender,
      productType: formData.productType.trim(),
      subCategories: formData.subCategories
        ? formData.subCategories.split(",").map((s) => s.trim())
        : [],
      state: formData.state
    }

    setCategories([...categories, newCategory])
    setIsAddDialogOpen(false)
    setFormData({ gender: "Men", productType: "", subCategories: "", state: "Active" })
  }

  // ✅ Open Edit Dialog
  const handleEditCategory = (category: any) => {
    setSelectedCategory(category)
    setFormData({
      gender: category.gender,
      productType: category.productType,
      subCategories: category.subCategories.join(", "),
      state: category.state
    })
    setIsEditDialogOpen(true)
  }

  // ✅ Update Category (Frontend only)
  const handleUpdateCategory = () => {
    const updated = categories.map((c) =>
      c._id === selectedCategory._id
        ? {
            ...c,
            gender: formData.gender,
            productType: formData.productType.trim(),
            subCategories: formData.subCategories.split(",").map((s) => s.trim()),
            state: formData.state
          }
        : c
    )

    setCategories(updated)
    setIsEditDialogOpen(false)
    setSelectedCategory(null)
  }

  // ✅ Delete Category (Frontend only)
  const handleDeleteCategory = (id: string) => {
    if (!confirm("Delete this category?")) return
    setCategories(categories.filter((c) => c._id !== id))
  }

  // ✅ Search filter
  const filteredCategories = categories.filter((c) =>
    c.productType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AdminLayout>
    <div className="flex flex-col p-4 md:p-8">
      {/* Header + Add Button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold tracking-tight">Categories (Demo)</h2>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" />Add Category</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Gender</Label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border p-2 rounded">
                  <option>Men</option>
                  <option>Women</option>
                  <option>Unisex</option>
                </select>
              </div>

              <div>
                <Label>Product Type</Label>
                <Input name="productType" value={formData.productType} onChange={handleChange} placeholder="Shoes, Perfume, Bags..." />
              </div>

              <div>
                <Label>Subcategories (comma separated)</Label>
                <Input name="subCategories" value={formData.subCategories} onChange={handleChange} placeholder="Sneakers, Boots" />
              </div>

              <div>
                <Label>Status</Label>
                <select name="state" value={formData.state} onChange={handleChange} className="w-full border p-2 rounded">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddCategory}>Add</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Category List</CardTitle>
          <div className="relative max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search product type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gender</TableHead>
                <TableHead>Product Type</TableHead>
                <TableHead>Subcategories</TableHead>
                <TableHead>State</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>{category.gender}</TableCell>
                  <TableCell>{category.productType}</TableCell>
                  <TableCell>{category.subCategories.join(", ")}</TableCell>
                  <TableCell>{category.state}</TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category)}>
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button variant="ghost" size="sm" onClick={() => handleDeleteCategory(category._id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {filteredCategories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground p-4">
                    No categories found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Gender</Label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border p-2 rounded">
                <option>Men</option>
                <option>Women</option>
                <option>Unisex</option>
              </select>
            </div>

            <div>
              <Label>Product Type</Label>
              <Input name="productType" value={formData.productType} onChange={handleChange} />
            </div>

            <div>
              <Label>Subcategories</Label>
              <Input name="subCategories" value={formData.subCategories} onChange={handleChange} />
            </div>

            <div>
              <Label>Status</Label>
              <select name="state" value={formData.state} onChange={handleChange} className="w-full border p-2 rounded">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleUpdateCategory}>Update</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </AdminLayout>
  )
}
