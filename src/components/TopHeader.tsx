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
import { useSiteContext } from '../context/SiteContext';
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
  onNavigate,
  onToggleSidebar,
}: {
  activePage: Page;
  onSignOut: () => void;
  notifCount: number;
  onNavigate?: (page: Page) => void;
  onToggleSidebar?: () => void;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [siteDropdownOpen, setSiteDropdownOpen] = useState(false);
  const { globalSite, setGlobalSite } = useSiteContext();

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
      className="flex items-center gap-3 px-5 shrink-0 bg-black border-b border-neutral-800"
      style={{
        height: 56,
        zIndex: 50,
        position: "relative",
      }}
    >
      <button onClick={onToggleSidebar} className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors">
        <Menu className="w-5 h-5" />
      </button>
      <h2 className="text-base font-bold flex-1 truncate text-slate-100 uppercase tracking-widest">
        {pageLabels[activePage] || "Dashboard"}
      </h2>

      {/* Global Search */}
      <button
        onClick={() => setSearchOpen(true)}
        className="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition-colors bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300 hover:border-[var(--neon-blue)]"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="hidden md:block text-xs">Search…</span>
        <kbd className="hidden md:block text-xs rounded px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-200 font-mono text-[10px]">⌘K</kbd>
      </button>

      {/* Site Dropdown */}
      <div className="relative">
        <button
          onClick={() => setSiteDropdownOpen(!siteDropdownOpen)}
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm"
        >
          <Building2 className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          <span className="hidden sm:block truncate max-w-[150px]">{globalSite}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
        {siteDropdownOpen && (
          <div className="absolute top-full right-0 sm:left-0 sm:right-auto mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 py-1 animate-in fade-in slide-in-from-top-2">
            <button 
              onClick={() => { setGlobalSite("All Sites"); setSiteDropdownOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${globalSite === "All Sites" ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}
            >
              All Sites
            </button>
            <div className="h-px bg-slate-100 dark:bg-slate-800 my-1"></div>
            <div className="max-h-60 overflow-y-auto">
              {MOCK_SITES.map(site => (
                <button 
                  key={site.uid}
                  onClick={() => { setGlobalSite(site.companyName); setSiteDropdownOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${globalSite === site.companyName ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}
                >
                  {site.companyName}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Notifications */}
      <button 
        onClick={() => onNavigate && onNavigate("communications")}
        className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-300"
      >
        <Bell className="w-4 h-4" />
        {notifCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold bg-red-600 text-white shadow-[0_0_8px_rgba(220,38,38,0.8)]">
            {notifCount > 9 ? "9+" : notifCount}
          </span>
        )}
      </button>

      {/* Chat */}
      <button 
        onClick={() => onNavigate && onNavigate("communications")}
        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-300"
      >
        <MessageSquare className="w-4 h-4" />
      </button>

      {/* Profile */}
      <div className="relative">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
            style={{ background: "#1e3a6e", color: "#93c5fd" }}>
            {MOCK_USER.initials}
          </div>
          <span className="text-sm font-medium hidden md:block text-slate-700 dark:text-slate-200" >{MOCK_USER.name}</span>
          <ChevronDown className="w-3.5 h-3.5 hidden md:block text-slate-400 dark:text-slate-300"  />
        </button>
        {profileOpen && (
          <div
            className="absolute right-0 top-full mt-1 w-48 rounded-xl py-1 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl"
          >
            <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100" >{MOCK_USER.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400" >{MOCK_USER.role}</p>
            </div>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors" >
              <User className="w-4 h-4" />My Profile
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors" >
              <Settings className="w-4 h-4" />User Settings
            </button>
            <div className="border-t border-slate-100 dark:border-slate-800">
              <button onClick={onSignOut}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors">
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
              <Search className="w-4 h-4 shrink-0 text-slate-400 dark:text-slate-300"  />
              <input autoFocus value={searchQ} onChange={(e) => setSearchQ(e.target.value)}
                placeholder="Search employees, sites, reports, tasks…"
                className="flex-1 text-sm outline-none bg-transparent" style={{ color: "#0f172a" }} />
              <button onClick={() => setSearchOpen(false)}><X className="w-4 h-4 text-slate-400 dark:text-slate-300"  /></button>
            </div>
            <div className="px-4 py-3">
              {searchQ === "" ? (
                <p className="text-xs text-center py-4 text-slate-400 dark:text-slate-300" >Start typing to search across employees, sites, reports, and tasks.</p>
              ) : (
                <p className="text-xs text-center py-4 text-slate-400 dark:text-slate-300" >No results for "{searchQ}"</p>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
