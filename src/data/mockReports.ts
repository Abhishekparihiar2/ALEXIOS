export type ReportStatus = "Active" | "Pending Approval" | "Archived";
export type IncidentSeverity = "Critical" | "High" | "Medium" | "Low";

export interface ReportFormDef {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  status: ReportStatus;
  approvalRequired: boolean;
  assignedSites: string[];
  assignedGroups: string[];
  lastUpdated: string;
}

export interface ReportCategory {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Archived";
  lastUpdated: string;
  reportCount: number;
}

export interface IncidentCategory {
  id: string;
  code: string;
  name: string;
  description: string;
  region: string;
  severity: IncidentSeverity;
  parentCategory: string;
  defaultGroup: string;
  status: "Active" | "Archived";
}

export interface ReportFooter {
  id: string;
  name: string;
  text: string;
  disclaimer: string;
  status: "Active" | "Archived";
  lastUpdated: string;
  usageCount: number;
}

export interface ReportTemplate {
  id: string;
  name: string;
  categoryId: string;
  fieldCount: number;
  usageCount: number;
  lastUpdated: string;
}

export const MOCK_REPORT_CATEGORIES: ReportCategory[] = [
  { id: "RC-1", name: "Hourly Reporting", description: "Logs submitted on an hourly basis.", status: "Active", lastUpdated: "Aug 4, 2026", reportCount: 7 },
  { id: "RC-2", name: "Incident Reports", description: "Reports documenting unusual security events.", status: "Active", lastUpdated: "Aug 3, 2026", reportCount: 4 },
  { id: "RC-3", name: "Vehicle Reports", description: "Vehicle inspection and tracking logs.", status: "Active", lastUpdated: "Aug 1, 2026", reportCount: 3 },
  { id: "RC-4", name: "Disciplinary", description: "Employee warnings and infractions.", status: "Archived", lastUpdated: "Jul 15, 2026", reportCount: 2 },
];

export const MOCK_REPORT_FORMS: ReportFormDef[] = [
  { id: "RF-1", name: "Daily Activity Log", description: "Record all significant activities, observations and incidents.", categoryId: "RC-1", status: "Active", approvalRequired: false, assignedSites: ["Downtown Financial Center"], assignedGroups: ["Guards"], lastUpdated: "Aug 5, 2026" },
  { id: "RF-2", name: "Incident Report", description: "Document unexpected events or hazards.", categoryId: "RC-2", status: "Active", approvalRequired: true, assignedSites: ["All"], assignedGroups: ["Guards", "Supervisors"], lastUpdated: "Aug 5, 2026" },
  { id: "RF-3", name: "Hourly Security Report", description: "Hourly checkpoint summary.", categoryId: "RC-1", status: "Active", approvalRequired: false, assignedSites: ["Westfield Mall"], assignedGroups: ["Guards"], lastUpdated: "Aug 1, 2026" },
  { id: "RF-4", name: "End of Shift Report", description: "Final log before clocking out.", categoryId: "RC-1", status: "Active", approvalRequired: false, assignedSites: ["All"], assignedGroups: ["Guards"], lastUpdated: "Aug 2, 2026" },
  { id: "RF-5", name: "Vehicle on Site Report", description: "Log external vehicles entering the premises.", categoryId: "RC-3", status: "Active", approvalRequired: true, assignedSites: ["City Hall Security Post"], assignedGroups: ["Guards"], lastUpdated: "Aug 3, 2026" },
];

export const MOCK_INCIDENT_CATEGORIES: IncidentCategory[] = [
  { id: "INC-FIRE", code: "INC-FIRE", name: "Fire or Smoke Outbreak", description: "Any visible smoke or active fire.", region: "All Regions", severity: "Critical", parentCategory: "Emergency", defaultGroup: "Operations Team", status: "Active" },
  { id: "INC-SHOOT", code: "INC-SHOOT", name: "Active Shooter", description: "Armed individual actively discharging weapon.", region: "All Regions", severity: "Critical", parentCategory: "Emergency Response", defaultGroup: "Emergency Response", status: "Active" },
  { id: "INC-THEFT", code: "INC-THEFT", name: "Theft / Robbery", description: "Unauthorized removal of property.", region: "North America", severity: "High", parentCategory: "Security Event", defaultGroup: "Supervisors", status: "Active" },
  { id: "INC-TRES", code: "INC-TRES", name: "Unauthorized Entry / Trespass", description: "Person entering restricted area.", region: "All Regions", severity: "Medium", parentCategory: "Security Event", defaultGroup: "Supervisors", status: "Active" },
  { id: "INC-PROP", code: "INC-PROP", name: "Property Damage / Graffiti", description: "Vandalism or accidental damage.", region: "All Regions", severity: "Low", parentCategory: "Maintenance", defaultGroup: "Maintenance", status: "Active" },
];

export const MOCK_REPORT_FOOTERS: ReportFooter[] = [
  { id: "FT-1", name: "RFI Standard Footer", text: "© 2026 RFI Security LLC. Confidential Security Report.", disclaimer: "Information contained in this report reflects information available at the time of submission.", status: "Active", lastUpdated: "Aug 2, 2026", usageCount: 14 },
];

export const MOCK_REPORT_TEMPLATES: ReportTemplate[] = [
  { id: "TPL-1", name: "Standard Incident Report", categoryId: "RC-2", fieldCount: 12, usageCount: 6, lastUpdated: "Aug 3, 2026" },
  { id: "TPL-2", name: "Daily Activity Report", categoryId: "RC-1", fieldCount: 8, usageCount: 4, lastUpdated: "Aug 2, 2026" },
];

export interface SubmittedReport {
  id: string;
  reportName: string;
  type: "Incident" | "Standard Report" | "Inspection";
  submittedBy: string;
  siteName: string;
  dateSubmitted: string;
  status: "Approved" | "Pending" | "Rejected";
}

export const MOCK_SUBMITTED_REPORTS: SubmittedReport[] = [
  { id: "SR-001", reportName: "Daily Activity Log", type: "Standard Report", submittedBy: "John Doe", siteName: "Downtown Financial Center", dateSubmitted: "Aug 5, 2026 - 16:30", status: "Approved" },
  { id: "SR-002", reportName: "Fire or Smoke Outbreak", type: "Incident", submittedBy: "Sarah Jenkins", siteName: "Westfield Mall", dateSubmitted: "Aug 5, 2026 - 14:15", status: "Pending" },
  { id: "SR-003", reportName: "Vehicle on Site Report", type: "Inspection", submittedBy: "Mike Chen", siteName: "City Hall Security Post", dateSubmitted: "Aug 4, 2026 - 09:00", status: "Approved" },
  { id: "SR-004", reportName: "Theft / Robbery", type: "Incident", submittedBy: "John Doe", siteName: "Downtown Financial Center", dateSubmitted: "Aug 3, 2026 - 22:45", status: "Rejected" },
  { id: "SR-005", reportName: "Hourly Security Report", type: "Standard Report", submittedBy: "Emily Davis", siteName: "Westfield Mall", dateSubmitted: "Aug 5, 2026 - 15:00", status: "Approved" },
];

export interface PatrolTour {
  id: string;
  tourName: string;
  guard: string;
  siteName: string;
  start: string;
  end: string;
  duration: string;
  checkpointsHit: number;
  checkpointsTotal: number;
  result: string;
  status: "Complete" | "Incomplete" | "Exceptions";
  checkpoints: { name: string; expected: string; actual: string; result: "Complete" | "Late" | "Missed" | "Exception" }[];
}

export const MOCK_PATROL_TOURS: PatrolTour[] = [
  { 
    id: "PT-001", tourName: "North Wing Perimeter", guard: "John Doe", siteName: "Downtown Financial Center", 
    start: "14:00", end: "15:15", duration: "1h 15m", 
    checkpointsHit: 12, checkpointsTotal: 12, result: "100%", status: "Complete",
    checkpoints: [
      { name: "Lobby Desk", expected: "14:05", actual: "14:04", result: "Complete" },
      { name: "East Exit", expected: "14:20", actual: "14:19", result: "Complete" },
      { name: "Loading Dock", expected: "14:40", actual: "14:42", result: "Complete" }
    ]
  },
  { 
    id: "PT-002", tourName: "Parking Garage Sweep", guard: "Sarah Jenkins", siteName: "Westfield Mall", 
    start: "13:30", end: "14:10", duration: "40m", 
    checkpointsHit: 8, checkpointsTotal: 10, result: "80%", status: "Exceptions",
    checkpoints: [
      { name: "Level 1 West", expected: "13:35", actual: "13:35", result: "Complete" },
      { name: "Level 2 East", expected: "13:45", actual: "13:52", result: "Late" },
      { name: "Level 3 Roof", expected: "14:00", actual: "--", result: "Missed" }
    ]
  },
  { 
    id: "PT-003", tourName: "Main Entrance Check", guard: "Emily Davis", siteName: "Westfield Mall", 
    start: "10:00", end: "10:30", duration: "30m", 
    checkpointsHit: 5, checkpointsTotal: 5, result: "100%", status: "Complete",
    checkpoints: [
      { name: "Front Door", expected: "10:05", actual: "10:06", result: "Complete" }
    ]
  },
  { 
    id: "PT-004", tourName: "Basement Vault Tour", guard: "John Doe", siteName: "Downtown Financial Center", 
    start: "23:00", end: "23:45", duration: "45m", 
    checkpointsHit: 4, checkpointsTotal: 6, result: "66%", status: "Incomplete",
    checkpoints: [
      { name: "Vault Door 1", expected: "23:10", actual: "23:15", result: "Late" },
      { name: "Vault Door 2", expected: "23:25", actual: "--", result: "Exception" }
    ]
  },
];

export interface Recording {
  id: string;
  title: string;
  type: "Audio" | "Video" | "Image";
  guard: string;
  siteName: string;
  dateCaptured: string;
  relatedRecord: string;
  duration: string;
  size: string;
}

export const MOCK_RECORDINGS: Recording[] = [
  { id: "REC-001", title: "Bodycam — L1 Altercation", type: "Video", guard: "Sarah Jenkins", siteName: "Westfield Mall", dateCaptured: "Aug 5, 2026 14:10", relatedRecord: "INC-THEFT", duration: "04:32", size: "45.2 MB" },
  { id: "REC-002", title: "Broken Window Damage", type: "Image", guard: "Emily Davis", siteName: "Downtown Financial Center", dateCaptured: "Aug 5, 2026 09:15", relatedRecord: "INC-PROP", duration: "--", size: "3.1 MB" },
  { id: "REC-003", title: "Witness Statement", type: "Audio", guard: "John Doe", siteName: "Westfield Mall", dateCaptured: "Aug 4, 2026 22:30", relatedRecord: "INC-SHOOT", duration: "02:15", size: "1.4 MB" },
];

export interface ShiftSummary {
  id: string;
  shiftName: string;
  siteName: string;
  supervisor: string;
  guardsCount: number;
  totalTours: number;
  totalReports: number;
  criticalEvents: number;
  status: "Signed" | "Pending";
  timeline: { time: string; event: string }[];
  guardActivity: { guard: string; tours: number; reports: number; exceptions: number }[];
}

export const MOCK_SHIFT_SUMMARIES: ShiftSummary[] = [
  { 
    id: "SS-104", shiftName: "Night Shift — Aug 4", siteName: "Downtown Financial Center", 
    supervisor: "Mike Chen", guardsCount: 6, totalTours: 14, totalReports: 6, criticalEvents: 1, status: "Signed",
    timeline: [
      { time: "21:00", event: "Shift started" },
      { time: "22:14", event: "Panic Alert generated" },
      { time: "22:18", event: "Supervisor acknowledged incident" },
      { time: "23:30", event: "North Wing Tour completed" },
      { time: "05:45", event: "End of Shift Report submitted" }
    ],
    guardActivity: [
      { guard: "John Doe", tours: 4, reports: 2, exceptions: 1 },
      { guard: "Mike Chen", tours: 0, reports: 1, exceptions: 0 },
      { guard: "Sarah Jenkins", tours: 3, reports: 0, exceptions: 0 },
    ]
  },
  { 
    id: "SS-105", shiftName: "Day Shift — Aug 5", siteName: "Westfield Mall", 
    supervisor: "Emily Davis", guardsCount: 8, totalTours: 18, totalReports: 12, criticalEvents: 0, status: "Pending",
    timeline: [
      { time: "06:00", event: "Shift started" },
      { time: "10:30", event: "Main Entrance Check completed" },
      { time: "14:15", event: "Fire or Smoke Outbreak reported" },
      { time: "15:00", event: "End of Shift Report submitted" }
    ],
    guardActivity: [
      { guard: "Emily Davis", tours: 3, reports: 3, exceptions: 0 },
      { guard: "Sarah Jenkins", tours: 4, reports: 1, exceptions: 1 },
    ]
  },
];
