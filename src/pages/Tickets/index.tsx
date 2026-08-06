import { useState } from "react";
import { Page } from "../../types";
import { 
  Search, 
  Filter, 
  AlertTriangle, 
  Clock, 
  CheckCircle2,
  X,
  ShieldAlert,
  ListFilter,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react";
import { StatusBadge } from "../../components/StatusBadge";

const TICKET_CATEGORIES = [
  { name: "View All", count: 684 },
  { name: "Geofence Violation", count: 23 },
  { name: "Inactive Mobile User Alert", count: 214 },
  { name: "Punched-in From Outside Allowed Area", count: 31 },
  { name: "Punched-out From Outside Allowed Area", count: 17 },
  { name: "Cancellation Timer Exceeded", count: 4 },
  { name: "Dispatch Task with Invalid Address", count: 2 },
  { name: "ETA Exceeded SLA", count: 11 },
  { name: "GPS Disabled Alert", count: 6 },
  { name: "Hazard Alert", count: 8 },
  { name: "Checkpoint Late Scan", count: 9 },
  { name: "Late Site Task", count: 14 },
  { name: "Missed Assigned Site Task", count: 21 },
  { name: "Missed Unassigned Site Task", count: 5 },
  { name: "Allow Unqualified Employee to Position with Hard Requirement", count: 3 },
  { name: "Panic Alert", count: 18, urgent: true },
  { name: "Patrol Reassign Request", count: 7 },
  { name: "Postponed Site Task", count: 12 },
  { name: "IVR Audio Reports", count: 4 },
  { name: "Remote Audio Request Declined", count: 2 },
  { name: "Remote Video Request Declined", count: 1 },
  { name: "Runsheet Not Started", count: 19 },
  { name: "Runsheet Not Stopped", count: 8 },
  { name: "Runsheet Started Early", count: 15 },
  { name: "Runsheet Started Late", count: 22 },
  { name: "Runsheet Stopped Early", count: 10 },
  { name: "Runsheet Stopped Late", count: 11 },
  { name: "SLA Crossed", count: 5 },
  { name: "Threshold Alert", count: 2 },
  { name: "Punch-In (Invalid Number)", count: 7 },
  { name: "Threshold Warning", count: 3 },
  { name: "Timer Exceeded", count: 16 },
  { name: "Shift Not Closed", count: 37 },
  { name: "Uncovered Shift", count: 4 },
  { name: "Unfinished Site Task", count: 9 },
  { name: "Will Be Late Notification", count: 25 },
];

const MOCK_TICKETS = [
  { id: "#1165", type: "Shift Not Closed", subject: "Guard shift remained open after scheduled end", client: "Downtown Financial Center", assigned: "James Morrison", priority: "High", status: "Open", created: "Aug 4, 8:15 AM", age: "42 min" },
  { id: "#1166", type: "Panic Alert", subject: "Emergency distress signal triggered in sector 4", client: "Westfield Mall", assigned: "Sarah Chen", priority: "Critical", status: "Open", created: "Aug 4, 8:45 AM", age: "12 min" },
  { id: "#1167", type: "Geofence Violation", subject: "Guard exited perimeter during active patrol", client: "Harbor District", assigned: "Derek Wilson", priority: "Medium", status: "In Progress", created: "Aug 4, 7:30 AM", age: "1h 27min" },
  { id: "#1168", type: "Inactive Mobile User Alert", subject: "No movement detected for 30 minutes", client: "Airport Terminal C", assigned: "Priya Patel", priority: "Medium", status: "Open", created: "Aug 4, 7:55 AM", age: "1h 02min" },
  { id: "#1169", type: "Checkpoint Late Scan", subject: "Failed to scan North Gate checkpoint within SLA", client: "City Hall", assigned: "John Davis", priority: "Low", status: "Resolved", created: "Aug 4, 6:15 AM", age: "2h 42min" },
  { id: "#1170", type: "Allow Unqualified Employee to Position with Hard Requirement", subject: "Schedule conflict: First Aid/CPR required", client: "Downtown Financial Center", assigned: "System", priority: "High", status: "Pending", created: "Aug 4, 5:00 AM", age: "3h 57min" },
  { id: "#1171", type: "Panic Alert", subject: "Manual panic button activated near Loading Dock", client: "Harbor District", assigned: "Mike Torres", priority: "Critical", status: "Open", created: "Aug 4, 8:50 AM", age: "7 min" },
];

export function TicketsPage({ onNavigate, initialCategory }: { onNavigate?: (p: Page) => void, initialCategory?: string }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "View All");
  const [catSearch, setCatSearch] = useState("");
  const [statusTab, setStatusTab] = useState("Open");
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [categoriesCollapsed, setCategoriesCollapsed] = useState(false);

  const filteredCats = TICKET_CATEGORIES.filter(c => c.name.toLowerCase().includes(catSearch.toLowerCase()));
  
  // Basic filtering for demo
  const displayedTickets = MOCK_TICKETS.filter(t => {
    if (selectedCategory !== "View All" && t.type !== selectedCategory) return false;
    if (statusTab !== "All" && t.status !== statusTab) return false;
    return true;
  });

  return (
    <div className="flex-1 flex overflow-hidden">
      
      {/* ─── LEFT: CATEGORIES PANEL ─── */}
      <div className={`${categoriesCollapsed ? 'w-0 overflow-hidden opacity-0' : 'w-[280px] border-r'} shrink-0 border-slate-200/50 bg-slate-50/30 flex flex-col h-full transition-all duration-300`}>
        <div className="p-4 shrink-0 border-b border-slate-200/50">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <ListFilter className="w-4 h-4 text-slate-500" />
              Ticket Categories
            </h2>
            <button onClick={() => setCategoriesCollapsed(true)} className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded transition-colors">
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search categories..."
              value={catSearch}
              onChange={(e) => setCatSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-0.5" style={{ scrollbarWidth: "thin" }}>
          {filteredCats.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all ${
                  isSelected 
                    ? "bg-blue-50 border border-blue-100 shadow-sm" 
                    : "hover:bg-slate-100 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0 pr-2">
                  {isSelected && <div className="absolute left-2 w-0.5 h-4 bg-blue-600 rounded-full" />}
                  <span className={`text-xs ${isSelected ? "font-bold text-blue-900 ml-1" : "font-medium text-slate-700"} leading-snug line-clamp-2`}>
                    {cat.name}
                  </span>
                </div>
                
                {cat.count > 0 && (
                  <span 
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                      cat.urgent && !isSelected
                        ? "bg-red-100 text-red-700"
                        : isSelected 
                          ? "bg-blue-200 text-blue-800" 
                          : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {cat.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ─── RIGHT: TICKETS WORKSPACE ─── */}
      <div className="flex-1 flex flex-col h-full bg-white relative overflow-hidden">
        <div className="px-6 pt-6 pb-4 shrink-0 border-b border-slate-200">
          <div className="flex items-start gap-4">
            {categoriesCollapsed && (
              <button 
                onClick={() => setCategoriesCollapsed(false)} 
                className="mt-1 p-1.5 bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                title="Expand Categories"
              >
                <PanelLeftOpen className="w-4 h-4" />
              </button>
            )}
            <div>
              <h1 className="text-xl font-bold text-slate-900">Manage Tickets</h1>
              <p className="text-xs text-slate-500 mt-1">Review, assign and resolve operational alerts and tickets.</p>
            </div>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-5 gap-3 mt-5">
            {[
              { label: "Open", count: 124, color: "text-amber-600", bg: "bg-amber-50" },
              { label: "Critical", count: 18, color: "text-red-600", bg: "bg-red-50" },
              { label: "Overdue", count: 45, color: "text-purple-600", bg: "bg-purple-50" },
              { label: "Unassigned", count: 32, color: "text-slate-600", bg: "bg-slate-50" },
              { label: "Resolved Today", count: 87, color: "text-green-600", bg: "bg-green-50" },
            ].map(card => (
              <div key={card.label} className={`rounded-xl p-3 border border-slate-100 ${card.bg}`}>
                <p className={`text-xl font-bold ${card.color}`}>{card.count}</p>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mt-1">{card.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Toolbar & Tabs */}
        <div className="px-6 py-3 flex items-center justify-between border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-1">
            {["All", "Open", "In Progress", "Pending", "Resolved", "Archived"].map(tab => (
              <button
                key={tab}
                onClick={() => setStatusTab(tab)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  statusTab === tab 
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200" 
                    : "text-slate-500 hover:bg-slate-200/50 hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-48">
              <Search className="absolute left-2.5 top-1.5 w-3.5 h-3.5 text-slate-400" />
              <input type="text" placeholder="Search tickets..." 
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none" />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="w-3.5 h-3.5" /> Filters
            </button>
          </div>
        </div>

        {/* Selected Category Header (If not View All) */}
        {selectedCategory !== "View All" && (
          <div className="px-6 py-2 bg-blue-50/50 border-b border-blue-100 shrink-0 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-900">Filtered by Category:</span>
              <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">{selectedCategory}</span>
            </div>
            <button onClick={() => setSelectedCategory("View All")} className="text-xs font-bold text-slate-400 hover:text-slate-600">
              Clear Filter
            </button>
          </div>
        )}

        {/* Ticket Table */}
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-slate-50 sticky top-0 z-10 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-semibold">Ticket ID</th>
                <th className="px-6 py-3 font-semibold">Type</th>
                <th className="px-6 py-3 font-semibold">Subject</th>
                <th className="px-6 py-3 font-semibold">Client / Site</th>
                <th className="px-6 py-3 font-semibold">Assigned To</th>
                <th className="px-6 py-3 font-semibold">Priority</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Created</th>
                <th className="px-6 py-3 font-semibold">SLA / Age</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
              {displayedTickets.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-slate-500">
                    <p className="text-sm font-semibold">No tickets found</p>
                    <p className="text-xs mt-1">Try adjusting your filters or category selection.</p>
                  </td>
                </tr>
              ) : (
                displayedTickets.map(ticket => (
                  <tr 
                    key={ticket.id} 
                    onClick={() => setSelectedTicket(ticket)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-3 font-mono font-bold text-slate-900">{ticket.id}</td>
                    <td className="px-6 py-3 max-w-[140px]">
                      <div className="line-clamp-2 font-semibold" title={ticket.type}>
                        {ticket.type}
                      </div>
                    </td>
                    <td className="px-6 py-3 max-w-xl">
                      <div className="line-clamp-2" title={ticket.subject}>
                        {ticket.subject}
                      </div>
                    </td>
                    <td className="px-6 py-3">{ticket.client}</td>
                    <td className="px-6 py-3 font-medium">{ticket.assigned}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center gap-1 font-bold ${
                        ticket.priority === "Critical" ? "text-red-600" :
                        ticket.priority === "High" ? "text-amber-600" : "text-slate-600"
                      }`}>
                        {ticket.priority === "Critical" && <ShieldAlert className="w-3.5 h-3.5" />}
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <StatusBadge 
                        label={ticket.status} 
                        color={ticket.status === "Open" ? "#d97706" : ticket.status === "Resolved" ? "#16a34a" : "#2563eb"} 
                        bg={ticket.status === "Open" ? "#fffbeb" : ticket.status === "Resolved" ? "#f0fdf4" : "#eff6ff"} 
                      />
                    </td>
                    <td className="px-6 py-3 text-slate-500">{ticket.created}</td>
                    <td className="px-6 py-3 font-mono font-medium text-slate-600">{ticket.age}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Right Drawer: Ticket Detail Overlay */}
        {selectedTicket && (
          <div className="absolute inset-y-0 right-0 w-[400px] bg-white shadow-2xl border-l border-slate-200 z-20 flex flex-col transform transition-transform animate-slide-in-right">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                Ticket {selectedTicket.id}
              </h3>
              <button onClick={() => setSelectedTicket(null)} className="p-1 hover:bg-slate-200 rounded transition-colors text-slate-500">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Subject</p>
                <p className="font-semibold text-slate-800">{selectedTicket.subject}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Category</p>
                  <p className="font-semibold text-slate-700">{selectedTicket.type}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Priority</p>
                  <p className={`font-bold ${
                        selectedTicket.priority === "Critical" ? "text-red-600" :
                        selectedTicket.priority === "High" ? "text-amber-600" : "text-slate-600"
                      }`}>{selectedTicket.priority}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Site</p>
                  <p className="font-medium text-slate-700">{selectedTicket.client}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Assigned</p>
                  <p className="font-medium text-slate-700">{selectedTicket.assigned}</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-500 font-medium">Ticket history and resolution workflow would appear here in production.</p>
              </div>
            </div>
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-2 shrink-0">
              <button onClick={() => setSelectedTicket(null)} className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
                Close
              </button>
              <button className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors">
                Resolve Ticket
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
