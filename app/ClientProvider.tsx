// app/ClientProvider.tsx
'use client';  // Mark this as a client-side component

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
