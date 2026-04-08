'use client';

import { useMagnetic } from '@/hooks/useMagnetic';

export default function MagneticButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useMagnetic<HTMLDivElement>();

  return (
    <div ref={ref} className={`inline-block ${className ?? ''}`}>
      {children}
    </div>
  );
}
