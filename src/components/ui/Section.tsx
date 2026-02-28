import { ReactNode } from 'react';
import Link from 'next/link';

interface SectionProps {
  title: string;
  children: ReactNode;
  viewAllHref?: string;
}

export function Section({ title, children, viewAllHref }: SectionProps) {
  return (
    <section className="py-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] relative">
            {title}
            <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full" />
          </h2>
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="group flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
          >
            View All
            <span className="group-hover:translate-x-1 transition-transform duration-200">
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
            </span>
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
    <section className="py-10">
      <div className="flex items-center justify-between mb-8">
        <div className="h-8 bg-[var(--bg-secondary)] rounded w-48 animate-pulse" />
        <div className="h-4 bg-[var(--bg-secondary)] rounded w-16 animate-pulse" />
      </div>
      <div className="content-grid">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[2/3] rounded-2xl bg-[var(--bg-secondary)] relative overflow-hidden">
              <div className="absolute inset-0 shimmer" />
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-4 bg-[var(--bg-secondary)] rounded w-3/4" />
              <div className="h-3 bg-[var(--bg-secondary)] rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
