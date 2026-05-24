'use client';

import { useEffect } from 'react';

export function FooterTransparente() {
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    html.style.background = 'transparent';
    body.style.backgroundImage = "url('/contenido/png/santiagorojo.png')";
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
    body.style.backgroundAttachment = 'fixed';
    body.style.backgroundColor = 'transparent';
    body.classList.add('footer-transparente');

    return () => {
      html.style.background = '';
      body.style.backgroundImage = '';
      body.style.backgroundSize = '';
      body.style.backgroundPosition = '';
      body.style.backgroundAttachment = '';
      body.style.backgroundColor = '';
      body.classList.remove('footer-transparente');
    };
  }, []);

  return null;
}
