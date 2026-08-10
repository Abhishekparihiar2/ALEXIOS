import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SiteContextProps {
  globalSite: string;
  setGlobalSite: (site: string) => void;
}

const SiteContext = createContext<SiteContextProps | undefined>(undefined);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [globalSite, setGlobalSite] = useState("All Sites");

  return (
    <SiteContext.Provider value={{ globalSite, setGlobalSite }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteContext() {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSiteContext must be used within a SiteProvider');
  }
  return context;
}
