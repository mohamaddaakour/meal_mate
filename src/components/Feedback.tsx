import type { ReactNode } from "react";

export function ErrorState({ title, message }: { title: string; message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200"
    >
      <span aria-hidden="true" className="text-xl">⚠️</span>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-sm opacity-80">{message}</p>
      </div>
    </div>
  );
}

interface EmptyStateProps {
  icon: string;
  title: string;
  children?: ReactNode;
}

export function EmptyState({ icon, title, children }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-3xl border-2 border-dashed border-stone-300 px-6 py-16 text-center dark:border-stone-700">
      <span aria-hidden="true" className="mb-4 text-5xl">{icon}</span>
      <p className="text-lg font-semibold">{title}</p>
      {children && (
        <div className="mt-2 max-w-sm text-sm text-stone-500 dark:text-stone-400">{children}</div>
      )}
    </div>
  );
}

export function CardSkeletonGrid({ count = 8, label }: { count?: number; label: string }) {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">{label}</span>
      <ul aria-hidden="true" className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {Array.from({ length: count }, (_, i) => (
          <li key={i} className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-stone-900">
            <div className="aspect-square bg-stone-200 dark:bg-stone-800" />
            <div className="space-y-2 p-4">
              <div className="h-4 w-3/4 rounded bg-stone-200 dark:bg-stone-800" />
              <div className="h-3 w-1/2 rounded bg-stone-200 dark:bg-stone-800" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
