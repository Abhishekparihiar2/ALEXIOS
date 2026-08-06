import { useState, useMemo } from "react";
import {
    DollarSign,
    FileText,
    Calendar,
    Clock,
    Briefcase,
    Users,
    Coffee,
    Sun,
    Download,
    FileBox,
    History,
    Settings,
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    ChevronRight,
    TrendingUp,
    AlertTriangle,
    PlayCircle
} from "lucide-react";

export function PayrollPage() {
    const [activeTab, setActiveTab] = useState("overview");

    const NAV_GROUPS = [
        {
            label: "PAYROLL",
            items: [
                { id: "overview", label: "Overview", icon: <DollarSign className="w-4 h-4" /> },
                { id: "policies", label: "Policies & Pay Rules", icon: <FileText className="w-4 h-4" /> },
                { id: "schedules", label: "Payroll Schedules", icon: <Calendar className="w-4 h-4" /> },
                { id: "overtime", label: "Overtime Rules", icon: <Clock className="w-4 h-4" /> },
                { id: "paycodes", label: "Pay Codes", icon: <Briefcase className="w-4 h-4" /> },
                { id: "compensation", label: "Compensation", icon: <DollarSign className="w-4 h-4" /> },
            ]
        },
        {
            label: "BACK OFFICE CONFIGURATION",
            items: [
                { id: "breaks", label: "Break Management", icon: <Coffee className="w-4 h-4" /> },
                { id: "classes", label: "Employee Classes", icon: <Users className="w-4 h-4" /> },
                { id: "holidays", label: "Holidays", icon: <Sun className="w-4 h-4" /> },
                { id: "exports", label: "Export Formats", icon: <Download className="w-4 h-4" /> },
                { id: "billitems", label: "Bill Items", icon: <FileBox className="w-4 h-4" /> },
            ]
        },
        {
            label: "ADMINISTRATION",
            items: [
                { id: "audit", label: "Audit History", icon: <History className="w-4 h-4" /> },
                { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
            ]
        }
    ];

    return (
        <div className="flex-1 flex overflow-hidden bg-slate-50 relative">
            {/* Secondary Sidebar */}
            <div className="w-64 border-r border-slate-200 bg-white flex flex-col pt-5">
                <div className="px-5 pb-4 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-900">Payroll & Back Office</h2>
                    <p className="text-xs text-slate-500 mt-1">Configure payroll rules, employee compensation, schedules, codes, exports, and records.</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6" style={{ scrollbarWidth: "none" }}>
                    {NAV_GROUPS.map((group) => (
                        <div key={group.label}>
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">{group.label}</h3>
                            <div className="space-y-0.5">
                                {group.items.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-colors
                      ${activeTab === item.id
                                                ? "bg-blue-50 text-blue-700"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                            }`}
                                    >
                                        <div className={activeTab === item.id ? "text-blue-700" : "text-slate-400"}>
                                            {item.icon}
                                        </div>
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: "none" }}>
                {activeTab === "overview" && <PayrollOverview />}
                {activeTab === "policies" && <PoliciesRules />}
                {activeTab === "schedules" && <PayrollSchedules />}
                {activeTab === "overtime" && <OvertimeRules />}
                {activeTab === "paycodes" && <PayCodes />}
                {activeTab === "compensation" && <Compensation />}
                {activeTab === "breaks" && <BreakManagement />}
                {activeTab === "classes" && <EmployeeClasses />}
                {activeTab === "holidays" && <Holidays />}
                {activeTab === "exports" && <ExportFormats />}
                {activeTab === "billitems" && <BillItems />}
                {activeTab === "audit" && <AuditHistory />}
                {activeTab === "settings" && <PayrollSettings />}
            </div>
        </div>
    );
}

function PayrollOverview() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Payroll Overview</h1>
                    <p className="text-sm text-slate-500">Summary of payroll configuration and calculations.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "Employees with Comp", val: "142", trend: "+3 from last period", up: true },
                    { label: "Active Payroll Schedule", val: "Biweekly", trend: "Standard Policy", up: true },
                    { label: "Active Pay Rules", val: "18", trend: "2 updated recently", up: false },
                    { label: "Calculation Exceptions", val: "4", trend: "Action required", up: false, alert: true },
                ].map((k, i) => (
                    <div key={i} className={`p-4 rounded-xl border bg-white shadow-sm flex flex-col justify-between ${k.alert ? 'border-red-200' : 'border-slate-200'}`}>
                        <span className="text-xs font-semibold text-slate-500">{k.label}</span>
                        <div className="my-2">
                            <span className={`text-2xl font-bold ${k.alert ? 'text-red-700' : 'text-slate-900'}`}>{k.val}</span>
                        </div>
                        <span className={`text-xs font-medium ${k.alert ? 'text-red-600' : 'text-slate-400'}`}>{k.trend}</span>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-white border border-slate-200 rounded-xl overflow-hidden glass-container">
                <div className="p-5 border-b border-slate-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Current Payroll Period Calculation</h3>
                        <p className="text-sm text-slate-500">Biweekly Schedule • Aug 1 - Aug 14 • 142 Employees</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-800 transition-colors">
                        <PlayCircle className="w-4 h-4" /> Calculate Payroll
                    </button>
                </div>
                <div className="p-0">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider font-bold">
                                <th className="px-4 py-3">Employee</th>
                                <th className="px-4 py-3">Class</th>
                                <th className="px-4 py-3 text-right">Reg Hrs</th>
                                <th className="px-4 py-3 text-right">OT Hrs</th>
                                <th className="px-4 py-3 text-right">Hol Hrs</th>
                                <th className="px-4 py-3 text-right">Rate</th>
                                <th className="px-4 py-3 text-right">Calc Gross</th>
                                <th className="px-4 py-3 text-center">Exceptions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {[
                                { emp: "Marcus Johnson", cls: "Full-Time Security", reg: "80:00", ot: "4:30", hol: "0:00", rate: "$18.50/hr", gross: "$1,604.88", exc: 0 },
                                { emp: "Sarah Chen", cls: "Supervisor", reg: "80:00", ot: "12:15", hol: "0:00", rate: "$22.00/hr", gross: "$2,164.25", exc: 0 },
                                { emp: "Derek Wilson", cls: "Part-Time Security", reg: "32:00", ot: "0:00", hol: "0:00", rate: "$17.00/hr", gross: "$544.00", exc: 1 },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-semibold text-slate-900">{row.emp}</td>
                                    <td className="px-4 py-3 text-slate-600">{row.cls}</td>
                                    <td className="px-4 py-3 text-right font-medium">{row.reg}</td>
                                    <td className="px-4 py-3 text-right font-medium text-slate-600">{row.ot}</td>
                                    <td className="px-4 py-3 text-right font-medium text-slate-600">{row.hol}</td>
                                    <td className="px-4 py-3 text-right text-slate-500">{row.rate}</td>
                                    <td className="px-4 py-3 text-right font-bold text-slate-800">{row.gross}</td>
                                    <td className="px-4 py-3 flex justify-center">
                                        {row.exc > 0 ? (
                                            <span className="flex items-center gap-1 bg-red-50 text-red-700 px-2 py-0.5 rounded text-xs font-bold">
                                                <AlertTriangle className="w-3 h-3" /> {row.exc}
                                            </span>
                                        ) : (
                                            <span className="text-slate-300">-</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function PoliciesRules() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Policies & Pay Rules</h1>
                    <p className="text-sm text-slate-500">Configure core logic and pay structures.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-800 transition-colors">
                    <Plus className="w-4 h-4" /> Add Policy
                </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden glass-container shadow-sm">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <div className="relative w-72">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" placeholder="Search rules..." className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white outline-none" />
                    </div>
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">
                        <Filter className="w-4 h-4" /> Filters
                    </button>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider font-bold">
                            <th className="px-4 py-3">Policy / Rule Name</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Applies To</th>
                            <th className="px-4 py-3">Rule Summary</th>
                            <th className="px-4 py-3 text-center">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {[
                            { name: "Standard Full-Time Policy", type: "Payroll Policy", applies: "Full-Time Employees", sum: "40 hrs/week + standard overtime", status: "Active" },
                            { name: "Double Time Sunday", type: "Pay Rule", applies: "All Guards", sum: "If Sunday → apply [Double Time] at [2.0x]", status: "Active" },
                            { name: "Night Shift Differential", type: "Pay Rule", applies: "Night Shifts", sum: "If time is between 22:00-06:00 → apply [Night Diff] at +$2.50", status: "Active" },
                            { name: "Contractor Temp Policy", type: "Payroll Policy", applies: "Contractors", sum: "No overtime rules applied", status: "Inactive" },
                        ].map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50">
                                <td className="px-4 py-3 font-bold text-slate-900">{row.name}</td>
                                <td className="px-4 py-3 text-slate-600 font-medium">{row.type}</td>
                                <td className="px-4 py-3 text-slate-600">{row.applies}</td>
                                <td className="px-4 py-3 text-slate-500 text-xs">{row.sum}</td>
                                <td className="px-4 py-3 text-center">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${row.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <button className="p-1 hover:bg-slate-200 rounded text-slate-400 transition-colors">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function PayrollSchedules() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Payroll Schedules</h1>
                    <p className="text-sm text-slate-500">Configure payroll schedule records.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-800 transition-colors">
                    <Plus className="w-4 h-4" /> Add Schedule
                </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden glass-container shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider font-bold">
                            <th className="px-4 py-3">Schedule Name</th>
                            <th className="px-4 py-3">Frequency</th>
                            <th className="px-4 py-3">Current Period</th>
                            <th className="px-4 py-3">Next Period</th>
                            <th className="px-4 py-3 text-center">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {[
                            { name: "Default Bi-Weekly", f: "Biweekly", cp: "Aug 1 - Aug 14", np: "Aug 15 - Aug 28", status: "Active" },
                            { name: "Monthly Admin", f: "Monthly", cp: "Aug 1 - Aug 31", np: "Sep 1 - Sep 30", status: "Active" },
                        ].map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50">
                                <td className="px-4 py-4 font-bold text-slate-900">{row.name}</td>
                                <td className="px-4 py-4 font-medium text-slate-600">{row.f}</td>
                                <td className="px-4 py-4 text-slate-600">{row.cp}</td>
                                <td className="px-4 py-4 text-slate-500">{row.np}</td>
                                <td className="px-4 py-4 text-center">
                                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-[10px] font-bold uppercase">
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-right">
                                    <button className="p-1 hover:bg-slate-200 rounded text-slate-400 transition-colors">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function Compensation() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Employee Compensation</h1>
                    <p className="text-sm text-slate-500">Manage compensation details without payment info.</p>
                </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden glass-container shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider font-bold">
                            <th className="px-4 py-3">Employee</th>
                            <th className="px-4 py-3">Class</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3 text-right">Rate / Salary</th>
                            <th className="px-4 py-3">Effective Date</th>
                            <th className="px-4 py-3">Schedule</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {[
                            { emp: "Marcus Johnson", cls: "Full-Time Security", type: "Hourly", rate: "$18.50/hr", date: "Jan 1, 2026", sched: "Biweekly" },
                            { emp: "Sarah Chen", cls: "Supervisor", type: "Hourly", rate: "$22.00/hr", date: "Mar 15, 2025", sched: "Biweekly" },
                            { emp: "James Kim", cls: "Admin", type: "Salary", rate: "$65,000/yr", date: "Sep 1, 2024", sched: "Monthly" },
                        ].map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50 cursor-pointer">
                                <td className="px-4 py-3 font-bold text-slate-900">{row.emp}</td>
                                <td className="px-4 py-3 text-slate-600">{row.cls}</td>
                                <td className="px-4 py-3 font-medium text-slate-600">{row.type}</td>
                                <td className="px-4 py-3 text-right font-bold text-slate-800">{row.rate}</td>
                                <td className="px-4 py-3 text-slate-500">{row.date}</td>
                                <td className="px-4 py-3 text-slate-600">{row.sched}</td>
                                <td className="px-4 py-3 text-right">
                                    <button className="text-blue-700 text-xs font-bold hover:underline">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function BreakManagement() {
    return (
        <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Break Management</h1>
                    <p className="text-sm text-slate-500">High-level break settings.</p>
                </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg text-sm font-medium flex gap-3">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <div>
                    <p className="font-bold">Notice</p>
                    <p>Detailed break calculations and break penalties are not included in the current phase.</p>
                </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 glass-container shadow-sm space-y-4">
                <div>
                    <label className="block text-sm font-bold text-slate-900 mb-1">Default Break Duration</label>
                    <input type="text" value="30 minutes" disabled className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-900 mb-1">Break Type</label>
                    <select disabled className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500">
                        <option>Unpaid</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

function GenericPlaceholder({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">{title}</h1>
                    <p className="text-sm text-slate-500">{desc}</p>
                </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-10 flex flex-col items-center justify-center text-center shadow-sm glass-container min-h-[400px]">
                <FileText className="w-12 h-12 text-slate-300 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">No Records Found</h3>
                <p className="text-sm text-slate-500 max-w-sm">There are currently no records available in this section. Configuration can be added here.</p>
            </div>
        </div>
    );
}

function OvertimeRules() { return <GenericPlaceholder title="Overtime Rules" desc="Configure overtime thresholds using duration/time selectors." />; }
function PayCodes() { return <GenericPlaceholder title="Pay Codes" desc="Configure payroll earning codes." />; }
function EmployeeClasses() { return <GenericPlaceholder title="Employee Classes" desc="Configure employee classifications for policies." />; }
function Holidays() { return <GenericPlaceholder title="Holidays" desc="Manage Holiday Groups and Codes." />; }
function ExportFormats() { return <GenericPlaceholder title="Export Formats" desc="Configure payroll export mapping records." />; }
function BillItems() { return <GenericPlaceholder title="Bill Items" desc="Configure items for back office billing records." />; }
function AuditHistory() { return <GenericPlaceholder title="Audit History" desc="Read-only audit trail of Payroll & Back Office changes." />; }
function PayrollSettings() { return <GenericPlaceholder title="Settings" desc="General and Back Office configuration." />; }
