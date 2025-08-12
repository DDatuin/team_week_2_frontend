"use client"

// Updated API service to use correct Employee interface
import type { Employee } from "@/types/employee"

const API_BASE_URL = "http://localhost:5000"

export interface ApiResponse<T> {
  data: T | null
  error: string | null
  loading: boolean
}

// Fetch all employees for dashboard
export async function fetchEmployees(): Promise<Employee[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/employees`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching employees:", error)
    throw error
  }
}

// Fetch individual employee profile
export async function fetchEmployeeProfile(role: string, id: string): Promise<Employee> {
  try {
    const response = await fetch(`${API_BASE_URL}/employee/${role.toLowerCase()}/${id}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching employee profile:", error)
    throw error
  }
}

// Custom hook for fetching employees
import React from "react"

export function useEmployees() {
  const [state, setState] = React.useState<ApiResponse<Employee[]>>({
    data: null,
    error: null,
    loading: true,
  })

  React.useEffect(() => {
    fetchEmployees()
      .then((data) => {
        setState({ data, error: null, loading: false })
      })
      .catch((error) => {
        setState({ data: null, error: error.message, loading: false })
      })
  }, [])

  return state
}

// Custom hook for fetching individual employee
export function useEmployee(role: string, id: string) {
  const [state, setState] = React.useState<ApiResponse<Employee>>({
    data: null,
    error: null,
    loading: true,
  })

  React.useEffect(() => {
    if (!role || !id) return

    fetchEmployeeProfile(role, id)
      .then((data) => {
        setState({ data, error: null, loading: false })
      })
      .catch((error) => {
        setState({ data: null, error: error.message, loading: false })
      })
  }, [role, id])

  return state
}