"use client"

import { useState, useMemo, useCallback } from "react"
import { useEmployees } from "@/lib/api"
import { EmployeeList } from "@/components/employee-list"
import { EmployeeProfile } from "@/components/employee-profile"
import { FilterControls } from "@/components/filter-controls"
import { NavigationHeader } from "@/components/navigation-header"
import { StatsSummary } from "@/components/stats-summary"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"
import { EmployeeCardSkeleton, ErrorMessage } from "@/components/loading-skeleton"

export default function Dashboard() {
  const { data: employees, loading, error } = useEmployees()

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null)
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [riskFilter, setRiskFilter] = useState<string>("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none")

  const handleRoleFilterChange = useCallback((value: string) => {
    setRoleFilter(value)
  }, [])

  const handleRiskFilterChange = useCallback((value: string) => {
    setRiskFilter(value)
  }, [])

  const handleSortOrderChange = useCallback((value: "asc" | "desc" | "none") => {
    setSortOrder(value)
  }, [])

  const filteredAndSortedEmployees = useMemo(() => {
    if (!employees) return []

    let filtered = employees

    // Apply role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter((emp) => emp.role === roleFilter)
    }

    // Apply risk filter
    if (riskFilter !== "all") {
      filtered = filtered.filter((emp) => emp.riskLevel === riskFilter)
    }

    // Apply sorting
    if (sortOrder !== "none") {
      filtered = [...filtered].sort((a, b) => {
        if (sortOrder === "asc") {
          return a.profileScore - b.profileScore
        } else {
          return b.profileScore - a.profileScore
        }
      })
    }

    return filtered
  }, [employees, roleFilter, riskFilter, sortOrder])

  const selectedEmployee =
    selectedEmployeeId && employees ? employees.find((emp) => emp.id === selectedEmployeeId) : null

  const stats = useMemo(() => {
    const totalEmployees = filteredAndSortedEmployees.length
    const highRiskCount = filteredAndSortedEmployees.filter((emp) => emp.riskLevel === "High").length
    const averageScore =
      totalEmployees > 0
        ? Math.round(filteredAndSortedEmployees.reduce((sum, emp) => sum + emp.profileScore, 0) / totalEmployees)
        : 0

    return { totalEmployees, highRiskCount, averageScore }
  }, [filteredAndSortedEmployees])

  const handleViewProfile = useCallback((employeeId: string) => {
    setSelectedEmployeeId(employeeId)
  }, [])

  const handleBackToDashboard = useCallback(() => {
    setSelectedEmployeeId(null)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavigationHeader />
        <div className="max-w-7xl mx-auto px-6 pb-6">
          {/* Loading skeleton for stats */}
          <div className="bg-white rounded-lg border p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <div className="h-4 bg-gray-200 rounded w-24 mx-auto mb-2 animate-pulse" />
                  <div className="h-8 bg-gray-200 rounded w-12 mx-auto animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Loading skeleton for filters */}
          <div className="flex gap-4 items-end bg-slate-50 p-4 rounded-md mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
            ))}
          </div>

          {/* Loading skeleton for employee cards */}
          <Card className="shadow-lg">
            <CardHeader className="bg-white border-gray-100">
              <div className="h-6 bg-gray-200 rounded w-48 mx-auto animate-pulse" />
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <EmployeeCardSkeleton key={i} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavigationHeader />
        <div className="max-w-7xl mx-auto px-6 pb-6">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <ErrorMessage message={error} onRetry={() => window.location.reload()} />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Show profile page when employee is selected, otherwise show dashboard
  if (selectedEmployee) {
    return <EmployeeProfile employee={selectedEmployee} onBack={handleBackToDashboard} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader />

      <div className="max-w-7xl mx-auto px-6 pb-6">
        <StatsSummary
          totalEmployees={stats.totalEmployees}
          highRiskCount={stats.highRiskCount}
          averageScore={stats.averageScore}
        />

        <FilterControls
          roleFilter={roleFilter}
          riskFilter={riskFilter}
          sortOrder={sortOrder}
          onRoleFilterChange={handleRoleFilterChange}
          onRiskFilterChange={handleRiskFilterChange}
          onSortOrderChange={handleSortOrderChange}
        />

        {/* Main Content */}
        <Card className="shadow-lg">
          <CardHeader className="bg-white border-gray-100 mx-0 my-0 px-5 py-0 border-t-0 border-b-0 border-r-0">
            <CardTitle className="font-semibold leading-7 tracking-tight mx-2.5 my-0 px-0 py-0 border-0 text-2xl text-center">
              Personnel Overview
              {employees && stats.totalEmployees !== employees.length && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({stats.totalEmployees} of {employees.length} shown)
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 py-0 px-6 mt-0">
            {filteredAndSortedEmployees.length > 0 ? (
              <EmployeeList employees={filteredAndSortedEmployees} onViewProfile={handleViewProfile} />
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-2">
                  <Users className="h-12 w-12 mx-auto" />
                </div>
                <div className="text-lg text-gray-500 mb-1">No personnel match the current filters</div>
                <div className="text-sm text-gray-400">Try adjusting your filter criteria</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
