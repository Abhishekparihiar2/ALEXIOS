import React, { ReactNode } from "react";

export interface PageHeaderProps {
  title: string;
  subtitle?: ReactNode;
  icon?: ReactNode;
  badge?: string;
  actions?: ReactNode;
  bottomContent?: ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  icon,
  badge,
  actions,
  bottomContent,
}: PageHeaderProps) {
  return (
    <div className="px-6 pt-6 pb-5 bg-white/80 dark:bg-[#000000]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shrink-0 relative z-40 transition-colors duration-200 shadow-sm">
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            {icon && (
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 text-slate-700 dark:bg-slate-800/80 dark:text-slate-300 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
                {icon}
              </div>
            )}
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {title}
            </h2>
            {badge && (
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 text-xs font-bold rounded-md border border-blue-200/50 dark:border-blue-500/20 uppercase tracking-wider">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className={`text-sm text-slate-500 dark:text-slate-400 ${icon ? 'ml-[3.25rem]' : ''}`}>
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2 shrink-0">
            {actions}
          </div>
        )}
      </div>
      {bottomContent && (
        <div className={`mt-5 ${icon ? 'ml-[3.25rem]' : ''}`}>
          {bottomContent}
        </div>
      )}
    </div>
  );
}
