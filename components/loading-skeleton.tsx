"use client"

import { Card, CardContent } from "@/components/ui/card"

export function EmployeeCardSkeleton() {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            {/* Icon skeleton */}
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />

            <div className="flex-1">
              {/* Name skeleton */}
              <div className="h-5 bg-gray-200 rounded w-32 mb-1 animate-pulse" />
              {/* Role skeleton */}
              <div className="h-4 bg-gray-100 rounded w-20 mb-2 animate-pulse" />
              {/* Issues skeleton */}
              <div className="h-6 bg-yellow-100 rounded-full w-28 animate-pulse" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Score section skeleton */}
            <div className="w-20 text-center">
              <div className="h-6 bg-gray-200 rounded w-12 mx-auto mb-1 animate-pulse" />
              <div className="h-3 bg-gray-100 rounded w-10 mx-auto mb-2 animate-pulse" />
              <div className="h-2 bg-gray-200 rounded w-16 animate-pulse" />
            </div>

            {/* Risk badge skeleton */}
            <div className="w-24 text-center">
              <div className="h-6 bg-gray-200 rounded-full w-20 mx-auto animate-pulse" />
            </div>

            {/* Button skeleton */}
            <div className="h-9 bg-gray-200 rounded w-24 animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border p-6 text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
      </div>
      <div className="h-8 bg-gray-200 rounded w-12 mx-auto animate-pulse" />
    </div>
  )
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  )
}

export function ErrorMessage({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="text-center py-12">
      <div className="text-red-600 mb-4">
        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        <p className="text-lg font-medium">Error Loading Data</p>
        <p className="text-sm text-gray-600 mt-1">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
