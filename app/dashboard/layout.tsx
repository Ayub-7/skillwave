import React from "react";
import NavBar from '@/app/ui/dashboard/navbar';

export default async function Layout({ children }: { children: React.ReactNode }) {


  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
