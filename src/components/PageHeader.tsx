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
  if (!actions && !bottomContent) return null;

  return (
    <div className="px-6 pt-6 pb-5 bg-white/80 dark:bg-[#000000]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shrink-0 relative z-40 transition-colors duration-200 shadow-sm">
      <div className="relative flex items-start justify-between gap-4">
        <div>
          {/* Title, subtitle, icon, and badge removed to avoid redundancy with TopHeader */}
        </div>
        {actions && (
          <div className="flex items-center gap-2 shrink-0">
            {actions}
          </div>
        )}
      </div>
      {bottomContent && (
        <div className={`mt-2`}>
          {bottomContent}
        </div>
      )}
    </div>
  );
}
