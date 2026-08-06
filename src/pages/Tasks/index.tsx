import React, { useState } from "react";
import {
    Plus, Search, Filter, MoreHorizontal, Download, Upload,
    CheckCircle2, Clock, Calendar, Move, AlignLeft, Send, Repeat, HelpCircle,
    User, Briefcase, MapPin, ListTodo, AlertTriangle, PlayCircle, Edit, Trash2, Check,
    ChevronLeft, ListChecks, Activity, MessageSquare, AlertCircle
} from "lucide-react";

export function TasksPage() {
    const [view, setView] = useState<"list" | "create" | "detail">("list");
    const [selectedTask, setSelectedTask] = useState<string | null>(null);

    if (view === "create") return <TaskCreate onBack={() => setView("list")} />;
    if (view === "detail") return <TaskDetail id={selectedTask} onBack={() => setView("list")} />;

    return <TasksList onNavigate={(v, id) => { setView(v); if (id) setSelectedTask(id); }} />;
}

// ─── MOCK DATA ─────────────────────────────────────────────────────────────
const MOCK_TASKS = [
    {
        id: "TSK-1001",
        title: "Complete Site Opening Inspection",
        type: "Dispatch Task",
        site: "Downtown Financial Center",
        subtasks: ["Verify all access points", "Review night shift logs", "Check exterior cameras"],
        start: "Aug 05, 2026",
        due: "Aug 05, 2026, 10:00 AM",
        assignee: "Larry Freeman Jr.",
        assigneeType: "Employee",
        author: "James Morrison",
        status: "In Progress"
    },
    {
        id: "TSK-1002",
        title: "Respond to Access Control Alert",
        type: "Help Desk Ticket",
        site: "Sector A",
        subtasks: [],
        start: "Aug 05, 2026, 09:12 AM",
        due: "Aug 05, 2026, 09:30 AM",
        assignee: "Security Officer",
        assigneeType: "Job Type",
        author: "System",
        status: "Overdue"
    },
    {
        id: "TSK-1003",
        title: "Vehicle Fuel & Mileage Log",
        type: "Recurring Task",
        site: "All Sites",
        subtasks: ["Record current mileage", "Attach fuel receipt"],
        start: "Aug 05, 2026",
        due: "Aug 05, 2026, 6:00 PM",
        assignee: "Fleet Patrol",
        assigneeType: "Supported Group",
        author: "Admin Team",
        status: "New"
    },
    {
        id: "TSK-1004",
        title: "Client Meeting Prep",
        type: "Quick Task",
        site: "HQ",
        subtasks: ["Print visitor badges"],
        start: "Aug 04, 2026",
        due: "Aug 04, 2026",
        assignee: "Sarah Jenkins",
        assigneeType: "Employee",
        author: "James Morrison",
        status: "Completed"
    }
];

// ─── STYLES & HELPERS ───────────────────────────────────────────────────────
const StatusChip = ({ status }: { status: string }) => {
    let colors = "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
    if (status === "In Progress") colors = "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400";
    if (status === "Completed") colors = "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400";
    if (status === "Overdue") colors = "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 font-bold";
    if (status === "New") colors = "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400";

    return (
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border border-transparent ${colors}`}>
            {status}
        </span>
    );
};

const AssigneeIcon = ({ type }: { type: string }) => {
    if (type === "Employee") return <User className="w-3.5 h-3.5 text-slate-400" />;
    if (type === "Job Type") return <Briefcase className="w-3.5 h-3.5 text-slate-400" />;
    if (type === "Site") return <MapPin className="w-3.5 h-3.5 text-slate-400" />;
    return <User className="w-3.5 h-3.5 text-slate-400" />;
};


// ─── COMPONENT: LIST ────────────────────────────────────────────────────────
function TasksList({ onNavigate }: { onNavigate: (v: "list" | "create" | "detail", id?: string) => void }) {
    const [activeTab, setActiveTab] = useState("all");

    return (
        <div className="p-4 md:p-6 w-full max-w-[1600px] mx-auto h-full flex flex-col animate-in fade-in min-w-0 min-h-0">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 mb-6 w-full">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Tasks & Dispatch</h1>
                    <p className="text-sm text-slate-500 mt-1">Create, assign, dispatch and track operational tasks.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-slate-50 dark:hover:bg-slate-800"
                        style={{ border: "1.5px solid #e2e8f0", color: "#475569" }}>
                        <Upload className="w-4 h-4" /> Import
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-slate-50 dark:hover:bg-slate-800"
                        style={{ border: "1.5px solid #e2e8f0", color: "#475569" }}>
                        <Download className="w-4 h-4" /> Export
                    </button>
                    <button
                        onClick={() => onNavigate("create")}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white"
                        style={{ background: "linear-gradient(135deg,#1e3a6e,#2563eb)" }}
                    >
                        <Plus className="w-4 h-4" /> Add Task
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-6 border-b border-slate-200 dark:border-slate-800 mb-6">
                {[
                    { id: "created", label: "Created by Me", count: 14 },
                    { id: "my", label: "My Tasks", count: 8 },
                    { id: "all", label: "All Tasks", count: 128 },
                    { id: "archived", label: "Archived", count: 21 },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-3 text-sm font-semibold transition-colors flex items-center gap-2 ${activeTab === tab.id
                            ? 'text-[#1e3a6e] border-b-[3px] border-[#1e3a6e]'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        {tab.label} <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-xs">{tab.count}</span>
                    </button>
                ))}
            </div>

            {/* Summary Count Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6 w-full min-w-0">
                {[
                    { label: "Total Tasks", count: 128 },
                    { label: "Open", count: 36, color: "text-slate-900 dark:text-white" },
                    { label: "In Progress", count: 22, color: "text-blue-600" },
                    { label: "Overdue", count: 9, color: "text-red-500" },
                    { label: "Completed", count: 61, color: "text-green-600" },
                    { label: "New Tasks", count: 14, color: "text-purple-600" },
                ].map(stat => (
                    <div key={stat.label} className="cursor-pointer glass-panel p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/70 shadow-sm hover:shadow-md transition-all backdrop-blur-md">
                        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">{stat.label}</div>
                        <div className={`text-2xl font-black ${stat.color || 'text-slate-800 dark:text-slate-200'}`}>{stat.count}</div>
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div className="glass-panel p-3 rounded-xl mb-6 flex flex-wrap justify-between items-center bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-md shadow-sm gap-4">
                <div className="relative w-80">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-[#1e3a6e] transition-colors text-slate-900 dark:text-slate-100"
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto flex-nowrap hide-scrollbar">
                    {["Task Type", "Status", "Assignment", "Site", "Due Date"].map(filter => (
                        <button key={filter} className="shrink-0 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-50/50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1.5 transition-colors">
                            {filter} <Filter className="w-3 h-3 text-slate-400" />
                        </button>
                    ))}
                    <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1 shrink-0"></div>
                    <button className="shrink-0 px-3 py-1.5 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors">
                        Clear All
                    </button>
                </div>
            </div>

            {/* Table Area */}
            <div className="bg-white/90 dark:bg-[#1a1f2e]/90 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm flex-1 flex flex-col min-h-0 min-w-0 w-full mb-2">
                <div className="overflow-auto flex-1 min-h-0 relative">
                    <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300 min-w-[1024px]">
                        <thead className="text-xs uppercase bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 sticky top-0 font-semibold tracking-wide">
                            <tr>
                                <th className="px-5 py-4 w-12"><input type="checkbox" className="rounded border-slate-300" /></th>
                                <th className="px-5 py-4">Task</th>
                                <th className="px-5 py-4">Subtask</th>
                                <th className="px-5 py-4">Start Date</th>
                                <th className="px-5 py-4">Due Date</th>
                                <th className="px-5 py-4">Assigned To</th>
                                <th className="px-5 py-4">Created By</th>
                                <th className="px-5 py-4">Status</th>
                                <th className="px-5 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                            {MOCK_TASKS.map((task, i) => (
                                <tr key={task.id}
                                    onClick={() => onNavigate("detail", task.id)}
                                    className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors cursor-pointer group ${i % 2 === 0 ? '' : 'bg-slate-50/30 dark:bg-transparent'}`}>
                                    <td className="px-5 py-4" onClick={e => e.stopPropagation()}><input type="checkbox" className="rounded border-slate-300" /></td>
                                    <td className="px-5 py-4">
                                        <div className="font-semibold text-slate-900 dark:text-white truncate max-w-[200px] xl:max-w-[300px]">{task.title}</div>
                                        <div className="text-xs text-slate-500 mt-0.5 flex gap-1.5 items-center">
                                            <span className="font-medium text-slate-600 dark:text-slate-400">{task.type}</span>
                                            {task.site && <><span className="w-1 h-1 rounded-full bg-slate-300"></span><span className="truncate">{task.site}</span></>}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        {task.subtasks.length > 0 ? (
                                            <div>
                                                <span className="truncate block max-w-[160px] text-slate-700 dark:text-slate-300">{task.subtasks[0]}</span>
                                                {task.subtasks.length > 1 && <span className="text-xs font-semibold text-blue-600 mt-0.5 block">+{task.subtasks.length - 1} more</span>}
                                            </div>
                                        ) : (
                                            <span className="text-slate-400">—</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap">{task.start}</td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <span className={`${task.status === 'Overdue' ? 'text-red-600 font-semibold flex flex-col gap-0.5' : 'text-slate-600 dark:text-slate-400'}`}>
                                            {task.due.split(', ').map((str, idx) => <span key={idx}>{str}</span>)}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="text-slate-900 dark:text-white font-medium truncate max-w-[140px]">{task.assignee}</div>
                                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><AssigneeIcon type={task.assigneeType} /> {task.assigneeType}</div>
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap font-medium text-slate-800 dark:text-slate-300">{task.author}</td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <StatusChip status={task.status} />
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex justify-center" onClick={e => e.stopPropagation()}>
                                            <button className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 transition-colors">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
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


// ─── COMPONENT: ADD TASK ────────────────────────────────────────────────────
function TaskCreate({ onBack }: { onBack: () => void }) {
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const taskTypes = [
        { id: "dispatch", title: "Dispatch Task", desc: "For assigning and coordinating operational work that requires dispatch.", icon: <Send className="w-6 h-6 text-blue-600" />, bg: "bg-blue-100" },
        { id: "quick", title: "Quick Task", desc: "For a simple one-time task with minimal setup.", icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />, bg: "bg-emerald-100" },
        { id: "recurring", title: "Recurring Task", desc: "For a task that repeats based on a configured schedule.", icon: <Repeat className="w-6 h-6 text-purple-600" />, bg: "bg-purple-100" },
        { id: "helpdesk", title: "Help Desk Ticket", desc: "For internal service, support, or operational issue handling.", icon: <HelpCircle className="w-6 h-6 text-orange-600" />, bg: "bg-orange-100" },
    ];

    return (
        <div className="max-w-4xl mx-auto h-full flex flex-col p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center mb-8 shrink-0">
                <button onClick={onBack} className="p-2 mr-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <ChevronLeft className="w-5 h-5 text-slate-500" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedType ? `Create ${taskTypes.find(t => t.id === selectedType)?.title}` : 'Select Task Type'}</h1>
                    <p className="text-sm text-slate-500 mt-1">Configure your new task assignment below.</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pb-10">
                {!selectedType ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {taskTypes.map(type => (
                            <div key={type.id}
                                onClick={() => setSelectedType(type.id)}
                                className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:border-[#1e3a6e] hover:shadow-lg cursor-pointer transition-all group backdrop-blur-md">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${type.bg} dark:bg-opacity-20 group-hover:scale-110 transition-transform`}>
                                    {type.icon}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{type.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{type.desc}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="glass-panel p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-[#1a1f2e]/80 shadow-sm backdrop-blur-md">
                        <div className="space-y-8 max-w-2xl">
                            {/* Generic/Common Info */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-[#1e3a6e] uppercase tracking-wider mb-2">Basic Info</h3>
                                <div>
                                    <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Task Name <span className="text-red-500">*</span></label>
                                    <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm outline-none focus:border-[#1e3a6e] transition-colors" placeholder="e.g. Inspect loading dock" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Description</label>
                                    <textarea rows={3} className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm outline-none focus:border-[#1e3a6e] transition-colors" placeholder="Task details and instructions..." />
                                </div>
                            </div>

                            {/* Assignment */}
                            <div className="space-y-4 pt-6 border-t border-slate-200/60 dark:border-slate-800/60">
                                <h3 className="text-sm font-bold text-[#1e3a6e] uppercase tracking-wider mb-2">Assign Task</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Assignment Target <span className="text-red-500">*</span></label>
                                        <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm outline-none focus:border-[#1e3a6e]">
                                            <option>Employee</option>
                                            <option>Job Type</option>
                                            <option>Site</option>
                                            <option>Shift</option>
                                            <option>Department</option>
                                            <option>Supported Group</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Select Entity <span className="text-red-500">*</span></label>
                                        <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm outline-none focus:border-[#1e3a6e]">
                                            <option>Larry Freeman Jr.</option>
                                            <option>Sarah Jenkins</option>
                                            <option>Marcus Williams</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Schedule */}
                            <div className="space-y-4 pt-6 border-t border-slate-200/60 dark:border-slate-800/60">
                                <h3 className="text-sm font-bold text-[#1e3a6e] uppercase tracking-wider mb-2">Schedule</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Start Date</label>
                                        <input type="datetime-local" className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm outline-none focus:border-[#1e3a6e]" />
                                    </div>
                                    {selectedType !== "quick" && (
                                        <div>
                                            <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Due Date</label>
                                            <input type="datetime-local" className="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm outline-none focus:border-[#1e3a6e]" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Subtasks - Optional */}
                            {selectedType !== "helpdesk" && (
                                <div className="space-y-4 pt-6 border-t border-slate-200/60 dark:border-slate-800/60">
                                    <h3 className="text-sm font-bold text-[#1e3a6e] uppercase tracking-wider mb-2">Subtasks</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-800/30 flex-1 text-sm text-slate-500">1. Verify front entrance doors are locked</div>
                                            <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="px-3 py-2 border border-blue-200 dark:border-blue-900/50 rounded-lg bg-white dark:bg-slate-800 flex-1 text-sm text-slate-700 dark:text-slate-300">
                                                <input type="text" placeholder="Subtask description..." className="w-full outline-none bg-transparent" />
                                            </div>
                                        </div>
                                    </div>
                                    <button className="mt-2 text-sm font-semibold text-[#1e3a6e] flex items-center gap-1 hover:underline">
                                        <Plus className="w-4 h-4" /> Add Subtask
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                )}
            </div>

            {selectedType && (
                <div className="pt-6 flex justify-end gap-3 shrink-0 mt-4 border-t border-slate-200 dark:border-slate-800">
                    <button onClick={() => setSelectedType(null)} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300" style={{ border: "1.5px solid #e2e8f0" }}>Cancel</button>
                    <button className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-50 hover:bg-slate-100" style={{ border: "1.5px solid #e2e8f0" }}>Save as Draft</button>
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                        style={{ background: "linear-gradient(135deg,#1e3a6e,#2563eb)" }}
                    >
                        Create Task
                    </button>
                </div>
            )}
        </div>
    );
}


// ─── COMPONENT: TASK DETAIL ─────────────────────────────────────────────────
function TaskDetail({ id, onBack }: { id: string | null, onBack: () => void }) {
    const task = MOCK_TASKS.find(t => t.id === id) || MOCK_TASKS[0];
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="h-full flex flex-col p-6 max-w-5xl mx-auto animate-in fade-in">
            {/* Header */}
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl mr-4 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{task.title}</h1>
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 rounded-md text-xs font-semibold">{task.type}</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">Created by {task.author} • {task.start}</p>
                </div>
                <div className="ml-auto flex items-center gap-3">
                    <button className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-slate-50 dark:hover:bg-slate-800"
                        style={{ border: "1.5px solid #e2e8f0", color: "#475569" }}>
                        Edit
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-sm transition-colors shadow-sm font-semibold">
                        Change Status
                    </button>
                    <button className="p-2 border border-slate-200 bg-white/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors shadow-sm text-slate-600 dark:text-slate-300">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {task.status === "Overdue" && (
                <div className="mb-6 p-4 rounded-xl flex items-start gap-3 border border-red-200 bg-red-50text-red-800 dark:bg-red-900/20 dark:border-red-900/50 dark:text-red-400">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                    <div>
                        <h4 className="font-bold text-sm text-red-800 dark:text-red-400">This task is overdue.</h4>
                        <p className="text-sm mt-0.5">Configured automation actions may be triggered.</p>
                    </div>
                </div>
            )}

            {/* Summary Panel */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-[#1a1f2e]/80 shadow-sm backdrop-blur-md mb-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Status</div>
                    <div className="font-bold text-slate-900 dark:text-white"><StatusChip status={task.status} /></div>
                </div>
                <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Assigned To</div>
                    <div className="font-bold text-slate-900 dark:text-white">{task.assignee}</div>
                    <div className="text-xs text-slate-400 mt-1">{task.assigneeType}</div>
                </div>
                <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Start Date</div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{task.start}</div>
                </div>
                <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Due Date</div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{task.due}</div>
                </div>
            </div>

            <div className="flex space-x-6 border-b border-slate-200 dark:border-slate-800 mb-6">
                {["Overview", "Subtasks", "Activity"].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                        className={`pb-3 text-sm font-semibold transition-colors ${activeTab === tab.toLowerCase()
                            ? 'text-[#1e3a6e] border-b-[3px] border-[#1e3a6e]'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        {tab} {tab === 'Subtasks' && `(${task.subtasks.length})`}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto">
                {activeTab === "overview" && (
                    <div className="glass-panel p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-[#1a1f2e]/80 shadow-sm">
                        <h3 className="text-sm font-bold text-[#1e3a6e] uppercase tracking-wider mb-4">Task Instructions</h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm mb-6">
                            Please proceed to the respective location and complete all operational checklists. Make sure to log any irregularities in the end of shift report before archiving this task module.
                        </p>

                        <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Related Site</p>
                                <p className="font-medium text-slate-800 dark:text-slate-200 text-sm flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400" /> {task.site}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Created By</p>
                                <p className="font-medium text-slate-800 dark:text-slate-200 text-sm">{task.author}</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "subtasks" && (
                    <div className="glass-panel p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-[#1a1f2e]/80 shadow-sm">
                        {task.subtasks.length === 0 ? (
                            <div className="text-center py-8 text-slate-500 text-sm">No subtasks defined for this task.</div>
                        ) : (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-bold text-slate-900 dark:text-white">Subtask Checklist</h3>
                                    <span className="text-sm font-semibold text-[#1e3a6e]">1 of {task.subtasks.length} completed</span>
                                </div>
                                <div className="space-y-3">
                                    {task.subtasks.map((st, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                                            <div className="mt-0.5">
                                                {i === 0 ? (
                                                    <div className="w-5 h-5 rounded-md bg-green-500 text-white flex items-center justify-center"><Check className="w-3.5 h-3.5" /></div>
                                                ) : (
                                                    <div className="w-5 h-5 rounded-md border-2 border-slate-300 dark:border-slate-600"></div>
                                                )}
                                            </div>
                                            <div>
                                                <div className={`font-semibold text-sm ${i === 0 ? 'text-slate-400 line-through' : 'text-slate-800 dark:text-slate-200'}`}>{st}</div>
                                                <div className="text-xs font-medium mt-1 text-slate-500">{i === 0 ? 'Completed' : 'Not Started'}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "activity" && (
                    <div className="glass-panel p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-[#1a1f2e]/80 shadow-sm">
                        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 space-y-8 py-2">
                            <div className="relative pl-6">
                                <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white dark:ring-[#1a1f2e]"></div>
                                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">8:48 AM — Subtask completed</div>
                                <div className="text-xs text-slate-500 mt-1">Larry Freeman Jr. checked off "Verify all access points"</div>
                            </div>
                            <div className="relative pl-6">
                                <div className="absolute w-3 h-3 bg-slate-400 rounded-full -left-[7px] top-1.5 ring-4 ring-white dark:ring-[#1a1f2e]"></div>
                                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">8:22 AM — Status changed to In Progress</div>
                                <div className="text-xs text-slate-500 mt-1">System updated status</div>
                            </div>
                            <div className="relative pl-6">
                                <div className="absolute w-3 h-3 bg-slate-400 rounded-full -left-[7px] top-1.5 ring-4 ring-white dark:ring-[#1a1f2e]"></div>
                                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">8:05 AM — Assigned to Larry Freeman Jr.</div>
                            </div>
                            <div className="relative pl-6">
                                <div className="absolute w-3 h-3 bg-slate-400 rounded-full -left-[7px] top-1.5 ring-4 ring-white dark:ring-[#1a1f2e]"></div>
                                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">8:00 AM — Task created by James Morrison</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
