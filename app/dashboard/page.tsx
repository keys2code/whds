"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SectionProvider, useSection } from "@/components/sidebar-section-context";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const SECTION_LABELS: Record<string, string> = {
  playground: "Playground",
  models: "Models",
  documentation: "Documentation",
  settings: "Settings",
};

function DashboardContent() {
  const { section } = useSection();

  return (
    <SidebarInset>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-vertical:h-4 data-vertical:self-auto"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{SECTION_LABELS[section]}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <SectionContent section={section} />
      </div>
    </SidebarInset>
  );
}

function SectionContent({ section }: { section: string }) {
  switch (section) {
    case "playground":
      return (
        <>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </>
      );
    case "models":
      return (
        <>
          <div className="rounded-xl bg-muted/50 p-8">
            <h2 className="text-lg font-medium">Models</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Genesis, Explorer, Quantum and more.
            </p>
          </div>
        </>
      );
    case "documentation":
      return (
        <>
          <div className="rounded-xl bg-muted/50 p-8">
            <h2 className="text-lg font-medium">Documentation</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Introduction, Get Started, Tutorials, Changelog.
            </p>
          </div>
        </>
      );
    case "settings":
      return (
        <>
          <div className="rounded-xl bg-muted/50 p-8">
            <h2 className="text-lg font-medium">Settings</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              General, Team, Billing, Limits.
            </p>
          </div>
        </>
      );
    default:
      return (
        <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      );
  }
}

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <SectionProvider>
        <AppSidebar />
        <DashboardContent />
      </SectionProvider>
    </SidebarProvider>
  );
}
