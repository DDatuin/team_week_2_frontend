"use client"

import { Users, BarChart3, Shield } from "lucide-react"

interface StatsSummaryProps {
  totalEmployees: number
  highRiskCount: number
  averageScore: number
}

export function StatsSummary({ totalEmployees, highRiskCount, averageScore }: StatsSummaryProps) {
  return (
    <div className="bg-slate-50 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-center space-x-8">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-gray-500" />
          <span className="text-gray-600">Total Personnel:</span>
          <span className="text-2xl font-bold text-gray-900">{totalEmployees}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-red-500" />
          <span className="text-gray-600">High Risk:</span>
          <span className="text-2xl font-bold text-red-600">{highRiskCount}</span>
        </div>
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-blue-500" />
          <span className="text-gray-600">Average Score:</span>
          <span className="text-2xl font-bold text-blue-600">{averageScore}</span>
        </div>
      </div>
    </div>
  )
}
