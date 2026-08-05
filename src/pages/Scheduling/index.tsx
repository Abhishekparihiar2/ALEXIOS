import { useState, useMemo } from "react";
import {
  AlertCircle, Settings, AlertTriangle, RefreshCw, Send, Plus, Search, CheckCircle2, X
} from "lucide-react";
import { MOCK_SCHED_JOBS, MOCK_SCHED_SHIFTS, MOCK_SWAP_REQUESTS } from "../../data/mockData";
import { ShiftDrawer } from "./ShiftDrawer";

export function SchedulingPage() {
  const [shifts, setShifts] = useState(MOCK_SCHED_SHIFTS);
  const [activeView, setActiveView] = useState<"user" | "job" | "day" | "week" | "month" | "list">("user");
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "warning" } | null>(null);

  const [searchFilter, setSearchFilter] = useState("");
  const [jobFilter, setJobFilter] = useState("All");
  const [siteFilter, setSiteFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showDrawer, setShowDrawer] = useState(false);
  const [editingShiftId, setEditingShiftId] = useState<string | null>(null);
  const [prefillDate, setPrefillDate] = useState<string | null>(null);
  const [prefillEmp, setPrefillEmp] = useState<string | null>(null);
  const [prefillJob, setPrefillJob] = useState<string | null>(null);

  const [showConflicts, setShowConflicts] = useState(false);

  const DAYS = [
    { date: "2026-08-03", dayLabel: "Mon", shortLabel: "Aug 3" },
    { date: "2026-08-04", dayLabel: "Tue", shortLabel: "Aug 4" },
    { date: "2026-08-05", dayLabel: "Wed", shortLabel: "Aug 5" },
    { date: "2026-08-06", dayLabel: "Thu", shortLabel: "Aug 6" },
    { date: "2026-08-07", dayLabel: "Fri", shortLabel: "Aug 7" },
    { date: "2026-08-08", dayLabel: "Sat", shortLabel: "Aug 8" },
    { date: "2026-08-09", dayLabel: "Sun", shortLabel: "Aug 9" }
  ];

  const EMPLOYEES = [
    "Marcus Johnson",
    "Sarah Chen",
    "Derek Wilson",
    "Mike Torres",
    "John Davis",
    "Aisha Okafor",
    "Unassigned Draft"
  ];

  const triggerToast = (message: string, type: "success" | "info" | "warning" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openDrawer = (shiftId: string | null = null, date: string | null = null, emp: string | null = null, job: string | null = null) => {
    setEditingShiftId(shiftId);
    setPrefillDate(date);
    setPrefillEmp(emp);
    setPrefillJob(job);
    setShowDrawer(true);
  };

  const publishDrafts = () => {
    let count = 0;
    setShifts(prev => prev.map(s => {
      if (s.status === "Draft") {
        count++;
        return { ...s, status: "Published" as const };
      }
      return s;
    }));
    if (count > 0) {
      triggerToast(`Published ${count} shifts. App notifications pushed to staff.`, "success");
    } else {
      triggerToast("No draft shifts to publish.", "info");
    }
  };

  const filteredShifts = useMemo(() => {
    return shifts.filter(s => {
      const matchSearch = s.employeeName ? s.employeeName.toLowerCase().includes(searchFilter.toLowerCase()) : "unassigned".includes(searchFilter.toLowerCase());
      const matchJob = jobFilter === "All" || s.jobId === jobFilter;
      const matchSite = siteFilter === "All" || s.site === siteFilter;
      const matchStatus = statusFilter === "All" || s.status === statusFilter;
      return matchSearch && matchJob && matchSite && matchStatus;
    });
  }, [shifts, searchFilter, jobFilter, siteFilter, statusFilter]);

  const activeConflicts = useMemo(() => shifts.filter(s => s.conflict !== null), [shifts]);

  const saveShift = (shiftData: any) => {
    if (editingShiftId) {
      setShifts(prev => prev.map(s => s.id === editingShiftId ? { ...s, ...shiftData } : s));
      triggerToast("Shift updated successfully.", "success");
    } else {
      setShifts(prev => [...prev, { id: `SHF-${Math.floor(Math.random() * 900) + 100}`, ...shiftData }]);
      triggerToast("New Shift dispatched and queued.", "success");
    }
    setShowDrawer(false);
  };

  const deleteShift = (id: string) => {
    setShifts(prev => prev.filter(s => s.id !== id));
    triggerToast("Shift deleted.", "info");
    setShowDrawer(false);
  };

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-5 relative" style={{ scrollbarWidth: "none" }}>
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl transition-all animate-bounce"
          style={{
            background: toast.type === "success" ? "#f0fdf4" : toast.type === "warning" ? "#fffbeb" : "#eff6ff",
            border: `1.5px solid ${toast.type === "success" ? "#bbf7d0" : toast.type === "warning" ? "#fed7aa" : "#bfdbfe"}`,
            color: toast.type === "success" ? "#15803d" : toast.type === "warning" ? "#b45309" : "#1d4ed8"
          }}>
          <AlertCircle className="w-4 h-4 shrink-0 animate-pulse" />
          <span className="text-sm font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Operational Security Schedule</h3>
          <p className="text-xs text-slate-500 mt-0.5">Advanced timeline schedule matrix</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => setShowConflicts(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-red-50 text-red-700 hover:bg-red-100 rounded-xl cursor-pointer">
            <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />Conflicts ({activeConflicts.length})
          </button>
          <button onClick={publishDrafts}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl cursor-pointer transition-colors">
            <Send className="w-3.5 h-3.5" />Publish Drafts
          </button>
          <button onClick={() => openDrawer()}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 rounded-xl cursor-pointer transition-colors">
            <Plus className="w-3.5 h-3.5" />Create Shift
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4 rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-100 border border-slate-200 self-start">
          {[
            { id: "user", label: "User View" },
            { id: "job", label: "Job View" },
            { id: "list", label: "List View" }
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveView(v.id as any)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold cursor-pointer transition-all ${activeView === v.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative min-w-[150px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search staff name..." value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs outline-none bg-slate-50 focus:bg-white transition-colors" />
          </div>
          <select value={jobFilter} onChange={(e) => setJobFilter(e.target.value)}
            className="px-2 py-1.5 border border-slate-200 rounded-lg text-xs outline-none bg-white">
            <option value="All">All Jobs</option>
            {MOCK_SCHED_JOBS.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
          </select>
        </div>
      </div>

      {/* Matrix Grid */}
      <div className="p-4 rounded-xl border border-slate-200 bg-white overflow-x-auto relative min-h-[500px]">
        {activeView === "user" && (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-slate-500 text-xs">
                <th className="px-4 py-3 text-left font-bold min-w-[180px] bg-slate-50 sticky left-0 z-20 border-r">Employee</th>
                {DAYS.map((d) => (
                  <th key={d.date} className="px-4 py-3 text-center min-w-[120px] font-bold">
                    <span className="block text-slate-400 font-normal uppercase tracking-wider">{d.dayLabel}</span>
                    <span className="block font-bold text-slate-800">{d.shortLabel}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {EMPLOYEES.map((emp) => (
                <tr key={emp} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-semibold text-slate-900 bg-slate-50 sticky left-0 z-10 border-r flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                      {emp.split(" ").map(w => w[0]).join("")}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{emp}</p>
                      <p className="text-[10px] font-medium text-slate-400">
                        {emp === "Unassigned Draft" ? "Open Shifts" : "Security"}
                      </p>
                    </div>
                  </td>
                  {DAYS.map((d) => {
                    const shift = filteredShifts.find(s => s.employeeName === (emp === "Unassigned Draft" ? null : emp) && s.date === d.date);
                    return (
                      <td key={d.date} className="p-2 align-middle text-center h-[90px] group relative border-r">
                        {shift ? (
                          <div onClick={() => openDrawer(shift.id)}
                            className="p-2.5 rounded-lg text-left text-xs cursor-pointer shadow-xs border hover:shadow-md transition-all h-full flex flex-col justify-between"
                            style={{
                              background: shift.status === "Draft" ? "#f8fafc" : "#fff",
                              borderColor: shift.conflict ? "#ef4444" : shift.status === "Draft" ? "#cbd5e1" : "#e2e8f0",
                              borderLeftWidth: "4.5px",
                              borderLeftColor: shift.conflict ? "#ef4444" : MOCK_SCHED_JOBS.find(j => j.id === shift.jobId)?.color || "#16a34a"
                            }}>
                            <div>
                              <div className="flex items-start justify-between mb-1">
                                <span className="font-bold text-slate-800">{shift.startTime} - {shift.endTime}</span>
                                {shift.status === "Draft" && <span className="text-[9px] px-1 bg-slate-200 rounded font-bold uppercase">Draft</span>}
                              </div>
                              <p className="text-[10px] text-slate-500 font-semibold truncate leading-tight">{MOCK_SCHED_JOBS.find(j => j.id === shift.jobId)?.title}</p>
                              <p className="text-[10px] text-slate-400 truncate mt-0.5">{shift.site}</p>
                            </div>
                            {shift.conflict && (
                              <div className="self-end mt-1 text-red-600">
                                <AlertTriangle className="w-3.5 h-3.5" />
                              </div>
                            )}
                          </div>
                        ) : (
                          <button onClick={() => openDrawer(null, d.date, emp === "Unassigned Draft" ? null : emp)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity w-full h-full min-h-[60px] rounded-lg border-2 border-dashed border-transparent hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center text-slate-400 cursor-pointer">
                            <Plus className="w-5 h-5" />
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeView === "list" && (
          <div className="text-sm text-slate-500 text-center py-10">List View Coming Soon</div>
        )}
        {activeView === "job" && (
          <div className="text-sm text-slate-500 text-center py-10">Job View Coming Soon</div>
        )}
      </div>

      {showDrawer && (
        <ShiftDrawer 
          isOpen={showDrawer}
          onClose={() => setShowDrawer(false)}
          editingShiftId={editingShiftId}
          shifts={shifts}
          prefillDate={prefillDate}
          prefillEmp={prefillEmp}
          prefillJob={prefillJob}
          onSave={saveShift}
          onDelete={deleteShift}
        />
      )}
    </div>
  );
}
