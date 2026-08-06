import { useState } from "react";
import { Search, Filter, ChevronLeft, ChevronRight, Download, CheckSquare, MessageSquare, AlertCircle, AlertTriangle, X, Check, CheckCircle, Flame, Clock, Calendar, Edit2, Lock, Unlock } from "lucide-react";
import { MOCK_WEEKLY_TIMESHEETS, PayPeriodSummary, TimesheetEntry, TimesheetIssue } from "./timesheetMockData";

export function TimesheetsTab() {
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [expandedDay, setExpandedDay] = useState<{ empId: string, date: string } | null>(null);
  const [selectedIssueEmp, setSelectedIssueEmp] = useState<PayPeriodSummary | null>(null);
  const [compareSchedule, setCompareSchedule] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isRequestsOpen, setIsRequestsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  
  // Date Picker State
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: new Date(2026, 7, 2), // Aug 2, 2026
    end: new Date(2026, 7, 8)    // Aug 8, 2026
  });
  const [tempStart, setTempStart] = useState("2026-08-02");
  const [tempEnd, setTempEnd] = useState("2026-08-08");

  const rowsPerPage = 5;

  const toggleAll = () => {
    if (selectedRows.size === MOCK_WEEKLY_TIMESHEETS.length) setSelectedRows(new Set());
    else setSelectedRows(new Set(MOCK_WEEKLY_TIMESHEETS.map(e => e.employeeId)));
  };

  const toggleRow = (id: string) => {
    const next = new Set(selectedRows);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedRows(next);
  };

  const globalTotals = MOCK_WEEKLY_TIMESHEETS.reduce((acc, curr) => ({
    regular: acc.regular + curr.regularHours,
    overtime: acc.overtime + curr.overtimeHours,
    pto: acc.pto + curr.ptoHours,
    unpaid: acc.unpaid + curr.unpaidTimeOffHours,
  }), { regular: 0, overtime: 0, pto: 0, unpaid: 0 });

  const totalItems = MOCK_WEEKLY_TIMESHEETS.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const paginatedData = MOCK_WEEKLY_TIMESHEETS.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // Generate date array
  const datesToRender: Date[] = [];
  let curr = new Date(dateRange.start);
  while (curr <= dateRange.end) {
    datesToRender.push(new Date(curr));
    curr.setDate(curr.getDate() + 1);
  }

  const formatShortDate = (d: Date) => `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}`;
  
  const formatDateISO = (d: Date) => {
    const y = d.getFullYear();
    const m = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50 relative">
      
      {/* HEADER ROW */}
      <div className="px-6 py-4 bg-white border-b border-slate-200 shrink-0 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-[300px]">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, position, post..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm outline-none shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="p-2.5 bg-white border border-slate-300 rounded-lg text-slate-500 shadow-sm hover:bg-slate-50 flex items-center justify-center" 
              title="Advanced Filters"
            >
              <Filter className="w-4 h-4" />
            </button>
            
            {isFilterOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-3 border-b border-slate-100">
                  <h4 className="font-bold text-slate-800 text-sm">Advanced Filters</h4>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Employment Type</label>
                    <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none">
                      <option>All Types</option>
                      <option>Full-Time</option>
                      <option>Part-Time</option>
                      <option>Contractor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Position</label>
                    <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none">
                      <option>All Positions</option>
                      <option>Armed Guard</option>
                      <option>Patrol Supervisor</option>
                      <option>Static Guard</option>
                    </select>
                  </div>
                </div>
                <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex justify-end gap-2 rounded-b-xl">
                  <button onClick={() => setIsFilterOpen(false)} className="text-xs font-bold text-slate-500 hover:text-slate-700">Clear</button>
                  <button onClick={() => setIsFilterOpen(false)} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700">Apply</button>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center bg-white border border-slate-300 rounded-lg shadow-sm p-0.5 relative">
            <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-md transition-colors"><ChevronLeft className="w-4 h-4" /></button>
            <div 
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="px-3 py-1 flex flex-col items-center border-x border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors min-w-[120px]"
            >
              <span className="text-xs font-bold text-slate-700 leading-tight">
                {formatShortDate(dateRange.start)} - {formatShortDate(dateRange.end)}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                {datesToRender.length} Days
              </span>
            </div>
            <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-md transition-colors"><ChevronRight className="w-4 h-4" /></button>
            
            {isDatePickerOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 animate-in fade-in py-4 px-5">
                <h4 className="font-bold text-slate-800 text-sm mb-3">Custom Range</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">From Date</label>
                    <input type="date" value={tempStart} onChange={(e) => setTempStart(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">To Date</label>
                    <input type="date" value={tempEnd} onChange={(e) => setTempEnd(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                  </div>
                </div>
                <div className="mt-4 flex gap-2 justify-end">
                  <button onClick={() => setIsDatePickerOpen(false)} className="px-3 py-1.5 text-xs font-bold text-slate-500">Cancel</button>
                  <button onClick={() => {
                     const [sy, sm, sd] = tempStart.split('-');
                     const [ey, em, ed] = tempEnd.split('-');
                     setDateRange({
                       start: new Date(parseInt(sy), parseInt(sm)-1, parseInt(sd)),
                       end: new Date(parseInt(ey), parseInt(em)-1, parseInt(ed))
                     });
                     setIsDatePickerOpen(false);
                  }} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold">Apply</button>
                </div>
              </div>
            )}
          </div>

          <select className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 shadow-sm outline-none">
            <option>All Statuses</option>
            <option>Has Issues</option>
            <option>Missing Punches</option>
            <option>Pending Approval</option>
            <option>Approved</option>
          </select>
        </div>
        
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={compareSchedule}
              onChange={(e) => setCompareSchedule(e.target.checked)}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
            />
            Compare to Schedule
          </label>
          <div className="w-px h-6 bg-slate-200 mx-1"></div>
          <button 
            onClick={() => setIsRequestsOpen(true)}
            className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-slate-500" />
            Requests
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-1.5 py-0.5 rounded-full ml-1">3</span>
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsExportOpen(!isExportOpen)}
              className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-slate-500" />
              Export
            </button>
            
            {isExportOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2 py-2">
                <button className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Export to CSV</button>
                <button className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Export to PDF</button>
                <button className="w-full text-left px-4 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Export for ADP Payroll</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TOTALS STRIP */}
      <div className="px-6 py-3 bg-slate-100 border-b border-slate-200 shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Regular Hours</span>
            <span className="text-sm font-bold text-slate-800">{globalTotals.regular}h</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Overtime</span>
            <span className="text-sm font-bold text-amber-600 flex items-center gap-1">{globalTotals.overtime}h</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Paid Time Off</span>
            <span className="text-sm font-bold text-purple-600">{globalTotals.pto}h</span>
          </div>
          <div className="h-6 w-px bg-slate-300 mx-2"></div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Total Paid Hours</span>
            <span className="text-base font-black text-blue-700">{globalTotals.regular + globalTotals.overtime + globalTotals.pto}h</span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-right">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Selected Period</span>
            <span className="text-sm font-bold text-slate-800">{globalTotals.regular + globalTotals.overtime + globalTotals.pto}h total</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Unpaid Time Off</span>
            <span className="text-sm font-bold text-slate-500">{globalTotals.unpaid}h</span>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="flex-1 overflow-auto relative bg-white">
        <div className="inline-block min-w-max w-full">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 sticky top-0 z-20 shadow-sm">
              <tr>
                <th className="px-4 py-3 w-10 sticky left-0 bg-slate-50 border-r border-slate-200 z-30">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                    checked={selectedRows.size > 0 && selectedRows.size === MOCK_WEEKLY_TIMESHEETS.length}
                    onChange={toggleAll}
                  />
                </th>
                <th className="px-4 py-3 min-w-[200px] sticky left-[57px] bg-slate-50 border-r border-slate-200 z-30">Guard</th>
                <th className="px-3 py-3 w-16 text-center sticky left-[257px] bg-slate-50 border-r border-slate-200 z-30">Issues</th>
                {datesToRender.map(date => (
                  <th key={date.toISOString()} className="px-2 py-3 min-w-[90px] text-center border-r border-slate-200">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })} {date.getDate().toString().padStart(2, '0')}
                  </th>
                ))}
                <th className="px-4 py-3 w-32 sticky right-0 bg-slate-50 border-l border-slate-200 z-30 text-right">Total Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {paginatedData.map((emp) => {
                const totalHours = emp.regularHours + emp.overtimeHours + emp.ptoHours;
                const hasIssues = emp.entries.some(e => e.issues.length > 0 && !e.issues.every(i => i.resolved));
                
                if (totalHours === 0 && emp.entries.every(e => e.status === 'no_shift')) {
                  return (
                    <tr key={emp.employeeId} className="bg-slate-50/50">
                      <td className="px-4 py-3 sticky left-0 bg-slate-50/95 border-r border-slate-200 z-10"><input type="checkbox" disabled className="rounded border-slate-300 opacity-50" /></td>
                      <td className="px-4 py-3 sticky left-[57px] bg-slate-50/95 border-r border-slate-200 z-10">
                        <div className="flex items-center gap-3 opacity-60">
                          <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-500 flex items-center justify-center text-xs font-bold">{emp.initials}</div>
                          <div>
                            <p className="font-bold text-slate-500">{emp.guardName}</p>
                            <p className="text-xs text-slate-400">{emp.position}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-center sticky left-[257px] bg-slate-50/95 border-r border-slate-200 z-10"></td>
                      <td colSpan={7} className="px-4 py-3 text-center text-slate-400 italic">No shifts scheduled</td>
                      <td className="px-4 py-3 sticky right-0 bg-slate-50/95 border-l border-slate-200 z-10 text-right">
                        <span className="font-mono text-slate-400 font-semibold">0.0h</span>
                      </td>
                    </tr>
                  );
                }

                return (
                  <>
                    <tr key={emp.employeeId} className={`hover:bg-slate-50 transition-colors group ${selectedRows.has(emp.employeeId) ? 'bg-blue-50/30' : ''}`}>
                      <td className={`px-4 py-3 sticky left-0 border-r border-slate-200 z-10 ${selectedRows.has(emp.employeeId) ? 'bg-blue-50' : 'bg-white group-hover:bg-slate-50'}`}>
                        <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                          checked={selectedRows.has(emp.employeeId)} onChange={() => toggleRow(emp.employeeId)}
                        />
                      </td>
                      <td className={`px-4 py-3 sticky left-[57px] border-r border-slate-200 z-10 ${selectedRows.has(emp.employeeId) ? 'bg-blue-50' : 'bg-white group-hover:bg-slate-50'}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold shadow-sm">{emp.initials}</div>
                          <div>
                            <p className="font-bold text-slate-900 leading-tight">{emp.guardName}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{emp.position}</p>
                          </div>
                        </div>
                      </td>
                      <td className={`px-3 py-3 text-center sticky left-[257px] border-r border-slate-200 z-10 ${selectedRows.has(emp.employeeId) ? 'bg-blue-50' : 'bg-white group-hover:bg-slate-50'}`}>
                        {hasIssues ? (
                          <button onClick={() => setSelectedIssueEmp(emp)} className="w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center mx-auto transition-colors relative" title="View Issues">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full border-2 border-white"></span>
                          </button>
                        ) : (
                          <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto text-slate-300">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                        )}
                      </td>

                      {/* DAILY PILLS */}
                      {datesToRender.map((date, idx) => {
                        const formattedDate = formatDateISO(date);
                        let entry = emp.entries.find(e => e.date === formattedDate);
                        
                        // Synthesize missing entry if it's out of range of our mock data
                        if (!entry) {
                          entry = {
                            date: formattedDate,
                            dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
                            breakMinutes: 0,
                            scheduledHours: 0,
                            hoursWorked: 0,
                            isEdited: false,
                            issues: [],
                            status: "no_shift"
                          } as TimesheetEntry;
                        }

                        const isExpanded = expandedDay?.empId === emp.employeeId && expandedDay?.date === entry.date;
                        let pillClass = "bg-slate-100 text-slate-400"; // Default (no shift)
                        let text = "--";

                        if (entry.status !== "no_shift") {
                           text = entry.hoursWorked > 0 ? `${entry.hoursWorked}h` : "0.0h";
                           if (entry.status === "complete") pillClass = "bg-green-100 text-green-700 hover:bg-green-200 border border-green-200";
                           else if (entry.status === "has_issue") pillClass = "bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-200";
                           else if (entry.status === "missing_punch") pillClass = "bg-red-100 text-red-700 hover:bg-red-200 border border-red-200";
                           if (entry.postName?.includes("PTO")) pillClass = "bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-200";
                        }

                        // Compare Schedule Highlight
                        let devianceClass = "";
                        if (compareSchedule && entry.status !== "no_shift" && !entry.postName?.includes("PTO")) {
                           const diff = entry.hoursWorked - entry.scheduledHours;
                           if (Math.abs(diff) >= 0.25) devianceClass = diff > 0 ? "ring-2 ring-amber-400 ring-offset-1" : "ring-2 ring-red-400 ring-offset-1";
                        }

                        return (
                          <td key={idx} className="px-2 py-3 border-r border-slate-200 text-center relative">
                            {entry.status !== "no_shift" ? (
                              <button 
                                onClick={() => setExpandedDay(isExpanded ? null : { empId: emp.employeeId, date: entry.date })}
                                className={`w-full max-w-[70px] mx-auto py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${pillClass} ${devianceClass} ${isExpanded ? 'ring-2 ring-blue-500' : ''}`}
                              >
                                {text}
                              </button>
                            ) : (
                              <span className="text-slate-300 font-mono text-xs">--</span>
                            )}
                            {entry.isEdited && <Edit2 className="w-2.5 h-2.5 text-blue-500 absolute top-2 right-3" title="Manually Edited" />}
                          </td>
                        );
                      })}

                      {/* RIGHT STICKY TOTALS */}
                      <td className={`px-4 py-3 sticky right-0 border-l border-slate-200 z-10 text-right ${selectedRows.has(emp.employeeId) ? 'bg-blue-50' : 'bg-white group-hover:bg-slate-50'}`}>
                        <div className="flex items-center justify-end gap-2">
                           {emp.approvalStatus === 'locked' && <Lock className="w-3.5 h-3.5 text-slate-400" title="Locked for Payroll" />}
                           {emp.approvalStatus === 'approved' && <CheckCircle className="w-3.5 h-3.5 text-green-500" title="Supervisor Approved" />}
                           {emp.approvalStatus === 'pending' && <Clock className="w-3.5 h-3.5 text-amber-500" title="Pending Approval" />}
                           <div className="flex flex-col items-end">
                             <span className="font-mono text-slate-900 font-bold text-base">{totalHours.toFixed(1)}h</span>
                             {emp.overtimeHours > 0 && <span className="text-[10px] text-amber-600 font-bold bg-amber-100 px-1 rounded uppercase">{emp.overtimeHours}h OT</span>}
                           </div>
                        </div>
                      </td>
                    </tr>
                    
                    {/* INLINE EXPANDED ROW */}
                    {expandedDay?.empId === emp.employeeId && (
                      <tr className="bg-slate-800 text-slate-300 shadow-inner">
                        <td colSpan={5 + datesToRender.length} className="p-0 border-0 relative z-0">
                          {(() => {
                            const entry = emp.entries.find(e => e.date === expandedDay.date) || {
                              date: expandedDay.date,
                              dayName: new Date(expandedDay.date).toLocaleDateString('en-US', { weekday: 'short' }),
                              breakMinutes: 0,
                              hoursWorked: 0,
                              status: "no_shift"
                            };
                            return (
                              <div className="px-6 py-4 flex items-center justify-between gap-6 overflow-x-auto">
                                <div className="flex flex-col">
                                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">Date</span>
                                  <span className="font-medium text-white">{entry.dayName}, {entry.date.slice(5)}</span>
                                </div>
                                <div className="h-8 w-px bg-slate-700"></div>
                                <div className="flex flex-col">
                                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">Post / Site</span>
                                  <span className="font-medium text-white">{entry.postName || 'N/A'}</span>
                                  <span className="text-[10px] text-slate-400">{entry.siteName}</span>
                                </div>
                                <div className="h-8 w-px bg-slate-700"></div>
                                <div className="flex flex-col min-w-[120px]">
                                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1 flex items-center gap-1">Clock In {entry.isEdited && <Edit2 className="w-3 h-3 text-blue-400" title={`Edited by ${entry.editedBy} at ${entry.editedAt}`} />}</span>
                                  <div className="flex items-center gap-2 text-white font-mono font-medium">
                                    {entry.clockIn || "--:--"}
                                    {entry.geofenceIn === "inside" && <CheckCircle className="w-3.5 h-3.5 text-green-400" />}
                                    {entry.geofenceIn === "outside" && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                                  </div>
                                </div>
                                <div className="flex flex-col min-w-[120px]">
                                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">Clock Out</span>
                                  <div className="flex items-center gap-2 text-white font-mono font-medium">
                                    {entry.clockOut || "--:--"}
                                    {entry.geofenceOut === "inside" && <CheckCircle className="w-3.5 h-3.5 text-green-400" />}
                                    {entry.geofenceOut === "outside" && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                                    {!entry.clockOut && entry.status === "missing_punch" && <Flame className="w-4 h-4 text-red-500 animate-pulse" />}
                                  </div>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">Break</span>
                                  <span className="font-medium text-white font-mono">{entry.breakMinutes}m</span>
                                </div>
                                <div className="h-8 w-px bg-slate-700"></div>
                                <div className="flex flex-col text-right ml-auto">
                                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">Total Daily</span>
                                  <span className="text-lg font-bold text-white font-mono">{entry.hoursWorked.toFixed(2)}h</span>
                                </div>
                              </div>
                            );
                          })()}
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="px-6 py-3 border-t border-slate-200 bg-white flex items-center justify-between shrink-0">
        <span className="text-sm text-slate-500 font-medium">
          Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, totalItems)} of {totalItems} entries
        </span>
        <div className="flex items-center gap-1">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            className="px-3 py-1.5 border border-slate-200 rounded-md text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1.5 border rounded-md text-sm font-semibold transition-colors ${
                currentPage === i + 1 
                  ? "bg-blue-50 border-blue-200 text-blue-700" 
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button 
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            className="px-3 py-1.5 border border-slate-200 rounded-md text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {/* BULK ACTION BAR */}
      {selectedRows.size > 0 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white rounded-xl shadow-2xl px-4 py-3 flex items-center gap-4 animate-in slide-in-from-bottom-5 z-40">
          <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="w-5 h-5 bg-blue-600 rounded text-xs font-bold flex items-center justify-center">{selectedRows.size}</span>
            <span className="text-sm font-semibold">Selected</span>
          </div>
          <div className="w-px h-6 bg-slate-700"></div>
          <button className="text-sm font-semibold hover:text-green-400 transition-colors flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Approve Timesheets
          </button>
          <button className="text-sm font-semibold hover:text-blue-400 transition-colors flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Message Guards
          </button>
          <button className="text-sm font-semibold hover:text-red-400 transition-colors flex items-center gap-2">
            <Unlock className="w-4 h-4" /> Reopen Periods
          </button>
        </div>
      )}

      {/* ISSUES SIDE PANEL OVERLAY */}
      {selectedIssueEmp && (
        <>
          <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40" onClick={() => setSelectedIssueEmp(null)}></div>
          <div className="absolute top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 leading-tight">Timesheet Issues</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedIssueEmp.guardName}</p>
                </div>
              </div>
              <button onClick={() => setSelectedIssueEmp(null)} className="p-2 text-slate-400 hover:bg-slate-200 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {selectedIssueEmp.entries.flatMap(entry => 
                entry.issues.map(issue => (
                  <div key={issue.id} className={`p-4 rounded-xl border ${issue.resolved ? 'bg-slate-50 border-slate-200' : 'bg-red-50/50 border-red-200'}`}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-mono text-slate-500">{entry.date.slice(5)}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          issue.type === 'missing_punch' || issue.type === 'no_show' ? 'bg-red-100 text-red-700' :
                          issue.type === 'geofence' || issue.type === 'late' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {issue.type.replace('_', ' ')}
                        </span>
                      </div>
                      {issue.resolved && <span className="flex items-center gap-1 text-xs font-bold text-green-600"><Check className="w-3.5 h-3.5" /> Resolved</span>}
                    </div>
                    <p className="text-sm text-slate-700 font-medium mb-1">
                      {issue.type === 'missing_punch' ? 'Guard failed to clock out.' :
                       issue.type === 'geofence' ? 'Clocked in outside assigned geofence.' :
                       issue.type === 'late' ? 'Clocked in past scheduled start time.' :
                       issue.type === 'no_show' ? 'Scheduled shift missed completely.' : 'Unapproved schedule deviation.'}
                    </p>
                    {issue.note && <p className="text-xs text-slate-500 bg-white px-2 py-1.5 rounded border border-slate-200">Note: {issue.note}</p>}
                    
                    {!issue.resolved && (
                      <div className="mt-3 flex gap-2">
                        <button className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50">View Details</button>
                        <button className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700">Approve & Resolve</button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {/* REQUESTS SIDE PANEL OVERLAY */}
      {isRequestsOpen && (
        <>
          <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40" onClick={() => setIsRequestsOpen(false)}></div>
          <div className="absolute top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 leading-tight">Time Off Requests</h3>
                  <p className="text-xs text-slate-500 mt-0.5">3 Pending Approval</p>
                </div>
              </div>
              <button onClick={() => setIsRequestsOpen(false)} className="p-2 text-slate-400 hover:bg-slate-200 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="p-4 rounded-xl border bg-white border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-purple-100 text-purple-700">PTO Request</span>
                  <span className="text-xs text-slate-500 font-mono">Submitted 2 days ago</span>
                </div>
                <p className="font-bold text-slate-800 mb-1">Marcus Johnson</p>
                <p className="text-sm text-slate-600 mb-2 font-medium">Aug 15 - Aug 18 (24h total)</p>
                <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded mb-3 border border-slate-100">"Family vacation out of state."</p>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-1.5 border border-red-200 text-red-600 rounded-lg text-xs font-bold hover:bg-red-50">Deny</button>
                  <button className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700">Approve</button>
                </div>
              </div>

              <div className="p-4 rounded-xl border bg-white border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-amber-100 text-amber-700">Shift Swap</span>
                  <span className="text-xs text-slate-500 font-mono">Submitted today</span>
                </div>
                <p className="font-bold text-slate-800 mb-1">Sarah Chen <span className="font-normal text-slate-500 text-sm mx-1">with</span> Mike Torres</p>
                <p className="text-sm text-slate-600 mb-2 font-medium">Sat Aug 08, Sector 4 Patrol</p>
                <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded mb-3 border border-slate-100">"Mike agreed to cover my shift on Saturday."</p>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-1.5 border border-red-200 text-red-600 rounded-lg text-xs font-bold hover:bg-red-50">Deny</button>
                  <button className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700">Approve</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
