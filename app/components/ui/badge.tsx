// File: components/ui/badge.tsx
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline";
}

export function Badge({ variant = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-sm font-medium",
        variant === "default"
          ? "bg-indigo-600 text-white"
          : "border border-gray-300 text-gray-500",
        className
      )}
      {...props}
    />
  );
}
