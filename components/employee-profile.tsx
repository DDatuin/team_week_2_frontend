"use client"

import type { Employee, DriverDetails, MechanicDetails, HelperDetails } from "@/types/employee"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

interface EmployeeProfileProps {
  employee: Employee
  onBack: () => void
}

export function EmployeeProfile({ employee, onBack }: EmployeeProfileProps) {
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

  const renderDriverDetails = (details: DriverDetails) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="font-medium">Driving Violation Records:</span>
        <span
          className={
            details.drivingViolationRecords > 3
              ? "text-red-600"
              : details.drivingViolationRecords > 0
                ? "text-yellow-600"
                : "text-green-600"
          }
        >
          {details.drivingViolationRecords} violations
        </span>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="font-medium">Drug Test Results:</span>
        <div className="flex items-center gap-2">
          {details.drugTestResults === "Negative" ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500" />
          )}
          <span
            className={
              details.drugTestResults === "Negative"
                ? "text-green-600"
                : details.drugTestResults === "Fail"
                  ? "text-red-600"
                  : "text-gray-600"
            }
          >
            {details.drugTestResults}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="font-medium">License Verification:</span>
        <div className="flex items-center gap-2">
          {details.licenseVerification === "Valid" ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500" />
          )}
          <span className={details.licenseVerification === "Valid" ? "text-green-600" : "text-red-600"}>
            {details.licenseVerification}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="font-medium">Warehouse Incident Involvement:</span>
        <div className="flex items-center gap-2">
          {!details.warehouseIncidentInvolvement ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500" />
          )}
          <span className={!details.warehouseIncidentInvolvement ? "text-green-600" : "text-red-600"}>
            {details.warehouseIncidentInvolvement ? "Yes" : "No"}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="font-medium">Rider/Customer Ratings:</span>
        <span
          className={
            details.riderCustomerRatings >= 4
              ? "text-green-600"
              : details.riderCustomerRatings >= 3
                ? "text-yellow-600"
                : "text-red-600"
          }
        >
          {details.riderCustomerRatings.toFixed(1)} / 5.0
        </span>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="font-medium">Breathalyzer Results:</span>
        <div className="flex items-center gap-2">
          {details.breathalyzerResults === "Pass" ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : details.breathalyzerResults === "Fail" ? (
            <XCircle className="h-4 w-4 text-red-500" />
          ) : (
            <AlertTriangle className="h-4 w-4 text-gray-500" />
          )}
          <span
            className={
              details.breathalyzerResults === "Pass"
                ? "text-green-600"
                : details.breathalyzerResults === "Fail"
                  ? "text-red-600"
                  : "text-gray-600"
            }
          >
            {details.breathalyzerResults}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="font-medium">Reckless/Dangerous Driving:</span>
        <div className="flex items-center gap-2">
          {!details.recklessDrivingPatterns ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500" />
          )}
          <span className={!details.recklessDrivingPatterns ? "text-green-600" : "text-red-600"}>
            {details.recklessDrivingPatterns ? "Yes" : "No"}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="font-medium">Driving & Work Violations:</span>
        <span
          className={
            details.drivingWorkViolations > 2
              ? "text-red-600"
              : details.drivingWorkViolations > 0
                ? "text-yellow-600"
                : "text-green-600"
          }
        >
          {details.drivingWorkViolations} violations
        </span>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="font-medium">Work Performance Feedback:</span>
        <span
          className={
            details.workPerformanceFeedback >= 4
              ? "text-green-600"
              : details.workPerformanceFeedback >= 3
                ? "text-yellow-600"
                : "text-red-600"
          }
        >
          {details.workPerformanceFeedback.toFixed(1)} / 5.0
        </span>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="font-medium">Warehouse Infractions:</span>
        <span
          className={
            details.warehouseInfractions > 2
              ? "text-red-600"
              : details.warehouseInfractions > 0
                ? "text-yellow-600"
                : "text-green-600"
          }
        >
          {details.warehouseInfractions} infractions
        </span>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="font-medium">Credential Validity:</span>
        <div className="flex items-center gap-2">
          {details.credentialValidity === "Valid" ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500" />
          )}
          <span className={details.credentialValidity === "Valid" ? "text-green-600" : "text-red-600"}>
            {details.credentialValidity}
          </span>
        </div>
      </div>
    </div>
  )

  const renderMechanicDetails = (details: MechanicDetails) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="font-medium">Certifications & Valid ID:</span>
        <div className="flex items-center gap-2">
          {details.certificationsValidID === "Valid" ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500" />
          )}
          <span className={details.certificationsValidID === "Valid" ? "text-green-600" : "text-red-600"}>
            {details.certificationsValidID}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="font-medium">Repair Logs & Repeat Fix Rate:</span>
        <span
          className={
            details.repairLogsRepeatFixRate <= 10
              ? "text-green-600"
              : details.repairLogsRepeatFixRate <= 20
                ? "text-yellow-600"
                : "text-red-600"
          }
        >
          {details.repairLogsRepeatFixRate}%
        </span>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="font-medium">Downtime Post-Maintenance:</span>
        <span
          className={
            details.downtimePostMaintenance <= 15
              ? "text-green-600"
              : details.downtimePostMaintenance <= 30
                ? "text-yellow-600"
                : "text-red-600"
          }
        >
          {details.downtimePostMaintenance} hours
        </span>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="font-medium">Peer/Internal Reviews:</span>
        <span
          className={
            details.peerInternalReviews >= 4
              ? "text-green-600"
              : details.peerInternalReviews >= 3
                ? "text-yellow-600"
                : "text-red-600"
          }
        >
          {details.peerInternalReviews.toFixed(1)} / 5.0
        </span>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="font-medium">Equipment Handling Violations:</span>
        <span
          className={
            details.equipmentHandlingViolations === 0
              ? "text-green-600"
              : details.equipmentHandlingViolations <= 2
                ? "text-yellow-600"
                : "text-red-600"
          }
        >
          {details.equipmentHandlingViolations} violations
        </span>
      </div>
    </div>
  )

  const renderHelperDetails = (details: HelperDetails) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="font-medium">Submitted IDs & Documents:</span>
        <div className="flex items-center gap-2">
          {details.submittedIDsDocuments === "Valid" ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500" />
          )}
          <span className={details.submittedIDsDocuments === "Valid" ? "text-green-600" : "text-red-600"}>
            {details.submittedIDsDocuments}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="font-medium">Missed Deliveries:</span>
        <span
          className={
            details.missedDeliveries <= 3
              ? "text-green-600"
              : details.missedDeliveries <= 8
                ? "text-yellow-600"
                : "text-red-600"
          }
        >
          {details.missedDeliveries} deliveries
        </span>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="font-medium">Warehouse Mismanagement:</span>
        <span
          className={
            details.warehouseMismanagement <= 2
              ? "text-green-600"
              : details.warehouseMismanagement <= 5
                ? "text-yellow-600"
                : "text-red-600"
          }
        >
          {details.warehouseMismanagement} incidents
        </span>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="font-medium">Behavior Reports:</span>
        <span
          className={
            details.behaviorReports === 0
              ? "text-green-600"
              : details.behaviorReports <= 3
                ? "text-yellow-600"
                : "text-red-600"
          }
        >
          {details.behaviorReports} reports
        </span>
      </div>
    </div>
  )

  const renderDetails = () => {
    switch (employee.role) {
      case "Driver":
        return renderDriverDetails(employee.details as DriverDetails)
      case "Mechanic":
        return renderMechanicDetails(employee.details as MechanicDetails)
      case "Helper":
        return renderHelperDetails(employee.details as HelperDetails)
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button onClick={onBack} variant="outline" className="mb-6 flex items-center gap-2 bg-transparent">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{employee.name}</h1>
                <p className="text-lg text-gray-600 mb-4">{employee.role}</p>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getScoreColor(employee.profileScore)} mb-2`}>
                    {employee.profileScore}
                  </div>
                  <div className="text-sm text-gray-500 mb-2">Profile Score</div>
                  <Progress value={employee.profileScore} className="w-24 h-3" />
                </div>

                <Badge className={`${getRiskColor(employee.riskLevel)} text-white text-lg px-4 py-2`}>
                  {employee.riskLevel} Risk
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Issues Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Identified Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            {employee.issues.length > 0 ? (
              <ul className="space-y-2">
                {employee.issues.map((issue, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{issue}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>No issues identified</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detailed Inputs */}
        <Card>
          <CardHeader>
            <CardTitle>Evaluation Details</CardTitle>
            <p className="text-sm text-gray-600">
              Specific data points used for the {employee.role.toLowerCase()} evaluation
            </p>
          </CardHeader>
          <CardContent>{renderDetails()}</CardContent>
        </Card>
      </div>
    </div>
  )
}
