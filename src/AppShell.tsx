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


import { Page, AuthScreen, FormErrors, NavItem, NavGroup } from './types/index';
import { MOCK_USER, MOCK_KPI, MOCK_ACTIVITY, MOCK_TOURS, MOCK_TASKS, MOCK_ATTENDANCE, MOCK_CLOCKED_IN_DETAILS, MOCK_INACTIVE_TICKETS, MOCK_EXPIRING_SKILLS, MOCK_MESSAGES, MOCK_VEHICLES_DETAILED, MOCK_ACTIVITY_JOURNAL, MOCK_SCHED_JOBS, MOCK_SCHED_SHIFTS, MOCK_SWAP_REQUESTS } from './data/mockData';
import { NAV_GROUPS } from './data/navConfig';
import { StatusBadge } from './components/StatusBadge';
import { ActivityIcon } from './components/ActivityIcon';
import { LoginPage } from './pages/LoginPage';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { Dashboard } from './pages/Dashboard/index';
import { SiteStatus, AccountType, SiteClient, MOCK_SITES, SITE_STATUS_STYLES, ACCT_TYPE_STYLES, CreateSitePage, SiteProfileTab, SiteProfilePage, ClientsPage } from './pages/Clients/index';
import { CpSection, CpMonitoring, CpExtraScan, CpManual, TourRecurrence, Checkpoint, TourRoute, CpLog, CP_CHECKPOINTS, CP_TOURS, CP_LOGS, CheckpointsPage, SchedulingPage, PlaceholderPage } from './pages/Checkpoints/index';
import { EmpStatus, EmpUserType, Employee, DEPARTMENTS, MOCK_EMPLOYEES, STATUS_STYLES, USER_TYPE_STYLES, AVATAR_COLORS, avatarColor, EmpTab } from './pages/Employees/index';
import { ProfileTab, AVAIL_CYCLE, AvailState, AVAIL_COLORS, DAYS_SHORT, HOURS_LIST, buildInitialAvail, EmployeeProfilePage, AddEmployeePage, EmployeesPage } from './pages/Employees/Profile';
import { TicketsPage } from './pages/Tickets/index';
import { TimeClockPage } from './pages/TimeClock/index';
import { FormsPage } from './pages/Forms/index';
import { TasksPage } from './pages/Tasks/index';
import { CommunicationsPage } from './pages/Communications/index';
import { DocumentsPage } from './pages/Documents/index';
import { TrainingPage } from './pages/Training/index';
import { VehiclesPage } from './pages/Vehicles/index';
import { AutomationsPage } from './pages/Automations/index';
import { ReportSettingsPage } from './pages/Reports/index';
import { CompletedReportsPage } from './pages/Reports/CompletedReports';
import { PayrollPage } from './pages/Payroll/index';
import { SkillsPage } from './pages/Skills/index';
import { GroupsPage } from './pages/Groups/index';
import { HelpPage } from './pages/Help/index';
import { HelpDeskPage } from './pages/HelpDesk/index';
import { ActivityJournalPage } from './pages/ActivityJournal/index';
import { App } from './app/App';


// ─── App Shell ────────────────────────────────────────────────────────────────

export function AppShell({ onSignOut }: { onSignOut: () => void }) {
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  return (
    <div className="glass-container bg-black text-white" style={{ position: "fixed", inset: 0, display: "flex", overflow: "hidden" }}>
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onSignOut={onSignOut}
      />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopHeader activePage={activePage} onSignOut={onSignOut} notifCount={7} onNavigate={setActivePage} onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        {activePage === "timeclock" || activePage === "clocked-in" ? <TimeClockPage onNavigate={setActivePage} /> : activePage.startsWith("submodule-exceptions") ? <TicketsPage onNavigate={setActivePage} initialCategory={activePage.includes(":") ? activePage.split(":")[1] : undefined} /> : activePage === "submodule-journal" ? <ActivityJournalPage /> : activePage.startsWith("report-settings") || activePage === "reports" ? <ReportSettingsPage onNavigate={setActivePage} initialView={activePage} /> : activePage.startsWith("reports-submissions") ? <CompletedReportsPage initialTab={(activePage.split(":")[1] as any) || "reports"} initialFilter={activePage.split(":")[2]} /> : activePage === "dashboard" || activePage.startsWith("submodule-") ? <Dashboard onNavigate={setActivePage} initialDrawer={activePage.startsWith("submodule-") ? activePage : undefined} /> : activePage.startsWith("employees") ? <EmployeesPage /> : activePage.startsWith("sites") ? <ClientsPage onNavigate={setActivePage} /> : activePage.startsWith("checkpoints") ? <CheckpointsPage initialSearch={activePage.includes(":") ? activePage.split(":")[1] : undefined} /> : activePage.startsWith("scheduling") ? <SchedulingPage /> : activePage.startsWith("skills") ? <SkillsPage onNavigate={setActivePage} /> : activePage.startsWith("payroll") ? <PayrollPage /> : activePage.startsWith("groups") ? <GroupsPage /> : activePage.startsWith("helpdesk") ? <HelpDeskPage /> : activePage.startsWith("help") ? <HelpPage /> : activePage.startsWith("forms") ? <FormsPage /> : activePage.startsWith("tasks") ? <TasksPage /> : activePage.startsWith("communications") ? <CommunicationsPage /> : activePage.startsWith("documents") ? <DocumentsPage /> : activePage.startsWith("training") ? <TrainingPage /> : activePage.startsWith("vehicles") ? <VehiclesPage /> : activePage.startsWith("automations") ? <AutomationsPage /> : <PlaceholderPage page={activePage} />}
      </div>
    </div>
  );
}
