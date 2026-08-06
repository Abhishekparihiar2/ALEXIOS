import React, { useState } from "react";
import {
    ClipboardList, Plus, Search, Filter, MoreHorizontal, FileText,
    Archive, Trash2, Edit, Copy, ChevronLeft, Calendar, User,
    CheckCircle2, Clock, Move, Download, X, GripVertical, Check, LayoutTemplate, Lock, CheckSquare
} from "lucide-react";

export function FormsPage() {
    const [view, setView] = useState("list"); // list, builder, detail, submission, assign

    if (view === "builder") return <FormBuilder onBack={() => setView("list")} />;
    if (view === "detail") return <FormDetail onBack={() => setView("list")} onViewSubmission={() => setView("submission")} />;
    if (view === "submission") return <SubmissionDetail onBack={() => setView("detail")} />;
    if (view === "assign") return <AssignForm onBack={() => setView("list")} />;

    // Default to list
    return <FormsList onNavigate={setView} />;
}

function FormsList({ onNavigate }: { onNavigate: (v: string) => void }) {
    const [activeTab, setActiveTab] = useState("active");
    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <div className="p-6 max-w-7xl mx-auto h-full flex flex-col animate-in fade-in">
            {/* Header */}
            <div className="flex flex-row justify-between items-end mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">Forms</h1>
                    <p className="text-sm text-slate-500">Create, assign and manage operational forms and employee submissions.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 bg-white/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-200 transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                    </button>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white"
                        style={{ background: "linear-gradient(135deg,#1e3a6e,#2563eb)" }}
                    >
                        <Plus className="w-4 h-4" /> Create Form
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-6 border-b border-slate-200 dark:border-slate-800 mb-6">
                <button
                    onClick={() => setActiveTab("active")}
                    className={`pb-3 text-sm font-medium transition-colors ${activeTab === 'active' ? 'text-[#1e3a6e] border-b-2 border-[#1e3a6e]' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Active (9)
                </button>
                <button
                    onClick={() => setActiveTab("archived")}
                    className={`pb-3 text-sm font-medium transition-colors ${activeTab === 'archived' ? 'text-[#1e3a6e] border-b-2 border-[#1e3a6e]' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Archived (3)
                </button>
            </div>

            {/* Toolbar */}
            <div className="glass-panel p-3 rounded-lg mb-6 flex justify-between items-center bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-md">
                <div className="relative w-72">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search forms..."
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md text-sm outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <button className="px-3 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md flex items-center space-x-2">
                        <span>Status</span>
                    </button>
                    <button className="px-3 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md flex items-center space-x-2">
                        <span>Assigned Employee</span>
                    </button>
                    <button className="px-3 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md flex items-center space-x-2">
                        <span>Created By</span>
                    </button>
                    <div className="w-px h-4 bg-slate-200 mx-2"></div>
                    <button className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Table Area */}
            <div className="bg-white/90 dark:bg-[#1a1f2e]/90 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm flex-1">
                <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                    <thead className="text-xs uppercase bg-slate-50 border-b border-slate-200 dark:bg-slate-800/80 dark:border-slate-800 text-slate-500">
                        <tr>
                            <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded" /></th>
                            <th className="px-6 py-4">Form Name</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Entries / Submissions</th>
                            <th className="px-6 py-4">Completion</th>
                            <th className="px-6 py-4">Assigned To</th>
                            <th className="px-6 py-4">Created By</th>
                            <th className="px-6 py-4">Date Created</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                            <td className="px-6 py-4"><input type="checkbox" className="rounded" /></td>
                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-white cursor-pointer" onClick={() => onNavigate("detail")}>
                                Security Site Inspection
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-2.5 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-medium">Published</span>
                            </td>
                            <td className="px-6 py-4">24 submissions</td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col gap-1 cursor-help" title="18 Completed • 4 Pending • 2 Draft">
                                    <span className="text-sm">18 / 24 completed</span>
                                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "75%" }}></div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">24 Employees</td>
                            <td className="px-6 py-4">James Morrison</td>
                            <td className="px-6 py-4 text-slate-500">Aug 04, 2026</td>
                            <td className="px-6 py-4">
                                <div className="flex justify-center">
                                    <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 pointer transition-colors" title="View/Edit">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group opacity-80">
                            <td className="px-6 py-4"><input type="checkbox" className="rounded" /></td>
                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-white cursor-pointer" onClick={() => onNavigate("detail")}>
                                Vehicle Condition Report
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-2.5 py-1 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 rounded-full text-xs font-medium">Draft</span>
                            </td>
                            <td className="px-6 py-4">0 submissions</td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm">0 / 0 completed</span>
                                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "0%" }}></div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">-</td>
                            <td className="px-6 py-4">James Morrison</td>
                            <td className="px-6 py-4 text-slate-500">Aug 05, 2026</td>
                            <td className="px-6 py-4">
                                <div className="flex justify-center">
                                    <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 pointer transition-colors" title="View/Edit">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Add Form Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-[600px] rounded-xl shadow-2xl p-6 relative overflow-hidden animate-in fade-in zoom-in-95">
                        <button
                            onClick={() => setShowAddModal(false)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <Plus className="w-5 h-5 text-[#1e3a6e]" /> Create Form
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div
                                onClick={() => {
                                    setShowAddModal(false);
                                    onNavigate("builder");
                                }}
                                className="group border border-slate-200 dark:border-slate-800 p-6 rounded-xl hover:border-blue-500 hover:shadow-md cursor-pointer transition-all bg-slate-50/50 dark:bg-slate-800/30"
                            >
                                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-[#1e3a6e] dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Start from Scratch</h3>
                                <p className="text-sm text-slate-500">Create a completely new form using the ALEXIOS form builder.</p>
                            </div>
                            <div className="group border border-slate-200 dark:border-slate-800 p-6 rounded-xl hover:border-blue-500 hover:shadow-md cursor-pointer transition-all bg-slate-50/50 dark:bg-slate-800/30">
                                <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <LayoutTemplate className="w-6 h-6" />
                                </div>
                                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Use Existing Template</h3>
                                <p className="text-sm text-slate-500">Select from reusable predefined operational forms.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function FormBuilder({ onBack }: { onBack: () => void }) {
    return (
        <div className="h-full flex flex-col bg-slate-50/50 dark:bg-[#151923]">
            <div className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 shadow-sm">
                <div className="flex items-center space-x-4">
                    <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">
                        <ChevronLeft className="w-5 h-5 text-slate-500" />
                    </button>
                    <div className="w-px h-6 bg-slate-200 dark:bg-slate-700"></div>
                    <input
                        type="text"
                        defaultValue="Untitled Form"
                        className="bg-transparent text-lg font-semibold text-slate-900 dark:text-white outline-none hover:bg-slate-100 dark:hover:bg-slate-800 px-2 py-1 rounded"
                    />
                </div>
                <div className="flex items-center space-x-4 text-sm">
                    <span className="text-slate-400">Saved just now</span>
                    <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 transition-colors">
                        Preview
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white"
                        style={{ background: "linear-gradient(135deg,#1e3a6e,#2563eb)" }}>
                        Publish & Assign
                    </button>
                </div>
            </div>
            <div className="flex-1 flex overflow-hidden">
                {/* Left: Field Library */}
                <div className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#1a1f2e]/90 flex flex-col overflow-y-auto p-4 custom-scrollbar">
                    <h3 className="text-xs font-semibold uppercase text-slate-500 mb-4 tracking-wider">Basic</h3>
                    <div className="space-y-2 mb-6">
                        <div className="p-2.5 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 hover:border-blue-500 cursor-grab flex items-center gap-3 shadow-sm text-sm hover:shadow-md transition-all">
                            <span className="text-blue-500 font-serif font-bold text-lg w-4 text-center">Tt</span> Short Text
                        </div>
                        <div className="p-2.5 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 hover:border-blue-500 cursor-grab flex items-center gap-3 shadow-sm text-sm hover:shadow-md transition-all">
                            <FileText className="w-4 h-4 text-blue-500" /> Long Text
                        </div>
                        <div className="p-2.5 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 hover:border-blue-500 cursor-grab flex items-center gap-3 shadow-sm text-sm hover:shadow-md transition-all">
                            <span className="text-blue-500 font-bold w-4 text-center">#</span> Number
                        </div>
                    </div>

                    <h3 className="text-xs font-semibold uppercase text-slate-500 mb-4 tracking-wider">Selection</h3>
                    <div className="space-y-2 mb-6">
                        <div className="p-2.5 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 hover:border-blue-500 cursor-grab flex items-center gap-3 shadow-sm text-sm hover:shadow-md transition-all">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Yes / No
                        </div>
                        <div className="p-2.5 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 hover:border-blue-500 cursor-grab flex items-center gap-3 shadow-sm text-sm hover:shadow-md transition-all">
                            <CheckSquare className="w-4 h-4 text-emerald-500" /> Single Select
                        </div>
                    </div>

                    <h3 className="text-xs font-semibold uppercase text-slate-500 mb-4 tracking-wider">Operational</h3>
                    <div className="space-y-2">
                        <div className="p-2.5 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 hover:border-blue-500 cursor-grab flex items-center gap-3 shadow-sm text-sm hover:shadow-md transition-all">
                            <Edit className="w-4 h-4 text-indigo-500" /> Signature
                        </div>
                    </div>
                </div>

                {/* Center: Canvas */}
                <div className="flex-1 overflow-y-auto p-10 flex flex-col items-center custom-scrollbar relative bg-slate-50 dark:bg-slate-900/50">
                    <div className="w-full max-w-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200/60 dark:border-slate-800 rounded-xl p-8 mb-6 relative">
                        <h1 className="text-2xl font-bold mb-2 outline-none" contentEditable suppressContentEditableWarning>Site Safety Inspection</h1>
                        <p className="text-slate-500 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800 outline-none" contentEditable suppressContentEditableWarning>Complete the following inspection before ending your shift.</p>

                        <div className="space-y-4">
                            <div className="group relative border border-transparent hover:border-slate-200 dark:hover:border-slate-700 p-4 -m-4 rounded-lg transition-colors">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 opacity-0 group-hover:opacity-100 cursor-grab text-slate-400">
                                    <GripVertical className="w-5 h-5" />
                                </div>
                                <label className="block text-sm font-medium mb-1">Site Name <span className="text-red-500">*</span></label>
                                <input type="text" disabled className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-2 text-slate-400" placeholder="e.g. Downtown Center" />
                            </div>

                            <div className="group relative border border-blue-500 bg-blue-50/20 dark:bg-blue-900/10 p-4 -m-4 rounded-lg">
                                <div className="absolute right-4 top-4 flex space-x-2">
                                    <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded text-slate-500"><Copy className="w-4 h-4" /></button>
                                    <button className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-500"><Trash2 className="w-4 h-4" /></button>
                                </div>
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 cursor-grab text-slate-400">
                                    <GripVertical className="w-5 h-5" />
                                </div>
                                <label className="block text-sm font-medium mb-1">Are all access points secured? <span className="text-red-500">*</span></label>
                                <div className="flex gap-4 mt-3">
                                    <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-500">Yes</button>
                                    <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-500">No</button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-dashed border-slate-200 dark:border-slate-700 flex justify-center">
                            <p className="text-sm text-slate-400 max-w-sm text-center">Drag and drop fields from the left library here to build your form.</p>
                        </div>
                    </div>
                </div>

                {/* Right: Field Settings */}
                <div className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#1a1f2e]/90 flex flex-col p-5 overflow-y-auto">
                    <h3 className="font-medium text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 mb-5">Field Settings</h3>
                    <div className="space-y-5 text-sm">
                        <div>
                            <label className="block text-slate-600 dark:text-slate-400 mb-1.5">Field Label</label>
                            <textarea className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-md p-2 outline-none focus:border-blue-500 transition-colors" rows={2} defaultValue="Are all access points secured?" />
                        </div>
                        <div>
                            <label className="block text-slate-600 dark:text-slate-400 mb-1.5">Description / Help Text</label>
                            <input type="text" className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-md p-2 outline-none focus:border-blue-500 transition-colors" placeholder="Optional hint..." />
                        </div>
                        <div className="flex items-center justify-between py-3 border-t border-slate-100 dark:border-slate-800">
                            <span className="text-slate-600 dark:text-slate-400 font-medium">Required</span>
                            <button className="w-10 h-6 bg-[#1e3a6e] rounded-full relative transition-colors shadow-sm">
                                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow"></div>
                            </button>
                        </div>
                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                            <label className="block text-slate-600 dark:text-slate-400 mb-1.5">Type</label>
                            <select className="w-full bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-md p-2 outline-none focus:border-blue-500 transition-colors">
                                <option>Yes / No</option>
                                <option>Single Select</option>
                                <option>Short Text</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FormDetail({ onBack, onViewSubmission }: { onBack: () => void, onViewSubmission: () => void }) {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="h-full flex flex-col p-6 max-w-7xl mx-auto animate-in fade-in">
            {/* Header */}
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full mr-4 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold">Site Safety Inspection</h1>
                        <span className="px-2.5 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-medium border border-green-200 dark:border-green-800/50">Published</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">Created by James Morrison • Aug 04, 2026</p>
                </div>
                <div className="ml-auto flex items-center gap-3">
                    <button className="px-4 py-2 border border-slate-200 bg-white/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm transition-colors shadow-sm font-medium">
                        Edit Form
                    </button>
                    <button className="px-4 py-2 border border-slate-200 bg-white/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm transition-colors shadow-sm flex items-center gap-2 font-medium">
                        <Download className="w-4 h-4" /> Export
                    </button>
                    <button className="p-2 border border-slate-200 bg-white/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors shadow-sm text-slate-600 dark:text-slate-300">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="flex space-x-6 border-b border-slate-200 dark:border-slate-800 mb-6">
                <button
                    onClick={() => setActiveTab("overview")}
                    className={`pb-3 text-sm font-medium transition-colors ${activeTab === 'overview' ? 'text-[#1e3a6e] border-b-2 border-[#1e3a6e]' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Overview
                </button>
                <button
                    onClick={() => setActiveTab("employees")}
                    className={`pb-3 text-sm font-medium transition-colors ${activeTab === 'employees' ? 'text-[#1e3a6e] border-b-2 border-[#1e3a6e]' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Assigned Employees
                </button>
                <button
                    onClick={() => setActiveTab("submissions")}
                    className={`pb-3 text-sm font-medium transition-colors ${activeTab === 'submissions' ? 'text-[#1e3a6e] border-b-2 border-[#1e3a6e]' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Submissions
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                {activeTab === "overview" && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-4 gap-4">
                            <div className="glass-panel p-5 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/80 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Assigned</p>
                                    <p className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">24</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[#1e3a6e]">
                                    <User className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="glass-panel p-5 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/80 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Completed</p>
                                    <p className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">18</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="glass-panel p-5 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/80 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Pending</p>
                                    <p className="text-3xl font-bold mt-1 text-orange-500">4</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500">
                                    <Clock className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="glass-panel p-5 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/80 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Draft</p>
                                    <p className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">2</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                                    <Edit className="w-6 h-6" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-2 glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/80 shadow-sm">
                                <h2 className="text-lg font-semibold mb-6 text-slate-900 dark:text-white">Completion Progress</h2>
                                <div className="flex justify-between text-sm mb-2 font-medium">
                                    <span className="text-slate-600 dark:text-slate-300">18 of 24 employees completed</span>
                                    <span className="text-[#1e3a6e] font-bold">75%</span>
                                </div>
                                <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner flex">
                                    <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: "75%" }}></div>
                                </div>
                            </div>

                            <div className="col-span-1 glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/80 shadow-sm">
                                <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Metadata</h2>
                                <div className="flex flex-col gap-y-4 text-sm">
                                    <div>
                                        <p className="text-slate-500 mb-0.5 text-xs uppercase tracking-wider">Created Date</p>
                                        <p className="font-medium text-slate-800 dark:text-slate-200">Aug 04, 2026</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 mb-0.5 text-xs uppercase tracking-wider">Number of fields</p>
                                        <p className="font-medium text-slate-800 dark:text-slate-200">12</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 mb-0.5 text-xs uppercase tracking-wider">Submission Rule</p>
                                        <p className="font-medium text-slate-800 dark:text-slate-200">Each employee may submit once</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "employees" && (
                    <div className="glass-panel border border-slate-200/60 dark:border-slate-800/60 shadow-sm rounded-xl overflow-hidden bg-white/90 dark:bg-[#1a1f2e]/90">
                        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                            <thead className="text-xs uppercase bg-slate-50/80 border-b border-slate-200 dark:bg-slate-800/80 dark:border-slate-800 text-slate-500">
                                <tr>
                                    <th className="px-6 py-4">Employee</th>
                                    <th className="px-6 py-4">Site / Position</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Assigned Date</th>
                                    <th className="px-6 py-4">Submitted Date</th>
                                    <th className="px-6 py-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-[#1e3a6e] font-bold text-xs ring-2 ring-white dark:ring-slate-900">LF</div>
                                        Larry Freeman Jr.
                                    </td>
                                    <td className="px-6 py-4">Downtown Financial Center<br /><span className="text-xs text-slate-400">Security Officer</span></td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-medium border border-green-200/50 dark:border-green-800/50">Submitted</span>
                                    </td>
                                    <td className="px-6 py-4 font-medium">Aug 04</td>
                                    <td className="px-6 py-4">Aug 05, 9:42 AM</td>
                                    <td className="px-6 py-4 text-center">
                                        <button onClick={onViewSubmission} className="text-[#1e3a6e] hover:text-blue-700 font-medium bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">View</button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center text-orange-600 font-bold text-xs ring-2 ring-white dark:ring-slate-900">SJ</div>
                                        Sarah Jenkins
                                    </td>
                                    <td className="px-6 py-4">Northside Mall<br /><span className="text-xs text-slate-400">Security Supervisor</span></td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 rounded-full text-xs font-medium border border-orange-200/50 dark:border-orange-800/50">Draft</span>
                                    </td>
                                    <td className="px-6 py-4 font-medium">Aug 04</td>
                                    <td className="px-6 py-4 text-slate-400">-</td>
                                    <td className="px-6 py-4 text-center">
                                        <button className="text-slate-400 hover:text-slate-600 font-medium px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Remind</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === "submissions" && (
                    <div className="glass-panel border border-slate-200/60 dark:border-slate-800/60 shadow-sm rounded-xl overflow-hidden bg-white/90 dark:bg-[#1a1f2e]/90">
                        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                            <thead className="text-xs uppercase bg-slate-50/80 border-b border-slate-200 dark:bg-slate-800/80 dark:border-slate-800 text-slate-500">
                                <tr>
                                    <th className="px-6 py-4">Employee</th>
                                    <th className="px-6 py-4">Submitted At</th>
                                    <th className="px-6 py-4">Site</th>
                                    <th className="px-6 py-4">Completion Status</th>
                                    <th className="px-6 py-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">Larry Freeman Jr.</td>
                                    <td className="px-6 py-4">Aug 05, 2026 • 9:42 AM</td>
                                    <td className="px-6 py-4">Downtown Financial Center</td>
                                    <td className="px-6 py-4">
                                        <span className="text-slate-500 flex items-center gap-1.5 font-medium px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-md inline-flex w-max"><Lock className="w-3.5 h-3.5" /> Locked</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button onClick={onViewSubmission} className="text-[#1e3a6e] hover:text-blue-700 font-medium bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 px-3 py-1.5 rounded-md transition-colors">View Submission</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

function SubmissionDetail({ onBack }: { onBack: () => void }) {
    return (
        <div className="max-w-2xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-4 h-full overflow-y-auto w-full custom-scrollbar">
            <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 dark:hover:text-white mb-6 transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back to form detail
            </button>

            <div className="glass-panel p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-[#1a1f2e]/80 shadow-xl backdrop-blur-md mb-8">
                <div className="border-b border-slate-200 dark:border-slate-700 pb-6 mb-6">
                    <h1 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">Site Safety Inspection</h1>
                    <div className="flex flex-col gap-1 text-sm text-slate-500">
                        <p>Submitted by <span className="font-semibold text-slate-800 dark:text-slate-300">Larry Freeman Jr.</span></p>
                        <p className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Aug 05, 2026 • 9:42 AM</p>
                    </div>
                    <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md text-xs font-semibold uppercase tracking-wider border border-slate-200 dark:border-slate-700">
                        <Lock className="w-3.5 h-3.5" /> Submitted • Locked
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-slate-800 dark:text-white mb-2 text-sm">Site Name</h3>
                        <div className="p-3.5 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-300 text-sm">
                            <p>Downtown Financial Center</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800 dark:text-white mb-2 text-sm">Are all access points secured?</h3>
                        <div className="p-3.5 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-300 text-sm">
                            <p>Yes</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800 dark:text-white mb-2 text-sm">Issues identified</h3>
                        <div className="p-3.5 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-300 text-sm">
                            <p>Rear loading entrance lock requires maintenance. The latch is sticking when closing the primary gate.</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800 dark:text-white mb-2 text-sm">Photo Evidence</h3>
                        <div className="h-48 w-64 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 overflow-hidden relative shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                            <img src="https://images.unsplash.com/photo-1542382156885-32bdabda35fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" className="object-cover w-full h-full opacity-70 mix-blend-overlay" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center font-medium bg-black/20 text-white transition-opacity hover:bg-black/10">
                                <FileText className="w-8 h-8 mb-2 opacity-90 shadow-sm" />
                                <span className="text-sm shadow-sm drop-shadow-md">IMG_8432.jpg</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AssignForm({ onBack }: { onBack: () => void }) {
    return <div>Assigning Form (Placeholder)</div>;
}
