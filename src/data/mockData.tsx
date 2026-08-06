import { useState, useMemo, useRef, useEffect } from "react";
import {
  Eye, EyeOff, AlertCircle, Loader2, Lock, Shield,
  LayoutDashboard, Users, Building2, MapPin, Calendar,
  Clock, FileText, ClipboardList, CheckSquare, MessageSquare,
  FolderOpen, GraduationCap, Truck, Zap, DollarSign,
  Settings, Layers, HelpCircle, Headphones, ChevronLeft,
  ChevronRight, Bell, Search, LogOut, User, Menu, X,
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle2,
  Activity, MapIcon, ChevronDown, ChevronUp, MoreHorizontal,
  Navigation, Filter, Download, RefreshCw, ExternalLink,
  UserCheck, UserX, Clock3, Route, ListChecks, Send,
  Plus, FileSpreadsheet, FileDown,
  ChevronFirst, ChevronLast, Archive, ShieldCheck,
  Trash2, Briefcase
} from "lucide-react";
import alexiosLogo from "../imports/AlexiosAppLogos-white.png";


import { Page, AuthScreen, FormErrors, NavItem, NavGroup } from '../types/index';
import { NAV_GROUPS } from './navConfig';
import { StatusBadge } from '../components/StatusBadge';
import { ActivityIcon } from '../components/ActivityIcon';
import { LoginPage } from '../pages/LoginPage';
import { Sidebar } from '../components/Sidebar';
import { TopHeader } from '../components/TopHeader';
import { Dashboard } from '../pages/Dashboard/index';
import { SiteStatus, AccountType, SiteClient, MOCK_SITES, SITE_STATUS_STYLES, ACCT_TYPE_STYLES, CreateSitePage, SiteProfileTab, SiteProfilePage, ClientsPage } from '../pages/Clients/index';
import { CpSection, CpMonitoring, CpExtraScan, CpManual, TourRecurrence, Checkpoint, TourRoute, CpLog, CP_CHECKPOINTS, CP_TOURS, CP_LOGS, CheckpointsPage, SchedulingPage, PlaceholderPage } from '../pages/Checkpoints/index';
import { EmpStatus, EmpUserType, Employee, DEPARTMENTS, MOCK_EMPLOYEES, STATUS_STYLES, USER_TYPE_STYLES, AVATAR_COLORS, avatarColor, EmpTab } from '../pages/Employees/index';
import { ProfileTab, AVAIL_CYCLE, AvailState, AVAIL_COLORS, DAYS_SHORT, HOURS_LIST, buildInitialAvail, EmployeeProfilePage, AddEmployeePage, EmployeesPage } from '../pages/Employees/Profile';
import { AppShell } from '../AppShell';
import { App } from '../app/App';


// ─── Mock Data ────────────────────────────────────────────────────────────────

export const MOCK_USER = { name: "James Morrison", role: "Admin", initials: "JM" };

export const MOCK_KPI = [
  {
    id: "clocked-in",
    label: "Clocked In",
    value: 34,
    sub: "of 42 scheduled",
    trend: "+2 from yesterday",
    trendUp: true,
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    icon: <UserCheck className="w-5 h-5" />,
    breakdown: [
      { label: "On Duty", count: 28, color: "#16a34a" },
      { label: "On Break", count: 4, color: "#d97706" },
      { label: "Late", count: 2, color: "#dc2626" },
    ],
  },
  {
    id: "inactive-mobile",
    label: "Inactive Mobile",
    value: 3,
    sub: "no activity >15 min",
    trend: "-1 from yesterday",
    trendUp: false,
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
    icon: <UserX className="w-5 h-5" />,
    breakdown: [],
  },
  {
    id: "expiring-skills",
    label: "Expiring Skills",
    value: 7,
    sub: "within 30 days",
    trend: "+3 this week",
    trendUp: false,
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fed7aa",
    icon: <AlertTriangle className="w-5 h-5" />,
    breakdown: [],
  },
  {
    id: "reports-approve",
    label: "Reports to Approve",
    value: 12,
    sub: "last 7 days",
    trend: "+4 since yesterday",
    trendUp: false,
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
    icon: <FileText className="w-5 h-5" />,
    breakdown: [],
  },
  {
    id: "time-off",
    label: "Time-Off Requests",
    value: 5,
    sub: "pending approval",
    trend: "2 urgent",
    trendUp: false,
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    icon: <Clock3 className="w-5 h-5" />,
    breakdown: [],
  },
  {
    id: "missed-patrols",
    label: "Missed Patrols",
    value: 2,
    sub: "last 24 hours",
    trend: "Action required",
    trendUp: false,
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
    icon: <Route className="w-5 h-5" />,
    breakdown: [],
  },
];

export const MOCK_ACTIVITY = [
  { id: 1, type: "clock-in", text: "Marcus Johnson clocked in", site: "Downtown Financial Center", time: "8 min ago", status: "success", timestamp: "2026-08-06T09:00:00" },
  { id: 2, type: "tour", text: "Tour Route Alpha completed", site: "Westfield Mall", time: "15 min ago", status: "success", timestamp: "2026-08-06T08:45:00" },
  { id: 3, type: "incident", text: "Incident report #IR-2847 submitted", site: "Harbor District", time: "32 min ago", status: "warning", timestamp: "2026-08-06T08:28:00" },
  { id: 4, type: "schedule", text: "Night Shift schedule updated", site: "Harbor District", time: "1 hr ago", status: "info", timestamp: "2026-08-06T07:00:00" },
  { id: 5, type: "clock-out", text: "Derek Wilson clocked out", site: "Airport Terminal C", time: "1 hr ago", status: "neutral", timestamp: "2026-08-06T07:00:00" },
  { id: 6, type: "panic", text: "Panic Button Triggered by Sarah Chen", site: "Westfield Mall", time: "1.5 hrs ago", status: "error", timestamp: "2026-08-06T06:30:00" },
  { id: 7, type: "time-off", text: "Time-off request from Emma Rodriguez", site: "All Sites", time: "2 hrs ago", status: "warning", timestamp: "2026-08-06T06:00:00" },
  { id: 8, type: "missed-scan", text: "Checkpoint scan missed at Gate 5", site: "Marina Complex", time: "2 hrs ago", status: "error", timestamp: "2026-08-06T06:00:00" },
  { id: 9, type: "clock-in", text: "Priya Patel clocked in", site: "City Hall Security Post", time: "3 hrs ago", status: "success", timestamp: "2026-08-06T05:00:00" },
];

export const MOCK_TOURS = [
  { id: 1, name: "Tour A — Downtown Perimeter", site: "Downtown Financial Center", status: "In Progress", statusColor: "#d97706", scanned: 5, total: 8, guard: "Marcus Johnson", started: "09:15 AM" },
  { id: 2, name: "Tour B — Westfield Mall", site: "Westfield Mall", status: "Completed", statusColor: "#16a34a", scanned: 12, total: 12, guard: "Sarah Chen", started: "08:00 AM" },
  { id: 3, name: "Tour C — Harbor Night Patrol", site: "Harbor District", status: "Scheduled", statusColor: "#2563eb", scanned: 0, total: 10, guard: "Derek Wilson", started: "10:00 PM" },
  { id: 4, name: "Tour D — Airport Terminal Watch", site: "Airport Terminal C", status: "In Progress", statusColor: "#d97706", scanned: 6, total: 6, guard: "Priya Patel", started: "06:00 AM" },
];

export const MOCK_TASKS = [
  { id: 1, title: "Incident follow-up — Parking Lot B", type: "Dispatch", priority: "High", status: "Overdue", statusColor: "#dc2626", assigned: "Mike Torres", site: "Westfield Mall", due: "Yesterday" },
  { id: 2, title: "Equipment check — Security Room", type: "Quick", priority: "Medium", status: "Open", statusColor: "#d97706", assigned: "Sarah Chen", site: "Downtown Financial Center", due: "Today" },
  { id: 3, title: "Daily report submission", type: "Recurring", priority: "Normal", status: "Open", statusColor: "#2563eb", assigned: "All Supervisors", site: "All Sites", due: "Today 5:00 PM" },
  { id: 4, title: "Client visit preparation — Westfield", type: "Quick", priority: "High", status: "Open", statusColor: "#2563eb", assigned: "James Kim", site: "Westfield Mall", due: "Tomorrow" },
];

export const MOCK_ATTENDANCE = [
  { site: "Downtown Financial Center", scheduled: 12, present: 11, onBreak: 1, absent: 0 },
  { site: "Westfield Mall", scheduled: 8, present: 6, onBreak: 1, absent: 1 },
  { site: "Harbor District", scheduled: 10, present: 8, onBreak: 2, absent: 0 },
  { site: "Airport Terminal C", scheduled: 7, present: 6, onBreak: 0, absent: 1 },
  { site: "City Hall Security Post", scheduled: 5, present: 3, onBreak: 0, absent: 2 },
];


// ─── Detailed Mock Data for Dashboard Drawers ─────────────────────────────────
export const MOCK_CLOCKED_IN_DETAILS = [
  { name: "Marcus Johnson", position: "Armed Security Guard", time: "09:15 AM", shift: "Day Guard Shift", status: "Clocked In" },
  { name: "Sarah Chen", position: "Patrol Supervisor", time: "08:00 AM", shift: "Morning Patrol Shift", status: "Clocked In" },
  { name: "Priya Patel", position: "Site Inspector", time: "06:00 AM", shift: "Terminal Watch", status: "Clocked In" },
  { name: "Derek Wilson", position: "Static Guard", time: "10:00 PM", shift: "Harbor Night Patrol", status: "Clocked Out" },
  { name: "Emma Rodriguez", position: "Control Center Operator", time: "—", shift: "Operations Dispatch", status: "On Time Off" },
  { name: "Mike Torres", position: "Response Guard", time: "09:45 AM (Late)", shift: "Late Shift Westfield", status: "Running Late" },
  { name: "John Davis", position: "Gate Controller", time: "07:00 AM", shift: "Gate 4 Duty", status: "Need to Clock Out" },
  { name: "Aisha Okafor", position: "VIP Patrol", time: "11:00 AM", shift: "VIP Escort Post", status: "Clocked In" }
];

export const MOCK_INACTIVE_TICKETS = [
  { id: "TCK-481", date: "2026-08-03", type: "No GPS Signal", firstName: "Marcus", lastName: "Johnson", subject: "Inactivity Alert (>15 min) - No GPS Ping", location: "Downtown Financial Center", status: "Open" },
  { id: "TCK-482", date: "2026-08-03", type: "No Mobile Activity", firstName: "Mike", lastName: "Torres", subject: "Static Device - No Motion Detected", location: "Westfield Mall", status: "In Progress" },
  { id: "TCK-483", date: "2026-08-03", type: "Missing Clock-Out", firstName: "John", lastName: "Davis", subject: "Auto-Generated Overtime Alert", location: "City Hall Security Post", status: "Open" }
];

export const MOCK_EXPIRING_SKILLS = [
  { name: "Marcus Johnson", skill: "Armed Guard License", expiry: "2026-08-15", expires: "12 days", desc: "State Bureau Certification", region: "West Region", category: "Licenses & Permits" },
  { name: "Sarah Chen", skill: "First Aid & CPR", expiry: "2026-08-20", expires: "17 days", desc: "Red Cross Training Course", region: "North Region", category: "Trainings & Special Skills" },
  { name: "Derek Wilson", skill: "Port Security Clearance", expiry: "2026-09-02", expires: "30 days", desc: "Federal TSA Access Badge", region: "Harbor Region", category: "Licenses & Permits" },
  { name: "Priya Patel", skill: "Spanish Language Proficiency", expiry: "2026-08-01 (Expired)", expires: "Expired", desc: "Corporate Communication Skill", region: "All Regions", category: "Languages" },
  { name: "Emma Rodriguez", skill: "Advanced Fire Safety", expiry: "2026-08-10", expires: "7 days", desc: "Annual Retraining Requirement", region: "South Region", category: "Diplomas" },
  { name: "Mike Torres", skill: "NFC Tour Wand Operator", expiry: "2026-10-15", expires: "73 days", desc: "Internal Security Systems Check", region: "West Region", category: "Trainings & Special Skills" }
];

export const MOCK_MESSAGES = [
  { sender: "Marcus Johnson", title: "Damaged NFC Checkpoint", message: "NFC tag at gate B5 is cracked and won't scan. Uploaded photo in logs.", time: "8 min ago", site: "Downtown Financial Center", viewBy: "All Admins", type: "Current Message" },
  { sender: "Sarah Chen", title: "Schedule Conflict", message: "My shift on Thursday overlaps with the special VIP drill schedule.", time: "15 min ago", site: "Westfield Mall", viewBy: "Supervisors", type: "Current Message" },
  { sender: "Derek Wilson", title: "Access Key Handover", message: "Harbor keys are in box #3. Code is updated for the next night shift.", time: "1 hr ago", site: "Harbor District", viewBy: "All", type: "Current Message" },
  { sender: "Priya Patel", title: "Upcoming Absence Notice", message: "Will be off on August 10th for medical checkup.", time: "2 days ago", site: "Airport Terminal C", viewBy: "Admins", type: "Future Message" },
  { sender: "Mike Torres", title: "Old Gate Warning", message: "Old service gate lock has been replaced. Do not use old key.", time: "7 days ago", site: "Westfield Mall", viewBy: "All", type: "Expired Messages" }
];

export const MOCK_VEHICLES_DETAILED = [
  { id: "VEH-102", license: "8XYZ99", makeModelYear: "Ford Explorer (2022)", status: "Active", ownership: "Leased" },
  { id: "VEH-103", license: "3ABC12", makeModelYear: "Toyota RAV4 (2023)", status: "Active", ownership: "Purchased" },
  { id: "VEH-104", license: "5DEF34", makeModelYear: "Chevrolet Tahoe (2021)", status: "Inactive", ownership: "Leased" },
  { id: "VEH-105", license: "7GHI56", makeModelYear: "Ford F-150 (2020)", status: "Active", ownership: "Purchased" }
];

export const MOCK_ACTIVITY_JOURNAL = [
  { timestamp: "2026-08-03 10:45 AM", type: "Terminated", admin: "James Morrison", details: "Revoked portal access for former employee Mike Peterson." },
  { timestamp: "2026-08-03 09:30 AM", type: "Banned", admin: "James Morrison", details: "Assigned Site Ban for guard John Davis at Westfield Mall." },
  { timestamp: "2026-08-03 08:15 AM", type: "Reactivated", admin: "Sarah Chen", details: "Reactivated employee profile for Priya Patel." },
  { timestamp: "2026-08-03 07:00 AM", type: "Notes", admin: "James Morrison", details: "Added internal warning note to Marcus Johnson's profile." }
];


// ─── Scheduling Mock Data ─────────────────────────────────────────────────────
export const MOCK_SCHED_JOBS = [
  { id: "JOB-ARM", title: "Armed Security Guard", color: "#3b82f6" },
  { id: "JOB-SUP", title: "Patrol Supervisor", color: "#10b981" },
  { id: "JOB-GTE", title: "Gate Watch Controller", color: "#f59e0b" },
  { id: "JOB-STC", title: "Static Inspector", color: "#8b5cf6" }
];

export const MOCK_SCHED_SHIFTS = [
  { id: "SHF-001", employeeName: "Marcus Johnson", jobId: "JOB-ARM", date: "2026-08-03", time: "08:00 AM - 04:00 PM", startTime: "08:00", endTime: "16:00", status: "Published", conflict: null, site: "Downtown Financial Center", notes: "Ensure exterior gate check at top of every hour.", tasks: ["Check Gate B4", "Verify radio charging"], tourAssociated: true },
  { id: "SHF-002", employeeName: "Sarah Chen", jobId: "JOB-SUP", date: "2026-08-03", time: "09:00 AM - 05:00 PM", startTime: "09:00", endTime: "17:00", status: "Published", conflict: null, site: "Westfield Mall", notes: "Routine site patrol and radio check.", tasks: ["Inspect security console"], tourAssociated: true },
  { id: "SHF-003", employeeName: "Derek Wilson", jobId: "JOB-STC", date: "2026-08-03", time: "10:00 PM - 06:00 AM", startTime: "22:00", endTime: "06:00", status: "Published", conflict: "Expired Skill: Port Security Clearance", site: "Harbor District", notes: "Night duty coverage.", tasks: ["Lock perimeter gates"], tourAssociated: true },
  { id: "SHF-004", employeeName: "Mike Torres", jobId: "JOB-GTE", date: "2026-08-04", time: "08:00 AM - 04:00 PM", startTime: "08:00", endTime: "16:00", status: "Published", conflict: null, site: "Westfield Mall", notes: "Gate log verification.", tasks: [], tourAssociated: false },
  { id: "SHF-005", employeeName: null, jobId: "JOB-ARM", date: "2026-08-04", time: "12:00 PM - 08:00 PM", startTime: "12:00", endTime: "20:00", status: "Draft", conflict: null, site: "Downtown Financial Center", notes: "Coverage backup guard needed.", tasks: [], tourAssociated: false },
  { id: "SHF-006", employeeName: "John Davis", jobId: "JOB-STC", date: "2026-08-03", time: "08:00 AM - 04:00 PM", startTime: "08:00", endTime: "16:00", status: "Published", conflict: "Site Ban: City Hall Security Post", site: "City Hall Security Post", notes: "Check badge reader registers.", tasks: [], tourAssociated: false }
];

export const MOCK_SWAP_REQUESTS = [
  { id: "SWP-301", guardName: "Derek Wilson", shiftDate: "2026-08-05", shiftTime: "10:00 PM - 06:00 AM", position: "Static Inspector", reason: "Family event overlap", status: "Pending" },
  { id: "SWP-302", guardName: "Mike Torres", shiftDate: "2026-08-06", shiftTime: "08:00 AM - 04:00 PM", position: "Gate Watch Controller", reason: "Doctor appointment", status: "Pending" }
];

export const MOCK_SCHED_TOURS = [
  { id: "T-001", name: "Night Perimeter", date: "2026-08-04", startTime: "22:00", endTime: "23:00", jobId: "JOB-STC", site: "Harbor District" },
  { id: "T-002", name: "Mall Walk", date: "2026-08-03", startTime: "10:00", endTime: "11:00", jobId: "JOB-SUP", site: "Westfield Mall" },
  { id: "T-003", name: "Gate Check", date: "2026-08-05", startTime: "09:00", endTime: "10:00", jobId: "JOB-GTE", site: "Westfield Mall" },
  { id: "T-004", name: "Unassigned Tour", date: "2026-08-06", startTime: "14:00", endTime: "15:00", jobId: "JOB-ARM", site: "Downtown Financial Center" },
];
