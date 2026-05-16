'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function TransicionPagina({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove('pagina-entrada');
    void el.offsetWidth;
    el.classList.add('pagina-entrada');
  }, [pathname]);

  return (
    <div ref={ref} className="pagina-entrada">
      {children}
    </div>
  );
}
