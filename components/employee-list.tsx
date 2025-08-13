"use client"

import type { Employee } from "@/types/employee"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Car, Wrench, Users } from "lucide-react"

interface EmployeeListProps {
  employees: Employee[]
  onViewProfile: (employeeId: string) => void
}

export function EmployeeList({ employees, onViewProfile }: EmployeeListProps) {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "High":
        return "bg-red-500 hover:bg-red-600"
      case "Medium":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "Low":
        return "bg-green-500 hover:bg-green-600"
      default:
        return "bg-gray-500"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600"
    if (score >= 40) return "text-yellow-600"
    return "text-red-600"
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Driver":
        return <Car className="h-5 w-5 text-blue-600" />
      case "Mechanic":
        return <Wrench className="h-5 w-5 text-orange-600" />
      case "Helper":
        return <Users className="h-5 w-5 text-purple-600" />
      default:
        return <Users className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="grid gap-4">
      {employees.map((employee) => (
        <Card key={`${employee.id}-${employee.role}`} className="shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.01]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    {getRoleIcon(employee.role)}
                    <h3 className="font-semibold text-lg text-gray-900 mx-1.5">{employee.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-1.5 ml-9">{employee.role}</p>
                  {employee.issues.length > 0 && (
                    <span className="inline-flex items-center bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium ml-7">
                      {employee.issues.length} issue{employee.issues.length > 1 ? "s" : ""} identified
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center w-20">
                    <div
                      className={`text-xl font-bold ${employee.riskLevel === "High" ? "text-red-600" : employee.riskLevel === "Low" ? "text-green-600" : "text-yellow-600"}`}
                    >
                      {employee.profileScore}
                    </div>
                    <div className="text-xs text-gray-500 mb-1">Score</div>
                    <div className="flex justify-center">
                      <Progress value={employee.profileScore} className="w-16 h-2" />
                    </div>
                  </div>

                  <div className="w-24 flex justify-center">
                    <Badge className={`${getRiskColor(employee.riskLevel)} text-white shadow-sm`}>
                      {employee.riskLevel} Risk
                    </Badge>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => onViewProfile(employee.id)}
                variant="outline"
                className="ml-4 hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200"
              >
                View Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
