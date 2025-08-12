"use client"

import { Users } from "lucide-react"

export function NavigationHeader() {
  return (
    <div className="bg-white border-b border-gray-200 mb-8">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profile Management</h1>
            <p className="text-sm text-gray-600">Personnel Performance Dashboard</p>
          </div>
        </div>
      </div>
    </div>
  )
}
