import SidebarAppShell from "@/app/[...dashboard]/rcc/SidebarAppShell";
import PageContainer from "@/app/[...dashboard]/rsc/PageContainer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageContainer>
      <SidebarAppShell>{children}</SidebarAppShell>
    </PageContainer>
  );
}

