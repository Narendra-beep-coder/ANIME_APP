import { ReactNode } from 'react';
import Link from 'next/link';

interface SectionProps {
  title: string;
  children: ReactNode;
  viewAllHref?: string;
}

export function Section({ title, children, viewAllHref }: SectionProps) {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">{title}</h2>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="text-sm font-medium text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors flex items-center gap-1"
          >
            View All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

interface SectionSkeletonProps {
  title: string;
  count?: number;
}

export function SectionSkeleton({ title, count = 5 }: SectionSkeletonProps) {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 bg-[var(--bg-secondary)] rounded w-48 animate-pulse" />
        <div className="h-4 bg-[var(--bg-secondary)] rounded w-16 animate-pulse" />
      </div>
      <div className="content-grid">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[2/3] rounded-xl bg-[var(--bg-secondary)]" />
            <div className="mt-2 h-4 bg-[var(--bg-secondary)] rounded w-3/4" />
          </div>
        ))}
      </div>
    </section>
  );
}
