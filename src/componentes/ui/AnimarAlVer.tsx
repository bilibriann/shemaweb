'use client';

import { useEffect, useRef, ElementType } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  variante?: 'arriba' | 'izquierda' | 'derecha';
  retraso?: number;
  as?: ElementType;
}

const CLASE: Record<NonNullable<Props['variante']>, string> = {
  arriba: 'al-ver',
  izquierda: 'al-ver-izq',
  derecha: 'al-ver-der',
};

export function AnimarAlVer({
  children,
  className = '',
  variante = 'arriba',
  retraso = 0,
  as: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${CLASE[variante]}${className ? ` ${className}` : ''}`}
      style={retraso ? { transitionDelay: `${retraso}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
