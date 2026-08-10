import React from 'react';
import { Smartphone, Search, Filter, MessageSquarePlus } from 'lucide-react';
import { MOCK_SMS } from '../mockCommunications';

export function SMSTab() {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50 p-6 dark:bg-slate-900">
      
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 dark:text-slate-200">
          <Smartphone className="w-5 h-5 text-blue-600" /> External SMS
        </h2>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search SMS logs..."
              className="w-64 pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-all shadow-sm dark:bg-slate-900 dark:border-slate-700"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold rounded-lg transition-colors shadow-sm dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
            <Filter className="w-4 h-4 text-slate-400" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">
            <MessageSquarePlus className="w-4 h-4" /> Send SMS
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-white border border-slate-200 shadow-sm rounded-xl flex flex-col dark:bg-slate-900 dark:border-slate-700">
        <table className="w-full text-left text-sm whitespace-nowrap min-w-[900px]">
          <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 sticky top-0 z-10 dark:border-slate-700 dark:text-slate-400">
            <tr>
              <th className="px-5 py-3 font-semibold">Recipient</th>
              <th className="px-5 py-3 font-semibold">Phone Number</th>
              <th className="px-5 py-3 font-semibold">Message Preview</th>
              <th className="px-5 py-3 font-semibold">Sent By</th>
              <th className="px-5 py-3 font-semibold">Date/Time</th>
              <th className="px-5 py-3 font-semibold text-right">Delivery Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {MOCK_SMS.map(sms => (
              <tr key={sms.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-5 py-4 font-bold text-slate-800 dark:text-slate-200">{sms.recipient}</td>
                <td className="px-5 py-4 text-slate-600 font-medium dark:text-slate-300">{sms.phone}</td>
                <td className="px-5 py-4 text-slate-600 max-w-xs truncate dark:text-slate-300">{sms.message}</td>
                <td className="px-5 py-4 text-slate-500 dark:text-slate-400">{sms.sentBy}</td>
                <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                  {new Date(sms.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                </td>
                <td className="px-5 py-4 text-right">
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold ${
                    sms.status === "Delivered" ? "bg-emerald-50 text-emerald-700" :
                    sms.status === "Pending" ? "bg-amber-50 text-amber-700" :
                    "bg-red-50 text-red-700"
                  }`}>
                    {sms.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
