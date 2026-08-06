import { useState, useEffect } from "react";
import { X, Calendar, Clock, MapPin, Briefcase, Trash2, Map } from "lucide-react";
import { MOCK_SCHED_JOBS } from "../../data/mockData";

interface TourDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  editingTourId: string | null;
  tours: any[];
  onSave: (tourData: any) => void;
  onDelete: (id: string) => void;
}

export function TourDrawer({ isOpen, onClose, editingTourId, tours, onSave, onDelete }: TourDrawerProps) {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    jobId: "",
    site: ""
  });

  useEffect(() => {
    if (editingTourId) {
      const tour = tours.find(t => t.id === editingTourId);
      if (tour) {
        setFormData({
          name: tour.name || "",
          date: tour.date || "",
          startTime: tour.startTime || "",
          endTime: tour.endTime || "",
          jobId: tour.jobId || "",
          site: tour.site || ""
        });
      }
    } else {
      setFormData({
        name: "",
        date: "",
        startTime: "",
        endTime: "",
        jobId: "",
        site: ""
      });
    }
  }, [editingTourId, tours]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const UNIQUE_SITES = Array.from(new Set(tours.map(t => t.site)));

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-[100]" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-[101] flex flex-col transform transition-transform">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Map className="w-5 h-5 text-blue-600" />
              {editingTourId ? "Edit Tour" : "Create Tour"}
            </h2>
            <p className="text-xs text-slate-500 mt-1">Configure patrol tour details</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-5" style={{ scrollbarWidth: "none" }}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Tour Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. Night Perimeter Walk"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider flex items-center gap-1"><Calendar className="w-3.5 h-3.5"/> Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> Site</label>
                <select
                  value={formData.site}
                  onChange={e => setFormData({ ...formData, site: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                >
                  <option value="">Select site...</option>
                  {UNIQUE_SITES.map(site => <option key={site} value={site}>{site}</option>)}
                  <option value="New Site">Add New Site...</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> Start</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> End</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={e => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider flex items-center gap-1"><Briefcase className="w-3.5 h-3.5"/> Required Role</label>
              <select
                value={formData.jobId}
                onChange={e => setFormData({ ...formData, jobId: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option value="">Select required role...</option>
                {MOCK_SCHED_JOBS.map(job => (
                  <option key={job.id} value={job.id}>{job.title}</option>
                ))}
              </select>
            </div>
          </div>
        </form>

        <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center gap-3">
          {editingTourId && (
            <button
              type="button"
              onClick={() => onDelete(editingTourId)}
              className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
              title="Delete Tour"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors shadow-sm text-sm flex items-center justify-center"
          >
            {editingTourId ? "Save Changes" : "Create Tour"}
          </button>
        </div>
      </div>
    </>
  );
}
