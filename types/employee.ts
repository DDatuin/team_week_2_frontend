export interface Employee {
  id: string
  name: string
  role: "Driver" | "Mechanic" | "Helper"
  profileScore: number
  riskLevel: "High" | "Medium" | "Low"
  issues: string[]
  details: DriverDetails | MechanicDetails | HelperDetails
}

export interface DriverDetails {
  drivingViolationRecords: number
  drugTestResults: "Positive" | "Negative"
  licenseVerification: "Valid" | "Revoked" | "Fake" | "Expired"
  warehouseIncidentInvolvement: boolean
  riderCustomerRatings: number
  breathalyzerResults: "Pass" | "Fail" | "Not Available"
  recklessDrivingPatterns: boolean
  drivingWorkViolations: number
  workPerformanceFeedback: number
  warehouseInfractions: number
  credentialValidity: "Valid" | "Fake" | "Expired"
}

export interface MechanicDetails {
  certificationsValidID: "Valid" | "Expired" | "Invalid"
  repairLogsRepeatFixRate: number
  downtimePostMaintenance: number
  peerInternalReviews: number
  equipmentHandlingViolations: number
}

export interface HelperDetails {
  submittedIDsDocuments: "Valid" | "Missing" | "Invalid"
  missedDeliveries: number
  warehouseMismanagement: number
  behaviorReports: number
}
