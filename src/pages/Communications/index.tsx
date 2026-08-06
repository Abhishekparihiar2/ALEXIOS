import React, { useState } from "react";
import {
    MessageSquare, Megaphone, Bell, Users, Search, Plus, Filter, LayoutTemplate,
    Paperclip, Send, MoreHorizontal, FileText, CheckCircle2, AlertTriangle, ShieldAlert,
    Clock, RefreshCw, Upload, Download, Tag, Mail, Play, Check, ChevronDown, Headset, MapPin, X, ChevronLeft
} from "lucide-react";

// ─── MOCK DATA ─────────────────────────────────────────────────────────────
const MOCK_CHATS = [
    { id: 1, name: "Larry Freeman Jr.", role: "Security Officer", site: "Downtown Financial Center", msg: "I completed the perimeter check...", time: "2m", unread: 2, avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Night Shift Alpha", role: "Group", site: "Multiple Sites", msg: "Please verify loading dock.", time: "10m", unread: 0, avatar: null },
    { id: 3, name: "Sarah Jenkins", role: "Supervisor", site: "Westfield Mall", msg: "Client requested an audit.", time: "1h", unread: 0, avatar: "https://i.pravatar.cc/150?u=3" }
];

const MOCK_BROADCASTS = [
    { id: 1, msg: "Severe weather procedure reminder", audience: "All Guards • Downtown Region", channel: "In-App + SMS", sender: "James Morrison", time: "Aug 05, 2026 • 9:30 AM", status: "Delivered" },
    { id: 2, msg: "Holiday Operations Manual Update", audience: "All Supervisors", channel: "In-App", sender: "System", time: "Aug 02, 2026 • 1:00 PM", status: "Delivered" }
];

const MOCK_BOARD = [
    { id: 1, name: "Larry Freeman Jr.", role: "Security Officer", site: "Westfield Mall", msg: "Loading dock gate is temporarily blocked due to delivery activity. Maintenance is en route to verify.", time: "10:42 AM", avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Marcus Williams", role: "Mobile Patrol", site: "Sector A Logistics", msg: "Perimeter check clear. No vehicles parked illegally.", time: "9:15 AM", avatar: "https://i.pravatar.cc/150?u=2" }
];

const MOCK_DIR = [
    { id: 1, name: "Larry Freeman Jr.", role: "Security Officer", site: "Downtown Financial Center", dept: "Patrol", status: "Active", tags: ["First Aid"] },
    { id: 2, name: "Sarah Jenkins", role: "Supervisor", site: "Westfield Mall", dept: "Management", status: "Active", tags: ["Armed", "CPR"] },
    { id: 3, name: "Marcus Williams", role: "Mobile Patrol", site: "Sector A Logistics", dept: "Patrol", status: "Active", tags: [] }
];

const MOCK_HELPDESK = [
    { id: "HD-1042", subject: "Access Badge Issue", submitter: "Larry Freeman Jr.", site: "Downtown Financial Center", assigned: "IT Support", date: "Aug 05, 2026", status: "Open" },
    { id: "HD-1043", subject: "Camera Feed 4 Offline", submitter: "Sarah Jenkins", site: "Westfield Mall", assigned: "System Maintenance", date: "Aug 05, 2026", status: "In Progress" }
];

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────
export function CommunicationsPage() {
    const [activeTab, setActiveTab] = useState<"chat" | "board" | "broadcasts" | "updates" | "notifications" | "directory" | "forms" | "helpdesk">("chat");

    return (
        <div className="p-4 md:p-6 w-full max-w-[1600px] mx-auto h-full flex flex-col animate-in fade-in min-w-0 min-h-0">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 mb-6 w-full shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Communications</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage conversations, broadcasts, operational updates and employee communication from one place.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-2 md:space-x-6 border-b border-slate-200 dark:border-slate-800 mb-6 shrink-0 overflow-x-auto hide-scrollbar w-full">
                {[
                    { id: "chat", label: "Chat" },
                    { id: "board", label: "Message Board" },
                    { id: "broadcasts", label: "Broadcasts" },
                    { id: "updates", label: "Updates" },
                    { id: "notifications", label: "Notifications" },
                    { id: "directory", label: "Directory" },
                    { id: "forms", label: "Forms" },
                    { id: "helpdesk", label: "Help Desk" },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`pb-3 shrink-0 text-sm font-semibold transition-colors flex items-center gap-2 ${activeTab === tab.id
                            ? 'text-[#1e3a6e] border-b-[3px] border-[#1e3a6e] dark:text-[#3b82f6] dark:border-[#3b82f6]'
                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 min-h-0 flex flex-col w-full relative">
                {activeTab === "chat" && <ChatWorkspace />}
                {activeTab === "board" && <MessageBoard />}
                {activeTab === "broadcasts" && <BroadcastsList />}
                {activeTab === "directory" && <DirectoryList />}
                {activeTab === "helpdesk" && <HelpDeskList />}

                {/* Placeholders for others just to show completeness */}
                {["updates", "notifications", "forms"].includes(activeTab) && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 glass-panel rounded-xl">
                        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                            <Clock className="w-8 h-8 text-slate-400" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 capitalize">{activeTab} Workspace</h2>
                        <p className="text-slate-500 max-w-md">This view is currently utilizing the standard ALEXIOS operational patterns. Data loads automatically from the connected APIs.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── CHAT WORKSPACE ─────────────────────────────────────────────────────────
function ChatWorkspace() {
    const [showNewChat, setShowNewChat] = useState(false);
    const [showNewGroup, setShowNewGroup] = useState(false);

    return (
        <div className="glass-panel flex-1 flex flex-col md:flex-row rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/90 dark:bg-[#1a1f2e]/90 shadow-sm backdrop-blur-md overflow-hidden min-h-0 w-full relative">
            {showNewChat && <NewChatModal onClose={() => setShowNewChat(false)} />}
            {showNewGroup && <NewGroupModal onClose={() => setShowNewGroup(false)} />}

            {/* Left: Chat List */}
            <div className="w-full md:w-80 border-r border-slate-200/60 dark:border-slate-800/60 flex flex-col shrink-0 bg-white/50 dark:bg-slate-900/50">
                <div className="p-4 border-b border-slate-200/60 dark:border-slate-800/60">
                    <div className="flex gap-2 mb-4">
                        <button onClick={() => setShowNewChat(true)} className="flex-1 px-3 py-2 rounded-xl text-xs font-bold text-white shadow-sm flex items-center justify-center gap-1.5"
                            style={{ background: "linear-gradient(135deg,#1e3a6e,#2563eb)" }}>
                            <Plus className="w-3.5 h-3.5" /> New Chat
                        </button>
                        <button onClick={() => setShowNewGroup(true)} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors shadow-sm" title="New Group">
                            <Users className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" placeholder="Search conversations..." className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-[#1e3a6e] transition-colors" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {MOCK_CHATS.map((c, i) => (
                        <div key={c.id} className={`p-4 border-b border-slate-100 dark:border-slate-800/50 flex gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors ${i === 0 ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                            <div className="relative shrink-0">
                                {c.avatar ? (
                                    <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold">
                                        {c.name.substring(0, 2).toUpperCase()}
                                    </div>
                                )}
                                {c.unread > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 text-[9px] font-bold text-white flex items-center justify-center">{c.unread}</span>}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-0.5">
                                    <span className="font-semibold text-slate-900 dark:text-white truncate text-sm">{c.name}</span>
                                    <span className="text-xs text-slate-400 shrink-0">{c.time}</span>
                                </div>
                                <div className="text-xs text-slate-500 truncate mb-1">{c.msg}</div>
                                {c.site && <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider truncate">{c.site}</div>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Center: Active Conversation */}
            <div className="flex-1 flex flex-col min-w-0">
                <div className="h-16 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between px-6 shrink-0 bg-white/60 dark:bg-slate-900/60">
                    <div className="flex items-center gap-3">
                        <img src={MOCK_CHATS[0].avatar!} className="w-9 h-9 rounded-full object-cover shadow-sm" alt="Larry" />
                        <div>
                            <h2 className="font-bold text-slate-900 dark:text-white text-sm">{MOCK_CHATS[0].name}</h2>
                            <p className="text-xs text-slate-500">{MOCK_CHATS[0].role} • {MOCK_CHATS[0].site}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="border border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:border-amber-800/50 dark:text-amber-400 text-xs px-2.5 py-1 rounded-md font-semibold flex items-center gap-1.5 shadow-sm">
                            <ShieldAlert className="w-3.5 h-3.5" /> Admin View
                        </div>
                        <button className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto bg-slate-50/30 dark:bg-transparent">
                    {/* Chat Bubbles Mock */}
                    <div className="space-y-6">
                        <div className="text-center text-xs text-slate-400 font-semibold my-4">Today, 9:20 AM</div>
                        <div className="flex gap-3 max-w-2xl">
                            <img src={MOCK_CHATS[0].avatar!} className="w-8 h-8 rounded-full object-cover shrink-0" />
                            <div>
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="font-bold text-sm text-slate-800 dark:text-slate-200">{MOCK_CHATS[0].name}</span>
                                    <span className="text-xs text-slate-400">9:22 AM</span>
                                </div>
                                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-sm border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 shadow-sm">
                                    I am currently approaching the loading dock area. Everything looks normal so far, will update shortly.
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 max-w-2xl flex-row-reverse self-end ml-auto">
                            <div className="flex flex-col items-end">
                                <div className="flex items-baseline gap-2 mb-1 flex-row-reverse">
                                    <span className="font-bold text-sm text-slate-800 dark:text-slate-200">You</span>
                                    <span className="text-xs text-slate-400">9:24 AM</span>
                                </div>
                                <div className="bg-[#1e3a6e] text-white p-3 rounded-2xl rounded-tr-sm shadow-sm text-sm">
                                    Copy that. Please ensure you check the side gates as well.
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 max-w-2xl">
                            <img src={MOCK_CHATS[0].avatar!} className="w-8 h-8 rounded-full object-cover shrink-0" />
                            <div>
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="font-bold text-sm text-slate-800 dark:text-slate-200">{MOCK_CHATS[0].name}</span>
                                    <span className="text-xs text-slate-400">9:26 AM</span>
                                </div>
                                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-sm border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 shadow-sm">
                                    I completed the perimeter check. The side gate was slightly open, I have locked it down. Attached photo.
                                </div>
                                <div className="mt-2 w-48 h-32 bg-slate-200 dark:bg-slate-700 rounded-xl border border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-400 text-xs">
                                    [Image Attachment]
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/80">
                    <div className="flex items-center gap-3">
                        <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <input type="text" placeholder="Type a message..." className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1e3a6e] transition-colors" />
                        <button className="p-2.5 rounded-xl text-white shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center w-11 h-11"
                            style={{ background: "linear-gradient(135deg,#1e3a6e,#2563eb)" }}>
                            <Send className="w-4 h-4 ml-0.5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Right: Details (Hidden on md, visible lg) */}
            <div className="hidden lg:flex w-72 border-l border-slate-200/60 dark:border-slate-800/60 flex-col shrink-0 bg-white/50 dark:bg-slate-900/50 overflow-y-auto p-6">
                <div className="flex flex-col items-center text-center mb-6">
                    <img src={MOCK_CHATS[0].avatar!} className="w-20 h-20 rounded-full object-cover shadow-sm mb-3" alt="Larry" />
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">{MOCK_CHATS[0].name}</h3>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">{MOCK_CHATS[0].role}</span>
                </div>
                <div className="space-y-4">
                    <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Assigned Site</div>
                        <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /> {MOCK_CHATS[0].site}</div>
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Options</div>
                        <div className="space-y-1">
                            <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium transition-colors">Export Conversation</button>
                            <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-colors font-medium">Delete Conversation</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── MESSAGE BOARD ──────────────────────────────────────────────────────────
function MessageBoard() {
    return (
        <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col h-full min-h-0">
            <div className="flex justify-between items-center mb-6 shrink-0">
                <div className="relative w-72">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="Search operational posts..." className="w-full pl-9 pr-3 py-2 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 shadow-sm backdrop-blur-md rounded-xl text-sm outline-none focus:border-[#1e3a6e]" />
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-xl bg-white/80 backdrop-blur shadow-sm dark:bg-slate-800 dark:border-slate-700 flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        Site <Filter className="w-3.5 h-3.5" />
                    </button>
                    <button className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-xl bg-white/80 backdrop-blur shadow-sm dark:bg-slate-800 dark:border-slate-700 flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        Date <Filter className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pb-10">
                {MOCK_BOARD.map(post => (
                    <div key={post.id} className="glass-panel p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/90 dark:bg-[#1a1f2e]/90 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <img src={post.avatar} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                                <div>
                                    <div className="font-bold text-slate-900 dark:text-white text-sm">{post.name}</div>
                                    <div className="text-xs text-slate-500 font-medium">{post.role} • {post.site}</div>
                                </div>
                            </div>
                            <span className="text-xs font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">{post.time}</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{post.msg}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── BROADCASTS LIST ────────────────────────────────────────────────────────
function BroadcastsList() {
    const [isCreating, setIsCreating] = useState(false);

    if (isCreating) return <BroadcastCreate onBack={() => setIsCreating(false)} />;

    return (
        <div className="flex-1 flex flex-col h-full min-h-0 w-full animate-in fade-in">
            <div className="flex justify-between items-center mb-6 shrink-0">
                <div className="relative w-80">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="Search broadcasts..." className="w-full pl-9 pr-3 py-2 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 shadow-sm backdrop-blur-md rounded-xl text-sm outline-none focus:border-[#1e3a6e]" />
                </div>
                <button onClick={() => setIsCreating(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white shadow-sm" style={{ background: "linear-gradient(135deg,#1e3a6e,#2563eb)" }}>
                    <Megaphone className="w-4 h-4" /> New Broadcast
                </button>
            </div>
            <div className="bg-white/90 dark:bg-[#1a1f2e]/90 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm flex-1 flex flex-col min-h-0 min-w-0 w-full">
                <div className="overflow-auto flex-1 min-h-0 relative">
                    <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300 min-w-[1024px]">
                        <thead className="text-xs uppercase bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 sticky top-0 font-semibold tracking-wide">
                            <tr>
                                <th className="px-5 py-4">Message</th>
                                <th className="px-5 py-4">Audience</th>
                                <th className="px-5 py-4">Channel</th>
                                <th className="px-5 py-4">Sent By</th>
                                <th className="px-5 py-4">Sent At</th>
                                <th className="px-5 py-4">Delivery Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                            {MOCK_BROADCASTS.map((bc, i) => (
                                <tr key={bc.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group cursor-pointer">
                                    <td className="px-5 py-4">
                                        <div className="font-semibold text-slate-900 dark:text-white truncate max-w-sm">{bc.msg}</div>
                                    </td>
                                    <td className="px-5 py-4"><span className="text-slate-700 dark:text-slate-300 font-medium">{bc.audience}</span></td>
                                    <td className="px-5 py-4"><span className="px-2.5 py-1 text-xs font-semibold rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">{bc.channel}</span></td>
                                    <td className="px-5 py-4 font-medium text-slate-800 dark:text-slate-200">{bc.sender}</td>
                                    <td className="px-5 py-4 text-slate-500 whitespace-nowrap">{bc.time}</td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <span className="text-green-600 font-semibold flex items-center gap-1.5 text-xs"><CheckCircle2 className="w-4 h-4" /> {bc.status}</span>
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

// ─── DIRECTORY ──────────────────────────────────────────────────────────────
function DirectoryList() {
    return (
        <div className="flex-1 flex flex-col h-full min-h-0 w-full animate-in fade-in">
            <div className="flex justify-between items-center mb-6 shrink-0">
                <div className="relative w-80">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="Search employees, clients..." className="w-full pl-9 pr-3 py-2 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 shadow-sm backdrop-blur-md rounded-xl text-sm outline-none focus:border-[#1e3a6e]" />
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold border border-slate-200 rounded-xl bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors shadow-sm">
                        <Tag className="w-4 h-4 text-slate-400" /> Tag Users
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold border border-slate-200 rounded-xl bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors shadow-sm">
                        <Mail className="w-4 h-4 text-slate-400" /> Notify
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white shadow-sm" style={{ background: "linear-gradient(135deg,#1e3a6e,#2563eb)" }}>
                        <Users className="w-4 h-4" /> Group Chat
                    </button>
                </div>
            </div>

            <div className="bg-white/90 dark:bg-[#1a1f2e]/90 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm flex-1 flex flex-col min-h-0 min-w-0 w-full">
                <div className="overflow-auto flex-1 min-h-0 relative">
                    <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300 min-w-[1024px]">
                        <thead className="text-xs uppercase bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 sticky top-0 font-semibold tracking-wide">
                            <tr>
                                <th className="px-5 py-4 w-12"><input type="checkbox" className="rounded border-slate-300" /></th>
                                <th className="px-5 py-4">Name</th>
                                <th className="px-5 py-4">Role</th>
                                <th className="px-5 py-4">Site</th>
                                <th className="px-5 py-4">Department</th>
                                <th className="px-5 py-4">Status</th>
                                <th className="px-5 py-4">Tags</th>
                                <th className="px-5 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                            {MOCK_DIR.map((user, i) => (
                                <tr key={user.id} className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group ${i % 2 === 0 ? '' : 'bg-slate-50/30 dark:bg-transparent'}`}>
                                    <td className="px-5 py-4"><input type="checkbox" className="rounded border-slate-300" /></td>
                                    <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">{user.name}</td>
                                    <td className="px-5 py-4 text-slate-700 dark:text-slate-300 font-medium">{user.role}</td>
                                    <td className="px-5 py-4">{user.site}</td>
                                    <td className="px-5 py-4">{user.dept}</td>
                                    <td className="px-5 py-4"><span className="text-green-600 bg-green-50 px-2 py-1 rounded-md text-xs font-bold dark:bg-green-900/30 dark:text-green-400">{user.status}</span></td>
                                    <td className="px-5 py-4">
                                        <div className="flex gap-1.5 flex-wrap">
                                            {user.tags.length > 0 ? user.tags.map(t => <span key={t} className="px-2 py-0.5 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-semibold text-slate-500">{t}</span>) : <span className="text-slate-400">—</span>}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex justify-center">
                                            <button className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 transition-colors" title="Send Chat">
                                                <MessageSquare className="w-4 h-4" />
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

// ─── HELP DESK ──────────────────────────────────────────────────────────────
function HelpDeskList() {
    return (
        <div className="flex-1 flex flex-col h-full min-h-0 w-full animate-in fade-in">
            <div className="flex space-x-6 border-b border-slate-200 dark:border-slate-800 mb-6 shrink-0 pt-2 px-2">
                <button className="pb-3 text-sm font-semibold transition-colors flex items-center gap-2 text-[#1e3a6e] border-b-[3px] border-[#1e3a6e] dark:text-[#3b82f6] dark:border-[#3b82f6]">Unassigned (12)</button>
                <button className="pb-3 text-sm font-semibold transition-colors flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">Assigned to Me (7)</button>
                <button className="pb-3 text-sm font-semibold transition-colors flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">All (42)</button>
            </div>

            <div className="bg-white/90 dark:bg-[#1a1f2e]/90 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm flex-1 flex flex-col min-h-0 min-w-0 w-full">
                <div className="overflow-auto flex-1 min-h-0 relative">
                    <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300 min-w-[1024px]">
                        <thead className="text-xs uppercase bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 sticky top-0 font-semibold tracking-wide">
                            <tr>
                                <th className="px-5 py-4">Ticket</th>
                                <th className="px-5 py-4">Subject</th>
                                <th className="px-5 py-4">Submitted By</th>
                                <th className="px-5 py-4">Site</th>
                                <th className="px-5 py-4">Assigned To</th>
                                <th className="px-5 py-4">Created</th>
                                <th className="px-5 py-4">Status</th>
                                <th className="px-5 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                            {MOCK_HELPDESK.map((hd, i) => (
                                <tr key={hd.id} className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group cursor-pointer ${i % 2 === 0 ? '' : 'bg-slate-50/30 dark:bg-transparent'}`}>
                                    <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">{hd.id}</td>
                                    <td className="px-5 py-4 font-medium text-slate-800 dark:text-slate-200">{hd.subject}</td>
                                    <td className="px-5 py-4">{hd.submitter}</td>
                                    <td className="px-5 py-4">{hd.site}</td>
                                    <td className="px-5 py-4">{hd.assigned}</td>
                                    <td className="px-5 py-4 whitespace-nowrap">{hd.date}</td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${hd.status === 'Open' ? 'text-purple-700 bg-purple-50 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400' : 'text-blue-700 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                                            {hd.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex justify-center">
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

// ─── MODALS & SUB-SCREENS ─────────────────────────────────────────────────

function NewChatModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in zoom-in-95 p-4">
            <div className="glass-panel w-full max-w-md bg-white border border-slate-200 p-6 rounded-2xl shadow-xl dark:bg-slate-900 dark:border-slate-800">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold dark:text-white">Start New Chat</h2>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg dark:hover:bg-slate-800"><X className="w-5 h-5" /></button>
                </div>
                <div className="relative mb-4">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="Search people by name, role, or site..." className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-[#1e3a6e] transition-colors" />
                </div>
                <div className="max-h-64 overflow-y-auto space-y-2 pb-2 hide-scrollbar">
                    {MOCK_DIR.map(user => (
                        <div key={user.id} onClick={onClose} className="flex flex-col p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors cursor-pointer text-left">
                            <span className="font-semibold text-slate-900 dark:text-white text-sm">{user.name}</span>
                            <span className="text-xs text-slate-500 mt-0.5">{user.role} • {user.site}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function NewGroupModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in zoom-in-95 p-4">
            <div className="glass-panel w-full max-w-lg bg-white border border-slate-200 p-6 rounded-2xl shadow-xl dark:bg-slate-900 dark:border-slate-800">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold dark:text-white">Create Group Chat</h2>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg dark:hover:bg-slate-800"><X className="w-5 h-5" /></button>
                </div>

                <div className="space-y-4 mb-6 text-left">
                    <div>
                        <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Group Name</label>
                        <input type="text" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-[#1e3a6e] transition-colors" placeholder="e.g. Night Shift Alpha" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Search Members</label>
                        <div className="relative mb-3">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="text" placeholder="Add employees..." className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-[#1e3a6e] transition-colors" />
                        </div>
                        <div className="max-h-48 overflow-y-auto border border-slate-200 dark:border-slate-700 rounded-xl divide-y divide-slate-100 dark:divide-slate-800 hide-scrollbar">
                            {MOCK_DIR.map(user => (
                                <div key={user.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                                    <input type="checkbox" className="rounded border-slate-300" />
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-slate-900 dark:text-white text-sm">{user.name}</span>
                                        <span className="text-xs text-slate-500">{user.role} • {user.site}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
                    <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-sm hover:opacity-90 transition-opacity" style={{ background: "linear-gradient(135deg,#1e3a6e,#2563eb)" }}>
                        Create Group
                    </button>
                </div>
            </div>
        </div>
    );
}

function BroadcastCreate({ onBack }: { onBack: () => void }) {
    return (
        <div className="flex-1 flex flex-col h-full min-h-0 w-full max-w-4xl mx-auto animate-in slide-in-from-right-2">
            <div className="flex items-center gap-4 mb-6 shrink-0">
                <button onClick={onBack} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors shrink-0">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">New Broadcast</h1>
                    <p className="text-sm text-slate-500 mt-1">Send a one-way alert or operation update.</p>
                </div>
            </div>

            <div className="glass-panel flex-1 overflow-y-auto p-6 md:p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-[#1a1f2e]/80 shadow-sm backdrop-blur-md hide-scrollbar">
                <div className="max-w-2xl space-y-6">
                    <div>
                        <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Broadcast Title <span className="text-red-500">*</span></label>
                        <input type="text" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-[#1e3a6e] transition-colors" placeholder="e.g. Severe weather procedure reminder" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Message <span className="text-red-500">*</span></label>
                        <textarea rows={5} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-[#1e3a6e] transition-colors" placeholder="Type the broadcast payload..." />
                    </div>

                    <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 space-y-6">
                        <h3 className="text-sm font-bold text-[#1e3a6e] uppercase tracking-wider mb-2">Target Audience</h3>
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Audience Type</label>
                                <select className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-[#1e3a6e]">
                                    <option>Selected Users</option>
                                    <option>User Types / Roles</option>
                                    <option>Groups</option>
                                    <option>Sites</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Search Entities</label>
                                <input type="text" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-[#1e3a6e]" placeholder="Add specific roles, sites..." />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 space-y-4">
                        <h3 className="text-sm font-bold text-[#1e3a6e] uppercase tracking-wider mb-2">Delivery Channel</h3>
                        <div className="flex items-center gap-8">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" defaultChecked className="rounded border-slate-300 w-4 h-4 text-[#1e3a6e] focus:ring-[#1e3a6e]" />
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">In-App Notification</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded border-slate-300 w-4 h-4 text-[#1e3a6e] focus:ring-[#1e3a6e]" />
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">SMS Delivery (Critical)</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between border-t border-slate-200/60 dark:border-slate-800/60 shrink-0 gap-4">
                    <p className="text-sm font-medium text-slate-500">Sending to <span className="text-slate-800 dark:text-slate-200 font-bold">12 users</span> across <span className="text-slate-800 dark:text-slate-200 font-bold">2 sites</span></p>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button onClick={onBack} className="flex-1 md:flex-none px-6 py-2.5 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
                        <button onClick={onBack} className="flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity" style={{ background: "linear-gradient(135deg,#1e3a6e,#2563eb)" }}>
                            <Megaphone className="w-4 h-4" /> Send Broadcast
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
