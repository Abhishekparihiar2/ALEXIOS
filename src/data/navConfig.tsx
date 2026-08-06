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
import { MOCK_USER, MOCK_KPI, MOCK_ACTIVITY, MOCK_TOURS, MOCK_TASKS, MOCK_ATTENDANCE, MOCK_CLOCKED_IN_DETAILS, MOCK_INACTIVE_TICKETS, MOCK_EXPIRING_SKILLS, MOCK_MESSAGES, MOCK_VEHICLES_DETAILED, MOCK_ACTIVITY_JOURNAL, MOCK_SCHED_JOBS, MOCK_SCHED_SHIFTS, MOCK_SWAP_REQUESTS } from './mockData';
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


// ─── Nav Config ───────────────────────────────────────────────────────────────

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Security Operations",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: <LayoutDashboard className="w-4 h-4" />,
        children: [

          { id: "submodule-vehicles", label: "Vehicle Management", icon: <Truck className="w-3.5 h-3.5" /> },
          { id: "submodule-journal", label: "Activity Journal", icon: <ClipboardList className="w-3.5 h-3.5" /> },
          { id: "submodule-exceptions", label: "Manage Tickets", icon: <AlertTriangle className="w-3.5 h-3.5" /> },
        ]
      },
      { id: "scheduling", label: "Scheduling", icon: <Calendar className="w-4 h-4" /> },
      { id: "timeclock", label: "Time Clock", icon: <Clock className="w-4 h-4" /> },
    ],
  },
  {
    label: "People",
    items: [
      { id: "employees", label: "Employees", icon: <Users className="w-4 h-4" /> },
      { id: "sites", label: "Clients & Sites", icon: <Building2 className="w-4 h-4" /> },
    ],
  },
  {
    label: "Field",
    items: [
      { id: "checkpoints", label: "Checkpoints & Tours", icon: <MapPin className="w-4 h-4" /> },
      {
        id: "reports",
        label: "Reports & Incidents",
        icon: <FileText className="w-4 h-4" />,
        children: [
          { id: "report-settings", label: "Report Settings", icon: <Settings className="w-3.5 h-3.5" /> },
          { id: "reports-submissions", label: "Completed Reports", icon: <ClipboardList className="w-3.5 h-3.5" />, badge: 12 },
        ]
      },
      { id: "forms", label: "Forms", icon: <ClipboardList className="w-4 h-4" /> },
      { id: "tasks", label: "Tasks & Dispatch", icon: <CheckSquare className="w-4 h-4" />, badge: 5 },
    ],
  },
  {
    label: "Communication",
    items: [
      { id: "communications", label: "Communications", icon: <MessageSquare className="w-4 h-4" /> },
    ],
  },
  {
    label: "Resources",
    items: [
      { id: "documents", label: "Documents & Policies", icon: <FolderOpen className="w-4 h-4" /> },
      { id: "training", label: "Training", icon: <GraduationCap className="w-4 h-4" /> },
      { id: "vehicles", label: "Vehicles", icon: <Truck className="w-4 h-4" /> },
    ],
  },
  {
    label: "Administration",
    items: [
      { id: "automations", label: "Automations", icon: <Zap className="w-4 h-4" /> },
      { id: "payroll", label: "Payroll & Back Office", icon: <DollarSign className="w-4 h-4" /> },
      { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
      { id: "groups", label: "Groups & Segments", icon: <Layers className="w-4 h-4" /> },
      { id: "help", label: "Help", icon: <HelpCircle className="w-4 h-4" /> },
      { id: "helpdesk", label: "Help Desk", icon: <Headphones className="w-4 h-4" /> },
    ],
  },
];
