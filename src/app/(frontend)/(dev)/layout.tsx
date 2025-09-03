import React from 'react';
import {DevLayout} from "@/components/feature/auth/DevLayout.tsx";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DevLayout>{children}</DevLayout>;
}


