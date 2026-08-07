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


import { Page, AuthScreen, FormErrors, NavItem, NavGroup } from '../../types/index';
import { MOCK_USER, MOCK_KPI, MOCK_ACTIVITY, MOCK_TOURS, MOCK_TASKS, MOCK_ATTENDANCE, MOCK_CLOCKED_IN_DETAILS, MOCK_INACTIVE_TICKETS, MOCK_EXPIRING_SKILLS, MOCK_MESSAGES, MOCK_VEHICLES_DETAILED, MOCK_ACTIVITY_JOURNAL, MOCK_SCHED_JOBS, MOCK_SCHED_SHIFTS, MOCK_SWAP_REQUESTS } from '../../data/mockData';
import { NAV_GROUPS } from '../../data/navConfig';
import { StatusBadge } from '../../components/StatusBadge';
import { ActivityIcon } from '../../components/ActivityIcon';
import { LoginPage } from '../LoginPage';
import { Sidebar } from '../../components/Sidebar';
import { TopHeader } from '../../components/TopHeader';
import { Dashboard } from '../Dashboard/index';
import { SiteStatus, AccountType, SiteClient, MOCK_SITES, SITE_STATUS_STYLES, ACCT_TYPE_STYLES, CreateSitePage, SiteProfileTab, SiteProfilePage, ClientsPage } from '../Clients/index';
export { SchedulingPage } from '../Scheduling/index';
import { EmpStatus, EmpUserType, Employee, DEPARTMENTS, MOCK_EMPLOYEES, STATUS_STYLES, USER_TYPE_STYLES, AVATAR_COLORS, avatarColor, EmpTab } from '../Employees/index';
import { ProfileTab, AVAIL_CYCLE, AvailState, AVAIL_COLORS, DAYS_SHORT, HOURS_LIST, buildInitialAvail, EmployeeProfilePage, AddEmployeePage, EmployeesPage } from '../Employees/Profile';
import { CreateTourWizard } from './CreateTourWizard';
import { AppShell } from '../../AppShell';
import { App } from '../../app/App';


// ─── Checkpoints & Tour Routes Page ──────────────────────────────────────────

export type CpSection = "checkpoints" | "tours" | "logs" | "locations";
export type CpMonitoring = "none" | "tour" | "interval";
export type CpExtraScan = "log" | "message" | "report";
export type CpManual = "yes" | "no" | "yes-reason";
export type TourRecurrence = "weekly" | "monthly";

export interface Checkpoint {
  id: string;
  name: string;
  type: "NFC" | "Barcode";
  monitoring: string;
  assigned: string;
  lastScan: string;
  status: "Active" | "Inactive";
  site: string;
}

export interface TourRoute {
  id: string;
  description: string;
  assignedTo: string;
  duration: string;
  gracePeriod: string;
  recurrence: string;
  schedule: string;
  checkpointCount: number;
  status: "Active" | "Inactive";
  site: string;
}

export interface CpLog {
  time: string;
  employee: string;
  account: string;
  checkpoint: string;
  tour: string;
}

export interface CpLocation {
  id: string;
  name: string;
  site: string;
  status: "Active" | "Inactive";
  addedBy: string;
}

export const CP_CHECKPOINTS: Checkpoint[] = [
  { id: "CP-001", name: "Main Entrance Gate", type: "NFC", monitoring: "Part of Tour", assigned: "All Positions", lastScan: "Today, 08:14 AM", status: "Active", site: "Westfield Plaza" },
  { id: "CP-002", name: "North Perimeter Fence", type: "NFC", monitoring: "Regular Interval", assigned: "Guards Only", lastScan: "Today, 07:45 AM", status: "Active", site: "Westfield Plaza" },
  { id: "CP-003", name: "Server Room B", type: "Barcode", monitoring: "Part of Tour", assigned: "All Positions", lastScan: "Yesterday, 11:30 PM", status: "Active", site: "Tech Tower Lvl 4" },
  { id: "CP-004", name: "Loading Dock A", type: "Barcode", monitoring: "Do Not Monitor", assigned: "All Positions", lastScan: "Today, 06:00 AM", status: "Active", site: "Westfield Plaza" },
  { id: "CP-005", name: "Parking Garage L3", type: "NFC", monitoring: "Regular Interval", assigned: "Selected Positions", lastScan: "Today, 09:30 AM", status: "Active", site: "Harbor View Center" },
  { id: "CP-006", name: "Roof Access Door", type: "NFC", monitoring: "Part of Tour", assigned: "Guards Only", lastScan: "Yesterday, 8:00 PM", status: "Inactive", site: "Tech Tower Lvl 4" },
  { id: "CP-007", name: "Emergency Exit C", type: "Barcode", monitoring: "Regular Interval", assigned: "All Positions", lastScan: "Today, 05:00 AM", status: "Active", site: "Harbor View Center" },
  { id: "CP-008", name: "Reception Lobby", type: "NFC", monitoring: "Do Not Monitor", assigned: "All Positions", lastScan: "Today, 10:02 AM", status: "Active", site: "Westfield Plaza" },
];

export const CP_TOURS: TourRoute[] = [
  { id: "TR-001", description: "Westfield Perimeter Patrol", assignedTo: "All Guards", duration: "45 min", gracePeriod: "15 min", recurrence: "Weekly", schedule: "Mon–Fri, 08:00", checkpointCount: 6, status: "Active", site: "Westfield Plaza" },
  { id: "TR-002", description: "Tech Tower Night Sweep", assignedTo: "Night Guards", duration: "30 min", gracePeriod: "10 min", recurrence: "Weekly", schedule: "Daily, 23:00", checkpointCount: 4, status: "Active", site: "Tech Tower Lvl 4" },
  { id: "TR-003", description: "Harbor Dock Inspection", assignedTo: "Security Officers", duration: "60 min", gracePeriod: "15 min", recurrence: "Monthly", schedule: "1st Mon, 06:00", checkpointCount: 8, status: "Active", site: "Harbor View Center" },
  { id: "TR-004", description: "Garage Level Sweep", assignedTo: "All Guards", duration: "20 min", gracePeriod: "5 min", recurrence: "Weekly", schedule: "Sat–Sun, 14:00", checkpointCount: 3, status: "Inactive", site: "Harbor View Center" },
];

export const CP_LOGS: CpLog[] = [
  { time: "Today, 10:02 AM", employee: "Marcus Johnson", account: "Westfield Plaza", checkpoint: "Reception Lobby", tour: "—" },
  { time: "Today, 09:30 AM", employee: "Sarah Chen", account: "Harbor View Center", checkpoint: "Parking Garage L3", tour: "Harbor Dock Inspection" },
  { time: "Today, 08:14 AM", employee: "Derek Wilson", account: "Westfield Plaza", checkpoint: "Main Entrance Gate", tour: "Westfield Perimeter Patrol" },
  { time: "Today, 07:45 AM", employee: "Priya Patel", account: "Westfield Plaza", checkpoint: "North Perimeter Fence", tour: "Westfield Perimeter Patrol" },
  { time: "Today, 06:00 AM", employee: "Tony Griffin", account: "Westfield Plaza", checkpoint: "Loading Dock A", tour: "—" },
  { time: "Today, 05:00 AM", employee: "Emma Rodriguez", account: "Harbor View Center", checkpoint: "Emergency Exit C", tour: "—" },
  { time: "Yesterday, 11:30 PM", employee: "Marcus Johnson", account: "Tech Tower Lvl 4", checkpoint: "Server Room B", tour: "Tech Tower Night Sweep" },
  { time: "Yesterday, 08:00 PM", employee: "Derek Wilson", account: "Tech Tower Lvl 4", checkpoint: "Roof Access Door", tour: "Tech Tower Night Sweep" },
];

export const CP_LOCATIONS: CpLocation[] = [
  { id: "LOC-001", name: "Main Entrance", site: "Westfield Plaza", status: "Active", addedBy: "James Morrison" },
  { id: "LOC-002", name: "Loading Dock A", site: "Westfield Plaza", status: "Active", addedBy: "James Morrison" },
  { id: "LOC-003", name: "Server Room B", site: "Tech Tower Lvl 4", status: "Active", addedBy: "Sarah Chen" },
  { id: "LOC-004", name: "Parking Garage L3", site: "Harbor View Center", status: "Active", addedBy: "James Morrison" },
];

export function CheckpointsPage() {
  // ── All state at top level (Rules of Hooks) ────────────────────────────────
  const [section, setSection] = useState<CpSection>("checkpoints");
  const [search, setSearch] = useState("");
  const [tourSearch, setTourSearch] = useState("");
  const [logSearch, setLogSearch] = useState("");
  const [showCreateCp, setShowCreateCp] = useState(false);
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [showCreateTour, setShowCreateTour] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [selectedTour, setSelectedTour] = useState<TourRoute | null>(null);

  // Create Checkpoint form state
  const [cpName, setCpName] = useState("");
  const [cpInstructions, setCpInstructions] = useState("");
  const [cpScanBy, setCpScanBy] = useState<"all" | "selected">("all");
  const [cpMonitoring, setCpMonitoring] = useState<CpMonitoring>("none");
  const [cpInterval, setCpInterval] = useState("30");
  const [cpIntervalUnit, setCpIntervalUnit] = useState("Minutes");
  const [cpExtraScan, setCpExtraScan] = useState<CpExtraScan>("log");
  const [cpVerify, setCpVerify] = useState<"none" | "range" | "yesno-no" | "yesno-yes" | "multi">("none");
  const [cpType, setCpType] = useState<"NFC" | "Barcode">("NFC");
  const [cpId, setCpId] = useState("");
  const [cpGPS, setCpGPS] = useState("10");
  const [cpManual, setCpManual] = useState<CpManual>("yes");

  // Create Tour Route form state
  const [tourDesc, setTourDesc] = useState("");
  const [tourAssigned, setTourAssigned] = useState("");
  const [tourInstructions, setTourInstructions] = useState("");
  const [tourDuration, setTourDuration] = useState("");
  const [tourGrace, setTourGrace] = useState("15");
  const [tourRecurrence, setTourRecurrence] = useState<TourRecurrence>("weekly");
  const [tourDay, setTourDay] = useState("Monday");
  const [tourTime, setTourTime] = useState("08:00");

  // Location filters
  const [locSearch, setLocSearch] = useState("");
  const [locSiteFilter, setLocSiteFilter] = useState("All Sites");
  
  const [mockLocations, setMockLocations] = useState<CpLocation[]>(CP_LOCATIONS);
  
  // Add Location Modal State
  const [selectedSite, setSelectedSite] = useState("");
  const [locationInputs, setLocationInputs] = useState([{ id: 1, value: "" }]);

  // ── Render helpers (no hooks inside) ──────────────────────────────────────

  function renderRadioGroup(
    label: string,
    options: { value: string; label: string }[],
    value: string,
    onChange: (v: string) => void
  ) {
    return (
      <div>
        <div className="text-xs font-semibold mb-2" style={{ color: "#475569" }}>{label}</div>
        <div className="flex flex-wrap gap-3">
          {options.map((o) => (
            <label key={o.value} className="flex items-center gap-2 cursor-pointer">
              <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: value === o.value ? "#2563eb" : "#cbd5e1", background: value === o.value ? "#2563eb" : "white" }}
                onClick={() => onChange(o.value)}>
                {value === o.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <span className="text-sm" style={{ color: "#374151" }}>{o.label}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  function renderField(label: string, children: React.ReactNode, required = false) {
    return (
      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: "#374151" }}>
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {children}
      </div>
    );
  }

  function renderInput(placeholder: string, value: string, onChange: (v: string) => void, type = "text") {
    return (
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
        style={{ border: "1.5px solid #e2e8f0", color: "#0f172a" }} />
    );
  }

  function renderSelect(options: string[], value: string, onChange: (v: string) => void) {
    return (
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-xl text-sm outline-none appearance-none"
        style={{ border: "1.5px solid #e2e8f0", color: "#0f172a" }}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    );
  }

  function renderModalFooter(onCancel: () => void, submitLabel: string) {
    return (
      <div className="flex justify-end gap-3 pt-4 mt-2" style={{ borderTop: "1px solid #f1f5f9" }}>
        <button onClick={onCancel} className="px-5 py-2.5 rounded-xl text-sm font-semibold"
          style={{ border: "1.5px solid #e2e8f0", color: "#475569" }}>Cancel</button>
        <button className="px-5 py-2.5 rounded-xl text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg,#1e3a6e,#2563eb)" }}>{submitLabel}</button>
      </div>
    );
  }

  function renderModal(title: string, onClose: () => void, children: React.ReactNode, wide = false) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(15,23,41,0.55)", backdropFilter: "blur(4px)" }}>
        <div className="rounded-2xl overflow-hidden flex flex-col max-h-[90vh] w-full"
          style={{ maxWidth: wide ? 780 : 580, background: "#fff", boxShadow: "0 20px 60px rgba(15,23,41,0.25)" }}>
          <div className="flex items-center justify-between px-6 py-4 shrink-0"
            style={{ background: "linear-gradient(135deg,#0f1729,#1e3a6e)" }}>
            <h3 className="text-base font-bold text-white">{title}</h3>
            <button onClick={onClose} className="p-1.5 rounded-lg transition-all"
              style={{ color: "rgba(255,255,255,0.6)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-y-auto p-6">{children}</div>
        </div>
      </div>
    );
  }

  function renderCreateCheckpointModal() {
    return renderModal("Create Checkpoint", () => setShowCreateCp(false), (
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {renderField("Checkpoint Name", renderInput("e.g. North Gate", cpName, setCpName), true)}
          {renderField("Checkpoint ID", renderInput("NFC tag ID or barcode value", cpId, setCpId))}
        </div>
        {renderField("Special Instructions", (
          <textarea value={cpInstructions} onChange={(e) => setCpInstructions(e.target.value)}
            placeholder="Special instructions for this checkpoint..."
            className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" rows={2}
            style={{ border: "1.5px solid #e2e8f0" }} />
        ))}

        {renderRadioGroup("Checkpoint Type", [
          { value: "NFC", label: "NFC Tag" },
          { value: "Barcode", label: "Barcode" },
        ], cpType, (v) => setCpType(v as "NFC" | "Barcode"))}

        {renderRadioGroup("Can Be Scanned By", [
          { value: "all", label: "All Positions" },
          { value: "selected", label: "Selected Positions / Job Types" },
        ], cpScanBy, (v) => setCpScanBy(v as "all" | "selected"))}

        {renderRadioGroup("Monitoring", [
          { value: "none", label: "Do Not Monitor / Scan Randomly" },
          { value: "tour", label: "Checkpoint Is Part of Tour" },
          { value: "interval", label: "Request Scan on Regular Interval" },
        ], cpMonitoring, (v) => setCpMonitoring(v as CpMonitoring))}

        {cpMonitoring === "interval" && (
          <div className="flex gap-3">
            {renderField("Scan Request Interval", renderInput("30", cpInterval, setCpInterval, "number"))}
            {renderField("Unit", renderSelect(["Minutes", "Hours", "Days", "Weeks"], cpIntervalUnit, setCpIntervalUnit))}
          </div>
        )}

        {renderRadioGroup("Extra Scan Option", [
          { value: "log", label: "Log Only" },
          { value: "message", label: "Display a Message" },
          { value: "report", label: "Open a Report Form" },
        ], cpExtraScan, (v) => setCpExtraScan(v as CpExtraScan))}

        {renderRadioGroup("Exception Verification", [
          { value: "none", label: "None" },
          { value: "range", label: "Validate Range" },
          { value: "yesno-no", label: "Yes/No — No Is Exception" },
          { value: "yesno-yes", label: "Yes/No — Yes Is Exception" },
          { value: "multi", label: "Multi Questions" },
        ], cpVerify, (v) => setCpVerify(v as typeof cpVerify))}

        <div className="grid grid-cols-2 gap-4">
          {renderField("GPS Required Accuracy (m)", renderInput("10", cpGPS, setCpGPS, "number"))}
          {renderField("Allow Manual Scanning", renderSelect(["Yes", "No", "Yes with Reason"], cpManual, (v) => setCpManual(v as CpManual)))}
        </div>

        {renderModalFooter(() => setShowCreateCp(false), "Create Checkpoint")}
      </div>
    ), true);
  }


  function renderImportModal() {
    return renderModal("Import Checkpoints via Excel", () => setShowImport(false), (
      <div className="space-y-5">
        <div className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center py-10 gap-3"
          style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}>
          <FileSpreadsheet className="w-10 h-10" style={{ color: "#2563eb" }} />
          <div className="text-sm font-semibold" style={{ color: "#1e3a6e" }}>Drop your Excel file here</div>
          <div className="text-xs" style={{ color: "#64748b" }}>or click to browse — .xlsx / .csv supported</div>
          <button className="mt-2 px-5 py-2 rounded-xl text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg,#1e3a6e,#2563eb)" }}>Choose File</button>
        </div>
        <div className="flex items-center gap-2 text-xs" style={{ color: "#475569" }}>
          <Download className="w-3.5 h-3.5" />
          <span>Download template: <span className="font-semibold underline cursor-pointer" style={{ color: "#2563eb" }}>checkpoint_import_template.xlsx</span></span>
        </div>
        {renderModalFooter(() => setShowImport(false), "Import")}
      </div>
    ));
  }

  function renderManageCheckpointsModal() {
    if (!selectedTour) return null;
    return renderModal(`Manage Checkpoints — ${selectedTour.description}`, () => { setShowManage(false); setSelectedTour(null); }, (
      <div className="space-y-4">
        <div className="text-xs font-semibold mb-1" style={{ color: "#64748b" }}>
          Drag to reorder. Toggle required for each stop.
        </div>
        {["Main Entrance Gate", "North Perimeter Fence", "Loading Dock A", "Reception Lobby"].map((cp, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ border: "1.5px solid #e2e8f0", background: "#fafbfd" }}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: "#1e3a6e" }}>{i + 1}</div>
            <span className="flex-1 text-sm font-medium" style={{ color: "#0f172a" }}>{cp}</span>
            <label className="flex items-center gap-2 text-xs" style={{ color: "#475569" }}>
              <input type="checkbox" defaultChecked className="rounded" />
              Required
            </label>
            <MoreHorizontal className="w-4 h-4" style={{ color: "#94a3b8" }} />
          </div>
        ))}
        <button className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#2563eb" }}>
          <Plus className="w-4 h-4" /> Add Checkpoint
        </button>
        {renderModalFooter(() => { setShowManage(false); setSelectedTour(null); }, "Save Order")}
      </div>
    ));
  }

  function renderCheckpointsSection() {
    const filtered = CP_CHECKPOINTS.filter((cp) =>
      cp.name.toLowerCase().includes(search.toLowerCase()) ||
      cp.site.toLowerCase().includes(search.toLowerCase())
    );
    return (
      <div className="space-y-5">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "#94a3b8" }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search checkpoints..."
              className="w-full pl-8 pr-3 py-2 rounded-xl text-sm outline-none"
              style={{ border: "1.5px solid #e2e8f0", color: "#0f172a" }} />
          </div>
          <button onClick={() => setShowImport(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
            style={{ border: "1.5px solid #e2e8f0", color: "#475569" }}>
            <FileSpreadsheet className="w-3.5 h-3.5" /> Import Excel
          </button>
          <button onClick={() => setShowCreateCp(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg,#1e3a6e,#2563eb)" }}>
            <Plus className="w-4 h-4" /> Create Checkpoint
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Checkpoints", value: CP_CHECKPOINTS.length, color: "#1e3a6e", bg: "#eff6ff" },
            { label: "Active", value: CP_CHECKPOINTS.filter((c) => c.status === "Active").length, color: "#16a34a", bg: "#f0fdf4" },
            { label: "NFC Tags", value: CP_CHECKPOINTS.filter((c) => c.type === "NFC").length, color: "#7c3aed", bg: "#f5f3ff" },
            { label: "Barcodes", value: CP_CHECKPOINTS.filter((c) => c.type === "Barcode").length, color: "#d97706", bg: "#fffbeb" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl p-4 flex flex-col gap-1" style={{ background: s.bg, border: "1px solid transparent" }}>
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs font-semibold" style={{ color: s.color + "cc" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid #e2e8f0" }}>
          <table className="w-full" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["Checkpoint Name", "Type", "Site / Account", "Monitoring", "Assigned", "Last Scan", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide"
                    style={{ color: "#64748b", borderBottom: "1.5px solid #e2e8f0" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((cp, i) => (
                <tr key={cp.id} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 === 0 ? "#fff" : "#fafbfd" }}>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-sm" style={{ color: "#0f172a" }}>{cp.name}</div>
                    <div className="text-xs font-mono" style={{ color: "#94a3b8" }}>{cp.id}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: cp.type === "NFC" ? "#eff6ff" : "#fef9c3", color: cp.type === "NFC" ? "#1d4ed8" : "#92400e" }}>
                      {cp.type === "NFC" ? <Zap className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                      {cp.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: "#475569" }}>{cp.site}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: "#475569" }}>{cp.monitoring}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: "#475569" }}>{cp.assigned}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: "#475569" }}>{cp.lastScan}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: cp.status === "Active" ? "#f0fdf4" : "#fef2f2", color: cp.status === "Active" ? "#16a34a" : "#dc2626" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: cp.status === "Active" ? "#16a34a" : "#dc2626" }} />
                      {cp.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                        style={{ color: "#475569" }} title="View on Map"
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.color = "#2563eb"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#475569"; }}>
                        <MapPin className="w-3.5 h-3.5" />
                      </button>
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                        style={{ color: "#475569" }} title="Edit"
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.color = "#2563eb"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#475569"; }}>
                        <Settings className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm" style={{ color: "#94a3b8" }}>No checkpoints match your search.</div>
          )}
        </div>
      </div>
    );
  }

  function renderToursSection() {
    const filtered = CP_TOURS.filter((t) =>
      t.description.toLowerCase().includes(tourSearch.toLowerCase()) ||
      t.site.toLowerCase().includes(tourSearch.toLowerCase())
    );
    return (
      <div className="space-y-5">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "#94a3b8" }} />
            <input value={tourSearch} onChange={(e) => setTourSearch(e.target.value)}
              placeholder="Search tour routes..."
              className="w-full pl-8 pr-3 py-2 rounded-xl text-sm outline-none"
              style={{ border: "1.5px solid #e2e8f0", color: "#0f172a" }} />
          </div>
          <button onClick={() => setShowCreateTour(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg,#1e3a6e,#2563eb)" }}>
            <Plus className="w-4 h-4" /> Create Tour Route
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Tours", value: CP_TOURS.length, color: "#1e3a6e", bg: "#eff6ff" },
            { label: "Active", value: CP_TOURS.filter((t) => t.status === "Active").length, color: "#16a34a", bg: "#f0fdf4" },
            { label: "Weekly", value: CP_TOURS.filter((t) => t.recurrence === "Weekly").length, color: "#7c3aed", bg: "#f5f3ff" },
            { label: "Total Checkpoints", value: CP_TOURS.reduce((a, t) => a + t.checkpointCount, 0), color: "#d97706", bg: "#fffbeb" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl p-4 flex flex-col gap-1" style={{ background: s.bg }}>
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs font-semibold" style={{ color: s.color + "cc" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {filtered.map((tour) => (
            <div key={tour.id} className="rounded-2xl p-5" style={{ border: "1.5px solid #e2e8f0", background: "#fff" }}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <span className="font-bold text-sm" style={{ color: "#0f172a" }}>{tour.description}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-lg" style={{ background: "#f1f5f9", color: "#64748b" }}>{tour.id}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: tour.status === "Active" ? "#f0fdf4" : "#fef2f2", color: tour.status === "Active" ? "#16a34a" : "#dc2626" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: tour.status === "Active" ? "#16a34a" : "#dc2626" }} />
                      {tour.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2">
                    {[
                      { label: "Site", value: tour.site },
                      { label: "Assigned To", value: tour.assignedTo },
                      { label: "Duration", value: tour.duration },
                      { label: "Grace Period", value: tour.gracePeriod },
                      { label: "Recurrence", value: tour.recurrence },
                      { label: "Schedule", value: tour.schedule },
                      { label: "Checkpoints", value: `${tour.checkpointCount} stops` },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="text-xs" style={{ color: "#94a3b8" }}>{item.label}</div>
                        <div className="text-sm font-semibold" style={{ color: "#374151" }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                    style={{ border: "1.5px solid #e2e8f0", color: "#475569" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#bfdbfe"; e.currentTarget.style.color = "#1d4ed8"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#475569"; }}>
                    <Settings className="w-3.5 h-3.5" /> Edit Settings
                  </button>
                  <button onClick={() => { setSelectedTour(tour); setShowManage(true); }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                    style={{ border: "1.5px solid #e2e8f0", color: "#475569" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#bfdbfe"; e.currentTarget.style.color = "#1d4ed8"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#475569"; }}>
                    <ListChecks className="w-3.5 h-3.5" /> Manage Checkpoints
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Issue Reporting info panel */}
        <div className="rounded-2xl p-5" style={{ background: "#fff7ed", border: "1.5px solid #fed7aa" }}>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4" style={{ color: "#d97706" }} />
            <span className="text-sm font-bold" style={{ color: "#92400e" }}>Checkpoint Issue Reporting</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {["Damaged NFC Tag", "Missing Barcode", "Inaccessible Checkpoint", "Unsafe Location", "GPS Inaccuracy"].map((issue) => (
              <div key={issue} className="flex items-center gap-2 text-xs" style={{ color: "#78350f" }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#d97706" }} />
                {issue}
              </div>
            ))}
          </div>
          <div className="text-xs mt-3" style={{ color: "#92400e" }}>
            Issue reports may trigger notifications, maintenance tasks, or system exceptions through configured Automations.
          </div>
        </div>
      </div>
    );
  }

  function renderLogsSection() {
    const filtered = CP_LOGS.filter((l) =>
      l.employee.toLowerCase().includes(logSearch.toLowerCase()) ||
      l.checkpoint.toLowerCase().includes(logSearch.toLowerCase()) ||
      l.account.toLowerCase().includes(logSearch.toLowerCase())
    );
    return (
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "#94a3b8" }} />
            <input value={logSearch} onChange={(e) => setLogSearch(e.target.value)}
              placeholder="Search logs..."
              className="w-full pl-8 pr-3 py-2 rounded-xl text-sm outline-none"
              style={{ border: "1.5px solid #e2e8f0", color: "#0f172a" }} />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
            style={{ border: "1.5px solid #e2e8f0", color: "#475569" }}>
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid #e2e8f0" }}>
          <table className="w-full" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["Time", "Employee", "Account / Site", "Checkpoint", "Tour"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide"
                    style={{ color: "#64748b", borderBottom: "1.5px solid #e2e8f0" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((log, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 === 0 ? "#fff" : "#fafbfd" }}>
                  <td className="px-4 py-3 text-sm" style={{ color: "#475569" }}>{log.time}</td>
                  <td className="px-4 py-3 text-sm font-semibold" style={{ color: "#0f172a" }}>{log.employee}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: "#475569" }}>{log.account}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: "#0f172a" }}>{log.checkpoint}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: log.tour === "—" ? "#94a3b8" : "#475569" }}>{log.tour}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function renderLocationsSection() {
    const filtered = mockLocations.filter((l) =>
      (locSiteFilter === "All Sites" || l.site === locSiteFilter) &&
      (l.name.toLowerCase().includes(locSearch.toLowerCase()) ||
       l.site.toLowerCase().includes(locSearch.toLowerCase()))
    );
    const sites = Array.from(new Set(mockLocations.map(l => l.site)));
    
    return (
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div className="relative flex-1 min-w-48 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "#94a3b8" }} />
              <input value={locSearch} onChange={(e) => setLocSearch(e.target.value)}
                placeholder="Search locations..."
                className="w-full pl-8 pr-3 py-2 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                style={{ border: "1.5px solid #e2e8f0", color: "#0f172a" }} />
            </div>
            <select value={locSiteFilter} onChange={(e) => setLocSiteFilter(e.target.value)}
              className="px-3 py-2 rounded-xl text-sm outline-none appearance-none font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
              style={{ border: "1.5px solid #e2e8f0", color: "#475569", background: "#fff" }}>
              <option value="All Sites">All Sites</option>
              {sites.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-slate-50 hover:text-slate-900"
              style={{ border: "1.5px solid #e2e8f0", color: "#475569", background: "#fff" }}
              title="Bulk import locations from Excel"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-green-600" /> Import Excel
            </button>
            <button onClick={() => setShowAddLocation(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all shadow-sm hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #1e3a6e, #2563eb)" }}>
              <Plus className="w-3.5 h-3.5" /> Add Location
            </button>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-sm" style={{ border: "1.5px solid #e2e8f0" }}>
          <table className="w-full text-left" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["Location Name", "Site / Account", "Status", "Added By"].map((h) => (
                  <th key={h} className="px-6 py-4 text-xs font-bold uppercase tracking-wider"
                    style={{ color: "#64748b", borderBottom: "1.5px solid #e2e8f0" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((loc, i) => (
                <tr key={loc.id} className="hover:bg-slate-50 transition-colors" style={{ borderBottom: i === filtered.length -1 ? "none" : "1px solid #f1f5f9", background: "#fff" }}>
                  <td className="px-6 py-4 text-sm font-semibold" style={{ color: "#0f172a" }}>{loc.name}</td>
                  <td className="px-6 py-4 text-sm font-medium" style={{ color: "#475569" }}>{loc.site}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-md border border-green-200 shadow-sm">
                      {loc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: "#94a3b8" }}>{loc.addedBy}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-10 text-center text-sm text-slate-500">
                    No locations match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function renderAddLocationModal() {
    const sites = Array.from(new Set(mockLocations.map(l => l.site)));
    
    const handleAddInput = () => {
      setLocationInputs([...locationInputs, { id: Date.now(), value: "" }]);
    };
    
    const handleRemoveInput = (id: number) => {
      setLocationInputs(locationInputs.filter(input => input.id !== id));
    };
    
    const handleInputChange = (id: number, value: string) => {
      setLocationInputs(locationInputs.map(input => input.id === id ? { ...input, value } : input));
    };

    const handleSave = () => {
      if (!selectedSite) return alert("Please select a site first.");
      
      const newLocations = locationInputs
        .map(input => input.value.trim())
        .filter(val => val.length > 0)
        .map((name, i) => ({
          id: `LOC-NEW-${Date.now()}-${i}`,
          name,
          site: selectedSite,
          status: "Active" as const,
          addedBy: "James Morrison"
        }));
        
      if (newLocations.length > 0) {
        setMockLocations([...mockLocations, ...newLocations]);
      }
      
      setShowAddLocation(false);
      setSelectedSite("");
      setLocationInputs([{ id: Date.now(), value: "" }]);
    };

    return renderModal("Add Site Locations", () => setShowAddLocation(false), (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">Select Site / Account</label>
          <select value={selectedSite} onChange={(e) => setSelectedSite(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none appearance-none font-medium bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer">
            <option value="" disabled>Select a site...</option>
            {sites.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        
        {selectedSite && (
          <div>
            <label className="block text-sm font-semibold mb-3 text-slate-700">Locations to Add</label>
            <div className="space-y-3">
              {locationInputs.map((input, index) => (
                <div key={input.id} className="flex gap-2">
                  <div className="flex-1 relative">
                    <input type="text" value={input.value} onChange={(e) => handleInputChange(input.id, e.target.value)}
                      placeholder={`e.g. ${index === 0 ? 'Main Lobby' : index === 1 ? 'East Gate' : 'Location Name...'}`}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" autoFocus={index === locationInputs.length - 1} />
                  </div>
                  {locationInputs.length > 1 && (
                    <button onClick={() => handleRemoveInput(input.id)}
                      className="p-2.5 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors border border-transparent hover:border-red-100"
                      title="Remove"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <button onClick={handleAddInput}
              className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
              <Plus className="w-4 h-4" /> Add another location
            </button>
          </div>
        )}
        
        {renderModalFooter(() => setShowAddLocation(false), "Save Locations", handleSave)}
      </div>
    ));
  }

  // ── Main render ────────────────────────────────────────────────────────────
  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#f0f2f8", scrollbarWidth: "none" }}>
      {/* Hero banner */}
      <div className="px-6 pt-6 pb-0 shrink-0 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f1729 0%, #1a2f5a 55%, #1e3a6e 100%)" }}>
        <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }} />
        <div className="flex items-end gap-4 pb-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.18)" }}>
            <Route className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Checkpoints & Tour Routes</h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Manage NFC/barcode checkpoints, configure patrol routes and review scan logs
            </p>
          </div>
        </div>

        {/* Section tabs */}
        <div className="flex gap-0">
          {([
            { id: "checkpoints", label: "Checkpoints", icon: <MapPin className="w-3.5 h-3.5" /> },
            { id: "tours", label: "Tour Routes", icon: <Route className="w-3.5 h-3.5" /> },
            { id: "logs", label: "Scan Logs", icon: <ClipboardList className="w-3.5 h-3.5" /> },
            { id: "locations", label: "Site Locations", icon: <Building2 className="w-3.5 h-3.5" /> },
          ] as { id: CpSection; label: string; icon: React.ReactNode }[]).map((tab) => (
            <button key={tab.id} onClick={() => setSection(tab.id)}
              className="flex items-center gap-2 px-5 py-3 text-xs font-semibold transition-all shrink-0"
              style={{
                color: section === tab.id ? "#fff" : "rgba(255,255,255,0.5)",
                borderBottom: section === tab.id ? "2.5px solid #60a5fa" : "2.5px solid transparent",
                background: "transparent",
              }}>
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {section === "checkpoints" && renderCheckpointsSection()}
        {section === "tours" && renderToursSection()}
        {section === "logs" && renderLogsSection()}
        {section === "locations" && renderLocationsSection()}
      </div>

      {/* Modals */}
      {showCreateCp && renderCreateCheckpointModal()}
      {showCreateTour && <CreateTourWizard onClose={() => setShowCreateTour(false)} />}
      {showImport && renderImportModal()}
      {showManage && renderManageCheckpointsModal()}
      {showAddLocation && renderAddLocationModal()}
    </div>
  );
}


export function PlaceholderPage({ page }: { page: Page }) {
  const labels: Record<Page, string> = {
    dashboard: "Dashboard", employees: "Employee Management", sites: "Clients & Sites",
    checkpoints: "Checkpoints & Tour Routes", scheduling: "Scheduling", timeclock: "Time Clock",
    reports: "Reports & Incidents", forms: "Forms", tasks: "Tasks & Dispatch",
    communications: "Communications", "security-ops": "Security Operations",
    documents: "Documents & Policies", training: "Training", vehicles: "Vehicles",
    automations: "Automations", payroll: "Payroll & Back Office", settings: "Settings",
    groups: "Groups & Segments", help: "Help", helpdesk: "Help Desk",
  };
  return (
    <div className="flex-1 flex items-center justify-center" style={{ color: "#94a3b8" }}>
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "#f1f5f9" }}>
          <LayoutDashboard className="w-8 h-8" style={{ color: "#cbd5e1" }} />
        </div>
        <h3 className="text-base font-semibold mb-1" style={{ color: "#374151" }}>{labels[page]}</h3>
        <p className="text-sm">This module will be built in the next phase.</p>
      </div>
    </div>
  );
}
