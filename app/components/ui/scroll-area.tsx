// File: components/ui/scroll-area.tsx
import * as React from "react";

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ScrollArea({ className, children, ...props }: ScrollAreaProps) {
  return (
    <div
      className={`overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
