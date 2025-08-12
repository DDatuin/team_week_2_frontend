"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

interface FilterControlsProps {
  roleFilter: string
  riskFilter: string
  sortOrder: "asc" | "desc" | "none"
  onRoleFilterChange: (value: string) => void
  onRiskFilterChange: (value: string) => void
  onSortOrderChange: (value: "asc" | "desc" | "none") => void
}

export function FilterControls({
  roleFilter,
  riskFilter,
  sortOrder,
  onRoleFilterChange,
  onRiskFilterChange,
  onSortOrderChange,
}: FilterControlsProps) {
  const getSortIcon = () => {
    switch (sortOrder) {
      case "asc":
        return <ArrowUp className="h-4 w-4" />
      case "desc":
        return <ArrowDown className="h-4 w-4" />
      default:
        return <ArrowUpDown className="h-4 w-4" />
    }
  }

  const handleSortClick = () => {
    if (sortOrder === "none") {
      onSortOrderChange("desc")
    } else if (sortOrder === "desc") {
      onSortOrderChange("asc")
    } else {
      onSortOrderChange("none")
    }
  }

  return (
    <div className="flex flex-wrap gap-4 items-end bg-slate-50 p-4 rounded-md mb-6">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Filter by Role:</label>
        <Select value={roleFilter} onValueChange={onRoleFilterChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Driver">Drivers</SelectItem>
            <SelectItem value="Mechanic">Mechanics</SelectItem>
            <SelectItem value="Helper">Helpers</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Filter by Risk:</label>
        <Select value={riskFilter} onValueChange={onRiskFilterChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Sort by Score:</label>
        <Button variant="outline" onClick={handleSortClick} className="flex items-center gap-2 bg-transparent">
          {getSortIcon()}
          {sortOrder === "none" ? "None" : sortOrder === "asc" ? "Low to High" : "High to Low"}
        </Button>
      </div>
    </div>
  )
}
