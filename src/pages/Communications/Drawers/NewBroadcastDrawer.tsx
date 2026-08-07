import React, { useState } from 'react';
import { X, Calendar, Upload, Globe, Building2, MapPin, Users } from 'lucide-react';

interface NewBroadcastDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewBroadcastDrawer({ isOpen, onClose }: NewBroadcastDrawerProps) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("All Employees");
  
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-[600px] bg-slate-50 shadow-2xl z-40 flex flex-col animate-in slide-in-from-right duration-300">
        <div className="px-6 py-5 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-slate-800">New Broadcast</h2>
            <p className="text-sm text-slate-500">Send an important message to a targeted audience.</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          
          <div className="space-y-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Broadcast Title <span className="text-red-500">*</span></label>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Important Policy Update"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Message <span className="text-red-500">*</span></label>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your broadcast message here..."
                rows={6}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-all resize-none"
              />
            </div>

            <div className="pt-2">
              <button className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors border border-dashed border-blue-200">
                <Upload className="w-4 h-4" /> Add Attachment
              </button>
            </div>
          </div>

          <div className="space-y-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <label className="text-sm font-bold text-slate-800">Select Audience <span className="text-red-500">*</span></label>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "All Employees", icon: Globe },
                { id: "Region", icon: MapPin },
                { id: "Client", icon: Building2 },
                { id: "Site", icon: MapPin },
                { id: "Department", icon: Users },
                { id: "Group", icon: Users }
              ].map(opt => (
                <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${audience === opt.id ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <input type="radio" name="audience" className="hidden" checked={audience === opt.id} onChange={() => setAudience(opt.id)} />
                  <opt.icon className={`w-4 h-4 ${audience === opt.id ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span className={`text-sm font-semibold ${audience === opt.id ? 'text-blue-700' : 'text-slate-700'}`}>{opt.id}</span>
                </label>
              ))}
            </div>

            {audience !== "All Employees" && (
              <div className="pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Select specific {audience.toLowerCase()}(s)</label>
                <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-all">
                  <option value="" disabled selected>Choose a {audience.toLowerCase()}...</option>
                  <option value="1">Example 1</option>
                  <option value="2">Example 2</option>
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-white border-t border-slate-200 flex justify-between items-center shrink-0">
          <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors border border-slate-200">
            <Calendar className="w-4 h-4" /> Schedule for later
          </button>
          
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200">
              Cancel
            </button>
            <button disabled={!title || !message} className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg transition-colors shadow-sm">
              Send Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
