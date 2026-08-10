import React, { useState, useMemo } from 'react';
import { 
  FileText, Folder, Settings, Search, Plus, Filter, MoreHorizontal, LayoutTemplate, 
  AlignLeft, AlertTriangle, ChevronDown, CheckCircle2, Clock, Zap, X
} from 'lucide-react';
import { 
  MOCK_REPORT_FORMS, MOCK_REPORT_CATEGORIES, MOCK_INCIDENT_CATEGORIES, 
  MOCK_REPORT_FOOTERS, MOCK_REPORT_TEMPLATES, ReportFormDef 
} from '../../data/mockReports';
import { ReportBuilder } from './ReportBuilder';
import { IncidentCategoryBuilder } from './IncidentCategoryBuilder';

export type ReportTab = "reports" | "report-categories" | "incident-categories" | "footers";

interface Props {
  onNavigate: (page: string) => void;
  initialView?: string;
}

export function ReportSettingsPage({ onNavigate, initialView }: Props) {
  const [activeTab, setActiveTab] = useState<ReportTab>("reports");
  const [editingReport, setEditingReport] = useState<string | null>(null);
  const [editingIncident, setEditingIncident] = useState<string | null>(null);

  if (editingReport !== null) {
    return <ReportBuilder reportId={editingReport} onBack={() => setEditingReport(null)} />;
  }
  if (editingIncident !== null) {
    return <IncidentCategoryBuilder incidentId={editingIncident} onBack={() => setEditingIncident(null)} />;
  }

  const TABS = [
    { id: "reports", label: "Reports", icon: <FileText className="w-4 h-4" /> },
    { id: "report-categories", label: "Report Categories", icon: <Folder className="w-4 h-4" /> },
    { id: "incident-categories", label: "Incident Categories", icon: <AlertTriangle className="w-4 h-4" /> },
    { id: "footers", label: "Report Footers", icon: <AlignLeft className="w-4 h-4" /> },
  ];

  return (
    <div className="flex-1 overflow-y-auto flex flex-col" style={{ background: "#f0f2f8", scrollbarWidth: "none" }}>
      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden px-6 pt-6 pb-5 shrink-0"
        style={{ background: "linear-gradient(135deg, #0f1729 0%, #1a2f5a 55%, #1e3a6e 100%)" }}>
        <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }} />
        
        <div className="relative flex flex-col gap-2">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(6px)" }}>
              <Settings className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Report Settings</h2>
          </div>
          <p className="text-sm ml-10" style={{ color: "rgba(255,255,255,0.55)" }}>
            Create and configure the reports used by guards across security operations.
          </p>
        </div>
      </div>

      {/* ── Main Workspace Card ── */}
      <div className="mx-5 mb-5 mt-4 rounded-2xl flex flex-col overflow-hidden glass-card flex-1 min-h-[700px]"
        style={{ boxShadow: "0 4px 24px rgba(15,23,41,0.10)" }}>
        
        {/* ── Tabs ── */}
        <div className="flex items-center gap-1 px-5 pt-4 pb-0 overflow-x-auto shrink-0" style={{ borderBottom: "1.5px solid #f1f5f9" }}>
          {TABS.map((t) => {
            const active = activeTab === t.id;
            return (
              <button key={t.id}
                onClick={() => setActiveTab(t.id as ReportTab)}
                className="relative flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-all whitespace-nowrap"
                style={{ color: active ? "#1e3a6e" : "#94a3b8", background: "none", marginBottom: -1.5 }}
              >
                {t.icon}
                {t.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: "linear-gradient(90deg, #1e3a6e, #3b82f6)" }} />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Tab Content ── */}
        <div className="flex-1 bg-white overflow-hidden flex flex-col dark:bg-slate-900">
          {activeTab === "reports" && <ReportFormsTab onEdit={(id) => setEditingReport(id)} onCreate={() => setEditingReport("new")} />}
          {activeTab === "report-categories" && <ReportCategoriesTab />}
          {activeTab === "incident-categories" && <IncidentCategoriesTab onEdit={(id) => setEditingIncident(id)} onCreate={() => setEditingIncident("new")} />}
          {activeTab === "footers" && <FootersTab />}
        </div>
      </div>
    </div>
  );
}

function ReportFormsTab({ onEdit, onCreate }: { onEdit: (id: string) => void, onCreate: () => void }) {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [approvalFilter, setApprovalFilter] = useState("All");

  const filtered = useMemo(() => {
    return MOCK_REPORT_FORMS.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || f.status === statusFilter;
      const matchesApproval = approvalFilter === "All" || (approvalFilter === "Required" ? f.approvalRequired : !f.approvalRequired);
      return matchesSearch && matchesStatus && matchesApproval;
    });
  }, [search, statusFilter, approvalFilter]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 bg-slate-50/50 shrink-0" style={{ borderBottom: "1px solid #f1f5f9" }}>
        {[
          { label: "Total Reports", value: MOCK_REPORT_FORMS.length, color: "#1e3a6e", icon: <FileText className="w-4 h-4"/> },
          { label: "Active Reports", value: MOCK_REPORT_FORMS.filter(f => f.status === "Active").length, color: "#16a34a", icon: <CheckCircle2 className="w-4 h-4"/> },
          { label: "Assigned Reports", value: MOCK_REPORT_FORMS.filter(f => f.assignedSites.length > 0).length, color: "#8b5cf6", icon: <Zap className="w-4 h-4"/> },
          { label: "Pending Approval", value: 12, color: "#d97706", icon: <Clock className="w-4 h-4"/> },
        ].map(s => (
          <div key={s.label} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-700">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}15`, color: s.color }}>
              {s.icon}
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800 leading-none mb-1 dark:text-slate-200">{s.value}</p>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Compact Toolbar & Filters ── */}
      <div className="p-3 border-b border-slate-100 flex flex-col gap-3 bg-white shrink-0 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex items-center flex-1 max-w-md shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3" />
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search reports..." 
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all dark:border-slate-700 dark:bg-slate-900"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${showFilters || statusFilter !== "All" || approvalFilter !== "All" ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
          <button onClick={onCreate} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors shadow-sm whitespace-nowrap">
            <Plus className="w-4 h-4" /> Create Report
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-600 whitespace-nowrap dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-transparent font-medium outline-none cursor-pointer">
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-600 whitespace-nowrap dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
              <select value={approvalFilter} onChange={e => setApprovalFilter(e.target.value)} className="bg-transparent font-medium outline-none cursor-pointer">
                <option value="All">All Approvals</option>
                <option value="Required">Required</option>
                <option value="No Approval">No Approval</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* ── Table ── */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 sticky top-0 z-10 shadow-sm dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700">
              <th className="px-5 py-3">Report Name</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Available To</th>
              <th className="px-5 py-3">Approval</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Last Updated</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map(form => (
              <tr key={form.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => onEdit(form.id)}>
                <td className="px-5 py-3.5">
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{form.name}</p>
                </td>
                <td className="px-5 py-3.5 text-sm text-slate-600 font-medium dark:text-slate-300">
                  {MOCK_REPORT_CATEGORIES.find(c => c.id === form.categoryId)?.name}
                </td>
                <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-300">
                  {form.assignedSites.includes("All") ? "All Sites" : `${form.assignedSites.length} Site(s)`} • {form.assignedGroups.join(", ")}
                </td>
                <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-300">
                  {form.approvalRequired ? <span className="text-amber-600 font-semibold">Required</span> : "No Approval"}
                </td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${form.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    {form.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-sm text-slate-500 dark:text-slate-400">{form.lastUpdated}</td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                    <button onClick={() => onEdit(form.id)} className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-lg transition-colors">
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-10 text-sm text-slate-500 dark:text-slate-400">
                  No reports match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReportCategoriesTab() {
  const [categories, setCategories] = useState(MOCK_REPORT_CATEGORIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  }, [categories, search]);

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCategory = {
      id: 'RC-' + Date.now(),
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      status: formData.get('status') as "Active" | "Archived",
      reportCount: 0,
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setCategories([newCategory, ...categories]);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-100 shrink-0 flex-wrap dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm bg-slate-50 border border-slate-200 min-w-64 dark:bg-slate-900 dark:border-slate-700">
            <Search className="w-4 h-4 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search categories..." className="bg-transparent outline-none flex-1" />
          </div>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-800 rounded-xl hover:bg-blue-900 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Create Category
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 sticky top-0 z-10 shadow-sm dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700">
              <th className="px-5 py-3">Category Name</th>
              <th className="px-5 py-3">Description</th>
              <th className="px-5 py-3">Reports</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Last Updated</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map(cat => (
              <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                <td className="px-5 py-3.5"><p className="text-sm font-bold text-slate-900 dark:text-slate-100">{cat.name}</p></td>
                <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-300">{cat.description}</td>
                <td className="px-5 py-3.5 text-sm font-medium text-slate-700 dark:text-slate-300">{cat.reportCount}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${cat.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    {cat.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-sm text-slate-500 dark:text-slate-400">{cat.lastUpdated}</td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                    <button className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-lg transition-colors">
                      Edit
                    </button>
                    <button onClick={() => setCategories(categories.filter(c => c.id !== cat.id))} className="px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 rounded-lg transition-colors">
                      Archive
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-10 text-sm text-slate-500 dark:text-slate-400">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden dark:bg-slate-900">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-800 dark:text-slate-200">Create Category</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-5 bg-slate-50 dark:bg-slate-900">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 dark:text-slate-300">Category Name <span className="text-red-500">*</span></label>
                <input required name="name" type="text" placeholder="e.g. Health & Safety" className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all dark:border-slate-700 dark:bg-slate-900" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 dark:text-slate-300">Description</label>
                <textarea name="description" rows={3} placeholder="Optional context..." className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none dark:border-slate-700 dark:bg-slate-900"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 dark:text-slate-300">Status</label>
                <div className="relative">
                  <select name="status" className="w-full appearance-none px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                    <option value="Active">Active</option>
                    <option value="Archived">Archived</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full py-3 bg-blue-800 text-white text-sm font-bold rounded-xl hover:bg-blue-900 transition-colors shadow-sm">
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
function IncidentCategoriesTab({ onEdit, onCreate }: { onEdit: (id: string) => void, onCreate: () => void }) {
  const [incidents, setIncidents] = useState(MOCK_INCIDENT_CATEGORIES);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return incidents.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.code.toLowerCase().includes(search.toLowerCase()));
  }, [incidents, search]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-100 shrink-0 flex-wrap dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm bg-slate-50 border border-slate-200 min-w-64 dark:bg-slate-900 dark:border-slate-700">
            <Search className="w-4 h-4 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search incidents..." className="bg-transparent outline-none flex-1" />
          </div>
        </div>
        <button onClick={onCreate} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-800 rounded-xl hover:bg-blue-900 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Create Incident Category
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 sticky top-0 z-10 shadow-sm dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700">
              <th className="px-5 py-3">Incident Type</th>
              <th className="px-5 py-3">Code</th>
              <th className="px-5 py-3">Severity</th>
              <th className="px-5 py-3">Default Group</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map(inc => (
              <tr key={inc.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => onEdit(inc.id)}>
                <td className="px-5 py-3.5">
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{inc.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5 dark:text-slate-400">{inc.description}</p>
                </td>
                <td className="px-5 py-3.5 text-sm font-mono text-slate-600 bg-slate-50/30 dark:text-slate-300">{inc.code}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                    inc.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                    inc.severity === 'High' ? 'bg-orange-100 text-orange-700' :
                    inc.severity === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {inc.severity}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-300">{inc.defaultGroup}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${inc.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    {inc.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                    <button onClick={() => onEdit(inc.id)} className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-lg transition-colors">
                      Edit
                    </button>
                    <button onClick={() => setIncidents(incidents.filter(i => i.id !== inc.id))} className="px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 rounded-lg transition-colors">
                      Archive
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-10 text-sm text-slate-500 dark:text-slate-400">
                  No incident categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function FootersTab() {
  const [footers, setFooters] = useState(MOCK_REPORT_FOOTERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return footers.filter(f => f.name.toLowerCase().includes(search.toLowerCase()) || f.text.toLowerCase().includes(search.toLowerCase()));
  }, [footers, search]);

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newFooter = {
      id: 'F-' + Date.now(),
      name: formData.get('name') as string,
      text: formData.get('text') as string,
      status: formData.get('status') as "Active" | "Archived",
      usageCount: 0
    };
    setFooters([newFooter, ...footers]);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-100 shrink-0 flex-wrap dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm bg-slate-50 border border-slate-200 min-w-64 dark:bg-slate-900 dark:border-slate-700">
            <Search className="w-4 h-4 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search footers..." className="bg-transparent outline-none flex-1" />
          </div>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-800 rounded-xl hover:bg-blue-900 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Create Footer
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 sticky top-0 z-10 shadow-sm dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700">
              <th className="px-5 py-3">Footer Name</th>
              <th className="px-5 py-3">Text Content</th>
              <th className="px-5 py-3">Usage</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map(f => (
              <tr key={f.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                <td className="px-5 py-3.5"><p className="text-sm font-bold text-slate-900 dark:text-slate-100">{f.name}</p></td>
                <td className="px-5 py-3.5 text-sm text-slate-600 truncate max-w-sm dark:text-slate-300">{f.text}</td>
                <td className="px-5 py-3.5 text-sm font-medium text-slate-700 dark:text-slate-300">{f.usageCount} Reports</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${f.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    {f.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                    <button className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-lg transition-colors">
                      Edit
                    </button>
                    <button onClick={() => setFooters(footers.filter(c => c.id !== f.id))} className="px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 rounded-lg transition-colors">
                      Archive
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-10 text-sm text-slate-500 dark:text-slate-400">
                  No footers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden dark:bg-slate-900">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-800 dark:text-slate-200">Create Footer</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-5 bg-slate-50 dark:bg-slate-900">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 dark:text-slate-300">Footer Name <span className="text-red-500">*</span></label>
                <input required name="name" type="text" placeholder="e.g. Standard Liability Disclaimer" className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all dark:border-slate-700 dark:bg-slate-900" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 dark:text-slate-300">Text Content <span className="text-red-500">*</span></label>
                <textarea required name="text" rows={4} placeholder="Legal text or footer note..." className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none dark:border-slate-700 dark:bg-slate-900"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 dark:text-slate-300">Status</label>
                <div className="relative">
                  <select name="status" className="w-full appearance-none px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                    <option value="Active">Active</option>
                    <option value="Archived">Archived</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full py-3 bg-blue-800 text-white text-sm font-bold rounded-xl hover:bg-blue-900 transition-colors shadow-sm">
                  Save Footer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
