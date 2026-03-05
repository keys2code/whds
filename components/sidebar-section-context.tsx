"use client";

import * as React from "react";

export type Section = "playground" | "models" | "documentation" | "settings";

type SectionContextValue = {
  section: Section;
  setSection: (section: Section) => void;
};

const SectionContext = React.createContext<SectionContextValue | undefined>(
  undefined
);

export function SectionProvider({
  children,
  defaultSection = "playground",
}: {
  children: React.ReactNode;
  defaultSection?: Section;
}) {
  const [section, setSection] = React.useState<Section>(defaultSection);

  const value: SectionContextValue = {
    section,
    setSection,
  };

  return (
    <SectionContext.Provider value={value}>{children}</SectionContext.Provider>
  );
}

export function useSection() {
  const context = React.useContext(SectionContext);
  if (!context) {
    throw new Error("useSection must be used within a SectionProvider");
  }
  return context;
}
