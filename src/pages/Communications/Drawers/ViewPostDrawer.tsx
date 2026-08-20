import React from 'react';
import { X, Calendar, User as UserIcon, Globe, Paperclip, Tag } from 'lucide-react';
import { NoticePost } from '../mockCommunications';
import { formatDateMMDDYYYY } from '../../../utils/dateUtils';

interface ViewPostDrawerProps {
  post: NoticePost | null;
  onClose: () => void;
}

export function ViewPostDrawer({ post, onClose }: ViewPostDrawerProps) {
  if (!post) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-[600px] bg-slate-50 border-l border-slate-200 shadow-2xl z-40 flex flex-col animate-in slide-in-from-right duration-300 dark:bg-slate-900 dark:border-slate-700 dark:shadow-[-8px_0_30px_-5px_rgba(0,0,0,0.5)]">
        <div className="px-6 py-5 bg-white border-b border-slate-200 flex items-center justify-between shrink-0 dark:bg-slate-900 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">View Post</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors dark:hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-700">
            <h1 className="text-2xl font-bold text-slate-800 mb-4 dark:text-slate-100">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500 mb-6 dark:text-slate-400 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5">
                <UserIcon className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDateMMDDYYYY(post.publishedDate)}
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4" />
                {post.audience}
              </div>
              {post.category && (
                <div className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4" />
                  {post.category}
                </div>
              )}
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap dark:text-slate-300">
                {post.preview}
                <br/><br/>
                This is the full detail view of the post. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>

          {post.attachments > 0 && (
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-700">
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2 dark:text-slate-200">
                <Paperclip className="w-4 h-4" /> Attachments ({post.attachments})
              </h3>
              <div className="space-y-2">
                {Array.from({ length: post.attachments }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer dark:border-slate-800 dark:hover:bg-slate-800/50">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Document_Attachment_{i + 1}.pdf</span>
                    <span className="text-xs text-slate-400">2.4 MB</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
