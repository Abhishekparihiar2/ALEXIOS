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
    <div className="px-6 pt-6 pb-5 bg-slate-900/60 backdrop-blur-xl border-b border-slate-800 shrink-0 relative z-40">
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            {icon && (
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-800/50">
                {icon}
              </div>
            )}
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {title}
            </h2>
            {badge && (
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-md border border-blue-100 uppercase tracking-wider">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className={`text-sm text-slate-500 dark:text-slate-400 ${icon ? 'ml-10' : ''}`}>
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
        <div className={`mt-5 ${icon ? 'ml-10' : ''}`}>
          {bottomContent}
        </div>
      )}
    </div>
  );
}
