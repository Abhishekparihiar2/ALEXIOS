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
import { MOCK_USER, MOCK_KPI, MOCK_ACTIVITY, MOCK_TOURS, MOCK_TASKS, MOCK_ATTENDANCE, MOCK_CLOCKED_IN_DETAILS, MOCK_INACTIVE_TICKETS, MOCK_EXPIRING_SKILLS, MOCK_MESSAGES, MOCK_VEHICLES_DETAILED, MOCK_ACTIVITY_JOURNAL, MOCK_SCHED_JOBS, MOCK_SCHED_SHIFTS, MOCK_SWAP_REQUESTS } from '../data/mockData';
import { NAV_GROUPS } from '../data/navConfig';
import { StatusBadge } from './StatusBadge';
import { ActivityIcon } from './ActivityIcon';
import { LoginPage } from '../pages/LoginPage';
import { Sidebar } from './Sidebar';
import { Dashboard } from '../pages/Dashboard/index';
import { SiteStatus, AccountType, SiteClient, MOCK_SITES, SITE_STATUS_STYLES, ACCT_TYPE_STYLES, CreateSitePage, SiteProfileTab, SiteProfilePage, ClientsPage } from '../pages/Clients/index';
import { CpSection, CpMonitoring, CpExtraScan, CpManual, TourRecurrence, Checkpoint, TourRoute, CpLog, CP_CHECKPOINTS, CP_TOURS, CP_LOGS, CheckpointsPage, SchedulingPage, PlaceholderPage } from '../pages/Checkpoints/index';
import { EmpStatus, EmpUserType, Employee, DEPARTMENTS, MOCK_EMPLOYEES, STATUS_STYLES, USER_TYPE_STYLES, AVATAR_COLORS, avatarColor, EmpTab } from '../pages/Employees/index';
import { ProfileTab, AVAIL_CYCLE, AvailState, AVAIL_COLORS, DAYS_SHORT, HOURS_LIST, buildInitialAvail, EmployeeProfilePage, AddEmployeePage, EmployeesPage } from '../pages/Employees/Profile';
import { AppShell } from '../AppShell';
import { App } from '../app/App';


// ─── Top Header ───────────────────────────────────────────────────────────────

export function TopHeader({
  activePage,
  onSignOut,
  notifCount,
}: {
  activePage: Page;
  onSignOut: () => void;
  notifCount: number;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  const pageLabels: Record<Page, string> = {
    dashboard: "Dashboard", employees: "Employee Management", sites: "Clients & Sites",
    checkpoints: "Checkpoints & Tour Routes", scheduling: "Scheduling", timeclock: "Time Clock",
    reports: "Reports & Incidents", forms: "Forms", tasks: "Tasks & Dispatch",
    communications: "Communications", "security-ops": "Security Operations",
    documents: "Documents & Policies", training: "Training", vehicles: "Vehicles",
    automations: "Automations", payroll: "Payroll & Back Office", settings: "Settings",
    groups: "Groups & Segments", help: "Help", helpdesk: "Help Desk",
  };

  return (
    <header
      className="flex items-center gap-3 px-5 shrink-0 glass-header"
      style={{
        height: 56,
        zIndex: 10,
        position: "relative",
      }}
    >
      <h2 className="text-base font-semibold flex-1 truncate" style={{ color: "#0f172a" }}>
        {pageLabels[activePage] || "Dashboard"}
      </h2>

      {/* Today's date */}
      <span className="text-xs hidden sm:block" style={{ color: "#94a3b8" }}>
        {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
      </span>

      {/* Global Search */}
      <button
        onClick={() => setSearchOpen(true)}
        className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors"
        style={{ background: "#f1f5f9", color: "#64748b", border: "1px solid #e2e8f0" }}
      >
        <Search className="w-3.5 h-3.5" />
        <span className="hidden md:block text-xs">Search…</span>
        <kbd className="hidden md:block text-xs rounded px-1 py-0.5" style={{ background: "#e2e8f0", color: "#94a3b8", fontFamily: "monospace", fontSize: 10 }}>⌘K</kbd>
      </button>

      {/* Notifications */}
      <button className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100"
        style={{ color: "#64748b" }}>
        <Bell className="w-4 h-4" />
        {notifCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-semibold"
            style={{ background: "#dc2626", color: "#fff", fontSize: 9 }}>
            {notifCount > 9 ? "9+" : notifCount}
          </span>
        )}
      </button>

      {/* Chat */}
      <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100"
        style={{ color: "#64748b" }}>
        <MessageSquare className="w-4 h-4" />
      </button>

      {/* Profile */}
      <div className="relative">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-100"
        >
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
            style={{ background: "#1e3a6e", color: "#93c5fd" }}>
            {MOCK_USER.initials}
          </div>
          <span className="text-sm font-medium hidden md:block" style={{ color: "#374151" }}>{MOCK_USER.name}</span>
          <ChevronDown className="w-3.5 h-3.5 hidden md:block" style={{ color: "#94a3b8" }} />
        </button>
        {profileOpen && (
          <div
            className="absolute right-0 top-full mt-1 w-48 rounded-xl py-1 z-50"
            style={{ background: "#fff", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", border: "1px solid rgba(0,0,0,0.08)" }}
          >
            <div className="px-3 py-2" style={{ borderBottom: "1px solid #f1f5f9" }}>
              <p className="text-sm font-medium" style={{ color: "#0f172a" }}>{MOCK_USER.name}</p>
              <p className="text-xs" style={{ color: "#64748b" }}>{MOCK_USER.role}</p>
            </div>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50" style={{ color: "#374151" }}>
              <User className="w-4 h-4" />My Profile
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50" style={{ color: "#374151" }}>
              <Settings className="w-4 h-4" />User Settings
            </button>
            <div style={{ borderTop: "1px solid #f1f5f9" }}>
              <button onClick={onSignOut}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-red-50"
                style={{ color: "#dc2626" }}>
                <LogOut className="w-4 h-4" />Sign Out
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Global Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={() => setSearchOpen(false)}>
          <div className="w-full max-w-lg rounded-2xl overflow-hidden"
            style={{ background: "#fff", boxShadow: "0 24px 48px rgba(0,0,0,0.2)" }}
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid #f1f5f9" }}>
              <Search className="w-4 h-4 shrink-0" style={{ color: "#94a3b8" }} />
              <input autoFocus value={searchQ} onChange={(e) => setSearchQ(e.target.value)}
                placeholder="Search employees, sites, reports, tasks…"
                className="flex-1 text-sm outline-none bg-transparent" style={{ color: "#0f172a" }} />
              <button onClick={() => setSearchOpen(false)}><X className="w-4 h-4" style={{ color: "#94a3b8" }} /></button>
            </div>
            <div className="px-4 py-3">
              {searchQ === "" ? (
                <p className="text-xs text-center py-4" style={{ color: "#94a3b8" }}>Start typing to search across employees, sites, reports, and tasks.</p>
              ) : (
                <p className="text-xs text-center py-4" style={{ color: "#94a3b8" }}>No results for "{searchQ}"</p>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
