import React, { useState } from 'react';
import { Page } from '../../types';
import { 
  MessageSquare, 
  Rss, 
  BellRing, 
  Smartphone, 
  ClipboardList,
  Megaphone
} from 'lucide-react';
import { ChatTab } from './Tabs/ChatTab';
import { MessageBoardTab } from './Tabs/MessageBoardTab';
import { BroadcastsTab } from './Tabs/BroadcastsTab';
import { UpdatesTab } from './Tabs/UpdatesTab';
import { NotificationsTab } from './Tabs/NotificationsTab';
import { SMSTab } from './Tabs/SMSTab';

interface CommunicationsPageProps {
  onNavigate?: (page: Page) => void;
}

type Tab = "Chat" | "Message Board" | "Broadcasts" | "Updates" | "Notifications" | "SMS";

export function CommunicationsPage({ onNavigate }: CommunicationsPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Chat");

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "Chat", label: "Chat", icon: <MessageSquare className="w-4 h-4" /> },
    { id: "Message Board", label: "Message Board", icon: <ClipboardList className="w-4 h-4" /> },
    { id: "Broadcasts", label: "Broadcasts", icon: <Megaphone className="w-4 h-4" /> },
    { id: "Updates", label: "Updates", icon: <Rss className="w-4 h-4" /> },
    { id: "Notifications", label: "Notifications", icon: <BellRing className="w-4 h-4" /> },
    { id: "SMS", label: "SMS", icon: <Smartphone className="w-4 h-4" /> },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-slate-900" style={{ scrollbarWidth: "none" }}>
      {/* Module Header & Navigation */}
      <div className="bg-white border-b border-slate-200 shrink-0 shadow-sm z-10 pt-4 px-6 flex flex-col gap-4 dark:bg-slate-900 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight leading-tight dark:text-slate-200">Communications</h1>
            <p className="text-sm text-slate-500 font-medium dark:text-slate-400">Manage operations, broadcasts, and team messaging.</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-3 text-sm font-semibold transition-colors relative whitespace-nowrap ${
                activeTab === tab.id 
                  ? "text-blue-600" 
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex">
        {activeTab === "Chat" && <ChatTab />}
        {activeTab === "Message Board" && <MessageBoardTab />}
        {activeTab === "Broadcasts" && <BroadcastsTab />}
        {activeTab === "Updates" && <UpdatesTab />}
        {activeTab === "Notifications" && <NotificationsTab />}
        {activeTab === "SMS" && <SMSTab />}
      </div>
    </div>
  );
}
