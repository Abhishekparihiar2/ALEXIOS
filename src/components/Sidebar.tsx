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
import { TopHeader } from './TopHeader';
import { Dashboard } from '../pages/Dashboard/index';
import { SiteStatus, AccountType, SiteClient, MOCK_SITES, SITE_STATUS_STYLES, ACCT_TYPE_STYLES, CreateSitePage, SiteProfileTab, SiteProfilePage, ClientsPage } from '../pages/Clients/index';
import { CpSection, CpMonitoring, CpExtraScan, CpManual, TourRecurrence, Checkpoint, TourRoute, CpLog, CP_CHECKPOINTS, CP_TOURS, CP_LOGS, CheckpointsPage, SchedulingPage, PlaceholderPage } from '../pages/Checkpoints/index';
import { EmpStatus, EmpUserType, Employee, DEPARTMENTS, MOCK_EMPLOYEES, STATUS_STYLES, USER_TYPE_STYLES, AVATAR_COLORS, avatarColor, EmpTab } from '../pages/Employees/index';
import { ProfileTab, AVAIL_CYCLE, AvailState, AVAIL_COLORS, DAYS_SHORT, HOURS_LIST, buildInitialAvail, EmployeeProfilePage, AddEmployeePage, EmployeesPage } from '../pages/Employees/Profile';
import { AppShell } from '../AppShell';
import { App } from '../app/App';


// ─── Sidebar ──────────────────────────────────────────────────────────────────

export function Sidebar({
  activePage,
  onNavigate,
  collapsed,
  onToggle,
  onSignOut,
}: {
  activePage: Page;
  onNavigate: (p: Page) => void;
  collapsed: boolean;
  onToggle: () => void;
  onSignOut: () => void;
}) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["dashboard"]);

  const toggleMenu = (id: string) => {
    setExpandedMenus(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  };

  return (
    <aside
      className="flex flex-col h-full transition-all duration-200 overflow-hidden glass-sidebar dark"
      style={{
        width: collapsed ? 64 : 240,
        flexShrink: 0,
      }}
    >
      {/* Logo Header */}
      <div
        className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3 px-3'} py-4`}
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", minHeight: 64 }}
      >
        {!collapsed && (
          <div
            className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center shrink-0"
            style={{ background: "#1a2744" }}
          >
            <img src={alexiosLogo} alt="Alexios" className="w-full h-full object-contain p-1" />
          </div>
        )}
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sm font-semibold leading-tight truncate" style={{ color: "#e2e8f0" }}>Alexios</p>
            <p className="text-xs leading-tight truncate" style={{ color: "#64748b" }}>Admin Portal</p>
          </div>
        )}
        <button
          onClick={onToggle}
          className={`${collapsed ? '' : 'ml-auto'} shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10`}
          style={{ color: collapsed ? "#e2e8f0" : "#64748b" }}
        >
          {collapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2" style={{ scrollbarWidth: "none" }}>
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-1">
            {!collapsed && (
              <p className="text-xs font-semibold uppercase tracking-wider px-2 pt-3 pb-1" style={{ color: "#94a3b8" }}>
                {group.label}
              </p>
            )}
            {collapsed && <div className="my-2 mx-2 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />}
            {group.items.map((item) => {
              const isActive = activePage === item.id || (item.children && item.children.some(child => activePage === child.id));
              const isExpanded = expandedMenus.includes(item.id);

              return (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => {
                      if (item.children) {
                        toggleMenu(item.id);
                        onNavigate(item.id as Page);
                      } else {
                        onNavigate(item.id as Page);
                      }
                    }}
                    title={collapsed ? item.label : undefined}
                    className="w-full flex items-center gap-2.5 rounded-md transition-all text-left"
                    style={{
                      padding: collapsed ? "8px 10px" : "7px 10px",
                      background: isActive && !item.children ? "#1e3a6e" : "transparent",
                      color: isActive ? "#e2e8f0" : "#94a3b8",
                      justifyContent: collapsed ? "center" : "flex-start",
                    }}
                    onMouseEnter={(e) => {
                      if (!(isActive && !item.children)) { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#c0c8d8"; }
                    }}
                    onMouseLeave={(e) => {
                      if (!(isActive && !item.children)) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = isActive ? "#e2e8f0" : "#94a3b8"; }
                    }}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    {!collapsed && (
                      <>
                        <span className="text-sm truncate flex-1 font-medium">{item.label}</span>
                        {item.badge && (
                          <span className="text-xs font-semibold rounded-full px-1.5 py-0.5 leading-none"
                            style={{ background: "#dc2626", color: "#fff", minWidth: 18, textAlign: "center" }}>
                            {item.badge}
                          </span>
                        )}
                        {item.children && (
                          <span className="shrink-0">
                            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                          </span>
                        )}
                      </>
                    )}
                    {collapsed && item.badge && (
                      <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full" style={{ background: "#dc2626" }} />
                    )}
                  </button>

                  {/* Render Submenu */}
                  {!collapsed && item.children && isExpanded && (
                    <div className="ml-7 mt-0.5 border-l border-slate-700/50 pl-2 space-y-0.5">
                      {item.children.map(child => {
                        const isChildActive = activePage === child.id;
                        return (
                          <button
                            key={child.id}
                            onClick={() => onNavigate(child.id)}
                            className="w-full flex items-center gap-2 rounded-md transition-all text-left"
                            style={{
                              padding: "6px 8px",
                              background: isChildActive ? "rgba(255,255,255,0.08)" : "transparent",
                              color: isChildActive ? "#e2e8f0" : "#94a3b8",
                            }}
                            onMouseEnter={(e) => {
                              if (!isChildActive) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#c0c8d8"; }
                            }}
                            onMouseLeave={(e) => {
                              if (!isChildActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8"; }
                            }}
                          >
                            <span className="shrink-0 opacity-70">{child.icon}</span>
                            <span className="text-xs truncate">{child.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User Footer */}
      <div className="px-2 py-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2.5 rounded-md px-2 py-2" style={{ background: "rgba(255,255,255,0.04)" }}>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
            style={{ background: "#1e3a6e", color: "#93c5fd" }}
          >
            {MOCK_USER.initials}
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-medium truncate" style={{ color: "#e2e8f0" }}>{MOCK_USER.name}</p>
                <p className="text-xs truncate" style={{ color: "#64748b" }}>{MOCK_USER.role}</p>
              </div>
              <button
                onClick={onSignOut}
                title="Sign out"
                className="shrink-0 w-6 h-6 rounded flex items-center justify-center transition-colors hover:bg-white/10"
                style={{ color: "#64748b" }}
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
