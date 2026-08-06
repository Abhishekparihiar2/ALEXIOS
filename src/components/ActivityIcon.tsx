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
import { LoginPage } from '../pages/LoginPage';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { Dashboard } from '../pages/Dashboard/index';
import { SiteStatus, AccountType, SiteClient, MOCK_SITES, SITE_STATUS_STYLES, ACCT_TYPE_STYLES, CreateSitePage, SiteProfileTab, SiteProfilePage, ClientsPage } from '../pages/Clients/index';
import { CpSection, CpMonitoring, CpExtraScan, CpManual, TourRecurrence, Checkpoint, TourRoute, CpLog, CP_CHECKPOINTS, CP_TOURS, CP_LOGS, CheckpointsPage, SchedulingPage, PlaceholderPage } from '../pages/Checkpoints/index';
import { EmpStatus, EmpUserType, Employee, DEPARTMENTS, MOCK_EMPLOYEES, STATUS_STYLES, USER_TYPE_STYLES, AVATAR_COLORS, avatarColor, EmpTab } from '../pages/Employees/index';
import { ProfileTab, AVAIL_CYCLE, AvailState, AVAIL_COLORS, DAYS_SHORT, HOURS_LIST, buildInitialAvail, EmployeeProfilePage, AddEmployeePage, EmployeesPage } from '../pages/Employees/Profile';
import { AppShell } from '../AppShell';
import { App } from '../app/App';


// ─── Activity Icon ────────────────────────────────────────────────────────────

export function ActivityIcon({ type, status }: { type: string; status: string }) {
  const colors: Record<string, { bg: string; color: string }> = {
    success: { bg: "#f0fdf4", color: "#16a34a" },
    warning: { bg: "#fffbeb", color: "#d97706" },
    error: { bg: "#fef2f2", color: "#dc2626" },
    info: { bg: "#eff6ff", color: "#2563eb" },
    neutral: { bg: "#f8fafc", color: "#64748b" },
  };
  const c = colors[status] || colors.neutral;
  const icons: Record<string, React.ReactNode> = {
    "clock-in": <UserCheck className="w-3.5 h-3.5" />,
    "clock-out": <UserX className="w-3.5 h-3.5" />,
    tour: <Route className="w-3.5 h-3.5" />,
    incident: <AlertTriangle className="w-3.5 h-3.5" />,
    schedule: <Calendar className="w-3.5 h-3.5" />,
    "time-off": <Clock3 className="w-3.5 h-3.5" />,
    "missed-scan": <MapPin className="w-3.5 h-3.5" />,
  };
  return (
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
      style={{ background: c.bg, color: c.color }}
    >
      {icons[type] || <Activity className="w-3.5 h-3.5" />}
    </div>
  );
}
