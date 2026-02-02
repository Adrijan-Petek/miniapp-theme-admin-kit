import React from "react";

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel)] p-4 shadow-[0_20px_60px_var(--shadow-color)]">
      {children}
    </div>
  );
}

export function Button({
  children,
  variant = "default",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "primary" | "danger" | "ghost";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] active:scale-[0.99]";
  const styles =
    variant === "primary"
      ? "bg-[color:var(--accent)] text-[color:var(--accent-foreground)] hover:brightness-110"
      : variant === "danger"
        ? "bg-red-500/90 text-white hover:brightness-110"
        : variant === "ghost"
          ? "bg-transparent text-[color:var(--text)] hover:bg-[color:var(--panel-muted)]"
          : "bg-[color:var(--panel-muted)] text-[color:var(--text)] border border-[color:var(--border)] hover:bg-[color:var(--panel)]";
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-muted)] px-3 py-2 text-sm text-[color:var(--text)] outline-none focus:border-[color:var(--accent)] ${className}`}
      {...props}
    />
  );
}

export function Select({ className = "", ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-muted)] px-3 py-2 text-sm text-[color:var(--text)] outline-none focus:border-[color:var(--accent)] ${className}`}
      {...props}
    />
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  return <div className="mb-1 text-xs text-[color:var(--muted)]">{children}</div>;
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--panel-muted)] px-3 py-2">
      <span className="text-xs text-[color:var(--text)]">{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-[color:var(--accent)]" />
    </label>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[color:var(--border)] bg-[color:var(--panel-muted)] px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--muted)]">
      {children}
    </span>
  );
}
